"use client";

import Link from "next/link";
import { Atom } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function PaperHeader() {
  return (
    <header
      className="flex min-h-12 shrink-0 items-center justify-between gap-3 border-b border-line bg-paper-raised/95 px-4 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <Atom size={19} strokeWidth={1.75} className="text-violet" />
        <span className="text-sm font-semibold tracking-tight text-ink">PT-Kondo Explorer</span>
      </Link>
      <ThemeToggle />
    </header>
  );
}
