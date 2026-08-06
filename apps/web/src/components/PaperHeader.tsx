"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Atom } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = [
  { href: "/experiment", label: "Experiment" },
  { href: "/simulation", label: "Simulation" },
  { href: "/math", label: "Mathematics" },
  { href: "/results", label: "Results" },
  { href: "/applications", label: "Applications" },
  { href: "/paper", label: "Original Paper" },
];

export function PaperHeader() {
  const pathname = usePathname();
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-paper-raised px-4 md:px-6">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Atom size={19} strokeWidth={1.75} className="text-violet" />
        <span className="hidden text-sm font-semibold tracking-tight text-ink sm:inline">
          PT-Kondo Explorer
        </span>
      </Link>

      <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
        {SECTIONS.map((s) => {
          const active = pathname === s.href;
          return (
            <Link
              key={s.href}
              href={s.href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                active
                  ? "bg-violet-soft text-violet-strong"
                  : "text-ink-soft hover:bg-line-soft hover:text-ink"
              }`}
            >
              {s.label}
            </Link>
          );
        })}
      </nav>

      <ThemeToggle />
    </header>
  );
}
