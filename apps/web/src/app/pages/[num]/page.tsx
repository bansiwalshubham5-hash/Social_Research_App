import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PagesNav, TOTAL_PAGES } from "@/components/pages/PagesNav";
import { Page1Full } from "@/components/pages/Page1Full";
import { Page2Full } from "@/components/pages/Page2Full";
import { ConcisePageView } from "@/components/pages/ConcisePageView";
import { CONCISE_PAGES } from "@/lib/pages-data";

const TITLES: Record<number, string> = {
  1: "Title, Abstract & Introduction",
  2: "The RG Invariant & Phase Diagram",
};

export function generateStaticParams() {
  return Array.from({ length: TOTAL_PAGES }, (_, i) => ({ num: String(i + 1) }));
}

export default async function PageModeRoute({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const n = Number(num);
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_PAGES) notFound();

  const title = TITLES[n] ?? CONCISE_PAGES[n]?.title;
  if (!title) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-8 md:px-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft hover:text-ink">
        <ArrowLeft size={13} /> Back to overview
      </Link>
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
        Pages Mode &middot; Page {n} of {TOTAL_PAGES}
      </p>
      <h1 className="mt-1 font-serif text-2xl font-semibold text-ink text-balance md:text-3xl">{title}</h1>

      <div className="mt-6">
        <PagesNav current={n} />
      </div>

      <div className="mt-8">
        {n === 1 ? <Page1Full /> : n === 2 ? <Page2Full /> : <ConcisePageView data={CONCISE_PAGES[n]} />}
      </div>
    </div>
  );
}
