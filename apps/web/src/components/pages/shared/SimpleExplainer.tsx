import type { ReactNode } from "react";

// A second, plain-language explanation track sitting next to the technical
// one — not a replacement for rigor, an addition for accessibility. Every
// concept keeps its precise Paragraph; this is the "explain it with a
// picture in your head, no jargon" version of the same idea.
interface Props {
  children: ReactNode;
  accent?: string;
}

export function SimpleExplainer({ children, accent = "var(--ember)" }: Props) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: `color-mix(in srgb, ${accent} 40%, var(--line))`, background: `color-mix(in srgb, ${accent} 6%, var(--paper-raised))` }}
    >
      <p className="text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
        In plain words
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink">{children}</p>
    </div>
  );
}
