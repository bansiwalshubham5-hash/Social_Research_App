// A mirror-symmetric pair of labeled boxes — impurity 1's free energy on
// one side, its complex conjugate (impurity 2's) on the other. A new
// "reflection" metaphor: distinct from page 1's ComplexPlaneToggle (which
// showed points on axes) and from NonHermitianIllustration (gain/loss
// arrows) — this one is specifically about F and F* as mirror images.
export function ConjugatePairMirror() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 110" className="h-auto w-full max-w-sm">
        <line x1={130} y1={10} x2={130} y2={100} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 3" />
        <rect x={30} y={30} width={80} height={50} rx={8} fill="var(--violet-soft)" stroke="var(--violet)" strokeWidth={1.5} />
        <text x={70} y={50} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--violet-strong)">
          F₍₁₎(T)
        </text>
        <text x={70} y={66} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          impurity 1
        </text>
        <rect x={150} y={30} width={80} height={50} rx={8} fill="var(--ember-soft)" stroke="var(--ember)" strokeWidth={1.5} />
        <text x={190} y={50} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--ember)">
          F₍₂₎(T)
        </text>
        <text x={190} y={66} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ember)">
          = F₍₁₎(T)*
        </text>
        <path d="M 115 55 L 145 55" stroke="var(--ink-soft)" strokeWidth={1.3} markerEnd="url(#mirror-arrow)" markerStart="url(#mirror-arrow-start)" />
        <defs>
          <marker id="mirror-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-soft)" />
          </marker>
          <marker id="mirror-arrow-start" markerWidth="6" markerHeight="6" refX="2" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-soft)" />
          </marker>
        </defs>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        You never have to solve for impurity 2 separately. PT symmetry guarantees its free energy is just the
        complex conjugate of impurity 1&apos;s, tower by tower — half the work, for free.
      </p>
    </div>
  );
}
