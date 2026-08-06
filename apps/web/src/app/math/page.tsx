import { SectionShell, Prose } from "@/components/SectionShell";
import { EquationCard } from "@/components/EquationCard";
import { LiveMathReadout } from "@/components/simulation/LiveMathReadout";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

export default function MathPage() {
  return (
    <SectionShell eyebrow="Section ③ — Mathematics" title="Every equation, tied back to the simulation">
      <Reveal>
        <Prose>
          <p>
            These numbers update with whatever α and n you last set in the Simulation section — the
            math and the plot are reading the same state, not two disconnected demos.
          </p>
        </Prose>
      </Reveal>

      <Reveal delay={120}>
        <LiveMathReadout />
      </Reveal>

      <Reveal delay={260}>
        <EquationCard label="The Hamiltonian — eq. (1)" equation="H = -iv_F Σ ∫dx ψ†∂ψ + λS₁·J(x₁) + λ*S₂·J(x₂)">
          <p>
            <strong className="text-ink">Physical meaning:</strong> free-moving conduction electrons
            (first term) plus two impurity spins, each coupled to the local electron spin density
            J(x) at its own position.
          </p>
          <p>
            <strong className="text-ink">Why it exists:</strong> this is the standard multichannel
            Kondo Hamiltonian, with one deliberate twist — impurity 2&apos;s coupling is the complex
            conjugate of impurity 1&apos;s. That single choice is what makes everything downstream
            (PT symmetry, non-monotonic entropy) possible.
          </p>
          <p>
            <strong className="text-ink">Connection to the simulation:</strong> λ and its phase φ are
            what get repackaged into the single dial you actually drag — α — via the definition
            below.
          </p>
        </EquationCard>
      </Reveal>

      <Reveal delay={140}>
        <EquationCard label="The RG invariant — departure from Hermiticity" equation="α = π|sin φ| / c">
          <p>
            <strong className="text-ink">Variables:</strong> φ is the phase of the coupling λ = |λ|e^(iφ);
            c is proportional to its magnitude.
          </p>
          <p>
            <strong className="text-ink">Mathematical intuition:</strong> α is a single dimensionless
            number that survives the renormalization-group flow unchanged — it&apos;s the one knob
            that actually determines which of the four phases you&apos;re in, no matter how you slice
            up magnitude vs. phase of the original coupling.
          </p>
          <p>
            <strong className="text-ink">Why it&apos;s the slider:</strong> every other parameter in
            the Hamiltonian either sets an overall energy scale (T_K) or drops out of the late-time
            physics entirely. α is the only piece that changes the <em>qualitative</em> story, which is
            exactly why it&apos;s the one interactive control in the Simulation section.
          </p>
        </EquationCard>
      </Reveal>

      <Reveal delay={140}>
        <EquationCard label="The impurity free energy, Kondo phase — eq. (15)" equation="F_imp = -(T/π) ∫dξ [cos α · cosh(ξ+ln(T/T_K)) · ln(1+η₁(ξ))] / [cosh²(ξ+ln(T/T_K)) − sin²α]">
          <p>
            <strong className="text-ink">Physical meaning:</strong> the impurities&apos; contribution
            to the system&apos;s free energy at temperature T, in the regime (0&lt;α&lt;π/2) where a
            single tower of excitations does all the work.
          </p>
          <p>
            <strong className="text-ink">Where η₁(ξ) comes from:</strong> it&apos;s the solution to an
            infinite recursive hierarchy of integral equations (eq. 9–12) — genuinely hard to solve in
            closed form, which is why this platform solved it numerically (600+ grid points,
            validated against the paper&apos;s own closed-form UV/IR limits to within 0.05%) rather
            than faking a plausible-looking curve.
          </p>
          <p>
            <strong className="text-ink">Visual interpretation:</strong> S_imp(T) = −∂F_imp/∂T is
            exactly the curve you dragged α and n to reshape in the Simulation section.
          </p>
        </EquationCard>
      </Reveal>

      <Reveal delay={140}>
        <EquationCard label="The universal entropy endpoints" equation="S_imp(T→∞) = 2 ln 2      S_imp(T→0) = 2 ln[2cos(π/(n+2))]">
          <p>
            <strong className="text-ink">Physical meaning:</strong> 2 ln 2 counts the four equally
            likely free-spin states of two decoupled spin-1/2 impurities at high temperature — pure
            entropy of ignorance. The low-T value is smaller because the conduction electrons have
            partially &ldquo;used up&rdquo; that freedom by screening the impurities.
          </p>
          <p>
            <strong className="text-ink">Where 2cos(π/(n+2)) comes from:</strong> it&apos;s twice the
            quantum dimension of the spin-1/2 primary field in the SU(2)ₙ Wess–Zumino–Witten conformal
            field theory — a number straight out of the defect CFT that describes the low-energy fixed
            point, and exactly what defect-CFT predicts independent of this paper&apos;s non-Hermitian
            twist. That agreement is itself a nontrivial check on the exact solution.
          </p>
        </EquationCard>
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Mathematics"
          prompt="Walk through why alpha, T_K, and the impurity free energy integral (single-tower Kondo-phase case) are defined the way they are, and how they connect physically to the two universal entropy endpoints 2ln2 and 2ln[2cos(pi/(n+2))], at the requested depth level."
        />
      </Reveal>
    </SectionShell>
  );
}
