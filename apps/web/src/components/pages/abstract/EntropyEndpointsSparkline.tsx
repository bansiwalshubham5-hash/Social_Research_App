"use client";

import { usePaperState } from "@/lib/paper-state";

// A small, focused sketch of just the two entropy endpoints — deliberately
// not the full draggable EntropyExplorer used elsewhere. This one has no
// controls at all; it exists purely to put 2ln2 and 2ln[2cos(pi/(n+2))] on
// the same picture, color-coded, reading n live from the shared state.
export function EntropyEndpointsSparkline() {
  const { n } = usePaperState();
  const uv = 2 * Math.log(2);
  const ir = 2 * Math.log(2 * Math.cos(Math.PI / (n + 2)));

  const W = 260;
  const H = 90;
  const padL = 8;
  const padR = 8;
  const yMax = uv + 0.15;
  const yToPx = (s: number) => H - 10 - (s / yMax) * (H - 24);

  const pts: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = padL + t * (W - padL - padR);
    const s = ir + (uv - ir) / (1 + Math.exp((t - 0.5) * 10));
    pts.push(`${x},${yToPx(s)}`);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        <polyline points={pts.join(" ")} fill="none" stroke="var(--ink-soft)" strokeWidth={2} opacity={0.8} />
        <circle cx={padL + 2} cy={yToPx(uv)} r={4} fill="var(--violet)" />
        <circle cx={W - padR - 2} cy={yToPx(ir)} r={4} fill="var(--ember)" />
        <text x={padL} y={yToPx(uv) - 8} fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          2ln2 (UV)
        </text>
        <text x={W - padR} y={yToPx(ir) + 16} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ember)">
          2ln[2cos(π/(n+2))] (IR)
        </text>
      </svg>
      <p className="text-center font-mono text-xs text-ink">
        n = {n} → IR value = {ir.toFixed(3)}
      </p>
    </div>
  );
}
