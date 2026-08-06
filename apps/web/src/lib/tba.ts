// Client-side thermodynamic Bethe Ansatz evaluator for
// Kattel, Zhakenov & Andrei, "Breakdown of Monotonic Impurity Entropy Flow
// in PT-Symmetric Multichannel Kondo Systems" (arXiv:2608.04083), eqs (15)-(21).
//
// The hard part (solving the universal eta_p(xi) hierarchy, eq 12) was done
// offline in Python (scripts/tba_solve.py) and validated against the paper's
// own closed-form UV/IR checks (see scripts/compute_simp.py). This module
// only evaluates the alpha- and T-dependent free-energy integrals against
// that precomputed table — cheap enough to run on every slider frame.

export interface TbaDataset {
  xi: number[];
  channels: Record<string, Record<string, number[]>>; // n -> p -> ln(eta_p(xi))
}

let dataset: TbaDataset | null = null;
let loadPromise: Promise<TbaDataset> | null = null;

export function loadTbaDataset(): Promise<TbaDataset> {
  if (dataset) return Promise.resolve(dataset);
  if (!loadPromise) {
    loadPromise = fetch("/data/tba-eta.json")
      .then((r) => r.json())
      .then((d: TbaDataset) => {
        dataset = d;
        return d;
      });
  }
  return loadPromise;
}

export type Phase =
  | "kondo"
  | "zero-mode-1"
  | "zero-mode-2"
  | "ysr-1"
  | "ysr-2"
  | "local-moment";

export function classifyPhase(alpha: number, n: number): Phase {
  if (alpha < Math.PI / 2) return "kondo";
  if (alpha < Math.PI) return "zero-mode-1";
  if (alpha < (n * Math.PI) / 2) return "zero-mode-2";
  if (alpha < ((n + 1) * Math.PI) / 2) return "ysr-1";
  if (alpha < (n / 2 + 1) * Math.PI) return "ysr-2";
  return "local-moment";
}

export const PHASE_LABEL: Record<Phase, string> = {
  kondo: "Kondo phase",
  "zero-mode-1": "Zero mode phase (I)",
  "zero-mode-2": "Zero mode phase (II)",
  "ysr-1": "Yu–Shiba–Rusinov phase (I)",
  "ysr-2": "Yu–Shiba–Rusinov phase (II)",
  "local-moment": "Local moment phase",
};

// ---- tiny complex helpers (only what we need) ----
type C = [number, number]; // [re, im]
const cAdd = (a: C, b: C): C => [a[0] + b[0], a[1] + b[1]];
const cSub = (a: C, b: C): C => [a[0] - b[0], a[1] - b[1]];
const cMul = (a: C, b: C): C => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cScale = (a: C, s: number): C => [a[0] * s, a[1] * s];
const cConj = (a: C): C => [a[0], -a[1]];
function cExp(a: C): C {
  const r = Math.exp(a[0]);
  return [r * Math.cos(a[1]), r * Math.sin(a[1])];
}
function cLog(a: C): C {
  const r = Math.hypot(a[0], a[1]);
  return [Math.log(r), Math.atan2(a[1], a[0])];
}
// cosh(x + iy) = cosh(x)cos(y) + i sinh(x)sin(y)
function cCosh(a: C): C {
  return [Math.cosh(a[0]) * Math.cos(a[1]), Math.sinh(a[0]) * Math.sin(a[1])];
}
function cDivReal(numer: number, denom: C): C {
  const d2 = denom[0] * denom[0] + denom[1] * denom[1];
  return [(numer * denom[0]) / d2, (-numer * denom[1]) / d2];
}

function ln1pExp(x: number): number {
  return x > 30 ? x : Math.log1p(Math.exp(x));
}

function getLnEta(ds: TbaDataset, n: number, p: number): number[] | null {
  const ch = ds.channels[String(n)];
  if (!ch) return null;
  const arr = ch[String(p)];
  return arr ?? null;
}

function trapz(xs: number[], ys: number[]): number {
  let s = 0;
  for (let i = 0; i < xs.length - 1; i++) {
    s += ((ys[i] + ys[i + 1]) / 2) * (xs[i + 1] - xs[i]);
  }
  return s;
}
function trapzC(xs: number[], ys: C[]): C {
  let re = 0;
  let im = 0;
  for (let i = 0; i < xs.length - 1; i++) {
    const dx = xs[i + 1] - xs[i];
    re += ((ys[i][0] + ys[i + 1][0]) / 2) * dx;
    im += ((ys[i][1] + ys[i + 1][1]) / 2) * dx;
  }
  return [re, im];
}

