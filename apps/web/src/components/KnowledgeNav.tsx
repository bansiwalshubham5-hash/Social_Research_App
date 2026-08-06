import Link from "next/link";
import {
  FlaskConical,
  Waves,
  Sigma,
  BarChart3,
  Lightbulb,
  FileText,
  ArrowRight,
} from "lucide-react";

const CARDS = [
  {
    href: "/experiment",
    icon: FlaskConical,
    title: "Experiment",
    blurb: "The theoretical setup — two impurities, complex-conjugate couplings, why it's PT-symmetric.",
  },
  {
    href: "/simulation",
    icon: Waves,
    title: "Simulation",
    blurb: "The full entropy explorer — presets, challenges, deeper controls.",
  },
  {
    href: "/math",
    icon: Sigma,
    title: "Mathematics",
    blurb: "Every equation, why it exists, and what it looks like when you move the sliders.",
  },
  {
    href: "/results",
    icon: BarChart3,
    title: "Results",
    blurb: "The phase diagram and the entropy-flow results, walked through.",
  },
  {
    href: "/applications",
    icon: Lightbulb,
    title: "Applications",
    blurb: "Why non-Hermitian Kondo physics is more than a mathematical curiosity.",
  },
  {
    href: "/paper",
    icon: FileText,
    title: "Original Paper",
    blurb: "The actual PDF, references, and a way back to every explanation.",
  },
];

export function KnowledgeNav() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-soft">
        Six ways into this paper
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col gap-3 rounded-2xl border border-line bg-paper-raised p-5 transition hover:border-violet hover:shadow-[0_1px_2px_rgba(21,20,28,0.04),0_12px_32px_-12px_rgba(21,20,28,0.16)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-soft text-violet-strong">
                <c.icon size={17} strokeWidth={1.75} />
              </div>
              <ArrowRight
                size={15}
                className="text-ink-soft opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </div>
            <div>
              <h3 className="font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
