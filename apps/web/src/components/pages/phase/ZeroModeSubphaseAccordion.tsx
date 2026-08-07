"use client";

import { useState } from "react";

// An expandable accordion — a new interaction pattern (click to reveal
// detail, collapse the other) not used anywhere else on the site, fitting
// for two named subphases that share a header structure but differ in
// which impurity strings are actually present.
const SUBPHASES = [
  {
    key: "I",
    label: "Zero mode I",
    range: "π/2 < α < π",
    detail: "Only the two fundamental impurity strings Λ⁽¹⁾ and Λ⁽²⁾ exist — nothing higher-order yet.",
  },
  {
    key: "II",
    label: "Zero mode II",
    range: "π < α < nπ/2",
    detail: "Higher-order impurity strings Λ⁽ᵞ˒ˡ⁾ = Λ⁽ᵞ⁾ − icℓ also appear, ℓ = 1,…,p — the fundamental strings pick up an entire tower of descendants.",
  },
];

export function ZeroModeSubphaseAccordion() {
  const [open, setOpen] = useState<string>("I");
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-line bg-paper-raised p-4">
      {SUBPHASES.map((s) => (
        <div key={s.key} className="overflow-hidden rounded-lg border border-line">
          <button
            onClick={() => setOpen(open === s.key ? "" : s.key)}
            className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
            style={{ background: open === s.key ? "var(--ember-soft)" : "transparent" }}
          >
            <span className="text-sm font-semibold text-ink">{s.label}</span>
            <span className="font-mono text-[11px] text-ink-soft">{s.range}</span>
          </button>
          {open === s.key && (
            <p className="border-t border-line px-3 py-2.5 text-xs leading-relaxed text-ink-soft">
              {s.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
