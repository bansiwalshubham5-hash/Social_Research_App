// Shared glossary of terms across all 8 pages of arXiv:2608.04083 — every
// difficult word a reader hits in Pages Mode should be one click away from
// a plain-language definition, per the "no sentence should remain difficult
// to understand" goal.
export interface GlossaryEntry {
  term: string;
  definition: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  impurity: {
    term: "Quantum impurity",
    definition: "A single localized quantum object (here, a magnetic spin) embedded in an otherwise uniform, extended system — like one deliberately \"wrong\" atom sitting in a metal, whose effect on its surroundings physicists study in isolation.",
  },
  rg: {
    term: "Renormalization group (RG) flow",
    definition: "The mathematical description of how a physical system's effective behavior changes as you \"zoom out\" — look at it from further away, or equivalently at lower energy/temperature. An RG \"flow\" connects a short-distance (ultraviolet) description to a long-distance (infrared) one.",
  },
  cft: {
    term: "Conformal field theory (CFT)",
    definition: "A quantum field theory that looks the same at every length scale (scale-invariant). CFTs describe the fixed points — the start and end — of RG flows, including the ones in this paper.",
  },
  wzw: {
    term: "Wess–Zumino–Witten (WZW) model",
    definition: "A specific, exactly-solvable family of conformal field theories built from a symmetry group (here SU(2), spin rotations) and an integer \"level\" n. It's the CFT that describes n free conduction-electron channels.",
  },
  ptsymmetric: {
    term: "PT-symmetric",
    definition: "Invariant under the combined operation of parity (P, a spatial reflection/swap) and time-reversal (T). A PT-symmetric non-Hermitian system can still have a fully real energy spectrum, as if it were an ordinary closed quantum system — until PT symmetry \"spontaneously breaks,\" at which point energies go complex.",
  },
  nonhermitian: {
    term: "Non-Hermitian",
    definition: "A Hamiltonian that isn't equal to its own conjugate transpose — the mathematical condition that normally guarantees real energies and conserved probability in quantum mechanics. Non-Hermitian Hamiltonians typically describe systems that exchange energy or particles with something outside the model (gain and/or loss).",
  },
  chiral: {
    term: "Chiral",
    definition: "Having a preferred direction — here, conduction electrons that only move one way past the impurities (\"forward scattering\" only), which is what keeps the model exactly solvable.",
  },
  kondo: {
    term: "Kondo effect",
    definition: "The phenomenon where conduction electrons in a metal collectively \"screen\" (cancel out) a localized magnetic impurity's spin as temperature drops, forming a many-body quantum state below a characteristic temperature T_K.",
  },
  multichannel: {
    term: "Multichannel Kondo",
    definition: "A version of the Kondo effect where the impurity couples to n independent \"channels\" (flavors) of conduction electrons rather than just one — when n is large enough, the impurity can be overscreened rather than exactly screened.",
  },
  defect: {
    term: "Defect (in CFT)",
    definition: "A localized modification to an otherwise uniform field theory — the impurity, in this paper's language, is a \"line defect\" running through the conformal field theory of the conduction electrons.",
  },
  marginal: {
    term: "Marginally relevant operator",
    definition: "A perturbation to a theory that is right at the boundary between \"dies away\" and \"grows\" under RG flow, but tips into growing when you account for its own effect on itself — this is exactly what generates the slow, logarithmic Kondo screening.",
  },
  betheansatz: {
    term: "Bethe Ansatz",
    definition: "An exact mathematical technique for solving certain many-body quantum systems by guessing (\"ansatz\") the precise mathematical form of the many-particle wavefunction, then deriving equations (\"Bethe equations\") that its parameters must satisfy.",
  },
  rapidity: {
    term: "Rapidity",
    definition: "A parameter (usually written Λ or λ) that labels a particle-like excitation's momentum/energy in a Bethe-Ansatz-solvable model — a convenient stand-in for momentum that makes the equations simpler.",
  },
  stringhypothesis: {
    term: "String hypothesis",
    definition: "The (very well-tested) assumption that, in the limit of a very large system, solutions to the Bethe equations organize into regular patterns (\"strings\") of complex rapidities sharing the same real part.",
  },
  ysr: {
    term: "Yu–Shiba–Rusinov (YSR) state",
    definition: "A bound state that forms when a magnetic impurity couples to a superconductor-like or otherwise gapped environment, at an energy inside the gap. Here it names the phase where PT symmetry is spontaneously broken.",
  },
  impuritystring: {
    term: "Impurity string",
    definition: "An extra rapidity solution introduced by the impurities themselves (as opposed to the bulk conduction electrons) — new excitation branches that only exist because of the non-Hermitian coupling.",
  },
  overscreened: {
    term: "Overscreened",
    definition: "When more conduction-electron channels are available than needed to fully cancel the impurity spin, leaving a residual, universal \"non-Fermi-liquid\" ground state rather than simple full screening.",
  },
  unscreened: {
    term: "Unscreened",
    definition: "When the impurity spin is not screened at all by the conduction electrons — it remains a free, local magnetic moment down to zero temperature.",
  },
  tba: {
    term: "Thermodynamic Bethe Ansatz (TBA)",
    definition: "An extension of the Bethe Ansatz to finite temperature: a set of coupled integral equations whose solution gives the system's free energy, entropy, and other thermodynamic quantities directly from the exact T=0 solution.",
  },
  kernel: {
    term: "Kernel function",
    definition: "In an integral equation like the TBA equations, the kernel is the function inside the integral that determines how different rapidities influence each other — here, a function that decays like 1/cosh, giving it a characteristic width.",
  },
  freeenergy: {
    term: "Impurity free energy",
    definition: "The extra contribution to the system's total free energy that comes specifically from the impurities (as opposed to the bulk conduction electrons). Differentiating it with respect to temperature gives the impurity's contribution to the entropy.",
  },
  tower: {
    term: "Excitation tower",
    definition: "A distinct \"stack\" of allowed excitation energies. When impurity strings appear, the single excitation spectrum reorganizes into two or three separate towers, each contributing its own term to the partition function.",
  },
  partitionfunction: {
    term: "Partition function",
    definition: "The sum (or integral) over all possible states of a system, weighted by their Boltzmann factor e^(-Energy/Temperature) — the central quantity of statistical mechanics, from which free energy, entropy, and everything else follows.",
  },
  gfunction: {
    term: "Affleck–Ludwig g-function",
    definition: "g(T) = e^(S_imp(T)) — a temperature-dependent generalization of the \"ground-state degeneracy\" of a boundary or defect. The g-theorem says it should decrease monotonically from UV to IR under ordinary (Hermitian) RG flow.",
  },
  gtheorem: {
    term: "g-theorem",
    definition: "A theorem (proven for Hermitian boundary/defect CFTs) stating that the Affleck-Ludwig g-function can only decrease, never increase, along an RG flow — a defect analog of the 2nd law of thermodynamics for renormalization.",
  },
  nonmonotonic: {
    term: "Nonmonotonic",
    definition: "Not simply always increasing or always decreasing — here, an entropy curve that dips below (or rises above) its eventual endpoint value before settling there, rather than moving toward it in a straight line.",
  },
  smatrix: {
    term: "S-matrix (scattering matrix)",
    definition: "The mathematical operator describing how the quantum state of a system changes when two particles (or a particle and an impurity) scatter off each other — input state in, output state out.",
  },
  yangbaxter: {
    term: "Yang–Baxter equation",
    definition: "A consistency condition on scattering: if three particles scatter pairwise in a different order, the final result must be the same either way. Satisfying it is what makes a model exactly (\"integrable\") solvable.",
  },
  monodromy: {
    term: "Monodromy matrix",
    definition: "The combined effect of scattering one auxiliary particle off every real particle in the system, one after another — the key building block used to construct a family of mutually-commuting conserved quantities.",
  },
  transfermatrix: {
    term: "Transfer matrix",
    definition: "The trace of the monodromy matrix over the auxiliary space — a single operator whose commutativity at different spectral parameters (eq. 33) proves the model has infinitely many conserved quantities, i.e. is integrable.",
  },
  spectralparameter: {
    term: "Spectral parameter",
    definition: "A continuous complex variable (u) used to build a whole family of related scattering matrices from one algebraic structure — plugging in specific values recovers the physical S-matrices for electrons and for each impurity.",
  },
} as const;

export type GlossaryKey = keyof typeof GLOSSARY;
