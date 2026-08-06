// The impurity as a "line defect" cutting through a bulk CFT plane — a new
// geometric metaphor (a plane with a perpendicular line through it), distinct
// from the node-and-arrow diagram used one concept earlier.
export function ChiralDefectPlane() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 160" className="h-auto w-full max-w-sm" role="img" aria-label="A dashed defect line running through a shaded CFT plane">
        <rect x={10} y={22} width={240} height={108} rx={8} fill="var(--violet)" opacity={0.08} />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={10 + i * 34} y1={22} x2={10 + i * 34} y2={130} stroke="var(--violet)" strokeWidth={0.6} opacity={0.15} />
        ))}
        <line x1={130} y1={12} x2={130} y2={138} stroke="var(--ember)" strokeWidth={2.5} strokeDasharray="5 4" />
        <circle cx={130} cy={76} r={4} fill="var(--ember)" />
        <text x={130} y={150} textAnchor="middle" fontSize="10" fontWeight={600} fill="var(--ember)">
          defect (the impurity)
        </text>
        <text x={130} y={10} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          SU(2)ₙ WZW CFT (the bulk)
        </text>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        The conduction electrons themselves form an SU(2)ₙ Wess–Zumino–Witten CFT — an exactly solvable field
        theory. The impurity is a one-dimensional &ldquo;line defect&rdquo; cutting through it; its own RG flow
        is what this whole paper studies.
      </p>
    </div>
  );
}
