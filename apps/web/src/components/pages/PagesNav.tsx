import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TOTAL_PAGES = 8;

export function PagesNav({ current }: { current: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-paper-raised px-4 py-3">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`/pages/${p}`}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition ${
              p === current ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/pages/${Math.max(1, current - 1)}`}
          aria-disabled={current === 1}
          className={`flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium ${
            current === 1 ? "pointer-events-none opacity-40" : "text-ink-soft hover:bg-line-soft hover:text-ink"
          }`}
        >
          <ArrowLeft size={12} /> Prev
        </Link>
        <Link
          href={`/pages/${Math.min(TOTAL_PAGES, current + 1)}`}
          aria-disabled={current === TOTAL_PAGES}
          className={`flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium ${
            current === TOTAL_PAGES ? "pointer-events-none opacity-40" : "text-ink-soft hover:bg-line-soft hover:text-ink"
          }`}
        >
          Next <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

export { TOTAL_PAGES };
