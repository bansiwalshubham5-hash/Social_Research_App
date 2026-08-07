import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { ColorCodedEquation } from "./abstract/ColorCodedEquation";
import { MonotonicDecayCurve } from "./phase/MonotonicDecayCurve";
import { CurveShapeCompare } from "./phase/CurveShapeCompare";
import { PStringLadder } from "./phase/PStringLadder";
import { ZeroModeSubphaseAccordion } from "./phase/ZeroModeSubphaseAccordion";
import { YSREnergyLevelDiagram } from "./phase/YSREnergyLevelDiagram";
import { VanishingEnergyDiagram } from "./phase/VanishingEnergyDiagram";
import { TBARecursionChain } from "./phase/TBARecursionChain";
import { DerivationSteps } from "./shared/DerivationSteps";
import { LiveEntropyGraph } from "./shared/LiveEntropyGraph";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 10;

export function Page2Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The phase diagram, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      {/* hook */}
      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: VIOLET }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Exactly<span style={{ color: VIOLET }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Most papers draw a phase diagram and describe each region in words. This one writes down,
            in closed form, the exact complex numbers — the rapidities — that exist in every single
            phase, and derives from them exactly which impurity is screened, by what, and why the
            entropy does what it does. Page 1 told you <em>that</em> the entropy overshoots. This page
            is <em>why</em>, region by region, equation by equation.
          </p>
        </div>
      </Reveal>

      {/* 1 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="The RG invariant, defined exactly" color={VIOLET} />
          <Paragraph
            original="RG invariant α = π|sin φ|/c, which measures the departure from Hermiticity and determines the impurity phase diagram."
            explanation={
              <>
                Page 1 called α &ldquo;the one interactive dial.&rdquo; Here&apos;s its actual formula:
                built from the effective coupling&apos;s phase φ and magnitude c introduced at the very
                end of the introduction. One real number, and it alone decides which of the four
                phases you&apos;re in.
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "α = π" },
              { text: "|sin φ|", color: VIOLET },
              { text: " / " },
              { text: "c", color: EMBER },
            ]}
            legend={[
              { label: "φ", color: VIOLET, desc: "the effective coupling's phase — how far from real λ is" },
              { label: "c", color: EMBER, desc: "the effective coupling's magnitude — sets the overall interaction strength" },
            ]}
          />
        </div>
      </Reveal>

      {/* 2 */}
      <Reveal delay={100}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={TOTAL} phrase="The Kondo phase: real spectrum, and a real experiment" color={EMBER} />
          <Paragraph
            original="For 0<α<π/2 the spectrum remains real, and the defect entropy flows from 2ln2 to 2ln d₁/₂... Notably, such fractional entropy has recently been measured experimentally in Hermitian Kondo systems. The g-function decreases monotonically, continuously extending the conventional multichannel Kondo effect."
            explanation={
              <>
                The lowest phase behaves exactly as expected: real energies, and a{" "}
                <GlossaryTerm id="gfunction">g-function</GlossaryTerm> that only ever decreases. The
                fractional endpoint value isn&apos;t speculative — a closely related quantity has
                actually been measured in real quantum-dot devices (see Applications).
              </>
            }
          />
          <MonotonicDecayCurve />
          <LiveEntropyGraph
            n={3}
            defaultAlphaOverPi={0.2}
            minAlphaOverPi={0.02}
            maxAlphaOverPi={0.49}
            accent={EMBER}
            caption="Restricted to the Kondo window, 0<α<π/2 — the real TBA curve, live. Drag α anywhere in this range and it stays monotonic every time, exactly as claimed."
          />
        </div>
      </Reveal>

      {/* 3 */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={TOTAL} phrase="Where monotonicity breaks: the zero-mode phase" color={TEAL} />
          <Paragraph
            original="For π/2 < α < nπ/2, the g-function becomes nonmonotonic despite connecting the same ultraviolet and infrared fixed points. This nonmonotonicity originates from the appearance of zero-energy impurity strings, which reorganize the excitation spectrum into multiple towers."
            explanation={
              <>
                This is the paper&apos;s central claim, first stated precisely. Same start, same end —
                yet new{" "}
                <GlossaryTerm id="impuritystring">zero-energy impurity strings</GlossaryTerm> reorganize
                the spectrum into multiple{" "}
                <GlossaryTerm id="tower">towers</GlossaryTerm> partway through, and the curve stops
                behaving monotonically. Toggle below to see both shapes on the same axes.
              </>
            }
          />
          <CurveShapeCompare />
          <LiveEntropyGraph
            n={3}
            defaultAlphaOverPi={0.7}
            minAlphaOverPi={0.02}
            maxAlphaOverPi={1.49}
            accent={TEAL}
            caption="Now drag past α=0.5π yourself — the same live TBA curve, but this slider spans both the Kondo and zero-mode windows so you can watch monotonic tip into nonmonotonic in real time, not just compare two frozen snapshots."
          />
        </div>
      </Reveal>

      {/* 4 */}
      <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={TOTAL} phrase="The Bethe Ansatz equations themselves, eq. (2)–(3)" color={VIOLET} />
          <Paragraph
            original="These results follow from the Bethe Ansatz equations (derived in the End Matter): e^(ik_jL) = ∏Λ_γ combinations... The rapidities satisfy [a coupled product equation]... where N^e is the number of conduction electrons. The last two factors describe scattering from the two impurities with complex-conjugate couplings c̃ and c̃*. For φ=0, the equations reduce to those of the Hermitian multichannel Kondo problem with two impurities."
            explanation="Two coupled equations. The first quantizes each electron's momentum around the ring. The second says every rapidity Λ_γ scatters off every other rapidity, off the bulk electron sea, and — the two new factors — off both impurities, with complex-conjugate strength. Set φ=0 and everything collapses back to the ordinary, Hermitian two-impurity Kondo problem."
          />
          <ColorCodedEquation
            tokens={[
              { text: "e" },
              { text: "ik_jL", color: TEAL },
              { text: " = ∏" },
              { text: "ᴹ", color: "var(--ink-soft)" },
              { text: "ᵧ₌₁ (Λᵧ−1+icn/2)/(Λᵧ−1−icn/2)" },
            ]}
            legend={[
              { label: "e^(ik_jL)", color: TEAL, desc: "momentum quantization — electron j must return to itself after one full trip around the ring" },
              { label: "M", color: "var(--ink-soft)", desc: "the number of spin flips — how many rapidities Λ_γ exist" },
            ]}
          />
          <ColorCodedEquation
            tokens={[
              { text: "∏" },
              { text: "δ≠γ", color: "var(--ink-soft)" },
              { text: " (Λδ−Λγ+ic)/(Λδ−Λγ−ic) = [bulk term]" },
              { text: "ᴺᵉ", color: "var(--ink-soft)" },
              { text: " × " },
              { text: "(impurity 1 factor)", color: VIOLET },
              { text: " × " },
              { text: "(impurity 2 factor)", color: EMBER },
            ]}
            legend={[
              { label: "∏δ≠γ (Λδ−Λγ±ic)", color: "var(--ink-soft)", desc: "rapidity-rapidity scattering — the ordinary bulk interaction" },
              { label: "impurity 1 factor", color: VIOLET, desc: "scattering off impurity 1, with coupling c̃ = ce^(iφ)" },
              { label: "impurity 2 factor", color: EMBER, desc: "scattering off impurity 2, with coupling c̃* = ce^(−iφ) — the complex conjugate" },
            ]}
          />
          <DerivationSteps
            accent={VIOLET}
            steps={[
              { expr: "c̃ = c e^(iφ)          c̃* = c e^(−iφ)", note: "The effective couplings from the introduction (concept 9, page 1) — magnitude c, phase φ." },
              { expr: "Set φ = 0:  e^(iφ) = e^(−iφ) = e⁰ = 1", note: "The paper's stated special case." },
              { expr: "⇒  c̃ = c          c̃* = c", note: "Both impurities' effective couplings collapse to the same real number c — the complex-conjugate pair (page 1, concept 1) becomes one ordinary coupling." },
              { expr: "⇒ impurity 1 and impurity 2 factors above become identical in form", note: "The two scattering factors in the equations differ only by c̃ vs c̃* — with both equal to c, that distinction vanishes." },
              { expr: "⇒ the ordinary Hermitian two-impurity multichannel Kondo Bethe equations", note: "Exactly the paper's own statement: φ=0 is the non-Hermitian twist switched off." },
            ]}
          />
        </div>
      </Reveal>

      {/* 5 */}
      <Reveal delay={160}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={TOTAL} phrase="Overscreened Kondo phase and p-strings, eq. (4)" color={EMBER} />
          <Paragraph
            original="When 0 < α < π/2, corresponding to the overscreened Kondo phase, the solutions of the Bethe equations in the thermodynamic limit satisfy the string hypothesis and organize into p-strings. In this phase, both impurities are overscreened by the multiparticle Kondo cloud formed by these bulk string excitations as shown in Fig. 1. The defect couplings are marginally relevant, generating the conventional monotonic RG flow from the ultraviolet to the infrared fixed point."
            explanation={
              <>
                The microscopic content of concept 2. Solutions organize into{" "}
                <GlossaryTerm id="stringhypothesis">p-strings</GlossaryTerm> — stacks of p rapidities
                sharing one real center. Both impurities get overscreened by the collective cloud these
                strings form (Fig. 1 on Page 1 shows exactly this comb). Adjust p below.
              </>
            }
          />
          <PStringLadder />
        </div>
      </Reveal>

      {/* 6 */}
      <Reveal delay={180}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={TOTAL} phrase="Zero mode I vs. Zero mode II, eq. (5)–(7)" color={TEAL} />
          <Paragraph
            original="For π/2 < α < nπ/2, additional impurity-string solutions appear, whose energies vanish identically. Both impurities remain overscreened while supporting zero-energy impurity strings and PT symmetry is unbroken. The zero-mode phase comprises two subphases. For π/2 < α < π (zero mode I), only the fundamental impurity strings Λ⁽¹⁾ and Λ⁽²⁾ are present. For π < α < nπ/2 (zero mode II), higher-order impurity strings also exist."
            explanation="The zero-mode phase isn't uniform — it has its own internal structure, one more subphase transition hiding inside it. Expand each below to see exactly which impurity strings exist in each half."
          />
          <ZeroModeSubphaseAccordion />
        </div>
      </Reveal>

      {/* 7 */}
      <Reveal delay={200}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={7} total={TOTAL} phrase="YSR-I vs. YSR-II: who's really in the ground state, eq. (8)" color={VIOLET} />
          <Paragraph
            original="For nπ/2 < α < (n/2+1)π, the higher-order impurity strings persist, while the fundamental impurity strings acquire complex energies E⁽¹⁾, E⁽²⁾, signaling spontaneous PT-symmetry breaking. In the YSR-I phase, the combined energy of the two fundamental impurity strings is negative, so the ground state contains them. In the YSR-II phase, their combined energy is positive, leaving the impurities unscreened in the ground state but screened in the excited state."
            explanation={
              <>
                Once energies go complex, a subtler question opens up: is the state that actually
                minimizes energy the one with the two{" "}
                <GlossaryTerm id="ysr">YSR</GlossaryTerm> strings occupied, or empty? The sign of their
                combined energy decides — and it flips exactly once, splitting YSR into two subphases
                too.
              </>
            }
          />
          <YSREnergyLevelDiagram />
        </div>
      </Reveal>

      {/* 8 — n=1 special case, no widget */}
      <Reveal delay={220}>
        <Paragraph
          original="Note that the zero-mode regime emerges only for multichannel systems (n≥2); for n=1, the transition at α=π/2 occurs directly between the Kondo and YSR phases. The impurity strings acquire finite complex energies, introducing an intrinsic IR scale that destroys the conformal invariance."
          explanation="A footnote worth keeping: everything in concepts 3 and 6 assumes n≥2. Turn n down to 1 in the channel-count widget on Page 1, and the zero-mode phase disappears entirely — Kondo transitions straight into YSR at α=π/2, with nothing in between."
        />
      </Reveal>

      {/* 9 */}
      <Reveal delay={240}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={9} total={TOTAL} phrase="Local moment, precisely: everything vanishes" color={EMBER} />
          <Paragraph
            original="For α > (n/2+1)π (local moment phase), the higher-order impurity strings continue to exist, and the energies of both the fundamental and higher-order impurity strings vanish, restoring PT symmetry and leaving both impurities unscreened. The RG trajectory is cyclic, returning to the weak-coupling local-moment fixed point rather than connecting distinct ultraviolet and infrared fixed points."
            explanation="Page 1's cyclic-loop picture, now with the microscopic reason attached: every impurity-string energy — fundamental and higher-order alike — drops identically to zero here, which is exactly what restores PT symmetry and returns the flow to the same fixed point it started from."
          />
          <VanishingEnergyDiagram />
        </div>
      </Reveal>

      {/* 10 */}
      <Reveal delay={260}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={10} total={TOTAL} phrase="Setting up finite temperature: the TBA recursion, eq. (9)" color={TEAL} />
          <Paragraph
            original="We study the finite-temperature thermodynamics in the PT-unbroken phases, 0<α<nπ/2 and α>(n/2+1)π, where the impurities are respectively overscreened and unscreened. Introducing the particle and hole densities ρ_p(Λ) and ρ_p^h(Λ) of the p-string excitations and defining η_p(Λ)=ρ_p^h(Λ)/ρ_p(Λ), the thermodynamic Bethe Ansatz equations take the usual recursive form."
            explanation={
              <>
                Only the two honestly-real-spectrum regions get a full{" "}
                <GlossaryTerm id="tba">thermodynamic Bethe Ansatz</GlossaryTerm> treatment (the YSR
                phase&apos;s complex spectrum is explicitly out of scope — concept 7). The whole
                machinery reduces to one recursive equation per tower p, each depending only on its own
                immediate neighbors.
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "ln η_p = −(2Dδ" },
              { text: "p,n", color: "var(--ink-soft)" },
              { text: "/T)·tan⁻¹" },
              { text: "(e^(π(Λ−1)/c))", color: VIOLET },
              { text: " + Σ" },
              { text: "υ=±", color: EMBER },
              { text: " G·ln(1+η" },
              { text: "p+υ", color: EMBER },
              { text: ")" },
            ]}
            legend={[
              { label: "δp,n term", color: VIOLET, desc: "a source term that only acts on the n-th tower — where the impurity strings live" },
              { label: "η_{p±υ}", color: EMBER, desc: "the two neighboring towers — each level talks only to p−1 and p+1" },
            ]}
          />
          <TBARecursionChain />
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Page 1 (the Hamiltonian, α, and the four phases) — this page derives what Page 1 introduced.",
            "Nothing beyond that is assumed — every equation and term is explained inline.",
          ]}
          observations={[
            "α is still the same shared variable — every phase boundary here (π/2, π, nπ/2, (n+1)π/2, (n/2+1)π) is a literal boundary you can find by dragging α on Page 1.",
            "The zero-mode phase only exists for n≥2 (concept 8) — set n=1 on Page 1 and this entire phase collapses out of the diagram.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips
          terms={[
            "rg",
            "gfunction",
            "impuritystring",
            "tower",
            "betheansatz",
            "rapidity",
            "stringhypothesis",
            "ysr",
            "overscreened",
            "unscreened",
            "tba",
            "ptsymmetric",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 2 — The Phase Diagram"
          prompt="The reader has just gone through page 2 broken into 10 concepts: the precise formula for α, the monotonic Kondo phase and its experimental confirmation, where nonmonotonicity first appears in the zero-mode phase, the full Bethe Ansatz equations (2)-(3), p-strings and the overscreened Kondo phase (eq. 4), the zero-mode I/II subphase split (eq. 5-7), the YSR-I/YSR-II ground-state occupation question (eq. 8), the n=1 special case, the local-moment phase where all string energies vanish, and the finite-temperature TBA recursion (eq. 9). Explain how these fit together as the microscopic derivation behind page 1's phase diagram, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
