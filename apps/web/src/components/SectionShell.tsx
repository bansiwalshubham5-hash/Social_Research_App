import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function SectionShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-8 md:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={13} /> Back to overview
      </Link>
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">{eyebrow}</p>
      <h1 className="mt-1 font-serif text-2xl font-semibold text-ink text-balance md:text-3xl">
        {title}
      </h1>
      <div className="mt-8 flex flex-col gap-8">{children}</div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-ink-soft">{children}</div>;
}
