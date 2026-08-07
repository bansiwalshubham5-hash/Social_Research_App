// A branching diagram — one comb splitting into two — a new "structural
// transition" metaphor distinct from TowerStepper (page 1, which showed
// static heights) and from the accordion/chain widgets on page 2. This one
// specifically draws the splitting event itself as a fork.
export function TowerSplitDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 240 120" className="h-auto w-64">
        <line x1={40} y1={100} x2={40} y2={55} stroke="var(--ink)" strokeWidth={2} />
        <text x={40} y={112} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          Kondo
        </text>
        <path d="M 40 55 L 150 20" stroke="var(--violet)" strokeWidth={1.6} fill="none" strokeDasharray="3 3" />
        <path d="M 40 55 L 150 55" stroke="var(--ember)" strokeWidth={1.6} fill="none" strokeDasharray="3 3" />
        <line x1={150} y1={20} x2={150} y2={-5 + 20} stroke="var(--violet)" strokeWidth={2} />
        <line x1={150} y1={55} x2={150} y2={30} stroke="var(--ember)" strokeWidth={2} />
        <text x={150} y={12} textAnchor="middle" fontSize="10" fontWeight={600} fill="var(--violet-strong)">
          𝒯1
        </text>
        <text x={150} y={70} textAnchor="middle" fontSize="10" fontWeight={600} fill="var(--ember)">
          𝒯2
        </text>
        <text x={95} y={30} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          α = π/2
        </text>
      </svg>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Cross α=π/2 and the single Kondo-phase tower forks in two: 𝒯1 keeps just the bulk p-strings, 𝒯2 adds
        the new zero-energy impurity strings on top. Each tower gets its own free-energy integral — page 4
        writes them down.
      </p>
    </div>
  );
}
