export interface ProofCard {
  kind: "axiom" | "step";
  n: number; // 1-indexed within its kind
  title: string;
  equation: string;
  equationLabel?: string; // e.g. "eq. (22)"
  explanation: string;
}

// The complete derivation from the paper's End Matter ("Derivation of Bethe
// Ansatz Equations"), restructured explicitly as postulates (axioms) followed
// by the chain of consequences that follows from them — nothing here is
// invented; every equation and its number is real, lifted directly from the
// paper (arXiv:2608.04083).
export const AXIOMS: ProofCard[] = [
  {
    kind: "axiom",
    n: 1,
    title: "Two-body factorized scattering",
    equationLabel: "eq. (22)–(23)",
    equation: "S^{j0₁} = (I − ice^{iφ}P)/(1 − ice^{iφ})      S^{j0₂} = (I − ice^{−iφ}P)/(1 − ice^{−iφ})",
    explanation:
      "Postulate (quantum inverse scattering): when a conduction electron scatters off an impurity in isolation, the process is captured by a single S-matrix acting on their combined spin space. P permutes the two spins; c and φ package the coupling λ = |λ|e^{iφ}. Impurity 2's S-matrix uses the complex-conjugate phase, exactly as its coupling λ* in the Hamiltonian demands — the PT symmetry is already visible here, before any calculation.",
  },
  {
    kind: "axiom",
    n: 2,
    title: "Single-valuedness around the ring",
    equationLabel: "eq. (24)",
    equation: "(S^{jj−1}⋯S^{J0₁}⋯S^{j1}S^{jN}⋯S^{J0₂}⋯S^{jj+1}) e^{ik_jL} = 1",
    explanation:
      "Postulate (periodicity): the many-electron wavefunction must return to itself after any one electron travels once around the ring of circumference L, scattering elastically off every other electron (electron–electron scattering is simply the permutation S^{ij}=P) and both impurities along the way. This single physical requirement is what turns a collection of individual two-body scattering events into one connected algebraic system.",
  },
  {
    kind: "axiom",
    n: 3,
    title: "An integrable family of S-matrices",
    equationLabel: "eq. (25)–(26)",
    equation:
      "S(u) = (uI + icP)/(u + ic)      S^{kj}(u−v)S^{ki}(u)S^{ji}(v) = S^{ji}(v)S^{ki}(u)S^{kj}(u−v)",
    explanation:
      "Postulate: introduce a continuous spectral parameter u and build a single S-matrix S(u) that reproduces every physical scattering event above at specific values (u=1 for electron–electron, u=0 for impurity 1, u=1−e^{2iφ} for impurity 2), then require it to satisfy the Yang–Baxter equation — the defining consistency condition for any exactly solvable, factorized-scattering theory: three particles scattering pairwise must give the same answer regardless of the order. Everything from here on is a proven consequence of these three postulates holding for this specific model — not a further assumption.",
  },
];

