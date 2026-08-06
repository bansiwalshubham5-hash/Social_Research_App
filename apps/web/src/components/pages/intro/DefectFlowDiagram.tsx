// The oldest picture in the paper's lineage: an ordinary (Hermitian) defect
// RG flow connecting a UV fixed point to an IR one. A node-and-arrow diagram
// — a different geometric language from every widget on the abstract page.
export function DefectFlowDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 300 140" className="h-auto w-full max-w-sm" role="img" aria-label="Diagram showing an RG flow arrow connecting a UV conformal fixed point to an IR conformal fixed point">
        <circle cx={55} cy={70} r={16} fill="none" stroke="var(--ember)" strokeWidth={2.5} />
        <text x={55} y={75} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--ember)">
          UV
        </text>
        <circle cx={245} cy={70} r={16} fill="none" stroke="var(--violet)" strokeWidth={2.5} />
        <text x={245} y={75} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--violet)">
          IR
        </text>
        <path d="M 74 70 C 130 30, 170 30, 226 70" fill="none" stroke="var(--ink-soft)" strokeWidth={1.6} markerEnd="url(#flow-arrow)" />
        <defs>
          <marker id="flow-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--ink-soft)" />
          </marker>
        </defs>
        <text x={150} y={20} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          defect RG flow
        </text>
        <text x={55} y={100} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          free impurity
        </text>
        <text x={245} y={100} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          screened impurity
        </text>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        This is the oldest, most Hermitian picture there is: a defect (the impurity) connects two conformal
        fixed points — a free spin at high energy, a screened one at low energy. Everything in this paper is a
        non-Hermitian version of exactly this arrow.
      </p>
    </div>
  );
}
