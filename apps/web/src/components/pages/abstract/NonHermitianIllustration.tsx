// Generated illustration: what "non-Hermitian" physically means here — the
// system exchanges energy with something outside itself (gain at one
// impurity, loss at the other), unlike a closed, energy-conserving quantum
// system. Distinct from the parity/time-reversal diagram used elsewhere.
export function NonHermitianIllustration() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 300 160" className="h-auto w-full max-w-sm" role="img" aria-label="Diagram showing energy gain flowing into impurity 1 and energy loss flowing out of impurity 2">
        <line x1={20} y1={80} x2={280} y2={80} stroke="var(--line)" strokeWidth={10} opacity={0.4} strokeLinecap="round" />

        {/* impurity 1: gain */}
        <circle cx={80} cy={80} r={11} fill="var(--ember)" />
        <text x={80} y={116} textAnchor="middle" fontSize="12" fontWeight={600} fill="var(--ink)">
          S₁
        </text>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${40 - i * 10} ${40 - i * 6} L ${72 - i * 4} ${72 - i * 4}`}
            stroke="var(--ember)"
            strokeWidth={1.6}
            opacity={0.55 - i * 0.12}
            markerEnd="url(#gain-arrow)"
          />
        ))}
        <text x={45} y={28} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ember)">
          energy in (gain)
        </text>

        {/* impurity 2: loss */}
        <circle cx={220} cy={80} r={11} fill="var(--violet)" />
        <text x={220} y={116} textAnchor="middle" fontSize="12" fontWeight={600} fill="var(--ink)">
          S₂
        </text>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${228 + i * 4} ${88 + i * 4} L ${260 + i * 10} ${120 - i * 6}`}
            stroke="var(--violet)"
            strokeWidth={1.6}
            opacity={0.55 - i * 0.12}
            markerEnd="url(#loss-arrow)"
          />
        ))}
        <text x={255} y={140} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          energy out (loss)
        </text>

        <defs>
          <marker id="gain-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ember)" />
          </marker>
          <marker id="loss-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--violet)" />
          </marker>
        </defs>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        A <strong className="text-ink">closed</strong> quantum system conserves its total energy — that&apos;s
        what &ldquo;Hermitian&rdquo; means. This model is deliberately <strong className="text-ink">open</strong>:
        one impurity effectively gains energy from something outside the model, the other loses it. Balanced
        exactly right (λ and λ* conjugate), the two cancel enough that the physics stays consistent — but the
        Hamiltonian itself is no longer Hermitian.
      </p>
    </div>
  );
}
