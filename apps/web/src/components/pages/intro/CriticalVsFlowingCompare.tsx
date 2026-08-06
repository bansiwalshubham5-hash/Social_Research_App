// A static side-by-side comparison — a new layout type (two columns, not a
// single diagram or a toggle) contrasting "stays critical" against "actually
// flows," with motion itself (a pulsing dot) doing the explaining on the right.
export function CriticalVsFlowingCompare() {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex flex-col items-center gap-2 rounded-lg border border-line p-3">
        <p className="text-center text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
          Earlier non-Hermitian defects
        </p>
        <div className="flex h-16 w-16 items-center justify-center">
          <div className="h-3 w-3 rounded-full" style={{ background: "var(--ember)", opacity: 0.8 }} />
        </div>
        <p className="text-center text-[11px] leading-snug text-ink-soft">
          Stay critical — scale-invariant forever, no RG flow at all
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-line p-3">
        <p className="text-center text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
          This paper&apos;s defect
        </p>
        <div className="h-16 w-16">
          <svg viewBox="0 0 64 64" className="h-full w-full">
            <path d="M 8 32 L 56 32" stroke="var(--violet)" strokeWidth={1.4} strokeDasharray="3 4" opacity={0.5} markerEnd="url(#cvf-arrow)" />
            <circle cx={16} cy={32} r={4} fill="var(--violet)" style={{ animation: "flow-pulse-move 2.2s ease-in-out infinite" }} />
            <defs>
              <marker id="cvf-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="var(--violet)" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-[11px] leading-snug text-ink-soft">
          Actually flows — a genuine, integrable defect RG flow
        </p>
      </div>
      <style>{`
        @keyframes flow-pulse-move { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(28px); } }
      `}</style>
    </div>
  );
}
