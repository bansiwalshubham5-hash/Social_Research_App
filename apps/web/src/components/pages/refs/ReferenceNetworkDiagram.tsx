"use client";

import { useState } from "react";

// A radial network — the paper at the center, spokes out to the six reference
// groups sized by how many citations each contributes. The one generated
// image on this page, and a genuinely new widget type: nothing else on the
// site is a node-and-spoke diagram.
const NODES = [
  { key: "foundations", label: "Foundations", n: 4, color: "var(--violet)", angle: -90 },
  { key: "cft", label: "CFT & g-theorem", n: 5, color: "var(--ember)", angle: -30 },
  { key: "nonhermitian", label: "Non-Herm. Kondo", n: 7, color: "#0ea5a5", angle: 30 },
  { key: "landscape", label: "NH landscape", n: 6, color: "var(--violet)", angle: 90 },
  { key: "methods", label: "TBA methods", n: 6, color: "var(--ember)", angle: 150 },
  { key: "experiment", label: "Experiment", n: 2, color: "#0ea5a5", angle: -150 },
];

export function ReferenceNetworkDiagram() {
  const [hover, setHover] = useState<string | null>(null);
  const cx = 150;
  const cy = 130;
  const R = 90;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 300 260" className="h-auto w-full max-w-md">
        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + R * Math.cos(rad);
          const y = cy + R * Math.sin(rad);
          const active = hover === node.key;
          return (
            <g key={node.key}>
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={node.color}
                strokeWidth={active ? 2.5 : 1.2}
                opacity={active ? 0.9 : 0.4}
              />
            </g>
          );
        })}
        {NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + R * Math.cos(rad);
          const y = cy + R * Math.sin(rad);
          const r = 8 + node.n * 1.6;
          const active = hover === node.key;
          return (
            <g
              key={node.key}
              onMouseEnter={() => setHover(node.key)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setHover(active ? null : node.key)}
              style={{ cursor: "pointer" }}
            >
              <circle cx={x} cy={y} r={r} fill={node.color} opacity={active ? 1 : 0.75} />
              <text x={x} y={y + 3} textAnchor="middle" fontSize="10" fontWeight={700} fill="white">
                {node.n}
              </text>
              <text
                x={x}
                y={y + r + 12}
                textAnchor="middle"
                fontSize="9"
                fontWeight={active ? 700 : 500}
                fill={active ? node.color : "var(--ink-soft)"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={22} fill="var(--paper)" stroke="var(--line)" strokeWidth={1.5} />
        <text x={cx} y={cy - 3} textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--ink)">
          this
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fontWeight={700} fill="var(--ink)">
          paper
        </text>
      </svg>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">
        30 references, six roles, one center. Node size = reference count. Tap or hover a node — the
        largest, non-Hermitian Kondo predecessors (7 refs), is this paper&apos;s most direct lineage; the
        smallest, experimental confirmations (2 refs), is what makes the fractional-entropy prediction in
        concept 2 (page 5) more than theory.
      </p>
    </div>
  );
}
