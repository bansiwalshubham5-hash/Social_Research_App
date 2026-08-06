// An RG-relevance spectrum bar — a new axis entirely (operator scaling
// dimension, not temperature or alpha), showing a classical position (dashed
// ring) nudged into an actual one (solid dot) once quantum corrections count.
export function OperatorRelevanceSpectrum() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <div className="relative h-10 overflow-hidden rounded-lg">
        <div className="absolute inset-y-0 left-0 w-1/3" style={{ background: "var(--violet)", opacity: 0.18 }} />
        <div className="absolute inset-y-0 left-1/3 w-1/3" style={{ background: "var(--ink-soft)", opacity: 0.12 }} />
        <div className="absolute inset-y-0 left-2/3 w-1/3" style={{ background: "var(--ember)", opacity: 0.18 }} />
        <div className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink-soft" style={{ left: "50%" }} />
        <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: "42%", background: "var(--violet)" }} />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-ink-soft">
        <span style={{ color: "var(--violet-strong)" }}>relevant</span>
        <span>marginal</span>
        <span style={{ color: "var(--ember)" }}>irrelevant</span>
      </div>
      <p className="text-xs leading-relaxed text-ink-soft">
        Classically (dashed ring), the perturbation sits exactly on the marginal line — neither grows nor dies
        on its own. Once you account for its own effect on itself, quantum mechanically it nudges into
        &ldquo;marginally relevant&rdquo; (solid dot) — just enough to drive a genuine, slow RG flow.
      </p>
    </div>
  );
}
