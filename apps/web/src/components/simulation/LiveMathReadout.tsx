"use client";

import { usePaperState } from "@/lib/paper-state";
import { classifyPhase, PHASE_LABEL } from "@/lib/tba";

export function LiveMathReadout() {
  const { alpha, n } = usePaperState();
  const phase = classifyPhase(alpha, n);
  const irKondo = 2 * Math.log(2 * Math.cos(Math.PI / (n + 2)));

  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border border-line bg-paper-raised p-4 font-mono text-xs sm:grid-cols-4">
      <div>
        <p className="text-ink-soft">α (current)</p>
        <p className="mt-1 text-base text-ink">{alpha.toFixed(3)}</p>
      </div>
      <div>
        <p className="text-ink-soft">n (channels)</p>
        <p className="mt-1 text-base text-ink">{n}</p>
      </div>
      <div>
        <p className="text-ink-soft">phase</p>
        <p className="mt-1 text-[13px] text-violet-strong">{PHASE_LABEL[phase]}</p>
      </div>
      <div>
        <p className="text-ink-soft">Kondo-phase IR value</p>
        <p className="mt-1 text-base text-ink">2ln[2cos(π/{n + 2})] ≈ {irKondo.toFixed(3)}</p>
      </div>
    </div>
  );
}
