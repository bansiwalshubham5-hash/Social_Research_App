"use client";

import { useState } from "react";

// A dial that snaps to the three special values of the spectral parameter u
// — a new "select a special point on a continuum" widget, distinct from
// every drag-a-position widget elsewhere since here the continuum is
// abstract (u), not a physical angle or position.
const STOPS = [
  { u: "1", label: "electrons", color: "var(--ink-soft)", angle: -60 },
  { u: "0", label: "impurity 1", color: "var(--violet)", angle: 0 },
  { u: "1−e²ⁱᵠ", label: "impurity 2", color: "var(--ember)", angle: 60 },
];

export function SpectralParameterDial() {
  const [sel, setSel] = useState(0);
  const cx = 100;
  const cy = 70;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 200 110" className="h-auto w-64">
        <line x1={20} y1={cy} x2={180} y2={cy} stroke="var(--line)" strokeWidth={1.5} />
        {STOPS.map((s, i) => {
          const x = cx + (i - 1) * 45;
          return (
            <g key={s.u} onClick={() => setSel(i)} style={{ cursor: "pointer" }}>
              <circle cx={x} cy={cy} r={sel === i ? 8 : 6} fill={sel === i ? s.color : "var(--line)"} />
              <text x={x} y={cy - 14} textAnchor="middle" fontSize="10" fontWeight={600} fill={sel === i ? s.color : "var(--ink-soft)"} fontFamily="ui-monospace, monospace">
                u={s.u}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-center font-mono text-xs text-ink">
        S(u) at u = {STOPS[sel].u} → the {STOPS[sel].label} scattering matrix
      </p>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        One continuous function, S(u) = [uI + icP]/[u+ic], secretly contains every physical S-matrix in the
        problem. Plug in u=1 and you get the electron-electron matrix; u=0 or u=1−e²ⁱᵠ recovers scattering
        off impurity 1 or 2. Tap each stop.
      </p>
    </div>
  );
}
