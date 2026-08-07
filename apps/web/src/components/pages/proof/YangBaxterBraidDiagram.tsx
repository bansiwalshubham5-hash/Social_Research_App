// The classic Yang-Baxter braid picture — three strands, two ways to cross
// them pairwise, both landing on the same result. A new "topological
// equivalence" visual, unlike anything else on the site.
export function YangBaxterBraidDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 90 100" className="h-auto w-24">
          <line x1={15} y1={5} x2={75} y2={45} stroke="var(--violet)" strokeWidth={2} />
          <line x1={75} y1={5} x2={15} y2={45} stroke="var(--ember)" strokeWidth={2} />
          <line x1={45} y1={5} x2={45} y2={30} stroke="#0ea5a5" strokeWidth={2} />
          <line x1={15} y1={45} x2={75} y2={95} stroke="var(--ember)" strokeWidth={2} />
          <line x1={75} y1={45} x2={45} y2={70} stroke="var(--violet)" strokeWidth={2} />
          <line x1={45} y1={70} x2={15} y2={95} stroke="var(--violet)" strokeWidth={2} />
          <line x1={45} y1={30} x2={75} y2={95} stroke="#0ea5a5" strokeWidth={2} />
        </svg>
        <span className="font-mono text-lg text-ink-soft">=</span>
        <svg viewBox="0 0 90 100" className="h-auto w-24">
          <line x1={15} y1={5} x2={45} y2={30} stroke="var(--violet)" strokeWidth={2} />
          <line x1={75} y1={5} x2={45} y2={30} stroke="#0ea5a5" strokeWidth={2} />
          <line x1={45} y1={5} x2={15} y2={45} stroke="var(--ember)" strokeWidth={2} />
          <line x1={15} y1={45} x2={45} y2={70} stroke="var(--ember)" strokeWidth={2} />
          <line x1={45} y1={30} x2={75} y2={95} stroke="#0ea5a5" strokeWidth={2} />
          <line x1={45} y1={70} x2={75} y2={45} stroke="var(--violet)" strokeWidth={2} />
          <line x1={75} y1={45} x2={15} y2={95} stroke="var(--violet)" strokeWidth={2} />
          <line x1={45} y1={70} x2={15} y2={95} stroke="var(--ember)" strokeWidth={2} />
        </svg>
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Three particles, scattering pairwise in two different orders. Yang-Baxter says the final result must
        be identical either way — S_kj(u−v)S_ki(u)S_ji(v) = S_ji(v)S_ki(u)S_kj(u−v). This one algebraic
        condition is what makes the whole model exactly solvable.
      </p>
    </div>
  );
}
