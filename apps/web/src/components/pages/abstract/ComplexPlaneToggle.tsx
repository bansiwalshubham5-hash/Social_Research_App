"use client";

import { useState } from "react";

// A new visual metaphor not used anywhere else on the site: the actual
// complex plane. Toggling shows the impurity-string energies sitting on the
// real axis (PT-unbroken) versus splitting into a complex-conjugate pair off
// the real axis (PT spontaneously broken, the YSR phase).
export function ComplexPlaneToggle() {
  const [broken, setBroken] = useState(false);
  const cx = 100;
  const cy = 90;
  const scale = 60;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 200 180" className="h-auto w-56">
        <line x1={10} y1={cy} x2={190} y2={cy} stroke="var(--line)" strokeWidth={1.2} />
        <line x1={cx} y1={10} x2={cx} y2={170} stroke="var(--line)" strokeWidth={1.2} />
        <text x={185} y={cy - 6} fontSize="10" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          Re
        </text>
        <text x={cx + 6} y={18} fontSize="10" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          Im
        </text>

        {!broken ? (
          <>
            <circle cx={cx + scale * 0.35} cy={cy} r={5.5} fill="var(--violet)" />
            <text x={cx + scale * 0.35} y={cy - 12} textAnchor="middle" fontSize="10" fill="var(--violet-strong)" fontFamily="ui-monospace, monospace">
              E real
            </text>
          </>
        ) : (
          <>
            <line x1={cx + scale * 0.35} y1={cy} x2={cx + scale * 0.35} y2={cy - scale * 0.4} stroke="var(--ember)" strokeWidth={1} strokeDasharray="2 3" opacity={0.6} />
            <line x1={cx + scale * 0.35} y1={cy} x2={cx + scale * 0.35} y2={cy + scale * 0.4} stroke="var(--ember)" strokeWidth={1} strokeDasharray="2 3" opacity={0.6} />
            <circle cx={cx + scale * 0.35} cy={cy - scale * 0.4} r={5.5} fill="var(--ember)" />
            <circle cx={cx + scale * 0.35} cy={cy + scale * 0.4} r={5.5} fill="var(--ember)" />
            <text x={cx + scale * 0.35} y={cy - scale * 0.4 - 10} textAnchor="middle" fontSize="10" fill="var(--ember)" fontFamily="ui-monospace, monospace">
              E, E*
            </text>
          </>
        )}
      </svg>

      <button
        onClick={() => setBroken((b) => !b)}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
          broken ? "bg-ember text-white" : "bg-violet text-white"
        }`}
      >
        {broken ? "PT broken (YSR phase)" : "PT unbroken (Kondo / zero-mode)"}
      </button>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        {broken
          ? "In the YSR phase the fundamental impurity strings acquire genuinely complex energies — a conjugate pair, off the real axis. A real-spectrum TBA can't describe this."
          : "Everywhere else, every excitation energy stays real, even though the Hamiltonian itself is non-Hermitian. That's what “PT-unbroken” means."}
      </p>
    </div>
  );
}
