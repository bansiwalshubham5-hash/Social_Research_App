import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { ColorCodedEquation } from "./abstract/ColorCodedEquation";
import { SMatrixScatteringDiagram } from "./proof/SMatrixScatteringDiagram";
import { SpectralParameterDial } from "./proof/SpectralParameterDial";
import { YangBaxterBraidDiagram } from "./proof/YangBaxterBraidDiagram";
import { MonodromyChainDiagram } from "./proof/MonodromyChainDiagram";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 6;

export function Page7Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            End Matter I — proving exact solvability, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: TEAL }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Provable<span style={{ color: TEAL }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Every equation on pages 1-5 rested on one unproven assumption: that this model is actually
            solvable by Bethe Ansatz at all. The End Matter is where that assumption gets earned. Six steps,
            starting from individual scattering events and ending with an infinite tower of quantities that
            all commute with each other — the technical definition of integrable.
          </p>
        </div>
      </Reveal>

      {/* 1 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="The bare S-matrices, eq. (22)–(23)" color={VIOLET} />
          <Paragraph
            original="Following the usual quantum inverse scattering, we compute the bare electron-impurity S-matrices. The electron scattering of one impurity gives S₀₁ = (I−iceⁱᵠP)/(1−iceⁱᵠ), and likewise, the second impurity gives S₀₂ = (I−ice⁻ⁱᵠP)/(1−ice⁻ⁱᵠ). The consistency condition requires the electron-electron S-matrix to be S_ij=P."
            explanation={
              <>
                Everything starts from the most basic possible object: what happens when one electron
                scatters off one impurity, once. An{" "}
                <GlossaryTerm id="smatrix">S-matrix</GlossaryTerm> for each impurity, differing only by the
                sign of φ — the same complex-conjugate structure that&apos;s been the throughline since page
                1.
              </>
            }
          />
          <SMatrixScatteringDiagram />
        </div>
      </Reveal>

      {/* 2 */}
      <Reveal delay={100}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={TOTAL} phrase="One function, every S-matrix: the spectral parameter, eq. (25)" color={EMBER} />
          <Paragraph
            original="We define a continuous version of the scattering matrix S(u) = [uI+icP]/[u+ic] ≡ a(u)I+b(u)P, where the parameter u is called the spectral parameter. When u=uⱼ, this reduces to the correct S-matrix if we identify uⱼ=1 for electrons and uⱼ=0 for the first impurity and uⱼ=1−e²ⁱᵠ for the second impurity."
            explanation={
              <>
                A trick that pays off repeatedly in integrable models: instead of three separate S-matrices,
                write one continuous function of a{" "}
                <GlossaryTerm id="spectralparameter">spectral parameter</GlossaryTerm> u, and recover
                concept 1&apos;s two matrices (plus the trivial electron-electron one) just by plugging in
                specific values.
              </>
            }
          />
          <SpectralParameterDial />
        </div>
      </Reveal>

      {/* 3 */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={TOTAL} phrase="The Yang-Baxter equation, eq. (26)" color={TEAL} />
          <Paragraph
            original="This S-matrix satisfies a continuous version of the Yang-Baxter relation S_kj(u−v)S_ki(u)S_ji(v) = S_ji(v)S_ki(u)S_kj(u−v)."
            explanation={
              <>
                The single algebraic condition everything else depends on. Not obvious in advance — it has
                to be checked — but once concept 2&apos;s S(u) satisfies it, the door to exact solvability is
                open. This is the{" "}
                <GlossaryTerm id="yangbaxter">Yang-Baxter equation</GlossaryTerm>.
              </>
            }
          />
          <YangBaxterBraidDiagram />
        </div>
      </Reveal>

      {/* 4 */}
      <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={TOTAL} phrase="Building the monodromy & transfer matrix, eq. (27)–(28)" color={VIOLET} />
          <Paragraph
            original="We introduce a fictitious particle in an auxiliary space and scatter it through all the particles. Finally, we define the monodromy matrix as the product of all such scattering, Ξ(u) = ∏ y=1..N S_ya(u−u_y). Taking the trace over the auxiliary space, we define the transfer matrix as T(u) ≡ Tr_a Ξ(u)."
            explanation={
              <>
                The construction that turns Yang-Baxter into a proof. Send an imaginary extra particle
                through every real one — the{" "}
                <GlossaryTerm id="monodromy">monodromy matrix</GlossaryTerm> — then trace it out to get the{" "}
                <GlossaryTerm id="transfermatrix">transfer matrix</GlossaryTerm> T(u). Step through it below.
              </>
            }
          />
          <MonodromyChainDiagram />
        </div>
      </Reveal>

      {/* 5 — R-matrix, no widget (equation only) */}
      <Reveal delay={160}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={TOTAL} phrase="The R-matrix consistency condition, eq. (29)–(32)" color={EMBER} />
          <Paragraph
            original="Introducing R matrix defined as R = S(u−v)P = [(u−v)P+icI]/[(u−v)+ic]. Eq. (26) implies R·Ξ(u)·Ξ(v) = Ξ(v)·Ξ(u)·R. Writing the above equation as Ξ(u)Ξ(v) = R⁻¹Ξ(v)Ξ(u)R."
            explanation="A bookkeeping step: repackage Yang-Baxter (concept 3) as a statement about how the whole monodromy matrix Ξ(u) reorders relative to Ξ(v), via one more matrix R. This is exactly what's needed to take the trace next."
          />
          <ColorCodedEquation
            tokens={[
              { text: "R = S(u−v)P" },
              { text: "  ⇒  " },
              { text: "Ξ(u)Ξ(v)", color: VIOLET },
              { text: " = R⁻¹" },
              { text: "Ξ(v)Ξ(u)", color: EMBER },
              { text: "R" },
            ]}
            legend={[
              { label: "Ξ(u)Ξ(v)", color: VIOLET, desc: "monodromy matrices at two different spectral parameters" },
              { label: "Ξ(v)Ξ(u)", color: EMBER, desc: "the same product, reversed — related by conjugation with R" },
            ]}
          />
        </div>
      </Reveal>

      {/* 6 — payoff */}
      <Reveal delay={180}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={TOTAL} phrase="The payoff: [T(u), T(v)] = 0, eq. (33)" color={TEAL} />
          <Paragraph
            original="Taking the trace over the auxiliary space, we get [T(u), T(v)] = 0. The existence of this infinite number of conserved quantities shows that the model is integrable."
            explanation="Five steps of construction, one line of consequence. T(u) at every value of u commutes with T(v) at every other value — an infinite family of mutually compatible conserved quantities, which is the actual mathematical definition of an integrable model. Page 8 turns this machinery into the explicit Bethe equations used throughout the rest of the site."
          />
          <div className="rounded-xl border-2 p-4 text-center" style={{ borderColor: TEAL, background: "color-mix(in srgb, #0ea5a5 8%, transparent)" }}>
            <p className="font-mono text-lg font-semibold text-ink">[T(u), T(v)] = 0</p>
            <p className="mt-1 text-xs text-ink-soft">infinitely many conserved quantities ⇒ exactly solvable</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Comfort with matrices and basic quantum scattering helps, but every symbol is defined inline.",
            "Nothing from pages 1-6 is required — this derivation stands on its own, from scratch.",
          ]}
          observations={[
            "This is the proof that justifies every 'exact' claim on every other page of this site — nothing here is approximated or numerically fit.",
            "Page 8 uses exactly this machinery (via the usual quantum inverse scattering approach) to write down the explicit Bethe equations solved everywhere else on the platform.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["smatrix", "spectralparameter", "yangbaxter", "monodromy", "transfermatrix"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 7 — End Matter I: Proof of Integrability"
          prompt="The reader has just gone through page 7 broken into 6 concepts: the bare electron-impurity S-matrices (eq. 22-23), the continuous S-matrix and spectral parameter (eq. 25), the Yang-Baxter equation (eq. 26), the monodromy and transfer matrix construction (eq. 27-28), the R-matrix consistency condition (eq. 29-32), and the final commutativity result [T(u),T(v)]=0 (eq. 33) that proves integrability. Explain how these six steps build a rigorous proof that the model is exactly solvable, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
