export function ConceptHeading({
  index,
  total,
  phrase,
  color,
}: {
  index: number;
  total: number;
  phrase: string;
  color: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="shrink-0 font-mono text-xs text-ink-soft">
        {index}/{total}
      </span>
      <h2
        className="font-serif text-xl font-semibold text-ink sm:text-2xl"
        style={{
          textDecorationLine: "underline",
          textDecorationColor: color,
          textDecorationThickness: "3px",
          textUnderlineOffset: "6px",
        }}
      >
        {phrase}
      </h2>
    </div>
  );
}
