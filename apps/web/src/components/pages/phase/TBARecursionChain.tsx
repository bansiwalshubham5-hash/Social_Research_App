"use client";

import { useState } from "react";

// A bidirectional recursion chain — each η_p node links only to its
// immediate neighbors, both directions. Deliberately different from
// SolutionPipelineDiagram's one-way, five-stage flow: this is a coupled
// recursive structure, not a sequence of distinct steps, and clicking a
// node highlights exactly which neighbors feed into it.
const NODES = ["η_{p-1}", "η_p", "η_{p+1}"];

export function TBARecursionChain() {
  const [active, setActive] = useState(1);
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex items-center gap-1">
        {NODES.map((label, i) => (
          <div key={label} className="flex items-center gap-1">
            <button
              onClick={() => setActive(i)}
              className="rounded-lg border-2 px-3 py-2 font-mono text-xs font-semibold transition"
              style={{
                borderColor: i === active ? "var(--violet)" : "var(--line)",
                background: i === active ? "var(--violet-soft)" : "transparent",
                color: i === active ? "var(--violet-strong)" : "var(--ink-soft)",
              }}
            >
              {label}
            </button>
            {i < NODES.length - 1 && (
              <svg width="28" height="16" viewBox="0 0 28 16">
                <path d="M2,5 L26,5" stroke="var(--ink-soft)" strokeWidth={1.3} markerEnd="url(#chain-r)" opacity={Math.abs(active - i) <= 1 && Math.abs(active - (i + 1)) <= 1 ? 0.9 : 0.25} />
                <path d="M26,11 L2,11" stroke="var(--ink-soft)" strokeWidth={1.3} markerEnd="url(#chain-l)" opacity={Math.abs(active - i) <= 1 && Math.abs(active - (i + 1)) <= 1 ? 0.9 : 0.25} />
                <defs>
                  <marker id="chain-r" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="var(--ink-soft)" /></marker>
                  <marker id="chain-l" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="var(--ink-soft)" /></marker>
                </defs>
              </svg>
            )}
          </div>
        ))}
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        {active === 1
          ? "Click a neighbor. Right now: η_p's own equation depends only on η_{p-1} and η_{p+1} — never on itself directly, and never on any tower further away. That locality is what makes eq. (9) solvable by iteration."
          : "The whole TBA hierarchy is built from exactly this pattern, repeated for every p: each tower only talks to its immediate neighbors."}
      </p>
    </div>
  );
}
