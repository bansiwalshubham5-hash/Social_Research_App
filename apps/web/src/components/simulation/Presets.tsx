"use client";

import { usePaperState } from "@/lib/paper-state";

const PRESETS = [
  { label: "Ordinary Kondo (Hermitian-like)", alpha: 0.1, n: 2 },
  { label: "Kondo phase, deep in", alpha: Math.PI / 4, n: 2 },
  { label: "Zero-mode: first undershoot", alpha: (3 * Math.PI) / 4, n: 2 },
  { label: "Zero-mode-II, 3 towers", alpha: Math.PI + 0.4, n: 4 },
  { label: "YSR — PT symmetry breaks", alpha: (3 * Math.PI) / 2, n: 2 },
  { label: "Local moment — cyclic RG", alpha: 2.4 * Math.PI, n: 2 },
];

export function Presets() {
  const { setAlpha, setN } = usePaperState();
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.label}
          onClick={() => {
            setN(p.n);
            setAlpha(p.alpha);
          }}
          className="rounded-full border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-violet hover:text-violet-strong"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
