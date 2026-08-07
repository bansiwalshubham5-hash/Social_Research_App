"use client";

import { useState } from "react";

// A bar-style comparison of overshoot magnitude across the three alpha
// values in Fig. 4 — a new angle on data page 1 already showed as a line
// chart. This one deliberately re-reads the same figure's content through a
// completely different chart form (grouped bars, not a curve), so it earns
// its place rather than repeating page 1's image.
const DATA = [
  { alpha: "2.75π", peak: 1.9, trough: -0.35, color: "var(--violet)" },
  { alpha: "3.25π", peak: 1.35, trough: 0.1, color: "var(--ember)" },
  { alpha: "3.75π", peak: 1.15, trough: 0.35, color: "#0ea5a5" },
];

export function OvershootMagnitudeChart() {
  const [hover, setHover] = useState<number | null>(null);
  const H = 100;
  const zero = 55;
  const scale = 24;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 220 ${H}`} className="h-auto w-full max-w-sm">
        <line x1={10} y1={zero} x2={210} y2={zero} stroke="var(--line)" strokeWidth={1} />
        <text x={5} y={zero + 3} fontSize="8" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          ln4
        </text>
        {DATA.map((d, i) => {
          const x = 40 + i * 60;
          const active = hover === null || hover === i;
          return (
            <g key={d.alpha} opacity={active ? 1 : 0.3} onClick={() => setHover(hover === i ? null : i)} style={{ cursor: "pointer" }}>
              <rect x={x - 8} y={zero - d.peak * scale} width={16} height={d.peak * scale} fill={d.color} rx={2} />
              <rect x={x - 8} y={zero} width={16} height={Math.abs(d.trough) * scale} fill={d.color} opacity={0.5} rx={2} />
              <text x={x} y={H - 4} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
                α={d.alpha}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Tap a bar. The smallest α (2.75π, closest to the YSR boundary) overshoots highest and undershoots
        deepest — the swing shrinks as α climbs further into the local-moment phase, even though every curve
        starts and ends at the exact same value, ln4.
      </p>
    </div>
  );
}
