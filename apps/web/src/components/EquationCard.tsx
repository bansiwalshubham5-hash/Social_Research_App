import type { ReactNode } from "react";

export function EquationCard({
  label,
  equation,
  children,
}: {
  label: string;
  equation: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">{label}</p>
      <p className="overflow-x-auto whitespace-nowrap font-mono text-lg text-ink">{equation}</p>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}
