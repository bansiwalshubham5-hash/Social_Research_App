// A single, cleanly monotonic downward curve — deliberately the "boring"
// well-behaved shape, since this concept's whole point is that the Kondo
// phase behaves exactly as classical intuition expects. The curve draws
// itself in via a stroke-dashoffset animation, a technique not used by any
// entropy widget elsewhere on the site.
export function MonotonicDecayCurve() {
  const W = 260;
  const H = 90;
  const pts: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = 10 + t * (W - 20);
    const y = 14 + (1 - Math.exp(-t * 3)) * (H - 28);
    pts.push(`${x},${y}`);
  }
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-xs">
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="var(--violet)"
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: "draw-in 2.4s ease-out forwards" }}
        />
        <circle cx={10} cy={14} r={4} fill="var(--violet)" />
        <circle cx={W - 10} cy={H - 14} r={4} fill="var(--violet-strong)" />
      </svg>
      <style>{`@keyframes draw-in { to { stroke-dashoffset: 0; } }`}</style>
      <p className="rounded-full bg-violet-soft px-3 py-1 text-xs font-medium text-violet-strong">
        ✓ measured experimentally in Hermitian Kondo systems
      </p>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        For 0 &lt; α &lt; π/2 there are no surprises: the spectrum stays real and the g-function
        decreases smoothly, exactly the textbook Kondo picture — just now proven for a two-impurity,
        non-Hermitian defect.
      </p>
    </div>
  );
}
