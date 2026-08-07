"use client";

import { useState } from "react";

// A bead chain — one auxiliary particle passing through every real particle
// in sequence — animated step-by-step. Structurally different from page 2's
// TBARecursionChain (that one was about bidirectional coupling between
// neighbors in a tower hierarchy; this one is a single particle sweeping
// through a 1D line once, left to right, building a product).
export function MonodromyChainDiagram() {
  const [step, setStep] = useState(2);
  const N = 5;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 70" className="h-auto w-full max-w-sm">
        <line x1={20} y1={40} x2={240} y2={40} stroke="var(--line)" strokeWidth={1.5} />
        {Array.from({ length: N }, (_, i) => {
          const x = 40 + i * 45;
          const passed = i < step;
          return (
            <g key={i}>
              <circle cx={x} cy={40} r={7} fill={passed ? "var(--violet)" : "var(--line-soft)"} stroke="var(--violet)" strokeWidth={passed ? 0 : 1} />
              <text x={x} y={58} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
                y={i + 1}
              </text>
            </g>
          );
        })}
        <circle cx={40 + Math.min(step, N - 0.001) * 45 - 22} cy={20} r={5} fill="var(--ember)" />
      </svg>
      <input type="range" min={0} max={N} value={step} onChange={(e) => setStep(Number(e.target.value))} className="w-full max-w-xs accent-ember" />
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Ξ(u) = ∏ S_ya(u−u_y) — send an auxiliary particle (ember) through every real particle y=1..N in
        turn, multiplying up their S-matrices as it goes. Trace out the auxiliary space and you get the
        transfer matrix T(u); Yang-Baxter guarantees T(u) and T(v) commute for any u, v.
      </p>
    </div>
  );
}
