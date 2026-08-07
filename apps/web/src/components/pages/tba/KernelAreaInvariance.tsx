"use client";

import { useState } from "react";

// Live numerical proof that integral K(xi,a) dxi = pi exactly, for any alpha —
// computed fresh by trapezoidal integration on every drag, not a canned
// number. Distinct from KernelFunctionGraph (which shows the shape) and
// KernelNarrowingSlider (which shows the width change): this one is
// specifically about the invariant area underneath.
export function KernelAreaInvariance() {
  const [alphaOverPi, setAlphaOverPi] = useState(0.3);
  const alpha = Math.min(alphaOverPi, 0.499) * Math.PI;
  const cosA = Math.cos(alpha);
  const sin2A = Math.sin(alpha) ** 2;
  const peak = cosA / (1 - sin2A);

  const xiMax = 10;
  const N = 400;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= N; i++) {
    const xi = -xiMax + (2 * xiMax * i) / N;
    xs.push(xi);
    ys.push((cosA * Math.cosh(xi)) / (Math.cosh(xi) ** 2 - sin2A));
  }
  let area = 0;
  for (let i = 0; i < N; i++) area += ((ys[i] + ys[i + 1]) / 2) * ((2 * xiMax) / N);

  const W = 300;
  const H = 130;
  const padL = 26;
  const padB = 16;
  const padT = 8;
  const yMax = Math.min(peak, 14);
  const pts = xs
    .map((xi, i) => {
      const x = padL + ((xi + xiMax) / (2 * xiMax)) * (W - padL - 10);
      const y = H - padB - (Math.min(ys[i], yMax) / yMax) * (H - padB - padT);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const fillPts = `${padL},${H - padB} ${pts} ${W - 10},${H - padB}`;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-sm">
        <line x1={padL} x2={W - 10} y1={H - padB} y2={H - padB} stroke="var(--line)" strokeWidth={1} />
        <polygon points={fillPts} fill="var(--violet)" opacity={0.14} />
        <polyline points={pts} fill="none" stroke="var(--violet)" strokeWidth={2.2} strokeLinecap="round" />
      </svg>
      <input
        type="range"
        min={0}
        max={49}
        step={0.5}
        value={alphaOverPi * 100}
        onChange={(e) => setAlphaOverPi(Number(e.target.value) / 100)}
        className="w-full max-w-sm accent-violet"
      />
      <div className="flex w-full max-w-sm items-center justify-between font-mono text-[11px] text-ink">
        <span>α = {alphaOverPi.toFixed(2)}π</span>
        <span>peak K(0,α) = {peak > 14 ? "≫14" : peak.toFixed(2)}</span>
      </div>
      <p
        className="rounded-full px-3 py-1 font-mono text-xs font-semibold"
        style={{ color: "var(--violet)", background: "color-mix(in srgb, var(--violet) 12%, transparent)" }}
      >
        ∫ K(ξ,α) dξ ≈ {area.toFixed(4)} &nbsp;(π = {Math.PI.toFixed(4)})
      </p>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Drag α anywhere — the shaded area stays pinned at exactly π, computed live right now by numerical
        integration, while the peak races toward infinity and the wings vanish. Fixed area plus vanishing
        width is precisely the defining property of a delta function.
      </p>
    </div>
  );
}