export const PROOF_STEPS: ProofCard[] = [
  {
    kind: "step",
    n: 1,
    title: "The monodromy matrix",
    equationLabel: "eq. (27)",
    equation: "Ξ(u) = ∏_{y=1}^{N} S^{ya}(u − u_y)",
    explanation:
      "Introduce one fictitious \"auxiliary\" particle and scatter it through every real particle in the system in turn, multiplying the results together. Ξ(u) packages the entire periodicity condition from Axiom 2 into a single operator-valued object.",
  },
  {
    kind: "step",
    n: 2,
    title: "The transfer matrix",
    equationLabel: "eq. (28)",
    equation: "T(u) ≡ Tr_a Ξ(u) = S^{jj−1}(u−u_{j−1}) ⋯ S^{j1}(u−u_1) S^{jN}(u−u_N) ⋯ S^{jj+1}(u−u_{j+1})",
    explanation:
      "Trace the monodromy matrix over the auxiliary space. This produces a single operator T(u) that, evaluated at different u, will turn out to encode infinitely many mutually-commuting conserved quantities — the algebraic signature of exact solvability.",
  },
  {
    kind: "step",
    n: 3,
    title: "The R-matrix",
    equationLabel: "eq. (29)",
    equation: "R = S(u−v)P = [(u−v)P + icI] / [(u−v) + ic]",
    explanation:
      "Repackage S(u−v) with an extra permutation. This is purely bookkeeping — it lets the Yang–Baxter equation from Axiom 3 be rewritten in the standard \"RTT\" form used throughout integrable systems.",
  },
  {
    kind: "step",
    n: 4,
    title: "Yang–Baxter, rewritten as an RTT relation",
    equationLabel: "eq. (30)",
    equation: "R^{s,t}_{p,w} S(u)^{d,q}_{a,s} S(v)^{b,z}_{d,t} = S(v)^{c,s'}_{a,p} S(u)^{b,t'}_{c,w} R^{q,z}_{s',t'}",
    explanation:
      "Axiom 3's Yang–Baxter equation, expressed using the R-matrix from Step 3. This is exactly the same statement as eq. (26) — just written in the index notation needed for the next step.",
  },
  {
    kind: "step",
    n: 5,
    title: "Lifting RTT to the monodromy matrix",
    equationLabel: "eq. (31)–(32)",
    equation: "R^{s,t}_{p,w} Ξ(u)^{q}_{s} Ξ(v)^{z}_{t} = Ξ(v)^{s'}_{p} Ξ(u)^{t'}_{w} R^{q,z}_{s',t'}",
    explanation:
      "Because the monodromy matrix Ξ(u) is just a product of copies of S(u) (Step 1), repeated application of the RTT relation shows the exact same relation holds for Ξ itself — the algebra propagates from two particles to all N of them.",
  },
  {
    kind: "step",
    n: 6,
    title: "Proving integrability",
    equationLabel: "eq. (33)",
    equation: "[T(u), T(v)] = 0",
    explanation:
      "Trace the relation from Step 5 over the auxiliary space; the R-matrices on both sides are invertible and cancel, leaving T(u) and T(v) commuting for every u and v. This is the actual, rigorous proof that the model is exactly solvable — an infinite tower of conserved quantities. Everything after this is \"just\" diagonalizing T(u).",
  },
  {
    kind: "step",
    n: 7,
    title: "Diagonalizing T(u): the raw Bethe equations (one channel)",
    equationLabel: "eq. (34)–(35)",
    equation:
      "e^{ik_jL} = ∏_{γ=1}^{M} (Λᵧ−1+ice^{iφ}/2)/(Λᵧ−1−ice^{iφ}/2)   ·   −∏_{δ=1}^{M} (Λδ−Λᵧ+ice^{iφ})/(Λδ−Λᵧ−ice^{iφ}) = (…)^{Ne}(…)(…)",
    explanation:
      "The algebraic Bethe Ansatz diagonalizes T(u) directly in terms of the bare parameters c and φ, producing two coupled equations for the rapidities Λᵧ: a quantization condition for each electron's momentum k_j, and a condition on how the Λᵧ scatter off each other and off both impurities.",
  },
  {
    kind: "step",
    n: 8,
    title: "A symmetric change of variable",
    equationLabel: "eq. (36)–(37)",
    equation:
      "e^{ik_jL} = ∏ (Λᵧ−1+ic/2)/(Λᵧ−1−ic/2)   ·   ∏_{δ≠γ} (Λδ−Λᵧ+ic)/(Λδ−Λᵧ−ic) = (Λᵧ−1−ic/2 ⁄ Λᵧ−1+ic/2)^{Ne}(…)(…)",
    explanation:
      "Substituting Λᵧ → e^{iφ}(Λᵧ−1)+1 removes the asymmetric phase factors from Step 7 and (after the δ=γ term cancels a stray minus sign) gives this cleaner, symmetric one-channel form — the standard shape of Bethe equations for a Kondo-type impurity problem.",
  },
  {
    kind: "step",
    n: 9,
    title: "Generalizing to n channels — the final equations",
    equationLabel: "eq. (38)–(39)",
    equation:
      "e^{ik_jL} = ∏_{γ=1}^{M} (Λᵧ−1+icn/2)/(Λᵧ−1−icn/2)   ·   ∏_{δ≠γ} (Λδ−Λᵧ+ic)/(Λδ−Λᵧ−ic) = (Λᵧ−1−icn/2 ⁄ Λᵧ−1+icn/2)^{Ne}(…)(…)",
    explanation:
      "Invoking the dynamical-fusion construction (Andrei & Destri, 1984) extends the one-channel result to general n by replacing c → cn in the impurity-driving term. These two equations are exactly what this platform solves numerically — via the thermodynamic Bethe Ansatz hierarchy, eq. (9) — to produce every curve in the Simulation section.",
  },
];

