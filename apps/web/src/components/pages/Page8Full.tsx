import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { ColorCodedEquation } from "./abstract/ColorCodedEquation";
import { VariableShiftDiagram } from "./finalbethe/VariableShiftDiagram";
import { FusionDiagram } from "./finalbethe/FusionDiagram";
import { DerivationSteps } from "./shared/DerivationSteps";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 5;

export function Page8Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            End Matter II — the final Bethe Ansatz equations, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: VIOLET }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Complete<span style={{ color: VIOLET }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Page 7 proved this model has infinitely many conserved quantities. This page cashes that proof
            in: the explicit, one-channel-at-a-time Bethe equations, tidied up, then generalized to n
            channels — landing exactly on the equations you first saw on page 2. Every curve on every page
            of this site is this equation, solved numerically.
          </p>
        </div>
      </Reveal>

      {/* 1 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="One-channel Bethe equations, eq. (34)–(35)" color={VIOLET} />
          <Paragraph
            original="Using the usual quantum inverse scattering approach, the Bethe Ansatz equations of the model with one channel of conduction electron can be obtained as e^(ikjL) = ∏Λγ combinations with iceⁱᵠ/2 offsets, and a second coupled equation for the rapidities involving Ne and the two impurity factors with offset 1−e²ⁱᵠ."
            explanation={
              <>
                Page 7&apos;s transfer matrix, cranked through the standard machinery, produces this pair —
                the n=1 special case. It looks a little rough (offsets involving 1−e²ⁱᵠ) because it hasn&apos;t
                been tidied up yet; concept 2 fixes that.
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "e" },
              { text: "ik_jL", color: TEAL },
              { text: " = ∏" },
              { text: "ᴹ", color: "var(--ink-soft)" },
              { text: "ᵧ₌₁ (Λᵧ−1+iceⁱᵠ/2)/(Λᵧ−1−iceⁱᵠ/2)" },
            ]}
            legend={[{ label: "e^(ik_jL)", color: TEAL, desc: "same momentum-quantization role as eq. (2) on page 2, now for a single channel" }]}
          />
        </div>
      </Reveal>

      {/* 2 */}
      <Reveal delay={100}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={TOTAL} phrase="A symmetrizing shift, eq. (36)–(37)" color={EMBER} />
          <Paragraph
            original="These Bethe Ansatz equations can be made more symmetric upon changing the variable Λγ → e^(iφ)(Λγ−1)+1 such that the equations become eikjL = ∏(Λγ−1+ic/2)/(Λγ−1−ic/2), with the rapidity-rapidity and impurity-scattering equation taking the clean ±ic/2, ±e^(∓iφ)... form."
            explanation="One relabeling, purely for tidiness — but it's exactly this cleaned-up form that appears in every equation from page 2 onward. Toggle below to see the offset simplify."
          />
          <VariableShiftDiagram />
          <DerivationSteps
            accent={EMBER}
            steps={[
              { expr: "e^(ik_jL) = ∏ (Λγ−1+ice^(iφ)/2)/(Λγ−1−ice^(iφ)/2)", note: "Concept 1's raw, un-tidied equation." },
              { expr: "substitute  Λγ − 1 → e^(iφ)(Λγ − 1)", note: "The paper's stated relabeling." },
              { expr: "numerator:  e^(iφ)(Λγ−1) + ice^(iφ)/2 = e^(iφ)[(Λγ−1) + ic/2]\ndenominator: e^(iφ)(Λγ−1) − ice^(iφ)/2 = e^(iφ)[(Λγ−1) − ic/2]", note: "Factor e^(iφ) out of both terms in each bracket — it's common to every term because ic·e^(iφ)/2 = e^(iφ)·(ic/2)." },
              { expr: "e^(iφ)[(Λγ−1)+ic/2] / e^(iφ)[(Λγ−1)−ic/2] = (Λγ−1+ic/2)/(Λγ−1−ic/2)", note: "The e^(iφ) factor is common to numerator and denominator — it cancels exactly." },
              { expr: "⇒  e^(ik_jL) = ∏ (Λγ−1+ic/2)/(Λγ−1−ic/2)", note: "Eq. (37)'s clean, symmetric ±ic/2 form — the φ-dependence has been absorbed entirely into the relabeled Λγ." },
            ]}
          />
        </div>
      </Reveal>

      {/* 3 */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={TOTAL} phrase="From one channel to n: the fusion trick, eq. (38)–(39)" color={TEAL} />
          <Paragraph
            original="To obtain the equations for the model with a generic n-flavor of conduction electron, we invoke the dynamical fusion system, which was systematically developed in Ref. [30]. We obtain the Bethe Ansatz equation as e^(ikjL) = ∏(Λγ−1+icn/2)/(Λγ−1−icn/2), and the coupled rapidity equation with the two impurity factors unchanged."
            explanation={
              <>
                The last step, and the payoff of the whole End Matter. Fuse n copies of concept 2&apos;s
                single-channel equations together and c becomes cn everywhere in the bulk term — these are
                exactly the equations you first met on page 2, concept 4, now with a full derivation behind
                them.
              </>
            }
          />
          <FusionDiagram />
          <ColorCodedEquation
            tokens={[
              { text: "e" },
              { text: "ik_jL", color: TEAL },
              { text: " = ∏" },
              { text: "ᴹ", color: "var(--ink-soft)" },
              { text: "ᵧ₌₁ (Λᵧ−1+" },
              { text: "icn/2", color: VIOLET },
              { text: ")/(Λᵧ−1−" },
              { text: "icn/2", color: VIOLET },
              { text: ")" },
            ]}
            legend={[{ label: "icn/2", color: VIOLET, desc: "the n-channel bulk offset — page 2's eq. (2), reached here from first principles" }]}
          />
        </div>
      </Reveal>

      {/* 4 */}
      <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={TOTAL} phrase="Full circle: what every simulation on this site actually solves" color={VIOLET} />
          <Paragraph
            original="[These are the final Bethe Ansatz equations of the paper — the ones underlying every result derived in the main text.]"
            explanation={
              <>
                Trace the chain all the way back: this equation → the{" "}
                <GlossaryTerm id="stringhypothesis">p-strings</GlossaryTerm> and{" "}
                <GlossaryTerm id="impuritystring">impurity strings</GlossaryTerm> of page 2 → the{" "}
                <GlossaryTerm id="tba">TBA</GlossaryTerm> hierarchy of page 3 → the multi-tower free energies
                of page 4 → the entropy curves of pages 1 and 5 → every draggable α slider on this entire
                platform. Nothing along that chain is approximated.
              </>
            }
          />
        </div>
      </Reveal>

      {/* 5 — closing card, no widget */}
      <Reveal delay={160}>
        <div className="rounded-xl border-2 border-dashed p-5 text-center" style={{ borderColor: EMBER }}>
          <p className="font-serif text-xl font-semibold text-ink">End of paper.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Eight pages, thirty-nine numbered equations, four phases, one exact solution. If you started at
            page 1&apos;s &ldquo;Breakdown.&rdquo; and read straight through, you now have the entire argument —
            from the Hamiltonian to the proof of integrability to the equations that produced every curve
            you dragged along the way.
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Page 7 (the proof of integrability) — this page is its direct continuation.",
            "Nothing beyond that is assumed — every equation and term is explained inline.",
          ]}
          observations={[
            "Concept 3's n-channel equations are the exact same ones shown on page 2, concept 4 — this page is where they actually come from.",
            "This platform's offline solver (scripts/tba_solve.py) numerically solves exactly this equation to produce every curve in the Simulation section.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["betheansatz", "rapidity", "stringhypothesis", "tba"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 8 — End Matter II: The Final Bethe Ansatz Equations"
          prompt="The reader has just gone through page 8, the paper's final page, broken into 5 concepts: the one-channel Bethe Ansatz equations (eq. 34-35), a symmetrizing variable shift (eq. 36-37), the dynamical fusion trick generalizing to n channels (eq. 38-39, matching page 2's equations), a full-circle recap of how this connects the entire site's simulations, and a closing note. Explain how this page completes the derivation chain from the Hamiltonian (page 1) through the phase diagram (page 2) to the final equations, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
