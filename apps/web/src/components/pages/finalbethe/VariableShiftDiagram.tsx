"use client";

import { useState } from "react";

// A before/after number-line showing the rapidity relabeling
// Λ → e^(iφ)(Λ−1)+1 — a new "coordinate change" visual, distinct from the
// complex-plane and ring-geometry widgets used elsewhere since this one is
// specifically about a substitution simplifying an equation's appearance.
export function VariableShiftDiagram() {
  const [shifted, setShifted] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 240 90" className="h-auto w-full max-w-sm">
        <line x1={20} y1={45} x2={220} y2={45} stroke="var(--line)" strokeWidth={1.5} />
        {!shifted ? (
          <>
            <circle cx={90} cy={45} r={6} fill="var(--ember)" />
            <text x={90} y={30} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ember)">
              Λγ − 1 ± iceⁱᵠ/2
            </text>
            <text x={90} y={65} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
              asymmetric offset
            </text>
          </>
        ) : (
          <>
            <circle cx={150} cy={45} r={6} fill="var(--violet)" />
            <text x={150} y={30} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
              Λγ − 1 ± ic/2
            </text>
            <text x={150} y={65} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
              clean, symmetric
            </text>
          </>
        )}
      </svg>
      <button
        onClick={() => setShifted((s) => !s)}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${shifted ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}
      >
        {shifted ? "shift applied: Λ → eⁱᵠ(Λ−1)+1" : "apply the shift"}
      </button>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Purely cosmetic, but worth doing: relabel the rapidity and the messy φ-dependent offsets in eq. (35)
        collapse into the clean ±ic/2 form used in every equation on pages 1-5.
      </p>
    </div>
  );
}
