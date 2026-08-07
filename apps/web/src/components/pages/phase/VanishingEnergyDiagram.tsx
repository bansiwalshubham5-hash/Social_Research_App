// Energy markers fading toward the zero line — the local-moment phase's
// defining fact isn't a trajectory shape (already shown on page 1's cyclic
// diagram) but that every string energy vanishes. A new visual specifically
// about a value going to zero, via opacity animation rather than motion.
export function VanishingEnergyDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 220 100" className="h-auto w-64">
        <line x1={20} y1={50} x2={200} y2={50} stroke="var(--violet)" strokeWidth={2} />
        <text x={205} y={54} fontSize="9" fontWeight={600} fill="var(--violet-strong)" fontFamily="ui-monospace, monospace">
          E = 0
        </text>
        {[
          { x: 60, delay: "0s" },
          { x: 100, delay: "0.4s" },
          { x: 140, delay: "0.8s" },
        ].map((m, i) => (
          <circle
            key={i}
            cx={m.x}
            cy={20}
            r={6}
            fill="var(--ember)"
            style={{ animation: `vanish-to-zero 2.6s ease-in-out ${m.delay} infinite` }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes vanish-to-zero {
          0% { cy: 20; opacity: 1; }
          60% { cy: 50; opacity: 0.15; }
          100% { cy: 50; opacity: 0.15; }
        }
      `}</style>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Past α &gt; (n/2+1)π, both fundamental and higher-order impurity-string energies drop
        identically to zero — PT symmetry is restored, both impurities end up unscreened, and the RG
        trajectory loops back to the same weak-coupling fixed point instead of reaching a new one.
      </p>
    </div>
  );
}
