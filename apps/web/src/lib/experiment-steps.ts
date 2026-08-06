export interface ExperimentStep {
  title: string;
  body: string;
  vars: string[];
  eq: string;
}

export const EXPERIMENT_STEPS: ExperimentStep[] = [
  {
    title: "Place two impurities on a ring",
    body: "Two spin-1/2 magnetic impurities, S₁ and S₂, sit at fixed positions x₁ and x₂ on a ring of circumference L. The ring isn't a literal experimental apparatus — it's periodic boundary conditions, the standard trick for keeping a 1D many-body problem finite and exactly solvable.",
    vars: ["L", "S₁", "S₂", "x₁", "x₂"],
    eq: "x ∈ [0, L)   ·   S₁ at x₁,  S₂ at x₂",
  },
  {
    title: "Surround them with n channels of conduction electrons",
    body: "Instead of one \"flavor\" of itinerant electron, the ring carries n independent channels (n=1 is the ordinary single-channel Kondo problem; the paper studies general n and plots results for n=1 through 6). More channels means more ways for electrons to screen each impurity's spin — this is what a plain Hermitian Kondo problem calls overscreening.",
    vars: ["n"],
    eq: "n independent channels  J₁(x) … Jₙ(x)",
  },
  {
    title: "Couple them with complex-conjugate strengths",
    body: "Impurity 1 couples to the electron spin current via strength λ; impurity 2 couples via λ* — the complex conjugate. Individually, a complex coupling makes the Hamiltonian non-Hermitian (energies could go complex, probabilities wouldn't conserve). But pairing λ with λ* makes the whole Hamiltonian PT-symmetric: invariant under simultaneously swapping parity (impurity 1 ↔ impurity 2) and reversing time. That symmetry is what keeps the spectrum real — until it doesn't (see Applications and Results for what breaks it).",
    vars: ["λ", "λ*"],
    eq: "H_int = λ S₁·J(x₁) + λ* S₂·J(x₂)",
  },
  {
    title: "Keep only forward scattering",
    body: "The chiral formulation used here deliberately drops impurity backscattering and direct impurity-impurity interaction. That's not an approximation made for convenience — it's what makes the model exactly solvable via the Bethe Ansatz, and it's why the energies end up independent of where x₁, x₂ actually sit on the ring.",
    vars: [],
    eq: "E(λ, λ*, n)  —  independent of x₁, x₂",
  },
];
