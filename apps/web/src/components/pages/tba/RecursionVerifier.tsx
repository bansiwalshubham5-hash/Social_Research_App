"use client";

import { useState } from "react";

// A live numerical proof-checker: computes both sides of the sourceless
// Y-system recursion eta_p^2 = (1+eta_{p+1})(1+eta_{p-1}) from the closed-form
// UV or IR solution, for whatever p (and n, in the IR case) the reader picks —
// not a canned example, an actual on-the-fly verification.
function uvEta(p: number) {
  return (p + 1) ** 2 - 1;
}
function irEta(p: number, n: number) {
  const gamma = Math.PI / (n + 2);
  return Math.sin((p + 1) * gamma) ** 2 / Math.sin(gamma) ** 2 - 1;
}

interface Props {
  mode: "uv" | "ir";
  accent?: string;
}

export function RecursionVerifier({ mode, accent = "var(--violet)" }: Props) {
  const [p, setP] = useState(2);
  const [n, setN] = useState(4);
  const etaFn = (pp: number) => (mode === "uv" ? uvEta(pp) : irEta(pp, n));
  const pMax = mode === "uv" ? 7 : n - 1;
  const pClamped = Math.min(Math.max(p, 1), Math.max(1, pMax));
  const etaP = etaFn(pClamped);
  const etaPlus = etaFn(pClamped + 1);
  const etaMinus = etaFn(pClamped - 1);
  const lhs = etaP * etaP;
  const rhs = (1 + etaPlus) * (1 + etaMinus);
  const matches = Math.abs(lhs - rhs) < 1e-6 * Math.max(1, Math.abs(lhs));

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="font-mono text-xs text-ink-soft">p =</span>
        <input
          type="range"
          min={1}
          max={Math.max(1, pMax)}
          step={1}
          value={pClamped}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-28 accent-violet"
        />
        <span className="w-4 font-mono text-xs text-ink">{pClamped}</span>
        {mode === "ir" && (
          <>
            <span className="ml-2 font-mono text-xs text-ink-soft">n =</span>
            {[3, 4, 5, 6].map((v) => (
              <button
                key={v}
                onClick={() => {
                  setN(v);
                  setP((cur) => Math.min(cur, v - 1));
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold"
                style={n === v ? { background: accent, color: "#fff" } : { background: "var(--line-soft)", color: "var(--ink-soft)" }}
              >
                {v}
              </button>
            ))}
          </>
        )}
      </div>
      <div className="grid w-full max-w-sm grid-cols-2 gap-3 font-mono text-xs">
        <div className="rounded-lg border border-line p-3 text-center">
          <p className="text-ink-soft">LHS &nbsp;η_p²</p>
          <p className="mt-1 text-sm font-semibold text-ink">{lhs.toFixed(6)}</p>
        </div>
        <div className="rounded-lg border border-line p-3 text-center">
          <p className="text-ink-soft">RHS &nbsp;(1+η_p+1)(1+η_p-1)</p>
          <p className="mt-1 text-sm font-semibold text-ink">{rhs.toFixed(6)}</p>
        </div>
      </div>
      <p className="text-sm font-semibold" style={{ color: matches ? accent : "var(--ink-soft)" }}>
        {matches ? "✓ equal — the recursion holds exactly" : "…"}
      </p>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        {mode === "uv"
          ? "Drag p anywhere — the closed form η_p=(p+1)²−1 solves the sourceless recursion at every single value, not just the ones shown in the derivation."
          : "Drag p or change n — the closed form still solves the recursion everywhere in between its two boundaries, η₀=0 and η_n=0."}
      </p>
    </div>
  );
}
