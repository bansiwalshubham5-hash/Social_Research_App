"use client";

import { useState } from "react";

interface Token {
  text: string;
  clickable?: boolean;
  id?: string;
}

interface VarDef {
  label: string;
  definition: string;
}

const TOKENS: Token[] = [
  { text: "H = -i" },
  { text: "v_F", clickable: true, id: "vf" },
  { text: " Σ ∫dx " },
  { text: "ψ†∂ψ", clickable: true, id: "psi" },
  { text: " + " },
  { text: "λ", clickable: true, id: "lambda1" },
  { text: "S₁", clickable: true, id: "s1" },
  { text: "·" },
  { text: "J(x₁)", clickable: true, id: "jx1" },
  { text: " + " },
  { text: "λ*", clickable: true, id: "lambda2" },
  { text: "S₂", clickable: true, id: "s2" },
  { text: "·" },
  { text: "J(x₂)", clickable: true, id: "jx2" },
];

const DEFS: Record<string, VarDef> = {
  vf: {
    label: "v_F — Fermi velocity",
    definition: "Sets the speed of conduction electrons near the Fermi surface. Just an overall energy/velocity scale — it doesn't affect which phase the system is in.",
  },
  psi: {
    label: "ψ†∂ψ — free electron kinetic term",
    definition: "The standard kinetic energy of freely-moving, chiral (one-directional) conduction electrons, summed over all n channels and both spin directions. This is the \"bulk\" theory the impurities are embedded in.",
  },
  lambda1: {
    label: "λ — impurity 1's coupling",
    definition: "A complex number, λ = |λ|e^(iφ). Its magnitude sets an overall coupling strength; its phase φ is what eventually becomes the non-Hermiticity parameter α.",
  },
  s1: {
    label: "S₁ — impurity 1's spin",
    definition: "A spin-1/2 quantum operator representing the first magnetic impurity — the thing being screened (or not) by the conduction electrons.",
  },
  jx1: {
    label: "J(x₁) — electron spin current at impurity 1",
    definition: "The local SU(2)ₙ spin density of the conduction electrons, evaluated exactly at impurity 1's position. This is what S₁ actually couples to.",
  },
  lambda2: {
    label: "λ* — impurity 2's coupling",
    definition: "The complex conjugate of λ. This is the single modeling choice — pairing a coupling with its own conjugate — that makes the whole Hamiltonian PT-symmetric instead of just non-Hermitian.",
  },
  s2: {
    label: "S₂ — impurity 2's spin",
    definition: "A second, independent spin-1/2 impurity. Its own dynamics mirror impurity 1's under the PT (parity + time-reversal) transformation.",
  },
  jx2: {
    label: "J(x₂) — electron spin current at impurity 2",
    definition: "The same SU(2)ₙ current, now evaluated at impurity 2's position x₂. In the chiral formulation, the physics doesn't actually depend on where x₁, x₂ sit.",
  },
};

export function VariableExplorer() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <p className="overflow-x-auto whitespace-nowrap font-mono text-base md:text-lg">
        {TOKENS.map((t, i) =>
          t.clickable ? (
            <button
              key={i}
              onClick={() => setActive(t.id === active ? null : t.id!)}
              className={`rounded px-0.5 transition ${
                active === t.id
                  ? "bg-violet text-white"
                  : "text-ink hover:bg-violet-soft hover:text-violet-strong"
              }`}
            >
              {t.text}
            </button>
          ) : (
            <span key={i} className="text-ink-soft">
              {t.text}
            </span>
          )
        )}
      </p>
      <div className="min-h-[4.5rem] rounded-xl border border-dashed border-line bg-line-soft/50 p-3 text-sm">
        {active ? (
          <>
            <p className="font-semibold text-violet-strong">{DEFS[active].label}</p>
            <p className="mt-1 leading-relaxed text-ink-soft">{DEFS[active].definition}</p>
          </>
        ) : (
          <p className="text-ink-soft">Click any highlighted symbol above to see what it means.</p>
        )}
      </div>
    </div>
  );
}
