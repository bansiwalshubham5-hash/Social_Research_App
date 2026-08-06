"use client";

import { useRef } from "react";
import { usePaperState } from "@/lib/paper-state";

const BANDS = [
  { key: "kondo", color: "#6d5ef0", labelFrac: 0.06 },
  { key: "zero1", color: "#2f8fdb", labelFrac: 0.22 },
  { key: "zero2", color: "#0ea5a5", labelFrac: 0.4 },
  { key: "ysr1", color: "#e0524a", labelFrac: 0.58 },
  { key: "ysr2", color: "#c23c34", labelFrac: 0.73 },
  { key: "local", color: "#e8a23d", labelFrac: 0.9 },
];

// A minimal, draggable α position indicator — distinct from both the full
// EntropyExplorer (curve + transport controls) and the phase-diagram figure.
// Just "where am I on the line", nothing else, wired to the same shared α/n
// so it stays in sync with every other control on the site.
export function PhaseNumberLine() {
  const { alpha, n, setAlpha } = usePaperState();
  const trackRef = useRef<HTMLDivElement>(null);
  const alphaMax = (n / 2 + 1) * Math.PI + Math.PI;

  function boundaries() {
    return [
      { at: Math.PI / 2, frac: (Math.PI / 2) / alphaMax },
      { at: Math.PI, frac: Math.PI / alphaMax },
      { at: (n * Math.PI) / 2, frac: (n * Math.PI) / 2 / alphaMax },
      { at: ((n + 1) * Math.PI) / 2, frac: ((n + 1) * Math.PI) / 2 / alphaMax },
      { at: (n / 2 + 1) * Math.PI, frac: ((n / 2 + 1) * Math.PI) / alphaMax },
    ];
  }

  function handlePointer(e: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setAlpha(frac * alphaMax);
  }

  const pos = Math.min(1, alpha / alphaMax);
  const bounds = boundaries();

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <div
        ref={trackRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handlePointer(e);
        }}
        onPointerMove={(e) => e.buttons === 1 && handlePointer(e)}
        className="relative h-9 cursor-pointer rounded-full"
        style={{
          background: `linear-gradient(90deg, ${BANDS[0].color} 0%, ${BANDS[0].color} ${(bounds[0].frac) * 100}%, ${BANDS[1].color} ${bounds[0].frac * 100}%, ${BANDS[1].color} ${bounds[1].frac * 100}%, ${BANDS[2].color} ${bounds[1].frac * 100}%, ${BANDS[2].color} ${bounds[2].frac * 100}%, ${BANDS[3].color} ${bounds[2].frac * 100}%, ${BANDS[3].color} ${bounds[3].frac * 100}%, ${BANDS[4].color} ${bounds[3].frac * 100}%, ${BANDS[4].color} ${bounds[4].frac * 100}%, ${BANDS[5].color} ${bounds[4].frac * 100}%, ${BANDS[5].color} 100%)`,
          opacity: 0.85,
        }}
      >
        <div
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-md"
          style={{ left: `${pos * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-ink-soft">
        <span>α = 0</span>
        <span>(n/2+1)π</span>
      </div>
      <p className="text-center font-mono text-xs text-ink">
        α = {alpha.toFixed(3)} — drag anywhere on the bar
      </p>
    </div>
  );
}
