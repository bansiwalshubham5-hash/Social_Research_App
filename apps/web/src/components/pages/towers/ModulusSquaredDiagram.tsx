"use client";

import { useState } from "react";

// An interactive "why is this real" demonstration: drag a complex number
// around, multiply it by its own conjugate, watch the product always land
// on the positive real axis. A new interaction entirely — nothing else on
// the site lets you drag a point and see a derived quantity update via
// complex multiplication.
export function ModulusSquaredDiagram() {
  const [angle, setAngle] = useState(50);
  const rad = (angle * Math.PI) / 180;
  const r = 40;
  const cx = 70;
  const cy = 70;
  const zx = cx + Math.cos(rad) * r;
  const zy = cy - Math.sin(rad) * r;

  const modSq = r * r;
  const productX = 190 + Math.min(modSq / 40, 55);

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 140" className="h-auto w-full max-w-sm">
        <line x1={10} y1={70} x2={130} y2={70} stroke="var(--line)" strokeWidth={1} />
        <line x1={70} y1={10} x2={70} y2={130} stroke="var(--line)" strokeWidth={1} />
        <line x1={cx} y1={cy} x2={zx} y2={zy} stroke="var(--violet)" strokeWidth={1.5} />
        <circle cx={zx} cy={zy} r={5} fill="var(--violet)" />
        <text x={zx + 8} y={zy - 4} fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          Z₍₁₎
        </text>
        <line x1={cx} y1={cy} x2={zx} y2={cy + (cy - zy)} stroke="var(--ember)" strokeWidth={1.5} strokeDasharray="2 3" />
        <circle cx={zx} cy={cy + (cy - zy)} r={5} fill="var(--ember)" />
        <text x={zx + 8} y={cy + (cy - zy) + 12} fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ember)">
          Z₍₂₎=Z₍₁₎*
        </text>

        <line x1={150} y1={70} x2={250} y2={70} stroke="var(--line)" strokeWidth={1} />
        <circle cx={productX} cy={70} r={6} fill="var(--violet-strong)" />
        <text x={productX} y={58} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          |Z₍₁₎|²
        </text>
        <text x={200} y={130} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          always real, always &gt; 0
        </text>
      </svg>
      <input type="range" min={5} max={175} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full max-w-xs accent-violet" />
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Drag Z₍₁₎ anywhere — its partner always mirrors below the real axis. Multiply the two partition
        functions and the imaginary parts cancel exactly: Z_imp = |Z_imp,(1)|² is always real and positive,
        no matter how complex each individual tower&apos;s free energy gets.
      </p>
    </div>
  );
}
