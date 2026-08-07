import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { ColorCodedEquation } from "./abstract/ColorCodedEquation";
import { PaperFigure } from "./PaperFigure";
import { ConjugatePairMirror } from "./towers/ConjugatePairMirror";
import { ModulusSquaredDiagram } from "./towers/ModulusSquaredDiagram";
import { ThreeTowerSplit } from "./towers/ThreeTowerSplit";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 7;

export function Page4Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Assembling the free energy, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: EMBER }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Independent<span style={{ color: EMBER }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Two impurities, two towers each, complex free energies throughout — and yet the final answer is
            a single real number. The reason is one word: independent. Because the impurities don&apos;t
            interact directly, their partition functions just multiply. Because PT symmetry relates them,
            that product is automatically real. This page is that argument, made precise.
          </p>
        </div>
      </Reveal>

      {/* 1 — Fig 2 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="Fig. 2, straight from the paper: the Kondo-phase entropy" color={VIOLET} />
          <Paragraph
            original="Fig. 2 shows the impurity entropy S_imp = ln g(T) = −∂F_imp/∂T and impurity specific heat C_imp = T∂S_imp/∂T. Throughout the Kondo phase, S_imp decreases monotonically from the ultraviolet value 2ln2 to the infrared value 2ln[2cos(π/(n+2))]."
            explanation={
              <>
                Page 3&apos;s free-energy formula (eq. 15), plotted. Left: fixed n=2, several α — all
                monotonic, all landing on the same endpoints, just crossing over at different sharpness
                (concept 5 of page 3). Right: fixed α=π/4, more channels — a higher{" "}
                <GlossaryTerm id="tower">infrared</GlossaryTerm> plateau each time.
              </>
            }
          />
          <PaperFigure
            src="/images/fig2-entropy-curves.png"
            width={1700}
            height={502}
            alt="Figure 2 from the paper: impurity entropy S_imp vs T/T_K for the Kondo phase, left panel showing several alpha values with specific heat inset, right panel showing different channel numbers at fixed alpha"
            label="Fig. 2"
            explanation="Needed here — this is the paper's own numerical evaluation of the exact formula from page 3, the direct visual proof that the single-tower Kondo phase behaves exactly as concepts 2-5 (pages 2-3) predicted."
          />
        </div>
      </Reveal>

      {/* 2 */}
      <Reveal delay={100}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={TOTAL} phrase="Two-tower free energy for impurity 1, eq. (17)–(18)" color={EMBER} />
          <Paragraph
            original="The free energy contributions from the two towers of the first impurity are F^𝒯1_(2)(T) = −(T/2π)∫dξ ln(1+η₁(ξ))/cosh(ξ+ln(T/T_K)−iα). F^𝒯2_(1) = F^𝒯1_(2) − (T/2π)∫dξ ln(1+η₂(ξ))/cosh(ξ+ln(T/T_K)−i(α−π/2))."
            explanation="Page 3 ended with a fork into two towers (𝒯1, 𝒯2). Here's what each contributes: two integrals, near-identical in form, differing only in which η_p enters and by a shift of π/2 in the imaginary offset."
          />
          <ColorCodedEquation
            tokens={[
              { text: "F^𝒯1 = −(T/2π)∫dξ " },
              { text: "ln(1+η₁(ξ))", color: VIOLET },
              { text: " / cosh(ξ+ln(T/T_K)−iα)" },
            ]}
            legend={[{ label: "ln(1+η₁(ξ))", color: VIOLET, desc: "the bulk-string tower's TBA solution" }]}
          />
        </div>
      </Reveal>

      {/* 3 */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={TOTAL} phrase="PT conjugation gives impurity 2 for free" color={TEAL} />
          <Paragraph
            original="The corresponding second impurity free energies are related by PT symmetry, F^𝒯1_(2)(T) = F^𝒯1_(1)(T)* and F^𝒯2_(2)(T) = F^𝒯2_(1)(T)*."
            explanation="A direct payoff of building the whole model to be PT-symmetric in the first place (page 1, concept 1). Solve impurity 1's towers once; impurity 2's are just the complex conjugates."
          />
          <ConjugatePairMirror />
        </div>
      </Reveal>

      {/* 4 */}
      <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={TOTAL} phrase="Multiplying independent impurities, eq. (19)–(20)" color={VIOLET} />
          <Paragraph
            original="Each impurity therefore carries two towers, whose contributions are summed in its partition function, while the two impurities, being independent, contribute multiplicatively. Z_imp = (e^{−F^𝒯1_(1)/T} + e^{−F^𝒯2_(1)/T})(e^{−F^𝒯1_(2)/T} + e^{−F^𝒯2_(2)/T}), and F_imp(T) = −T ln Z_imp(T)."
            explanation={
              <>
                Sum within an impurity (its two towers can each be occupied), multiply across impurities (no
                direct interaction between them — page 1, concept 7). Standard{" "}
                <GlossaryTerm id="partitionfunction">partition function</GlossaryTerm> bookkeeping, applied
                twice.
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "Z_imp = " },
              { text: "(e^{−F^𝒯1_(1)/T} + e^{−F^𝒯2_(1)/T})", color: VIOLET },
              { text: " × " },
              { text: "(e^{−F^𝒯1_(2)/T} + e^{−F^𝒯2_(2)/T})", color: EMBER },
            ]}
            legend={[
              { label: "impurity 1 sum", color: VIOLET, desc: "sum over impurity 1's two towers" },
              { label: "impurity 2 sum", color: EMBER, desc: "sum over impurity 2's two towers — the complex conjugate factor" },
            ]}
          />
        </div>
      </Reveal>

      {/* 5 */}
      <Reveal delay={160}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={TOTAL} phrase="Why F_imp stays real: |Z_imp,(1)|² > 0" color={EMBER} />
          <Paragraph
            original="Since the tower free energies of the two impurities are related by complex conjugation, Z_imp,(2) = Z*_imp,(1), so that Z_imp = |Z_imp,(1)|² > 0 and F_imp is real despite the individual tower contributions being complex. The same holds for the three-tower construction below."
            explanation="Concept 3's mirror symmetry, carried all the way through: impurity 2's partition function is impurity 1's complex conjugate, so their product is a modulus-squared — always real, always positive, no matter how complex the intermediate towers get."
          />
          <ModulusSquaredDiagram />
        </div>
      </Reveal>

      {/* 6 */}
      <Reveal delay={180}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={TOTAL} phrase="Zero mode II: a third tower appears (n≥3)" color={TEAL} />
          <Paragraph
            original="For multichannel systems with n≥3, the zero mode II regime emerges for π<α<nπ/2, where higher-order zero-energy impurity strings reorganize the excitation spectrum into three towers. Defining m=⌊2α/π⌋, the free energy contributions of the first impurity are given by eq. (21a)-(21c)."
            explanation="Page 3's two-tower fork wasn't the end of the story either. With 3 or more channels, crossing α=π further splits 𝒯2 into 𝒯2 and 𝒯3 — the higher-order impurity strings (page 2, concept 6) each get their own tower and their own integral."
          />
          <ThreeTowerSplit />
        </div>
      </Reveal>

      {/* 7 */}
      <Reveal delay={200}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={7} total={TOTAL} phrase="The three-tower free-energy sum, eq. (21a)–(21c)" color={VIOLET} />
          <Paragraph
            original="F^𝒯1_(1)(T), F^𝒯2_(1)(T), F^𝒯3_(1)(T) — each a difference of two integrals involving η_{m+1}, η_m, η_{m−1}, shifted by different combinations of α and mπ/2. The second impurity free energies follow by PT conjugation, F^𝒯γ_(2)(T) = F^𝒯γ_(1)(T)*, γ∈{1,2,3}. The partition functions of the first and second impurities are Z_(1)(T) = Σγ e^{−F^𝒯γ_(1)(T)/T}, Z_(2)(T) = Σγ e^{−F^𝒯γ_(2)(T)/T}."
            explanation="Three integrals instead of two, each combining neighboring η_p solutions (m−1, m, m+1 — exactly the local recursion structure from page 2's TBA chain), but the machinery is identical to concepts 2-5: sum towers within an impurity, conjugate to get the other, multiply, take the log."
          />
          <div className="rounded-xl border border-line bg-paper-raised p-4">
            <p className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink">
              Z<span className="text-ink-soft">(1)</span>(T) = Σ<span style={{ color: EMBER }}>γ=1..3</span> e^(−F^𝒯γ<span className="text-ink-soft">(1)</span>(T)/T)
            </p>
            <p className="mt-2 text-xs text-ink-soft">
              Same construction as concept 4, just three terms in the sum instead of two.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Page 3 (the TBA free energy and the two-tower fork) — this page finishes what that page started.",
            "Nothing beyond that is assumed — every equation and term is explained inline.",
          ]}
          observations={[
            "The 'independent impurities multiply, PT-conjugate impurities cancel imaginary parts' pattern (concepts 3-5) repeats exactly for the three-tower case (concept 7) — same argument, one more term.",
            "Fig. 2's right panel (more channels → higher IR plateau) is the same 2ln[2cos(π/(n+2))] formula from page 1, concept 8, now shown for real, not just as an endpoint.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["freeenergy", "tower", "partitionfunction", "ptsymmetric"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 4 — Assembling the Free Energy"
          prompt="The reader has just gone through page 4 broken into 7 concepts: Fig. 2 (the Kondo-phase entropy plots), the two-tower free energy for impurity 1 (eq. 17-18), how PT symmetry gives impurity 2 for free, multiplying independent impurities into a partition function (eq. 19-20), why the result stays real despite complex intermediate towers, the onset of a third tower for n>=3 channels, and the full three-tower free-energy sum (eq. 21a-c). Explain how these assemble page 3's single-tower formula into the full multi-tower machinery, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
