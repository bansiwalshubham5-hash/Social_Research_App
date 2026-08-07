"use client";

import { useState } from "react";

// A draggable widen/narrow kernel — distinct from KernelShapePlot's static
// picture: this one is specifically about how the SAME kernel's width
// changes as alpha sweeps toward pi/2, using a slider rather than a static
// snapshot.
export function KernelNarrowingSlider() {
  const [alphaFrac, setAlphaFrac] = useState(0.3);
  const width = 1 - alphaFrac * 0.92;

  const W = 260;
  const H = 90;
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const x = t * (W - 20) + 10;
    const lam = (t - 0.5) * 8;
    const y = H - 10 - (1 / Math.cosh((Math.PI * lam) / width)) * (H - 20) * 3.2;
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
