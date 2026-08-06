import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ConcisePageData } from "@/lib/pages-data";
import { DepthBadge, TermChips } from "./PageChrome";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

export function ConcisePageView({ data }: { data: ConcisePageData }) {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            {data.whatsHere}
          </p>
          <DepthBadge depth="concise" />
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="rounded-xl border border-line bg-paper-raised p-5">
          <p className="text-sm leading-relaxed text-ink">{data.summary}</p>
        </div>
      </Reveal>

      <Reveal delay={180}>
        <TermChips terms={data.terms} />
      </Reveal>

      <Reveal delay={240}>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Go deeper (interactive)
          </p>
          <div className="flex flex-wrap gap-2">
            {data.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-violet hover:text-violet-strong"
              >
                {r.label} <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName={`Page ${data.num}`}
          prompt={`The reader is looking at page ${data.num} of the paper, which covers: ${data.whatsHere}. Explain this page's content at the requested depth level, staying grounded in exactly what's on this page.`}
        />
      </Reveal>
    </div>
  );
}
