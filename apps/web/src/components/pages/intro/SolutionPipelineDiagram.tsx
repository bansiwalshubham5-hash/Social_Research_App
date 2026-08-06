// A horizontal pipeline/flowchart — a new layout entirely (a scrollable row
// of connected stages), for a sentence that's describing a method's steps
// rather than a single physical mechanism. The connecting arrows animate via
// stroke-dashoffset, a different animation technique from every other widget
// on this page (none of which use marching dashes).
const STEPS = [
  { label: "Hamiltonian", color: "var(--violet)" },
  { label: "Bethe Ansatz", color: "var(--ember)" },
  { label: "Generalized TBA", color: "#0ea5a5" },
  { label: "Defect free energy", color: "var(--violet)" },
  { label: "g-function", color: "var(--ember)" },
];

export function SolutionPipelineDiagram() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex shrink-0 items-center gap-1">
            <span
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium"
              style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)`, color: s.color }}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <svg width="20" height="10" viewBox="0 0 20 10" className="shrink-0">
                <line
                  x1="1"
                  y1="5"
                  x2="15"
                  y2="5"
                  stroke="var(--ink-soft)"
                  strokeWidth="1.4"
                  strokeDasharray="3 2"
                  style={{ animation: "pipeline-dash 1.2s linear infinite" }}
                />
                <path d="M13,2 L18,5 L13,8 Z" fill="var(--ink-soft)" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pipeline-dash { to { stroke-dashoffset: -10; } }
      `}</style>
      <p className="text-xs leading-relaxed text-ink-soft">
        Five steps, all exact — no approximation at any stage. Every curve on this platform is the last box,
        evaluated numerically.
      </p>
    </div>
  );
}
