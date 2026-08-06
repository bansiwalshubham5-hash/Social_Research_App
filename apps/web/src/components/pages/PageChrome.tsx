import type { ReactNode } from "react";
import { ListChecks, Eye, BookOpen } from "lucide-react";
import { GlossaryTerm } from "./GlossaryTerm";
import type { GlossaryKey } from "@/lib/glossary";

export function DepthBadge({ depth }: { depth: "full" | "concise" }) {
  return depth === "full" ? (
    <span className="rounded-full bg-violet-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-strong">
      Full depth
    </span>
  ) : (
    <span className="rounded-full bg-line-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
      Concise pass
    </span>
  );
}

export function PrereqAndObservations({
  prerequisites,
  observations,
}: {
  prerequisites: string[];
  observations: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-line bg-paper-raised p-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <BookOpen size={12} /> Prerequisite concepts
        </p>
        <ul className="flex flex-col gap-1.5 text-sm text-ink-soft">
          {prerequisites.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-violet-strong">·</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-line bg-paper-raised p-4">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <Eye size={12} /> Important observations
        </p>
        <ul className="flex flex-col gap-1.5 text-sm text-ink-soft">
          {observations.map((o) => (
            <li key={o} className="flex gap-2">
              <span className="text-violet-strong">·</span>
              {o}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TermChips({ terms }: { terms: GlossaryKey[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 text-xs text-ink-soft">
        <ListChecks size={12} /> Key terms:
      </span>
      {terms.map((t) => (
        <span key={t} className="rounded-full bg-line-soft px-2.5 py-1 text-xs text-ink">
          <GlossaryTerm id={t}>{t}</GlossaryTerm>
        </span>
      ))}
    </div>
  );
}

export function Paragraph({
  original,
  explanation,
}: {
  original: ReactNode;
  explanation: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line bg-paper-raised p-4">
      <p className="border-l-2 border-line pl-3 font-serif text-[15px] italic leading-relaxed text-ink-soft">
        {original}
      </p>
      <p className="text-sm leading-relaxed text-ink">{explanation}</p>
    </div>
  );
}