/** eq 15: single-tower Kondo phase, 0 < alpha < pi/2. Real-valued integral. */
export function kondoFimp(ds: TbaDataset, Tratio: number, alpha: number, n: number): number {
  const lnEta1 = getLnEta(ds, n, 1);
  if (!lnEta1) return NaN;
  const shift = Math.log(Tratio);
  const cosA = Math.cos(alpha);
  const sin2A = Math.sin(alpha) ** 2;
  const ys: number[] = ds.xi.map((x, i) => {
    const c = Math.cosh(x + shift);
    const ln1pEta1 = ln1pExp(lnEta1[i]);
    return (cosA * c * ln1pEta1) / (c * c - sin2A);
  });
  const integral = trapz(ds.xi, ys);
  return -(Tratio / Math.PI) * integral;
}

/** (T/2pi) * integral dxi ln(1+eta_p(xi)) / cosh(xi + ln(T) - i*phaseShift) */
function towerIntegral(ds: TbaDataset, Tratio: number, phaseShift: number, n: number, p: number): C {
  const lnEta = getLnEta(ds, n, p);
  if (!lnEta) return [0, 0];
  const shift = Math.log(Tratio);
  const ys: C[] = ds.xi.map((x, i) => {
    const ln1p = ln1pExp(lnEta[i]);
    const denom = cCosh([x + shift, -phaseShift]);
    return cDivReal(ln1p, denom);
  });
  const integral = trapzC(ds.xi, ys);
  return cScale(integral, Tratio / (2 * Math.PI));
}

/** eq 17-20: two-tower zero-mode-I phase, pi/2 < alpha < pi. */
export function zeroMode1Fimp(ds: TbaDataset, Tratio: number, alpha: number, n: number): number {
  const FT1_1: C = cScale(towerIntegral(ds, Tratio, alpha, n, 1), -1);
  const FT2_1: C = cSub(FT1_1, towerIntegral(ds, Tratio, alpha - Math.PI / 2, n, 2));
  const Z1 = cAdd(cExp(cScale(FT1_1, -1 / Tratio)), cExp(cScale(FT2_1, -1 / Tratio)));
  const Z2 = cConj(Z1);
  const Zimp = cMul(Z1, Z2);
  const Fimp = cScale(cLog(Zimp), -Tratio);
  return Fimp[0];
}

/** eq 21a-c generalized to 3 towers: zero-mode-II and local-moment phases. */
export function threeTowerFimp(ds: TbaDataset, Tratio: number, alpha: number, n: number, m: number): number {
  const a = alpha - (m * Math.PI) / 2;
  const b = ((m + 1) * Math.PI) / 2 - alpha;
  const FT1 = cAdd(cScale(towerIntegral(ds, Tratio, a, n, m + 1), -1), towerIntegral(ds, Tratio, b, n, m));
  const FT2 = cSub(towerIntegral(ds, Tratio, a, n, m - 1), towerIntegral(ds, Tratio, b, n, m - 2));
  const FT3 = cAdd(towerIntegral(ds, Tratio, b, n, m), towerIntegral(ds, Tratio, a, n, m - 1));
  const Z1 = cAdd(cAdd(cExp(cScale(FT1, -1 / Tratio)), cExp(cScale(FT2, -1 / Tratio))), cExp(cScale(FT3, -1 / Tratio)));
  const Z2 = cConj(Z1);
  const Zimp = cMul(Z1, Z2);
  const Fimp = cScale(cLog(Zimp), -Tratio);
  return Fimp[0];
}

/** Fimp(T; alpha, n), dispatching on phase. Returns null in the PT-broken YSR window. */
export function fimp(ds: TbaDataset, Tratio: number, alpha: number, n: number): number | null {
  const phase = classifyPhase(alpha, n);
  switch (phase) {
    case "kondo":
      return kondoFimp(ds, Tratio, alpha, n);
    case "zero-mode-1":
      return zeroMode1Fimp(ds, Tratio, alpha, n);
    case "zero-mode-2":
    case "local-moment": {
      const m = Math.floor((2 * alpha) / Math.PI);
      return threeTowerFimp(ds, Tratio, alpha, n, m);
    }
    case "ysr-1":
    case "ysr-2":
      return null; // spontaneous PT-symmetry breaking - beyond TBA scope, per the paper itself
  }
}

/** S_imp(T) = -dFimp/dT via central finite difference in log T. */
export function simp(ds: TbaDataset, Tratio: number, alpha: number, n: number, dlogT = 0.01): number | null {
  const T1 = Tratio * Math.exp(-dlogT);
  const T2 = Tratio * Math.exp(dlogT);
  const F1 = fimp(ds, T1, alpha, n);
  const F2 = fimp(ds, T2, alpha, n);
  if (F1 === null || F2 === null) return null;
  return -(F2 - F1) / (T2 - T1);
}
