import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { ColorCodedEquation } from "./abstract/ColorCodedEquation";
import { KernelFunctionGraph } from "./tba/KernelFunctionGraph";
import { UniversalSolutionCurve } from "./tba/UniversalSolutionCurve";
import { KernelNarrowingSlider } from "./tba/KernelNarrowingSlider";
import { TowerSplitDiagram } from "./tba/TowerSplitDiagram";
import { LiveEntropyGraph } from "./shared/LiveEntropyGraph";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 6;

export function Page3Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The finite-temperature machinery, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: TEAL }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Universal<span style={{ color: TEAL }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            The paper&apos;s own word for the central object on this page: a single solution η_p(ξ) that every
            phase, every channel count, and every temperature all read off from. Pages 1-2 gave you the
            phases and the exact rapidities inside them. This page is the machine that turns those rapidities
            into a number you can actually plot — the free energy, and from it, everything else.
          </p>
        </div>
      </Reveal>

      {/* 1 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="The TBA kernel: how nearby towers talk" color={VIOLET} />
          <Paragraph
            original="Gf(λ) = ∫dμ f(μ)/(2cosh[π(λ−μ)]). The hierarchy is supplemented by the boundary conditions η₀(λ)=0."
            explanation={
              <>
                Every equation on this page is built from one repeated operation: convolve with this{" "}
                <GlossaryTerm id="kernel">kernel</GlossaryTerm>. It is sharply peaked and decays fast — each
                tower&apos;s equation depends mostly on its immediate neighbors, exactly the locality Page
                2&apos;s recursion-chain widget showed structurally.
              </>
            }
          />
          <KernelFunctionGraph />
        </div>
      </Reveal>

      {/* 2 — boundary conditions, no widget */}
      <Reveal delay={100}>
        <Paragraph
          original="lim_{p→∞} {[p+1]ln(1+η_p) − [p]ln(1+η_{p+1})} = −h/T, where h denotes an external magnetic field. In what follows we set h=0."
          explanation="A technical closing condition on the infinite tower hierarchy — it has to settle down as p grows, tied to an external magnetic field h. The paper sets h=0 throughout, which is what every widget on this platform assumes too."
        />
      </Reveal>

      {/* 3 */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={TOTAL} phrase="The universal solution η_p(ξ): UV to IR" color={EMBER} />
          <Paragraph
            original="Introducing the shifted rapidity ξ = (π/c)Λ − ln(T/T₀)... ln η_p = −2δ_{p,n}e^ξ + G[ln(1+η_{p+1}) + ln(1+η_{p−1})]. The universal solution η_p(ξ) interpolates between the ultraviolet (ξ→−∞) and infrared (ξ→∞) fixed points."
            explanation="Rescale the rapidity by temperature and this becomes one universal function — the same η_p(ξ) shows up whether you're near T_K or far from it. Its two endpoints are closed-form numbers, eq. (13) and (14) below."
          />
          <ColorCodedEquation
            tokens={[
              { text: "ln η_p = −2δ" },
              { text: "p,n", color: EMBER },
              { text: "e" },
              { text: "ξ", color: VIOLET },
              { text: " + G[ln(1+η_{p+1}) + ln(1+η_{p−1})]" },
            ]}
            legend={[
              { label: "δp,n eξ", color: EMBER, desc: "the source term — only the n-th tower feels it directly, and it dies off as ξ→∞" },
              { label: "ξ", color: VIOLET, desc: "the shifted, temperature-rescaled rapidity — the real axis this whole page lives on" },
            ]}
          />
          <UniversalSolutionCurve />
        </div>
      </Reveal>

      {/* 4 */}
      <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={TOTAL} phrase="The Kondo-phase free energy, eq. (15)–(16)" color={TEAL} />
          <Paragraph
            original="The impurity contribution to the free energy depends on the parameter α. When 0<α<π/2, there is a single excitation tower coming from each of the impurities. F_imp = −(T/π)∫dξ [cosα·cosh(ξ+ln(T/T_K))·ln(1+η₁(ξ))] / [cosh²(ξ+ln(T/T_K))−sin²α], where T_K = T₀exp[(π/c)(1−cosφ)]."
            explanation={
              <>
                One <GlossaryTerm id="freeenergy">free energy</GlossaryTerm> integral for the whole Kondo
                phase — everywhere this platform&apos;s Simulation section plots a curve, this is the formula
                underneath it (the single-tower case; more towers get summed in on page 4).
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "F_imp = −(T/π)∫dξ " },
              { text: "[cosα·cosh(...)]", color: EMBER },
              { text: "·" },
              { text: "ln[1+η₁(ξ)]", color: VIOLET },
              { text: " / [cosh²(...) − sin²α]" },
            ]}
            legend={[
              { label: "cosα · cosh(...)", color: EMBER, desc: "the α-dependent kernel — this is what narrows as α grows" },
              { label: "ln[1+η₁(ξ)]", color: VIOLET, desc: "the single-tower TBA solution, concept 3's η_p at p=1" },
            ]}
          />
          <LiveEntropyGraph
            n={2}
            defaultAlphaOverPi={0.2}
            minAlphaOverPi={0.02}
            maxAlphaOverPi={0.49}
            accent={TEAL}
            caption="This is eq. (15) itself, evaluated live — the entropy is -dF_imp/dT of the exact formula above, computed fresh at every α you pick."
          />
        </div>
      </Reveal>

      {/* 5 */}
      <Reveal delay={160}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={TOTAL} phrase="Kernel narrowing with α: from 1/cosh to a delta function" color={VIOLET} />
          <Paragraph
            original="The parameter α enters Eq. (15) only through the width of a normalized kernel, reducing to the Hermitian kernel 1/cosh at α=0 and narrowing to πδ[ξ+ln(T/T_K)] as α→π/2. Increasing α therefore sharpens the crossover about T_K."
            explanation="A precise, checkable claim about concept 4's formula: α doesn't change what the free energy integrates over, only how sharply peaked the thing being integrated is. Drag it below."
          />
          <KernelNarrowingSlider />
        </div>
      </Reveal>

      {/* 6 */}
      <Reveal delay={180}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={TOTAL} phrase="Where this is going: from one tower to two" color={EMBER} />
          <Paragraph
            original="For π/2 < α < π, the zero-energy impurity-string solutions reorganize the excitation spectrum into two towers. The first tower, 𝒯1, consists solely of the allowed bulk p-string excitations, whereas the second, 𝒯2, contains the impurity strings together with the allowed bulk strings."
            explanation="The single-tower Kondo-phase formula from concept 4 isn't the whole story. Cross α=π/2 (the zero-mode phase from page 2) and a second tower opens up — page 4 sums both towers into one free energy."
          />
          <TowerSplitDiagram />
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Page 2 (the four phases and the exact rapidities in each) — this page turns those rapidities into thermodynamics.",
            "Nothing beyond that is assumed — every equation and term is explained inline.",
          ]}
          observations={[
            "η_p(ξ) is exactly what this platform's offline solver (scripts/tba_solve.py) computes numerically to produce every curve in the Simulation section.",
            "The kernel-narrowing effect (concept 5) is why the entropy crossover in the Simulation section visibly sharpens as you drag α toward π/2.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["tba", "kernel", "freeenergy", "tower", "rapidity"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 3 — TBA & the Kondo-Phase Free Energy"
          prompt="The reader has just gone through page 3 broken into 6 concepts: the TBA kernel and hierarchy structure, the boundary conditions, the universal solution eta_p(xi) and its UV/IR asymptotics (eq. 12-14), the Kondo-phase free energy and T_K formula (eq. 15-16), how the kernel narrows with alpha, and the onset of the two-tower structure in the zero-mode phase. Explain how these connect the exact rapidities from page 2 to the free-energy curves seen in the Simulation section, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
