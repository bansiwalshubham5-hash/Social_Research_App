"use client";

import { useState } from "react";

// A plot of eta_p(xi) itself — the "universal solution" — not an entropy
// curve at all, with explicit numeric UV/IR readouts computed from eq. (13)
// and (14). Adjustable p and n, distinct from every entropy-shaped widget
// on pages 1-2.
export function UniversalSolutionCurve() {
  const [p, setP] = useState(1);
  const [n, setN] = useState(3);

  const uv = (p + 1) ** 2 - 1;
  const ir = p < n ? Math.sin(((p + 1) * Math.PI) / (n + 2)) ** 2 / Math.sin(Math.PI / (n + 2)) ** 2 - 1 : (p + 1 - n) ** 2 - 1;

  const W = 260;
  const H = 100;
  const yMax = Math.max(uv, ir) + 1;
  const yToPx = (v: number) => H - 14 - (v / yMax) * (H - 24);
  const pts: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const x = 10 + t * (W - 20);
    const v = ir + (uv - ir) / (1 + Math.exp((t - 0.5) * 9));
    pts.push(`${x},${yToPx(v)}`);
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-xs">
        <polyline points={pts.join(" ")} fill="none" stroke="var(--ember)" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={10} cy={yToPx(uv)} r={4} fill="var(--violet)" />
        <circle cx={W - 10} cy={yToPx(ir)} r={4} fill="var(--violet-strong)" />
        <text x={10} y={yToPx(uv) - 8} fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          UV: {uv.toFixed(2)}
        </text>
        <text x={W - 10} y={yToPx(ir) + 16} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          IR: {ir.toFixed(2)}
        </text>
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-ink-soft">p =</span>
          {[0, 1, 2, 3].map((v) => (
            <button key={v} onClick={() => setP(v)} className={`h-6 w-6 rounded-full text-xs font-medium ${v === p ? "bg-ember text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-ink-soft">n =</span>
          {[1, 2, 3, 4, 5].map((v) => (
            <button key={v} onClick={() => setN(v)} className={`h-6 w-6 rounded-full text-xs font-medium ${v === n ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        η_p(ξ) itself, not an entropy — the raw density-ratio solution every free energy is built from. It
        interpolates between two closed-form numbers, eq. (13) at ξ→−∞ and eq. (14) at ξ→∞. Try p≥n to see
        the IR formula switch branches.
      </p>
    </div>
  );
}
