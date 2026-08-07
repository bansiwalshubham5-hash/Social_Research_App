"use client";

import { useState } from "react";

// A literal picture of eq. (4): p points stacked at equal imaginary-axis
// spacing around one real string center. A new geometric metaphor — a
// vertical "ladder" of complex points — distinct from the single-dot /
// conjugate-pair complex-plane widget used on page 1.
export function PStringLadder() {
  const [p, setP] = useState(3);
  const cx = 100;
  const cy = 70;
  const spacing = 16;

  const rungs = Array.from({ length: p }, (_, j) => {
    const jj = j + 1;
    const offset = (p + 1 - 2 * jj) / 2;
    return { j: jj, y: cy - offset * spacing };
  });

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 200 140" className="h-auto w-56">
        <line x1={20} y1={70} x2={180} y2={70} stroke="var(--line)" strokeWidth={1} />
        <text x={185} y={73} fontSize="9" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          Re
        </text>
        <line x1={cx} y1={10} x2={cx} y2={130} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
        {rungs.map((r) => (
          <g key={r.j}>
            <line x1={cx} y1={cy} x2={cx} y2={r.y} stroke="var(--ember)" strokeWidth={1} opacity={0.35} />
            <circle cx={cx} cy={r.y} r={5} fill="var(--ember)" />
          </g>
        ))}
        <circle cx={cx} cy={cy} r={3} fill="var(--violet)" stroke="var(--paper-raised)" strokeWidth={1.5} />
        <line x1={30} y1={122} x2={cx - 6} y2={cy + 6} stroke="var(--violet)" strokeWidth={0.8} opacity={0.5} />
        <text x={28} y={132} textAnchor="start" fontSize="9" fill="var(--violet-strong)" fontFamily="ui-monospace, monospace">
          Λ⁽ᵖ⁾ (string center)
        </text>
      </svg>
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-soft">p =</span>
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setP(n)}
            className={`h-7 w-7 rounded-full text-xs font-medium transition ${
              n === p ? "bg-ember text-white" : "bg-line-soft text-ink-soft hover:bg-line"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        A p-string is p rapidities sharing one real center Λ⁽ᵖ⁾, stacked at equally-spaced imaginary
        offsets ic/2·(p+1−2j). This is the ordinary building block of the bulk Kondo cloud — the same
        structure as the Hermitian problem.
      </p>
    </div>
  );
}
