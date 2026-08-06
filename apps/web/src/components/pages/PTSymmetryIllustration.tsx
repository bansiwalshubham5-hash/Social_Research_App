// A generated (not paper-sourced) illustration: the paper has no figure that
// visually explains what "PT-symmetric" means, so this fills that gap —
// showing parity (swap the two impurities) and time-reversal (conjugate the
// coupling) as the two operations that, combined, leave the Hamiltonian
// unchanged.
export function PTSymmetryIllustration() {
  const cx = 150;
  const cy = 130;
  const r = 78;
  const imp1 = { x: cx, y: cy - r };
  const imp2 = { x: cx, y: cy + r };

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 300 260" className="h-auto w-full max-w-xs" role="img" aria-label="Diagram of parity and time-reversal symmetry mapping impurity 1 to impurity 2">
        <ellipse cx={cx} cy={cy} rx={r} ry={r} fill="none" stroke="var(--line)" strokeWidth={10} opacity={0.5} />
        <ellipse cx={cx} cy={cy} rx={r} ry={r} fill="none" stroke="var(--violet)" strokeWidth={1.5} opacity={0.5} />

        {/* mirror line for parity */}
        <line x1={cx - r - 24} y1={cy} x2={cx + r + 24} y2={cy} stroke="var(--ink-soft)" strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />
        <text x={cx + r + 30} y={cy + 4} fontSize="10" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          P
        </text>

        {/* impurity 1 */}
        <circle cx={imp1.x} cy={imp1.y} r={9} fill="var(--violet)" />
        <text x={imp1.x} y={imp1.y - 18} textAnchor="middle" fontSize="12" fontWeight={600} fill="var(--ink)">
          S₁
        </text>
        <text x={imp1.x + 22} y={imp1.y + 4} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--violet-strong)">
          λ
        </text>

        {/* impurity 2 */}
        <circle cx={imp2.x} cy={imp2.y} r={9} fill="var(--ember)" />
        <text x={imp2.x} y={imp2.y + 26} textAnchor="middle" fontSize="12" fontWeight={600} fill="var(--ink)">
          S₂
        </text>
        <text x={imp2.x + 22} y={imp2.y + 4} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ember)">
          λ*
        </text>

        {/* curved swap arrow, parity */}
        <path
          d={`M ${imp1.x - 20} ${imp1.y + 8} A ${r} ${r} 0 0 0 ${imp2.x - 20} ${imp2.y - 8}`}
          fill="none"
          stroke="var(--ink-soft)"
          strokeWidth={1.3}
          markerEnd="url(#arrowhead)"
          opacity={0.8}
        />
        <path
          d={`M ${imp2.x + 20} ${imp2.y - 8} A ${r} ${r} 0 0 0 ${imp1.x + 20} ${imp1.y + 8}`}
          fill="none"
          stroke="var(--ink-soft)"
          strokeWidth={1.3}
          markerEnd="url(#arrowhead)"
          opacity={0.8}
        />

        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-soft)" />
          </marker>
        </defs>

        <text x={cx} y={16} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          swap 1 ↔ 2, then complex-conjugate every coupling
        </text>
        <text x={cx} y={cy} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)" opacity={0.7}>
          H unchanged
        </text>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        <strong className="text-ink">P</strong> (parity) swaps impurity 1 and impurity 2.{" "}
        <strong className="text-ink">T</strong> (time-reversal) complex-conjugates every coupling. Neither
        operation alone leaves H unchanged — λ ≠ λ* in general — but doing <em>both together</em> maps the
        Hamiltonian exactly back to itself. That combined symmetry is what &ldquo;PT-symmetric&rdquo; means here.
      </p>
    </div>
  );
}
