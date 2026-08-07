"use client";

import { useState } from "react";

// An energy-level occupation diagram — filled vs. hollow markers showing
// which state is actually the ground state. A new visual language (levels +
// occupation) not used by any other widget, needed because this concept is
// specifically about who occupies the ground state, not about geometry.
export function YSREnergyLevelDiagram() {
  const [sub, setSub] = useState<"I" | "II">("I");
  const groundIsPair = sub === "I";

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 220 140" className="h-auto w-64">
        <line x1={30} y1={20} x2={190} y2={20} stroke="var(--line)" strokeWidth={1} />
        <text x={196} y={24} fontSize="9" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          E
        </text>

        {/* excited level */}
        <line x1={50} y1={groundIsPair ? 40 : 95} x2={130} y2={groundIsPair ? 40 : 95} stroke="var(--ink-soft)" strokeWidth={2} strokeDasharray="3 3" opacity={0.6} />
        <text x={140} y={groundIsPair ? 44 : 99} fontSize="9" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          excited
        </text>

        {/* ground level */}
        <line x1={50} y1={groundIsPair ? 95 : 40} x2={130} y2={groundIsPair ? 95 : 40} stroke="var(--violet)" strokeWidth={3} />
        <text x={140} y={groundIsPair ? 99 : 44} fontSize="9" fontWeight={600} fill="var(--violet-strong)" fontFamily="ui-monospace, monospace">
          ground
        </text>

        {/* the two impurity-string markers, always drawn on the "occupied" (ground) line */}
        <circle cx={75} cy={groundIsPair ? 95 : 40} r={6} fill={groundIsPair ? "var(--violet)" : "none"} stroke="var(--violet)" strokeWidth={2} />
        <circle cx={105} cy={groundIsPair ? 95 : 40} r={6} fill={groundIsPair ? "var(--violet)" : "none"} stroke="var(--violet)" strokeWidth={2} />
        <text x={90} y={groundIsPair ? 118 : 63} textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          Λ⁽¹⁾, Λ⁽²⁾
        </text>
      </svg>

      <div className="flex gap-2">
        <button
          onClick={() => setSub("I")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${sub === "I" ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}
        >
          YSR-I
        </button>
        <button
          onClick={() => setSub("II")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${sub === "II" ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}
        >
          YSR-II
        </button>
      </div>

      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        {sub === "I"
          ? "YSR-I: the two fundamental impurity strings' combined energy is negative, so they sit in the ground state — the impurities are screened by these single-particle modes, not the Kondo cloud."
          : "YSR-II: their combined energy is positive, so the ground state has neither string filled — impurities are unscreened at T=0, screened only in the excited state that does contain them."}
      </p>
    </div>
  );
}
