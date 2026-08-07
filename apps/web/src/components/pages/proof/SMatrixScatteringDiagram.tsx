// A literal scattering event — an electron line bending off an impurity
// point, picking up a phase — the most concrete possible picture of what an
// S-matrix physically is. A new "particle trajectory" visual, distinct from
// every abstract equation-display widget used so far.
export function SMatrixScatteringDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 110" className="h-auto w-full max-w-sm">
        <line x1={20} y1={80} x2={110} y2={80} stroke="var(--ink-soft)" strokeWidth={1.6} markerEnd="url(#smat-arrow)" />
        <circle cx={130} cy={80} r={7} fill="var(--ember)" />
        <text x={130} y={100} textAnchor="middle" fontSize="10" fontWeight={600} fill="var(--ember)">
          S₀₁
        </text>
        <path d="M 130 80 Q 175 55 240 30" stroke="var(--violet)" strokeWidth={1.6} fill="none" markerEnd="url(#smat-arrow)" />
        <text x={190} y={45} fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          e^(iφ), spin swap
        </text>
        <defs>
          <marker id="smat-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        S₀₁ = (I − iceⁱᵠP)/(1 − iceⁱᵠ) — an electron hits impurity 1, and either passes through unchanged
        (the I term) or swaps spin with it (the permutation P), weighted by the coupling&apos;s phase φ.
        Impurity 2&apos;s S-matrix, S₀₂, is the same formula with φ → −φ.
      </p>
    </div>
  );
}
