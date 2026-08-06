// A tag cloud — a new, non-diagrammatic widget type, for a paragraph that's
// listing context rather than describing a single mechanism.
const TAGS = [
  { label: "complex CFTs", color: "var(--violet)" },
  { label: "non-unitary interfaces", color: "var(--ember)" },
  { label: "topological defects", color: "#0ea5a5" },
  { label: "boundary criticality", color: "var(--violet)" },
  { label: "holographic PT defects", color: "var(--ember)" },
];

export function FrameworkTagCloud() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex flex-wrap justify-center gap-2">
        {TAGS.map((t) => (
          <span
            key={t.label}
            className="rounded-full px-3 py-1.5 text-xs font-medium"
            style={{ background: `color-mix(in srgb, ${t.color} 14%, transparent)`, color: t.color }}
          >
            {t.label}
          </span>
        ))}
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        None of these ideas exist in isolation — this paper is one entry in a fast-growing map of ways to make
        quantum criticality itself non-Hermitian.
      </p>
    </div>
  );
}
