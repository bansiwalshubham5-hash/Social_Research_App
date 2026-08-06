"use client";

import { useState } from "react";

const COLORS = ["var(--violet)", "var(--ember)", "#0ea5a5"];
const HEIGHTS = [
  [64],
  [64, 40],
  [64, 40, 24],
];

// A step-through visual for how the excitation spectrum reorganizes — one
// tower, then two, then three — as zero-energy impurity strings appear.
// Original, simplified combs (not a copy of the paper's figure), stepped by
// hand rather than driven by a physics loop.
export function TowerStepper() {
  const [step, setStep] = useState(0);
  const heights = HEIGHTS[step];

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex h-24 items-end gap-6">
        {heights.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-6 rounded-sm"
              style={{
                height: `${h}px`,
                backgroundImage: `repeating-linear-gradient(to bottom, ${COLORS[i]} 0, ${COLORS[i]} 2px, transparent 2px, transparent 6px)`,
              }}
            />
            <span className="font-mono text-[10px] text-ink-soft">𝒯{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              step === i ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"
            }`}
          >
            {i + 1} tower{i > 0 ? "s" : ""}
          </button>
        ))}
      </div>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        {step === 0 && "Kondo phase: a single tower of bulk p-string excitations — the ordinary picture."}
        {step === 1 && "Zero-mode phase (I): one new zero-energy impurity string opens a second tower."}
        {step === 2 && "Zero-mode phase (II), n≥3: a higher-order impurity string opens a third tower."}
      </p>
    </div>
  );
}
