import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PagesNav, TOTAL_PAGES } from "@/components/pages/PagesNav";
import { Page1Full } from "@/components/pages/Page1Full";
import { Page2Full } from "@/components/pages/Page2Full";
import { Page3Full } from "@/components/pages/Page3Full";
import { Page4Full } from "@/components/pages/Page4Full";
import { Page5Full } from "@/components/pages/Page5Full";
import { Page6Full } from "@/components/pages/Page6Full";
import { Page7Full } from "@/components/pages/Page7Full";
import { Page8Full } from "@/components/pages/Page8Full";

const TITLES: Record<number, string> = {
  1: "Title, Abstract & Introduction",
  2: "The RG Invariant & Phase Diagram",
  3: "The TBA Machinery & the Kondo-Phase Free Energy",
  4: "Assembling the Multi-Tower Free Energy",
  5: "Results, and the Paper's Final Claims",
  6: "Acknowledgments & References",
  7: "End Matter I — Proving Exact Solvability",
  8: "End Matter II — The Final Bethe Ansatz Equations",
};

const PAGE_COMPONENTS: Record<number, () => React.ReactElement> = {
  1: Page1Full,
  2: Page2Full,
  3: Page3Full,
  4: Page4Full,
  5: Page5Full,
  6: Page6Full,
  7: Page7Full,
  8: Page8Full,
};

export function generateStaticParams() {
  return Array.from({ length: TOTAL_PAGES }, (_, i) => ({ num: String(i + 1) }));
}

export default async function PageModeRoute({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const n = Number(num);
  if (!Number.isInteger(n) || n < 1 || n > TOTAL_PAGES) notFound();

  const title = TITLES[n];
  const PageComponent = PAGE_COMPONENTS[n];
  if (!title || !PageComponent) notFound();

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
        <PageComponent />
      </div>
    </div>
  );
}
