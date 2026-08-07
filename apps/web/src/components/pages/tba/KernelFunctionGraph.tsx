"use client";

import { useMemo, useState } from "react";

// The real closed-form eq-15 kernel, K(xi,a) = cos(a)*cosh(xi) / (cosh^2(xi) - sin^2(a)) —
// not a stylized 1/cosh stand-in. Pure closed-form math, no TBA dataset needed,
// so the slider is exact at every frame, all the way up to the delta-function limit.
export function KernelFunctionGraph() {
  const [alphaOverPi, setAlphaOverPi] = useState(0.15);
  const alpha = Math.min(alphaOverPi, 0.499) * Math.PI;

  const W = 300;
  const H = 130;
  const padL = 26;
  const padB = 16;
  const padT = 8;
  const xiMax = 4;

  const cosA = Math.cos(alpha);
  const sin2A = Math.sin(alpha) ** 2;
  const peak = cosA / (1 - sin2A); // K(0, alpha); grows without bound as alpha -> pi/2

  const points = useMemo(() => {
    const kernel = (xi: number) => (cosA * Math.cosh(xi)) / (Math.cosh(xi) ** 2 - sin2A);
    const pts: string[] = [];
    const yMax = Math.min(peak, 14); // cap the plotted height; slider caption explains the delta-fn limit
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const xi = (t - 0.5) * 2 * xiMax;
      const x = padL + t * (W - padL - 10);
      const kRaw = kernel(xi);
      const kClamped = Math.min(kRaw, yMax);
      const y = H - padB - (kClamped / yMax) * (H - padB - padT);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [cosA, sin2A, peak]);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-sm">
        <line x1={padL} x2={W - 10} y1={H - padB} y2={H - padB} stroke="var(--line)" strokeWidth={1} />
        <line x1={(padL + W - 10) / 2} x2={(padL + W - 10) / 2} y1={padT} y2={H - padB} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 3" />
        <polyline points={points} fill="none" stroke="var(--violet)" strokeWidth={2.4} strokeLinecap="round" />
        <text x={(padL + W - 10) / 2} y={H - 3} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          ξ = 0
        </text>
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
        <span className="text-ink-soft">K(0,α) = {peak > 14 ? "≫14 (→∞)" : peak.toFixed(2)}</span>
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        The exact kernel from eq. (15): K(ξ,α) = cosα·cosh(ξ) / [cosh²(ξ) − sin²α]. At α=0 it&apos;s the
        ordinary Hermitian 1/cosh(ξ). Drag toward π/2 and the peak at ξ=0 grows without bound while the
        wings shrink — the honest πδ(ξ) limit the paper states, not an approximation of it.
      </p>
    </div>
  );
}
