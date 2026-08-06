"use client";

import { useEffect, useRef, useState } from "react";
import { GLOSSARY, type GlossaryKey } from "@/lib/glossary";

export function GlossaryTerm({ id, children }: { id: GlossaryKey; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const entry = GLOSSARY[id];

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!entry) return <>{children}</>;

  return (
    <span ref={ref} className="relative inline">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-help border-b border-dotted border-violet-strong/60 text-inherit decoration-none hover:border-violet-strong"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-lg border border-line bg-paper-raised p-3 text-left text-xs leading-relaxed text-ink shadow-[0_1px_2px_rgba(21,20,28,0.04),0_12px_32px_-12px_rgba(21,20,28,0.16)]"
        >
          <span className="mb-1 block font-semibold text-violet-strong">{entry.term}</span>
          {entry.definition}
        </span>
      )}
    </span>
  );
}
