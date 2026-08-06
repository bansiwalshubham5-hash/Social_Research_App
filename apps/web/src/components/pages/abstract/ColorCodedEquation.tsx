interface Token {
  text: string;
  color?: string;
}

interface LegendItem {
  label: string;
  color: string;
  desc: string;
}

// A reusable "highlight the equation" display — different tokens get
// different colors, with a legend underneath explaining each color. Used for
// more than one equation on the page, but each use highlights a different
// concept, so it never feels like the same widget twice.
export function ColorCodedEquation({ tokens, legend }: { tokens: Token[]; legend: LegendItem[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
      <p className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[15px] leading-relaxed">
        {tokens.map((t, i) => (
          <span key={i} style={t.color ? { color: t.color, fontWeight: 600 } : undefined}>
            {t.text}
          </span>
        ))}
      </p>
      <div className="flex flex-col gap-1.5">
        {legend.map((l) => (
          <div key={l.label} className="flex items-start gap-2 text-xs">
            <span
              className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: l.color }}
              aria-hidden
            />
            <span className="text-ink-soft">
              <span className="font-mono font-semibold" style={{ color: l.color }}>
                {l.label}
              </span>{" "}
              — {l.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
