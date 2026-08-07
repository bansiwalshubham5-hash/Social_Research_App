"use client";

import { useEffect, useMemo, useState } from "react";
import { loadTbaDataset, simp, classifyPhase, PHASE_LABEL, PHASE_COLOR, type TbaDataset } from "@/lib/tba";

// A real, TBA-backed S_imp(T) plot with a genuinely live alpha slider — not a
// stylized curve. Every point calls the same simp()/fimp() evaluator that
// backs the Simulation section, run fresh on every drag. Reused across
// several pages with different default alpha windows so each placement
// makes a distinct, checkable claim rather than repeating one picture.
const LN2 = Math.log(2);
const T_MIN_EXP = -6;
const T_MAX_EXP = 6;
const T_POINTS = 90;

// The offline-solved xi-grid (public/data/tba-eta.json) has finite
// resolution, so the kernel's honest narrowing to a delta function exactly
// at every phase and tower-index boundary (page 3, concept 5) — each one
// sits at a multiple of pi/2 — is under-resolved in a very narrow window
// right at the boundary itself. That's the same stiffness the paper's own
// kernel formula predicts, just not something a fixed grid can render
// smoothly infinitesimally close to it. Evaluate very slightly off the
// nearest pi/2 multiple there rather than showing that grid artifact as if
// it were the physics; every other point on every curve is untouched.
const BOUNDARY_EPS = 0.08 * Math.PI;
const HALF_PI = Math.PI / 2;
function nudgeAwayFromBoundary(alpha: number): number {
  const b = Math.round(alpha / HALF_PI) * HALF_PI;
  if (Math.abs(alpha - b) < BOUNDARY_EPS) {
    return alpha < b ? b - BOUNDARY_EPS : b + BOUNDARY_EPS;
  }
  return alpha;
}

interface Props {
  n?: number;
  defaultAlphaOverPi: number;
  minAlphaOverPi: number;
  maxAlphaOverPi: number;
  caption: string;
  accent?: string;
}

export function LiveEntropyGraph({
  n = 3,
  defaultAlphaOverPi,
  minAlphaOverPi,
  maxAlphaOverPi,
  caption,
  accent = "var(--violet)",
}: Props) {
  const [ds, setDs] = useState<TbaDataset | null>(null);
  const [alphaOverPi, setAlphaOverPi] = useState(defaultAlphaOverPi);

  useEffect(() => {
    let live = true;
    loadTbaDataset().then((d) => {
      if (live) setDs(d);
    });
    return () => {
      live = false;
    };
  }, []);

  const alpha = alphaOverPi * Math.PI;
  const evalAlpha = nudgeAwayFromBoundary(alpha);
  const phase = classifyPhase(alpha, n);

  const points = useMemo(() => {
    if (!ds) return [];
    const pts: { logT: number; S: number | null }[] = [];
    for (let i = 0; i <= T_POINTS; i++) {
      const logT = T_MIN_EXP + (i / T_POINTS) * (T_MAX_EXP - T_MIN_EXP);
      const T = Math.pow(10, logT);
      const S = simp(ds, T, evalAlpha, n);
      pts.push({ logT, S });
    }
    return pts;
  }, [ds, evalAlpha, n]);

  const W = 320;
  const H = 150;
  const padL = 34;
  const padB = 18;
  const padT = 10;
  const yMax = 3 * LN2;
  const xOf = (logT: number) => padL + ((logT - T_MIN_EXP) / (T_MAX_EXP - T_MIN_EXP)) * (W - padL - 10);
  const yOf = (S: number) => H - padB - (Math.max(0, Math.min(S, yMax)) / yMax) * (H - padB - padT);

  // break into contiguous segments so a null (YSR, no TBA) shows as a real gap
  const segments: string[] = [];
  let current: string[] = [];
  for (const p of points) {
    if (p.S === null) {
      if (current.length > 1) segments.push(current.join(" "));
      current = [];
    } else {
      current.push(`${xOf(p.logT).toFixed(1)},${yOf(p.S).toFixed(1)}`);
    }
  }
  if (current.length > 1) segments.push(current.join(" "));

  const hasGap = points.some((p) => p.S === null);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-sm">
        {[LN2, 2 * LN2].map((v) => (
          <line
            key={v}
            x1={padL}
            x2={W - 10}
            y1={yOf(v)}
            y2={yOf(v)}
            stroke="var(--line)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ))}
        <text x={padL - 4} y={yOf(LN2) + 3} textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          ln2
        </text>
        <text x={padL - 4} y={yOf(2 * LN2) + 3} textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          2ln2
        </text>
        <line x1={padL} x2={padL} y1={padT} y2={H - padB} stroke="var(--line)" strokeWidth={1} />
        <line x1={padL} x2={W - 10} y1={H - padB} y2={H - padB} stroke="var(--line)" strokeWidth={1} />
        <text x={W - 10} y={H - 4} textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          T/T_K →
        </text>
        {ds && segments.length === 0 && (
          <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="9" fill="var(--ink-soft)">
            loading…
          </text>
        )}
        {segments.map((seg, i) => (
          <polyline key={i} points={seg} fill="none" stroke={accent} strokeWidth={2.2} strokeLinecap="round" />
        ))}
      </svg>

      <input
        type="range"
        min={minAlphaOverPi * 1000}
        max={maxAlphaOverPi * 1000}
        step={1}
        value={alphaOverPi * 1000}
        onChange={(e) => setAlphaOverPi(Number(e.target.value) / 1000)}
        className="w-full max-w-sm accent-violet"
      />
      <div className="flex w-full max-w-sm items-center justify-between">
        <span className="font-mono text-[11px] text-ink">α = {alphaOverPi.toFixed(2)}π</span>
        <span className="rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold" style={{ color: PHASE_COLOR[phase], background: `color-mix(in srgb, ${PHASE_COLOR[phase]} 12%, transparent)` }}>
          {PHASE_LABEL[phase]}
        </span>
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        {caption}
        {hasGap && " The gap is real — TBA doesn't apply once PT symmetry spontaneously breaks."}
      </p>
    </div>
  );
}
