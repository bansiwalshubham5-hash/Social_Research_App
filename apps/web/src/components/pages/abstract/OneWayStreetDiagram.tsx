"use client";

import { useState } from "react";

// The g-theorem, drawn as a street sign — one-way in the Kondo phase, and
// (page 1's whole point) not always one-way once multiple towers appear. A
// new "sign / traffic" metaphor image, deliberately simple: this concept
// gets no other widget on the page, and it's the one place on the whole
// site meant to work for a reader with zero physics background too.
export function OneWayStreetDiagram() {
  const [twoWay, setTwoWay] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 110" className="h-auto w-full max-w-sm">
        <rect x={10} y={40} width={240} height={30} fill="var(--line-soft)" />
        <line x1={10} y1={55} x2={250} y2={55} stroke="var(--paper-raised)" strokeWidth={2} strokeDasharray="10 8" />
        <polygon points="215,50 235,55 215,60" fill={twoWay ? "var(--ink-soft)" : "var(--violet)"} />
        {twoWay && <polygon points="45,50 25,55 45,60" fill="var(--ember)" />}
        <text x={130} y={25} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--ink)">
          entropy, as you cool the system
        </text>
        <text x={20} y={95} fontSize="9" fill="var(--ink-soft)">
          hot (start)
        </text>
        <text x={200} y={95} fontSize="9" fill="var(--ink-soft)">
          cold (end)
        </text>
      </svg>
      <div className="flex gap-2">
        <button
          onClick={() => setTwoWay(false)}
          className="rounded-full px-3 py-1.5 text-xs font-medium"
          style={!twoWay ? { background: "var(--violet)", color: "#fff" } : { background: "var(--line-soft)", color: "var(--ink-soft)" }}
        >
          single tower (Kondo)
        </button>
        <button
          onClick={() => setTwoWay(true)}
          className="rounded-full px-3 py-1.5 text-xs font-medium"
          style={twoWay ? { background: "var(--ember)", color: "#fff" } : { background: "var(--line-soft)", color: "var(--ink-soft)" }}
        >
          multiple towers
        </button>
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        Picture the entropy&apos;s value as a car driving down a street as the system cools. The
        g&#8209;theorem is a claim that it&apos;s a one-way street — the car only ever moves toward the
        cold end, never backtracks. In the plain Kondo phase (single tower) that holds. Once impurity
        strings split the spectrum into several towers, this paper shows the street can quietly become
        two-way — the entropy can double back before continuing on.
      </p>
    </div>
  );
}
