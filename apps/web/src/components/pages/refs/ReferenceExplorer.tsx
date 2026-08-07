"use client";

import { useState } from "react";

interface RefItem {
  n: number;
  cite: string;
}

interface RefGroup {
  key: string;
  label: string;
  color: string;
  items: RefItem[];
}

const GROUPS: RefGroup[] = [
  {
    key: "foundations",
    label: "Foundational Kondo & Bethe Ansatz",
    color: "var(--violet)",
    items: [
      { n: 1, cite: "Wilson, \"The renormalization group: Critical phenomena and the Kondo problem,\" Rev. Mod. Phys. 47, 773 (1975)." },
      { n: 2, cite: "Andrei, Furuya & Lowenstein, \"Solution of the Kondo problem,\" Rev. Mod. Phys. 55, 331 (1983)." },
      { n: 3, cite: "Tsvelick & Wiegmann, \"Exact results in the theory of magnetic alloys,\" Adv. Phys. 32, 453 (1983)." },
      { n: 30, cite: "Andrei & Destri, \"Solution of the multichannel Kondo problem,\" Phys. Rev. Lett. 52, 364 (1984)." },
    ],
  },
  {
    key: "cft",
    label: "CFT, defects & the g-theorem",
    color: "var(--ember)",
    items: [
      { n: 4, cite: "Affleck, \"Conformal field theory approach to the Kondo effect,\" arXiv:cond-mat/9512099 (1995)." },
      { n: 5, cite: "Gaiotto, Lee & Wu, \"Integrable Kondo problems,\" JHEP 2021, 268 (2021)." },
      { n: 27, cite: "Affleck & Ludwig, \"Universal noninteger ground-state degeneracy in critical quantum systems,\" Phys. Rev. Lett. 67, 161 (1991)." },
      { n: 28, cite: "Friedan & Konechny, \"Boundary entropy of one-dimensional quantum systems at low temperature,\" Phys. Rev. Lett. 93, 030402 (2004)." },
      { n: 29, cite: "Casini, Landea & Torroba, \"The g-theorem and quantum information theory,\" JHEP 2016, 1 (2016)." },
    ],
  },
  {
    key: "nonhermitian",
    label: "Non-Hermitian Kondo predecessors",
    color: "#0ea5a5",
    items: [
      { n: 12, cite: "Nakagawa, Kawakami & Ueda, \"Non-Hermitian Kondo effect in ultracold alkaline-earth atoms,\" arXiv:1806.04039 (2018)." },
      { n: 13, cite: "Kattel, Zhakenov, Pasnoori, Azaria & Andrei, \"Dissipation driven phase transition in the non-Hermitian Kondo model,\" Phys. Rev. B 111, L201106 (2025)." },
      { n: 14, cite: "Kattel, Pasnoori, Pixley & Andrei, \"Spin chain with non-Hermitian PT-symmetric boundary couplings,\" Phys. Rev. B 111, 224407 (2025)." },
      { n: 15, cite: "Kattel, Zhakenov & Andrei, \"Monotonic impurity entropy beyond unitarity,\" arXiv:2606.28495 (2026)." },
      { n: 16, cite: "Burke & Mitchell, \"Non-Hermitian numerical renormalization group,\" Phys. Rev. Lett. 135, 206502 (2025)." },
      { n: 17, cite: "Yi et al., \"Interplay between non-Fermi liquid and non-Hermiticity,\" Phys. Rev. B 113, 165110 (2026)." },
      { n: 18, cite: "Yi et al., \"Non-Hermiticity induced universal anomalies in Kondo conductance,\" Phys. Rev. Lett. 136, 116502 (2026)." },
    ],
  },
  {
    key: "landscape",
    label: "The broader non-Hermitian criticality landscape",
    color: "var(--violet)",
    items: [
      { n: 6, cite: "Furuta, Harada, Kusuki & Tang, \"Complex conformal manifolds,\" arXiv:2606.30720 (2026)." },
      { n: 7, cite: "Tang, Wei & Wen, \"Exactly solvable non-unitary conformal interfaces in unitary CFTs,\" arXiv:2606.32035 (2026)." },
      { n: 8, cite: "Liu, Shimizu, Liu & Kawabata, \"Extracting boundary conformal data from periodic non-Hermitian critical chains\" (2026)." },
      { n: 9, cite: "Sinha, Tavares, Saleur & Roy, \"Lattice topological defects in non-unitary conformal field theories,\" arXiv:2604.25999 (2026)." },
      { n: 10, cite: "Maeda, Nakamura & Takayanagi, \"Holographic dual of PT symmetric BCFT\" (2026)." },
      { n: 11, cite: "Castro-Alvaredo, Doyon & Ravanini, \"Irreversibility of the renormalization group flow in non-unitary quantum field theory,\" J. Phys. A 50, 424002 (2017)." },
    ],
  },
  {
    key: "methods",
    label: "Integrability & TBA methods",
    color: "var(--ember)",
    items: [
      { n: 19, cite: "Andrei, \"Diagonalization of the Kondo Hamiltonian,\" Phys. Rev. Lett. 45, 379 (1980)." },
      { n: 20, cite: "Yang & Yang, \"Thermodynamics of a one-dimensional system of bosons with repulsive delta-function interaction,\" J. Math. Phys. 10, 1115 (1969)." },
      { n: 21, cite: "Takahashi, \"Thermodynamics of one-dimensional solvable models\" (1999)." },
      { n: 22, cite: "Zhakenov, Kattel & Andrei, \"Thermodynamics in a split Hilbert space: quantum impurity at the edge of the Heisenberg chain,\" arXiv:2508.19334 (2025)." },
      { n: 23, cite: "Kattel, Zhakenov & Andrei, \"Thermodynamics in a split Hilbert space: quantum impurity at the edge of a 1D superconductor,\" Phys. Rev. B 113, 195155 (2026)." },
      { n: 26, cite: "Kattel, Zhakenov & Andrei, \"Multichannel Kondo effect in one-dimensional superconducting leads,\" Phys. Rev. B 113, 165130 (2026)." },
    ],
  },
  {
    key: "experiment",
    label: "Experimental confirmations",
    color: "#0ea5a5",
    items: [
      { n: 24, cite: "Child et al., \"Entropy measurement of a strongly coupled quantum dot,\" Phys. Rev. Lett. 129, 227702 (2022)." },
      { n: 25, cite: "Piquard et al., \"Experimental evidence of fractional entropy in critical Kondo systems,\" arXiv:2605.00669 (2026)." },
    ],
  },
];

export function ReferenceExplorer() {
  const [open, setOpen] = useState<string>("nonhermitian");
  return (
    <div className="flex flex-col gap-2">
      {GROUPS.map((g) => (
        <div key={g.key} className="overflow-hidden rounded-xl border border-line">
          <button
            onClick={() => setOpen(open === g.key ? "" : g.key)}
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
            style={{ background: open === g.key ? `color-mix(in srgb, ${g.color} 10%, transparent)` : "transparent" }}
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: g.color }} />
              {g.label}
            </span>
            <span className="font-mono text-[11px] text-ink-soft">{g.items.length} refs</span>
          </button>
          {open === g.key && (
            <div className="flex flex-col gap-2 border-t border-line px-4 py-3">
              {g.items.map((it) => (
                <p key={it.n} className="text-xs leading-relaxed text-ink-soft">
                  <span className="mr-1.5 font-mono font-semibold" style={{ color: g.color }}>
                    [{it.n}]
                  </span>
                  {it.cite}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
