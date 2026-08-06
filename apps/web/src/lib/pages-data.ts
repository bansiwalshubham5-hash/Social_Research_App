import type { GlossaryKey } from "./glossary";

export interface ConcisePageData {
  num: number;
  title: string;
  whatsHere: string;
  summary: string;
  terms: GlossaryKey[];
  related: { href: string; label: string }[];
}

// Pages 3-8: a concise pass (real content, not fabricated, but not the full
// paragraph-by-paragraph treatment pages 1-2 get) — see docs/README.md's
// note on Pages Mode scope. Each links to the deeper, already-interactive
// treatment that exists elsewhere on the platform.
export const CONCISE_PAGES: Record<number, ConcisePageData> = {
  3: {
    num: 3,
    title: "The excitation spectrum and the TBA hierarchy",
    whatsHere: "Figure 1 (the phase diagram) and the setup of the thermodynamic Bethe Ansatz equations (9)-(14).",
    summary:
      "This page shows the phase diagram as a single visual — physical excitations organize into \"towers\" whose number and shape change across the four phases. It then sets up the thermodynamic Bethe Ansatz (TBA): a hierarchy of coupled integral equations for the density ratios η_p(Λ), closed by boundary conditions, whose T→∞ and T→0 limits are exactly the endpoints this platform's Simulation section plots live.",
    terms: ["tba", "kernel", "stringhypothesis"],
    related: [
      { href: "/results", label: "See the phase diagram, interactive" },
      { href: "/math", label: "See the entropy endpoints" },
    ],
  },
  4: {
    num: 4,
    title: "From the TBA solution to a free energy you can differentiate",
    whatsHere: "Equations (15)-(20): the impurity free energy for the Kondo and zero-mode-I phases.",
    summary:
      "Page 4 turns the TBA solution into the impurity free energy — eq. 15 for the single-tower Kondo phase (implemented exactly in this platform's Simulation section), then eq. 17-20 for the two-tower zero-mode-I phase, where each impurity's two excitation towers combine into a partition function whose logarithm gives the free energy.",
    terms: ["freeenergy", "tower", "partitionfunction"],
    related: [
      { href: "/math", label: "Walk through eq. 15, live" },
      { href: "/simulation", label: "Drive the free energy yourself" },
    ],
  },
  5: {
    num: 5,
    title: "Three towers, and the first sign of nonmonotonicity",
    whatsHere: "Figures 2-3 and equation (21): the three-tower zero-mode-II construction.",
    summary:
      "For 3 or more channels, a third excitation tower appears (zero-mode-II), and the paper's Fig. 3 shows the entropy curve visibly dip or bump between its endpoints as α grows — the central numerical observation of the whole paper, reproduced exactly (not approximated) in this platform's live plot.",
    terms: ["nonmonotonic", "tower"],
    related: [
      { href: "/simulation", label: "Watch the undershoot happen live" },
      { href: "/results", label: "Read the full walkthrough" },
    ],
  },
  6: {
    num: 6,
    title: "Where the method reaches its limit, and what's next",
    whatsHere: "The discussion, conclusion, and acknowledgments.",
    summary:
      "The paper closes by naming what it couldn't compute — the YSR phase's complex spectrum is \"beyond the scope of our thermodynamic Bethe Ansatz\" — and by conjecturing (not proving) that a generalized g-theorem survives only in the pure Kondo phase, leaving the precise boundary of RG irreversibility as, in the authors' own words, \"an important open problem.\"",
    terms: ["ysr", "gtheorem"],
    related: [
      { href: "/results", label: "See why the YSR phase is skipped" },
      { href: "/applications", label: "See why the g-theorem matters" },
    ],
  },
  7: {
    num: 7,
    title: "Proving the model is exactly solvable",
    whatsHere: "End Matter, part 1 — equations (22)-(33): the S-matrix and Yang-Baxter derivation.",
    summary:
      "The End Matter derives the model from scratch: bare electron-impurity S-matrices, a continuous S-matrix depending on a spectral parameter, the Yang-Baxter equation it must satisfy, and the monodromy/transfer-matrix construction whose mutual commutativity is the actual proof of integrability — infinitely many conserved quantities, guaranteeing the model is exactly solvable rather than merely approximately so.",
    terms: ["smatrix", "yangbaxter", "monodromy", "transfermatrix", "spectralparameter"],
    related: [{ href: "/math", label: "Play the derivation step by step" }],
  },
  8: {
    num: 8,
    title: "The final Bethe Ansatz equations, one channel at a time",
    whatsHere: "End Matter, part 2 — equations (34)-(39): the explicit Bethe Ansatz equations.",
    summary:
      "The derivation finishes by writing the single-channel Bethe Ansatz equations, then extending them to general n channels via \"dynamical fusion.\" These are the exact equations this platform numerically solves offline (scripts/tba_solve.py) to produce every curve in the Simulation section — the last link in the chain from the Hamiltonian on page 1 to the plot you dragged.",
    terms: ["betheansatz", "rapidity"],
    related: [
      { href: "/math", label: "See the full derivation chain" },
      { href: "/simulation", label: "See what these equations produce" },
    ],
  },
};
