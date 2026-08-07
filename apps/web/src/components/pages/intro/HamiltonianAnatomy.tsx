"use client";

import { useState } from "react";

// The equation, turned into a picture: a ring of flowing electrons with two
// impurity dots hanging off it. Every symbol in eq. (1) maps onto something
// drawn here, click a part to highlight which term it is. A new "annotated
// physical picture of an equation" widget — every other Hamiltonian display
// on the site is text/color only.
const TEAL = "#0ea5a5";
const PARTS = [
  { key: "kinetic", label: "kinetic term", color: TEAL, desc: "−iv_F Σ∫ψ†∂ψ — the free electrons, flowing one way around the ring at the Fermi velocity v_F." },
  { key: "imp1", label: "impurity 1", color: "var(--violet)", desc: "λ S₁·J(x₁) — impurity 1's spin coupling into the electron current, with strength λ." },
  { key: "imp2", label: "impurity 2", color: "var(--ember)", desc: "λ* S₂·J(x₂) — impurity 2's spin coupling, with strength λ* (the mirror-image coupling — concept 3)." },
];

export function HamiltonianAnatomy() {
  const [active, setActive] = useState<string>("kinetic");
  const cx = 130;
  const cy = 100;
  const R = 68;
  const impAngle1 = -0.9;
  const impAngle2 = 0.9;
  const ix1 = cx + R * Math.cos(impAngle1);
  const iy1 = cy + R * Math.sin(impAngle1);
  const ix2 = cx + R * Math.cos(impAngle2);
  const iy2 = cy + R * Math.sin(impAngle2);

  const activePart = PARTS.find((p) => p.key === active)!;

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 260 200" className="h-auto w-full max-w-sm">
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill="none"
          stroke={active === "kinetic" ? PARTS[0].color : "var(--line)"}
          strokeWidth={active === "kinetic" ? 3 : 1.5}
        />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2 + 0.3;
          const ex = cx + R * Math.cos(a);
          const ey = cy + R * Math.sin(a);
          const ex2 = cx + R * Math.cos(a + 0.15);
          const ey2 = cy + R * Math.sin(a + 0.15);
          return (
            <circle
              key={i}
              cx={active === "kinetic" ? ex2 : ex}
              cy={active === "kinetic" ? ey2 : ey}
              r={2.4}
              fill={active === "kinetic" ? PARTS[0].color : "var(--ink-soft)"}
              style={{ transition: "cx 0.6s, cy 0.6s" }}
            />
          );
        })}
        <line x1={ix1} y1={iy1} x2={ix1 - 24} y2={iy1 - 18} stroke={active === "imp1" ? PARTS[1].color : "var(--line)"} strokeWidth={active === "imp1" ? 2.5 : 1.3} />
        <circle cx={ix1 - 24} cy={iy1 - 18} r={9} fill={active === "imp1" ? PARTS[1].color : "var(--paper-raised)"} stroke={PARTS[1].color} strokeWidth={1.5} />
        <text x={ix1 - 24} y={iy1 - 32} textAnchor="middle" fontSize="9" fontWeight={600} fill={PARTS[1].color} fontFamily="ui-monospace, monospace">
          S₁
        </text>

        <line x1={ix2} y1={iy2} x2={ix2 + 24} y2={iy2 - 18} stroke={active === "imp2" ? PARTS[2].color : "var(--line)"} strokeWidth={active === "imp2" ? 2.5 : 1.3} />
        <circle cx={ix2 + 24} cy={iy2 - 18} r={9} fill={active === "imp2" ? PARTS[2].color : "var(--paper-raised)"} stroke={PARTS[2].color} strokeWidth={1.5} />
        <text x={ix2 + 24} y={iy2 - 32} textAnchor="middle" fontSize="9" fontWeight={600} fill={PARTS[2].color} fontFamily="ui-monospace, monospace">
          S₂
        </text>
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {PARTS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className="rounded-full px-3 py-1.5 text-xs font-medium"
            style={active === p.key ? { background: p.color, color: "#fff" } : { background: "var(--line-soft)", color: "var(--ink-soft)" }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="max-w-sm text-center text-xs leading-relaxed text-ink-soft">{activePart.desc}</p>
    </div>
  );
}
