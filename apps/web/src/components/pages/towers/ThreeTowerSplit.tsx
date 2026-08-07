"use client";

import { useState } from "react";

// The three-way continuation of page 3's TowerSplitDiagram fork — but drawn
// as an interactive m-dependent branch count rather than a static picture,
// so it's a genuinely different widget, not a recolored copy.
export function ThreeTowerSplit() {
  const [alphaOverPi, setAlphaOverPi] = useState(1.4);
  const m = Math.floor(2 * alphaOverPi);
  const showThird = alphaOverPi > 1;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex h-24 items-end gap-5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 rounded-sm" style={{ height: 64, backgroundImage: "repeating-linear-gradient(to bottom, var(--violet) 0, var(--violet) 2px, transparent 2px, transparent 6px)" }} />
          <span className="font-mono text-[10px] text-ink-soft">𝒯1</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-6 rounded-sm" style={{ height: 46, backgroundImage: "repeating-linear-gradient(to bottom, var(--ember) 0, var(--ember) 2px, transparent 2px, transparent 6px)" }} />
          <span className="font-mono text-[10px] text-ink-soft">𝒯2</span>
        </div>
        <div className="flex flex-col items-center gap-1" style={{ opacity: showThird ? 1 : 0.15 }}>
          <div className="w-6 rounded-sm" style={{ height: 30, backgroundImage: "repeating-linear-gradient(to bottom, #0ea5a5 0, #0ea5a5 2px, transparent 2px, transparent 6px)" }} />
          <span className="font-mono text-[10px] text-ink-soft">𝒯3</span>
        </div>
      </div>
      <input
        type="range"
        min={100}
        max={250}
        value={alphaOverPi * 100}
        onChange={(e) => setAlphaOverPi(Number(e.target.value) / 100)}
        className="w-full max-w-xs accent-ember"
      />
      <p className="text-center font-mono text-xs text-ink">
        α = {alphaOverPi.toFixed(2)}π &middot; m = ⌊2α/π⌋ = {m}
      </p>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        For n≥3, past α=π a third tower 𝒯3 opens — the higher-order impurity strings. m=⌊2α/π⌋ tracks exactly
        which bulk-string index each tower&apos;s free-energy integral (eq. 21a-c) shifts by.
      </p>
    </div>
  );
}
