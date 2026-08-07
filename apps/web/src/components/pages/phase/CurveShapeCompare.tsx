"use client";

import { useState } from "react";

// Two small inline charts side by side — a genuinely different comparison
// mechanic from CriticalVsFlowingCompare (which compared two single points,
// not two curve shapes). A toggle lets the reader flip between them to see
// exactly where the shape changes.
function miniCurve(kind: "monotonic" | "nonmonotonic") {
  const W = 120;
  const H = 70;
  const pts: string[] = [];
  const steps = 30;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 8 + t * (W - 16);
    let y: number;
    if (kind === "monotonic") {
      y = 10 + (1 - Math.exp(-t * 3)) * (H - 20);
    } else {
      const base = 1 - Math.exp(-t * 2.4);
      const wiggle = Math.sin(t * Math.PI * 2.1) * Math.exp(-t * 1.6) * 0.28;
      y = 10 + Math.min(1, Math.max(0, base + wiggle)) * (H - 20);
    }
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

export function CurveShapeCompare() {
  const [active, setActive] = useState<"monotonic" | "nonmonotonic">("monotonic");
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 120 70" className="h-auto w-28">
            <polyline
              points={miniCurve("monotonic")}
              fill="none"
              stroke={active === "monotonic" ? "var(--violet)" : "var(--line)"}
              strokeWidth={2}
            />
          </svg>
          <span className="text-[10px] font-mono text-ink-soft">Kondo (0&lt;α&lt;π/2)</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <svg viewBox="0 0 120 70" className="h-auto w-28">
            <polyline
              points={miniCurve("nonmonotonic")}
              fill="none"
              stroke={active === "nonmonotonic" ? "var(--ember)" : "var(--line)"}
              strokeWidth={2}
            />
          </svg>
          <span className="text-[10px] font-mono text-ink-soft">Zero mode (π/2&lt;α&lt;nπ/2)</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setActive("monotonic")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${active === "monotonic" ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}
        >
          Kondo
        </button>
        <button
          onClick={() => setActive("nonmonotonic")}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${active === "nonmonotonic" ? "bg-ember text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}
        >
          Zero mode
        </button>
      </div>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        {active === "monotonic"
          ? "Same start, same end point — a straight, boring slide down. This is the shape everyone already expects from a g-theorem."
          : "Same start, same end point — yet the curve wiggles on the way. Zero-energy impurity strings reorganize the spectrum mid-flow, and the g-function stops decreasing monotonically even though nothing about the endpoints changed."}
      </p>
    </div>
  );
}
