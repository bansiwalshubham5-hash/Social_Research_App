"use client";

import { useState } from "react";

// A draggable widen/narrow kernel — distinct from KernelFunctionGraph's fixed
// alpha-slider-over-xi picture: this one fixes the alpha RANGE (0 to just
// under pi/2) and lets you scrub across it to watch the whole shape morph in
// one continuous drag. Uses the same exact closed-form kernel from eq. (15),
// K(xi,a) = cos(a)*cosh(xi) / (cosh^2(xi) - sin^2(a)) — not an approximation.
export function KernelNarrowingSlider() {
  const [alphaFrac, setAlphaFrac] = useState(0.3);
  const alpha = alphaFrac * 0.499 * Math.PI;
  const cosA = Math.cos(alpha);
  const sin2A = Math.sin(alpha) ** 2;

  const W = 260;
  const H = 90;
  const pts: string[] = [];
  const peak = cosA / (1 - sin2A); // K(0, alpha)
  const yMax = Math.min(peak, 10);
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const x = t * (W - 20) + 10;
    const lam = (t - 0.5) * 8;
    const kRaw = (cosA * Math.cosh(lam)) / (Math.cosh(lam) ** 2 - sin2A);
    const kClamped = Math.min(kRaw, yMax);
    const y = H - 10 - (kClamped / yMax) * (H - 20);
    pts.push(`${x},${Math.max(6, y)}`);
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-xs">
        <line x1={10} y1={H - 10} x2={W - 10} y2={H - 10} stroke="var(--line)" strokeWidth={1} />
        <polyline points={pts.join(" ")} fill="none" stroke="var(--teal, #0ea5a5)" strokeWidth={2.5} strokeLinecap="round" style={{ stroke: "#0ea5a5" }} />
      </svg>
      <input
        type="range"
        min={0}
        max={100}
        value={alphaFrac * 100}
        onChange={(e) => setAlphaFrac(Number(e.target.value) / 100)}
        className="w-full max-w-xs accent-violet"
      />
      <div className="flex w-full max-w-xs justify-between font-mono text-[10px] text-ink-soft">
        <span>α = 0 (1/cosh)</span>
        <span>α → π/2 (delta fn)</span>
      </div>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Drag right. At α=0 the kernel is the ordinary Hermitian 1/cosh; as α climbs toward π/2 it narrows
        into a delta function, sharpening the entropy crossover right at T_K.
      </p>
    </div>
  );
}