export const FULL_PROOF: ProofCard[] = [...AXIOMS, ...PROOF_STEPS];

export interface PaperEquation {
  num: string; // "1", "21a", etc.
  name: string;
  equation: string;
  section: string;
}

// Every numbered/labeled equation in the paper, in the order it appears —
// main text (1)-(21) followed by the End Matter derivation (22)-(39).
export const ALL_EQUATIONS: PaperEquation[] = [
  { num: "1", name: "The Hamiltonian", equation: "H = −iv_F Σ∫dx ψ†∂ₓψ + λS₁·J(x₁) + λ*S₂·J(x₂)", section: "Setup" },
  { num: "2", name: "Bethe Ansatz equations (headline result)", equation: "e^{ik_jL} = ∏ (Λᵧ−1+icn/2)/(Λᵧ−1−icn/2)", section: "Setup" },
  { num: "3", name: "Rapidity equations", equation: "∏_{δ≠γ} (Λδ−Λᵧ+ic)/(Λδ−Λᵧ−ic) = (…)^{Ne}(…)(…)", section: "Setup" },
  { num: "4", name: "p-string ansatz", equation: "Λ^{(p,j)} = Λ^{(p)} + ic/2 (p+1−2j)", section: "Phase diagram & string solutions" },
  { num: "5", name: "Fundamental impurity string Λ⁽¹⁾", equation: "Λ^{(1)} = 1 − cos φ + i(sin φ − c/2)", section: "Phase diagram & string solutions" },
  { num: "6", name: "Fundamental impurity string Λ⁽²⁾", equation: "Λ^{(2)} = 1 − cos φ − i(sin φ + c/2)", section: "Phase diagram & string solutions" },
  { num: "7", name: "Higher-order impurity strings", equation: "Λ^{(γ,ℓ)} = Λ^{(γ)} − icℓ", section: "Phase diagram & string solutions" },
  { num: "8", name: "Complex impurity-string energies (PT breaking)", equation: "E^{(1)} = −2T_K e^{−i(πn/2−α)}   E^{(2)} = −2T_K e^{i(πn/2−α)}", section: "Phase diagram & string solutions" },
  { num: "9", name: "TBA recursive hierarchy", equation: "ln ηₚ = −(2Dδ_{p,n}/T) tan⁻¹(e^{π(Λ−1)/c}) + Σ G ln(1+η_{p±1})", section: "Thermodynamic Bethe Ansatz" },
  { num: "10", name: "Convolution kernel", equation: "Gf(λ) = ∫dμ f(μ) / [2cosh(π(λ−μ))]", section: "Thermodynamic Bethe Ansatz" },
  { num: "11", name: "Large-p boundary condition", equation: "lim_{p→∞} {[p+1]ln(1+ηₚ) − [p]ln(1+η_{p+1})} = −h/T", section: "Thermodynamic Bethe Ansatz" },
  { num: "12", name: "Shifted-rapidity TBA equation", equation: "ln ηₚ = −2δ_{p,n}e^{ξ} + G[ln(1+η_{p+1}) + ln(1+η_{p−1})]", section: "Thermodynamic Bethe Ansatz" },
  { num: "13", name: "UV asymptotic of ηₚ", equation: "ηₚ(ξ→−∞) = (p+1)² − 1", section: "Thermodynamic Bethe Ansatz" },
  { num: "14", name: "IR asymptotic of ηₚ", equation: "ηₚ(ξ→∞) = sin²[(p+1)π/(n+2)] / sin²[π/(n+2)] − 1  (p<n),  (p+1−n)²−1  (p≥n)", section: "Thermodynamic Bethe Ansatz" },
  { num: "15", name: "Impurity free energy (Kondo phase)", equation: "F_imp = −(T/π)∫dξ [cos α · cosh(ξ+ln(T/T_K)) ln(1+η₁(ξ))] / [cosh²(ξ+ln(T/T_K)) − sin²α]", section: "Thermodynamic Bethe Ansatz" },
  { num: "16", name: "Kondo scale T_K", equation: "T_K = T₀ exp[π(1−cos φ)/c] = D exp[−(π/c)cos φ]", section: "Thermodynamic Bethe Ansatz" },
  { num: "17", name: "Two-tower free energy, F^{T1}", equation: "F^{T1}_{(2)}(T) = −(T/2π)∫dξ ln(1+η₁(ξ)) / [cosh(ξ+ln(T/T_K)) − iα]", section: "Multi-tower free energies" },
  { num: "18", name: "Two-tower free energy, F^{T2}", equation: "F^{T2}_{(1)} = F^{T1}_{(2)} − (T/2π)∫dξ ln(1+η₂(ξ)) / [cosh(ξ+ln(T/T_K)) − i(α−π/2)]", section: "Multi-tower free energies" },
  { num: "19", name: "Two-tower impurity partition function", equation: "Z_imp = (e^{−F^{T1}_{(1)}/T} + e^{−F^{T2}_{(1)}/T})(e^{−F^{T1}_{(2)}/T} + e^{−F^{T2}_{(2)}/T})", section: "Multi-tower free energies" },
  { num: "20", name: "Total impurity free energy", equation: "F_imp(T) = −T ln Z_imp(T)", section: "Multi-tower free energies" },
  { num: "21a", name: "Three-tower free energy, F^{T1}", equation: "F^{T1}_{(1)}(T) = −(T/2π)∫dξ ln(1+η_{m+1}(ξ))/[cosh(ξ+ln(T/T_K))−i(α−mπ/2)] + (T/2π)∫dξ ln(1+ηₘ(ξ))/[cosh(ξ+ln(T/T_K))−i((m+1)π/2−α)]", section: "Multi-tower free energies" },
  { num: "21b", name: "Three-tower free energy, F^{T2}", equation: "F^{T2}_{(1)}(T) = (T/2π)∫dξ ln(1+η_{m−1}(ξ))/[cosh(ξ+ln(T/T_K))−i(α−mπ/2)] − (T/2π)∫dξ ln(1+η_{m−2}(ξ))/[cosh(ξ+ln(T/T_K))−i((m+1)π/2−α)]", section: "Multi-tower free energies" },
  { num: "21c", name: "Three-tower free energy, F^{T3}", equation: "F^{T3}_{(1)}(T) = (T/2π)∫dξ ln(1+ηₘ(ξ))/[cosh(ξ+ln(T/T_K))−i((m+1)π/2−α)] + (T/2π)∫dξ ln(1+η_{m−1}(ξ))/[cosh(ξ+ln(T/T_K))−i(α−mπ/2)]", section: "Multi-tower free energies" },
  { num: "22", name: "Bare S-matrix, impurity 1", equation: "S^{j0₁} = (I − ice^{iφ}P)/(1 − ice^{iφ})", section: "End Matter — derivation" },
  { num: "23", name: "Bare S-matrix, impurity 2", equation: "S^{j0₂} = (I − ice^{−iφ}P)/(1 − ice^{−iφ})", section: "End Matter — derivation" },
  { num: "24", name: "Periodicity condition", equation: "(S^{jj−1}⋯S^{J0₁}⋯S^{j1}S^{jN}⋯S^{J0₂}⋯S^{jj+1}) e^{ik_jL} = 1", section: "End Matter — derivation" },
  { num: "25", name: "Continuous S-matrix S(u)", equation: "S(u) = (uI + icP)/(u + ic) ≡ a(u)I + b(u)P", section: "End Matter — derivation" },
  { num: "26", name: "Yang–Baxter equation", equation: "S^{kj}(u−v)S^{ki}(u)S^{ji}(v) = S^{ji}(v)S^{ki}(u)S^{kj}(u−v)", section: "End Matter — derivation" },
  { num: "27", name: "Monodromy matrix", equation: "Ξ(u) = ∏_{y=1}^{N} S^{ya}(u−u_y)", section: "End Matter — derivation" },
  { num: "28", name: "Transfer matrix", equation: "T(u) ≡ Tr_a Ξ(u)", section: "End Matter — derivation" },
  { num: "29", name: "R-matrix", equation: "R = S(u−v)P = [(u−v)P + icI]/[(u−v)+ic]", section: "End Matter — derivation" },
  { num: "30", name: "RTT relation", equation: "R^{s,t}_{p,w} S(u)^{d,q}_{a,s} S(v)^{b,z}_{d,t} = S(v)^{c,s'}_{a,p} S(u)^{b,t'}_{c,w} R^{q,z}_{s',t'}", section: "End Matter — derivation" },
  { num: "31", name: "RTT for the monodromy matrix", equation: "R^{s,t}_{p,w} Ξ(u)^{q}_{s} Ξ(v)^{z}_{t} = Ξ(v)^{s'}_{p} Ξ(u)^{t'}_{w} R^{q,z}_{s',t'}", section: "End Matter — derivation" },
  { num: "32", name: "RTT, rearranged", equation: "Ξ(u)^{q}_{s}Ξ(v)^{z}_{t} = (R^{s,t}_{p,w})^{−1} Ξ(v)^{s'}_{p}Ξ(u)^{t'}_{w}R^{q,z}_{s',t'}", section: "End Matter — derivation" },
  { num: "33", name: "Integrability", equation: "[T(u), T(v)] = 0", section: "End Matter — derivation" },
  { num: "34", name: "One-channel BAE (raw)", equation: "e^{ik_jL} = ∏ (Λᵧ−1+ice^{iφ}/2)/(Λᵧ−1−ice^{iφ}/2)", section: "End Matter — derivation" },
  { num: "35", name: "One-channel rapidity equation (raw)", equation: "−∏ (Λδ−Λᵧ+ice^{iφ})/(Λδ−Λᵧ−ice^{iφ}) = (…)^{Ne}(…)(…)", section: "End Matter — derivation" },
  { num: "36", name: "One-channel BAE (symmetrized)", equation: "e^{ik_jL} = ∏ (Λᵧ−1+ic/2)/(Λᵧ−1−ic/2)", section: "End Matter — derivation" },
  { num: "37", name: "One-channel rapidity equation (symmetrized)", equation: "∏_{δ≠γ} (Λδ−Λᵧ+ic)/(Λδ−Λᵧ−ic) = (…)^{Ne}(…)(…)", section: "End Matter — derivation" },
  { num: "38", name: "n-channel BAE (final)", equation: "e^{ik_jL} = ∏ (Λᵧ−1+icn/2)/(Λᵧ−1−icn/2)", section: "End Matter — derivation" },
  { num: "39", name: "n-channel rapidity equation (final)", equation: "∏_{δ≠γ} (Λδ−Λᵧ+ic)/(Λδ−Λᵧ−ic) = (…)^{Ne}(…)(…)", section: "End Matter — derivation" },
];
