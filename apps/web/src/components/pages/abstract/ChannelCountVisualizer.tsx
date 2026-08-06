"use client";

import { useState } from "react";

// A new, structural simulation type — not an entropy plot at all. Pick n and
// watch n independent conduction-electron channels radiate from the ring in
// real time. Purely geometric, deliberately different from every curve-based
// widget elsewhere on this page.
export function ChannelCountVisualizer() {
  const [n, setN] = useState(3);
  const cx = 100;
  const cy = 100;
  const r = 46;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 200 200" className="h-auto w-56">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--violet)" strokeWidth={2} opacity={0.5} />
        {Array.from({ length: n }, (_, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + Math.cos(a) * r;
          const y1 = cy + Math.sin(a) * r;
          const x2 = cx + Math.cos(a) * (r + 42);
          const y2 = cy + Math.sin(a) * (r + 42);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ember)" strokeWidth={1.5} strokeDasharray="2 4" opacity={0.8} />
              <circle cx={x2} cy={y2} r={3.5} fill="var(--ember)" />
            </g>
          );
        })}
        <circle cx={cx} cy={cy - 14} r={5} fill="var(--violet)" />
        <circle cx={cx} cy={cy + 14} r={5} fill="var(--violet-strong)" />
      </svg>

      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-soft">n =</span>
        {[1, 2, 3, 4, 5, 6].map((c) => (
          <button
            key={c}
            onClick={() => setN(c)}
            className={`h-7 w-7 rounded-full text-xs font-medium transition ${
              c === n ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Each dashed line is one independent &ldquo;flavor&rdquo; of conduction electron. n=1 is the ordinary
        single-channel Kondo problem; more channels means more ways for electrons to collectively screen the
        two impurities&apos; spins.
      </p>
    </div>
  );
}
