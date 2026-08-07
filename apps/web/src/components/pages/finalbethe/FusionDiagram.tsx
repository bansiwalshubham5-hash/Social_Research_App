"use client";

import { useState } from "react";

// n copies of the single-channel picture fusing into one n-dependent
// coupling (c → cn) — a new "stacking/fusing" visual, distinct from
// ChannelCountVisualizer (page 1, which showed n radiating channel lines
// around impurities) since this one is specifically about the algebraic
// fusion procedure collapsing n single-channel equations into one.
export function FusionDiagram() {
  const [n, setN] = useState(3);
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex items-end gap-1.5">
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="flex h-10 w-6 items-center justify-center rounded border border-line bg-line-soft text-[9px] font-mono text-ink-soft">
            c
          </div>
        ))}
        <span className="mx-2 text-ink-soft">→</span>
        <div className="flex h-10 w-14 items-center justify-center rounded border-2 border-violet bg-violet-soft text-xs font-mono font-semibold text-violet-strong">
          cn
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-soft">n =</span>
        {[1, 2, 3, 4, 5].map((v) => (
          <button key={v} onClick={() => setN(v)} className={`h-6 w-6 rounded-full text-xs font-medium ${v === n ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"}`}>
            {v}
          </button>
        ))}
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Dynamical fusion (Ref. [30]) takes the n=1 equations from concept 2 and fuses n copies of them
        together algebraically — every c in the impurity terms becomes cn, and eq. (38)-(39) fall out. This
        is exactly page 2 concept 4&apos;s equations, now with a derivation attached.
      </p>
    </div>
  );
}
