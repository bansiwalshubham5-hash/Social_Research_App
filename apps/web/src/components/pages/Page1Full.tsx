import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { NonHermitianIllustration } from "./abstract/NonHermitianIllustration";
import { ChannelCountVisualizer } from "./abstract/ChannelCountVisualizer";
import { ColorCodedEquation } from "./abstract/ColorCodedEquation";
import { RGFlowBar } from "./abstract/RGFlowBar";
import { PhaseNumberLine } from "./abstract/PhaseNumberLine";
import { ComplexPlaneToggle } from "./abstract/ComplexPlaneToggle";
import { TowerStepper } from "./abstract/TowerStepper";
import { CyclicFlowDiagram } from "./abstract/CyclicFlowDiagram";
import { EntropyEndpointsSparkline } from "./abstract/EntropyEndpointsSparkline";
import { DefectFlowDiagram } from "./intro/DefectFlowDiagram";
import { ChiralDefectPlane } from "./intro/ChiralDefectPlane";
import { FrameworkTagCloud } from "./intro/FrameworkTagCloud";
import { CriticalVsFlowingCompare } from "./intro/CriticalVsFlowingCompare";
import { OperatorRelevanceSpectrum } from "./intro/OperatorRelevanceSpectrum";
import { RingGeometryDiagram } from "./intro/RingGeometryDiagram";
import { SolutionPipelineDiagram } from "./intro/SolutionPipelineDiagram";
import { PaperFigure } from "./PaperFigure";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 13;
const ITOTAL = 9;

export function Page1Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The abstract, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      {/* 0 — hook */}
      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: EMBER }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Breakdown<span style={{ color: EMBER }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Physicists have a rule of thumb: cool a quantum system down, and a certain kind of entropy —
            the impurity&apos;s own contribution — should only ever go one way. Down. Never back up. This
            paper&apos;s title is a claim that the rule can fail. Not approximately, not numerically — exactly,
            in a model solved in closed form. Everything below builds up to <em>why</em>, one piece of the
            paper&apos;s own abstract at a time. By the end, &ldquo;breakdown&rdquo; will mean something very
            specific.
          </p>
        </div>
      </Reveal>

      {/* 1 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="A PT-symmetric, non-Hermitian, multichannel Kondo model" color={VIOLET} />
          <Paragraph
            original="We study a PT-symmetric non-Hermitian multichannel Kondo model consisting of a pair of spin-1/2 impurities coupled to n conduction-electron channels through complex-conjugate Kondo couplings."
            explanation={
              <>
                Every word here is load-bearing. It&apos;s a{" "}
                <GlossaryTerm id="kondo">Kondo model</GlossaryTerm> (a magnetic impurity in a sea of
                electrons) that&apos;s <GlossaryTerm id="multichannel">multichannel</GlossaryTerm> (n
                flavors of electron, not one) and{" "}
                <GlossaryTerm id="nonhermitian">non-Hermitian</GlossaryTerm> (an open system, not a closed
                one) — yet still <GlossaryTerm id="ptsymmetric">PT-symmetric</GlossaryTerm>, which is what
                keeps it mathematically tractable at all.
              </>
            }
          />
          <NonHermitianIllustration />
        </div>
      </Reveal>

      {/* 2 */}
      <Reveal delay={100}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={TOTAL} phrase="Two impurities, n conduction-electron channels" color={EMBER} />
          <Paragraph
            original="...a pair of spin-1/2 impurities coupled to n conduction-electron channels..."
            explanation={
              <>
                Two <GlossaryTerm id="impurity">impurities</GlossaryTerm>, S₁ and S₂ — that part never
                changes. What does change, and what you can drive yourself below, is n: how many
                independent channels of conduction electrons surround them. More channels means more
                collective ways to screen each impurity&apos;s spin.
              </>
            }
          />
          <ChannelCountVisualizer />
        </div>
      </Reveal>

      {/* 3 */}
      <Reveal delay={120}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={TOTAL} phrase="Complex-conjugate Kondo couplings" color={TEAL} />
          <Paragraph
            original="...coupled...through complex-conjugate Kondo couplings."
            explanation={
              <>
                Impurity 1 couples with strength λ; impurity 2 couples with λ* — the complex conjugate.
                That single asymmetric-looking choice is what makes the whole Hamiltonian PT-symmetric
                instead of just non-Hermitian and untractable.
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "H_int = " },
              { text: "λ", color: VIOLET },
              { text: " S₁·J(x₁) + " },
              { text: "λ*", color: EMBER },
              { text: " S₂·J(x₂)" },
            ]}
            legend={[
              { label: "λ", color: VIOLET, desc: "impurity 1's coupling — a complex number |λ|e^(iφ)" },
              { label: "λ*", color: EMBER, desc: "impurity 2's coupling — the complex conjugate of λ" },
            ]}
          />
        </div>
      </Reveal>

      {/* 4 */}
      <Reveal delay={140}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={TOTAL} phrase="Two invariants: the Kondo scale T_K and α" color={VIOLET} />
          <Paragraph
            original="The impurity renormalization-group (RG) flow is characterized by two invariants: the Kondo scale T_K, generalizing the conventional Kondo temperature, and a dimensionless parameter α measuring the departure from Hermiticity."
            explanation={
              <>
                As you cool the system, its behavior changes — <GlossaryTerm id="rg">RG flow</GlossaryTerm>.
                Two numbers survive that flow unchanged and control everything: T_K, an energy scale, and α,
                a single dimensionless number. α is the one interactive dial running through this entire
                platform.
              </>
            }
          />
          <RGFlowBar />
        </div>
      </Reveal>

      {/* 5 */}
      <Reveal delay={160}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={TOTAL} phrase="Four impurity phases as α increases" color={EMBER} />
          <Paragraph
            original="As α increases, the exact Bethe Ansatz solution reveals four impurity phases: overscreened Kondo (0<α<π/2), zero mode (π/2<α<nπ/2), Yu–Shiba–Rusinov (nπ/2<α<(n/2+1)π), and local moment (α>(n/2+1)π)."
            explanation={
              <>
                The paper&apos;s headline structural result, solved exactly via the{" "}
                <GlossaryTerm id="betheansatz">Bethe Ansatz</GlossaryTerm> — not approximated. Drag the
                marker below (it&apos;s wired to the same α used everywhere on this site) and watch which
                regime you land in.
              </>
            }
          />
          <PhaseNumberLine />
          <PaperFigure
            src="/images/fig1-phase-diagram.png"
            width={1700}
            height={506}
            alt="Figure 1 from the paper: phase diagram showing Kondo, zero-mode, YSR, and local-moment phases with excitation towers"
            label="Fig. 1"
            explanation={
              <>
                Needed here because it&apos;s the paper&apos;s own canonical picture of exactly this result —
                the same four phases, drawn as excitation-energy diagrams. Each comb is one{" "}
                <GlossaryTerm id="tower">excitation tower</GlossaryTerm>.
              </>
            }
          />
        </div>
      </Reveal>

      {/* 6 */}
      <Reveal delay={180}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={TOTAL} phrase="PT-unbroken, or PT-broken" color={TEAL} />
          <Paragraph
            original="The Kondo, zero-mode, and local-moment phases are PT-unbroken, whereas the YSR phase spontaneously breaks PT symmetry."
            explanation={
              <>
                Three of the four phases keep every energy real, despite the non-Hermitian Hamiltonian —
                that&apos;s &ldquo;unbroken.&rdquo; In the{" "}
                <GlossaryTerm id="ysr">Yu–Shiba–Rusinov</GlossaryTerm> phase, symmetry breaks
                spontaneously and energies go genuinely complex. Toggle below to see the difference on the
                one picture that actually shows it.
              </>
            }
          />
          <ComplexPlaneToggle />
        </div>
      </Reveal>

      {/* 7 */}
      <Reveal delay={200}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={7} total={TOTAL} phrase="The impurity free energy and the g-function" color={VIOLET} />
          <Paragraph
            original="Using a generalized thermodynamic Bethe Ansatz, we determine the impurity free energy and Affleck–Ludwig g-function throughout the PT-unbroken phases."
            explanation={
              <>
                The <GlossaryTerm id="tba">thermodynamic Bethe Ansatz</GlossaryTerm> extends the exact
                solution to finite temperature. Its output, the impurity free energy, is where every curve
                on this platform ultimately comes from.
              </>
            }
          />
          <ColorCodedEquation
            tokens={[
              { text: "F_imp = -(T/π) ∫dξ " },
              { text: "[cosα · cosh(ξ+ln(T/T_K))] ", color: EMBER },
              { text: "· " },
              { text: "ln[1+η₁(ξ)]", color: VIOLET },
              { text: " / [cosh²(...) − sin²α]" },
            ]}
            legend={[
              { label: "cosα · cosh(...)", color: EMBER, desc: "the α-dependent kernel — width narrows as α grows" },
              { label: "ln[1+η₁(ξ)]", color: VIOLET, desc: "the TBA solution — solved numerically, validated against closed-form limits" },
            ]}
          />
        </div>
      </Reveal>

      {/* 8 */}
      <Reveal delay={220}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={8} total={TOTAL} phrase="Entropy flowing from 2ln2 to 2ln[2cos(π/(n+2))]" color={EMBER} />
          <Paragraph
            original="In the Kondo phase, the defect RG flow connects the ultraviolet and infrared conformal fixed points, with the impurity entropy flowing from 2ln2 to 2ln[2cos(π/(n+2))], in agreement with defect conformal field theory."
            explanation={
              <>
                A concrete number you can watch move. At high temperature, two decoupled spin-1/2
                impurities carry 2ln2 of pure &ldquo;don&apos;t know which state&rdquo; entropy. Cool down and
                conduction electrons partially screen it away, landing on a smaller,{" "}
                <span className="font-mono">n</span>-dependent plateau — the{" "}
                <GlossaryTerm id="gfunction">g-function</GlossaryTerm>.
              </>
            }
          />
          <EntropyEndpointsSparkline />
        </div>
      </Reveal>

      {/* 9 */}
      <Reveal delay={240}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={9} total={TOTAL} phrase="Impurity strings reorganize the spectrum into towers" color={TEAL} />
          <Paragraph
            original="In the zero-mode phase, zero-energy fundamental and higher-order impurity strings reorganize the spectrum into two and three excitation towers..."
            explanation={
              <>
                This is the actual microscopic mechanism behind the paper&apos;s title. Past α=π/2, new{" "}
                <GlossaryTerm id="impuritystring">impurity strings</GlossaryTerm> with exactly zero energy
                appear and split the single excitation tower into two, then three. Step through it below.
              </>
            }
          />
          <TowerStepper />
        </div>
      </Reveal>

      {/* 10 */}
      <Reveal delay={260}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={10} total={TOTAL} phrase="A complex spectrum, and a cyclic RG flow" color={VIOLET} />
          <Paragraph
            original="...in the YSR phase, spontaneous PT symmetry breaking produces a complex spectrum beyond the scope of our thermodynamic Bethe Ansatz; and in the local-moment phase, the RG flow becomes cyclic, returning to the unscreened local-moment fixed point."
            explanation={
              <>
                Two honest limits, back to back. In the YSR phase the paper is explicit that its own TBA
                doesn&apos;t apply (see concept 6 again). In the local-moment phase, the flow doesn&apos;t
                connect two different fixed points at all — it loops.
              </>
            }
          />
          <CyclicFlowDiagram />
        </div>
      </Reveal>

      {/* 11 */}
      <Reveal delay={280}>
        <Paragraph
          original="We conjecture that RG irreversibility, and hence a generalized Affleck–Ludwig g-theorem, survives throughout the Kondo phase 0 < α < π/2, where excitations remain organized into a single tower."
          explanation={
            <>
              A conjecture, stated as one — the authors are careful not to claim a proof. The ordinary{" "}
              <GlossaryTerm id="gtheorem">g-theorem</GlossaryTerm> (entropy only ever decreases on cooling)
              plausibly survives exactly as long as there&apos;s only a single excitation tower doing the
              work — i.e., before concept 9&apos;s reorganization kicks in.
            </>
          }
        />
      </Reveal>

      {/* 12 — payoff */}
      <Reveal delay={300}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={12} total={TOTAL} phrase="Breakdown, understood." color={EMBER} />
          <Paragraph
            original="Our exact solution shows, however, that neither a real spectrum nor ultraviolet and infrared defect entropies consistent with defect CFT are sufficient to guarantee RG irreversibility: in the zero-mode phase, the impurity entropy develops intermediate overshoots and undershoots between distinct ultraviolet and infrared fixed-point values, whereas in the local-moment phase it returns to the UV value 2ln2 through intermediate overshoots and undershoots."
            explanation={
              <>
                Here it is. A real spectrum (concept 6) and textbook-correct CFT endpoints (concept 8) turn
                out <em>not</em> to be enough. Once impurity strings split the spectrum into multiple towers
                (concept 9), the entropy can genuinely overshoot past its final value, or dip below it, before
                settling — not a numerical artifact, an exact result. The local-moment phase (concept 10)
                shows this most dramatically: both endpoints are 2ln2, and the curve still swings wildly in
                between.
              </>
            }
          />
          <PaperFigure
            src="/images/fig4-local-moment.png"
            width={799}
            height={528}
            alt="Figure 4 from the paper: impurity entropy in the local-moment phase, showing a sharp overshoot above ln4 followed by an undershoot below, for three values of alpha"
            label="Fig. 4"
            explanation={
              <>
                Needed here — this is the single most dramatic overshoot/undershoot in the whole paper.
                Both endpoints sit at ln4 (=2ln2), yet the blue curve (α=2.75π) swings up almost to ln4×2
                and back down past zero before returning. That swing is what &ldquo;breakdown of monotonic
                flow&rdquo; looks like, in one picture.
              </>
            }
          />
        </div>
      </Reveal>

      {/* section divider: introduction begins */}
      <Reveal delay={320}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            From the introduction — why this problem, and how it&apos;s solved
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      {/* intro 1 */}
      <Reveal delay={340}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={ITOTAL} phrase="The ordinary story: a defect flowing between two fixed points" color={VIOLET} />
          <Paragraph
            original="Quantum impurity systems provide canonical realizations of integrable defect renormalization-group (RG) flows. In the multichannel Kondo effect, a localized spin is screened by conduction electrons through a defect RG flow connecting ultraviolet and infrared conformal defect fixed points, giving rise to universal non-Fermi-liquid behavior."
            explanation={
              <>
                Before any non-Hermitian twist, this is just the ordinary{" "}
                <GlossaryTerm id="kondo">multichannel Kondo effect</GlossaryTerm>: a{" "}
                <GlossaryTerm id="defect">defect</GlossaryTerm> connecting a free-spin ultraviolet fixed point
                to a screened infrared one, both described by{" "}
                <GlossaryTerm id="cft">conformal field theory</GlossaryTerm>.
              </>
            }
          />
          <DefectFlowDiagram />
        </div>
      </Reveal>

      {/* intro 2 */}
      <Reveal delay={360}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={ITOTAL} phrase="A line defect in an SU(2)ₙ WZW conformal field theory" color={EMBER} />
          <Paragraph
            original="In the chiral formulation, the impurity is described by an integrable Kondo line defect in an SU(2)n Wess–Zumino–Witten (WZW) conformal field theory (CFT), whose RG flow interpolates between conformal defect fixed points."
            explanation={
              <>
                The n conduction-electron channels form a specific, exactly-solvable CFT — the{" "}
                <GlossaryTerm id="wzw">Wess–Zumino–Witten model</GlossaryTerm>. Working{" "}
                <GlossaryTerm id="chiral">chirally</GlossaryTerm> (one-directional propagation only) is what
                keeps the whole construction integrable.
              </>
            }
          />
          <ChiralDefectPlane />
        </div>
      </Reveal>

      {/* intro 3 */}
      <Reveal delay={380}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={3} total={ITOTAL} phrase="A fast-growing field: non-Hermitian criticality" color={TEAL} />
          <Paragraph
            original="Recent work has established a broad framework for non-Hermitian conformal and defect criticality, including complex conformal field theories, non-unitary conformal interfaces, lattice realizations of topological defects, boundary criticality, and holographic PT-symmetric defect theories."
            explanation="Context, not this paper's own result: a whole research program has been building non-Hermitian versions of CFT, defects, and holography. This paper sits inside that program, but asks a question the others hadn't: what happens when the defect actually flows?"
          />
          <FrameworkTagCloud />
        </div>
      </Reveal>

      {/* intro 4 */}
      <Reveal delay={400}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={4} total={ITOTAL} phrase="This paper's move: a defect that actually flows" color={VIOLET} />
          <Paragraph
            original="In this Letter, we investigate a PT-symmetric multichannel Kondo line defect in a chiral conformal field theory, generalizing the non-Hermitian Kondo model of Refs. [12–16] to multiple channels. Unlike previous non-Hermitian conformal defects, which remain critical, our defect is perturbed by a classically marginal operator that becomes marginally relevant, generating an integrable defect RG flow."
            explanation={
              <>
                The single sentence that separates this paper from the rest of the field in concept 3: most
                non-Hermitian defects built so far stay exactly at their fixed point — scale-invariant
                forever, nothing to flow. This one doesn&apos;t.
              </>
            }
          />
          <CriticalVsFlowingCompare />
        </div>
      </Reveal>

      {/* intro 5 */}
      <Reveal delay={420}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={ITOTAL} phrase="A classically marginal operator that turns marginally relevant" color={EMBER} />
          <Paragraph
            original="...our defect is perturbed by a classically marginal operator that becomes marginally relevant, generating an integrable defect RG flow."
            explanation={
              <>
                The actual mechanism behind concept 4&apos;s claim. A{" "}
                <GlossaryTerm id="marginal">marginally relevant operator</GlossaryTerm> is the same trick that
                drives ordinary Kondo screening — classically borderline, but tipped into growing once quantum
                corrections are included.
              </>
            }
          />
          <OperatorRelevanceSpectrum />
        </div>
      </Reveal>

      {/* intro 6 — Hamiltonian */}
      <Reveal delay={440}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={ITOTAL} phrase="The microscopic Hamiltonian, eq. (1)" color={TEAL} />
          <Paragraph
            original="A microscopic realization is provided by a pair of spin-1/2 impurities coupled through complex-conjugate Kondo interactions to n channels of conduction electrons, H = −ivF Σₐ₌₁ⁿ Σσ ∫dx ψ†aσ(x)∂xψaσ(x) + λS1·J(x1) + λ*S2·J(x2), where J(x) = ½ Σₐ ψ†aα(x)σαβψaβ(x) is the SU(2)n current, and the impurities S1,2 are located at x1,2 on a ring of circumference L."
            explanation="One equation, two sums and an integral. It looks dense mostly because it's careful: sum over all n channels, sum over both spin projections, integrate along the whole ring — that's just the free electrons. The physics everyone cares about is the two short terms tacked on the end."
          />
          <ColorCodedEquation
            tokens={[
              { text: "H = −iv_F " },
              { text: "Σₐ₌₁ⁿ Σσ ∫dx ψ†ₐσ(x)∂ₓψₐσ(x)", color: TEAL },
              { text: "  +  " },
              { text: "λS₁·J(x₁)", color: VIOLET },
              { text: "  +  " },
              { text: "λ*S₂·J(x₂)", color: EMBER },
            ]}
            legend={[
              { label: "Σₐ₌₁ⁿ Σσ ∫dx ψ†ₐσ∂ₓψₐσ", color: TEAL, desc: "the free kinetic term — n channels, 2 spin projections, integrated around the ring" },
              { label: "λS₁·J(x₁)", color: VIOLET, desc: "impurity 1's coupling to the electron spin current at x₁" },
              { label: "λ*S₂·J(x₂)", color: EMBER, desc: "impurity 2's coupling — λ*, the complex conjugate of λ — at x₂" },
            ]}
          />
          <ColorCodedEquation
            tokens={[{ text: "J(x) = ½ Σₐ ψ†ₐα(x) σαβ ψₐβ(x)" }]}
            legend={[{ label: "J(x)", color: "var(--ink-soft)", desc: "the SU(2)ₙ current — the total electron spin density at position x, summed over all n channels" }]}
          />
        </div>
      </Reveal>

      {/* intro 7 — ring geometry */}
      <Reveal delay={460}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={7} total={ITOTAL} phrase="Two impurities on a ring — forward scattering only" color={VIOLET} />
          <Paragraph
            original="...the impurities S1,2 are located at x1,2 on a ring of circumference L. ...it retains only forward scattering, with impurity backscattering and direct impurity–impurity interactions absent. As a result, the energies are independent of the impurity positions."
            explanation="A concrete, checkable claim. Because electrons only move one way around the ring (no backscattering, no impurity-impurity interaction), the actual positions x₁ and x₂ never enter the energy spectrum at all — try to break that below."
          />
          <RingGeometryDiagram />
        </div>
      </Reveal>

      {/* intro 8 — solution pipeline */}
      <Reveal delay={480}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={8} total={ITOTAL} phrase="From Hamiltonian to free energy: the solution pipeline" color={EMBER} />
          <Paragraph
            original="The exact solution follows from a generalized thermodynamic Bethe Ansatz, yielding the defect free energy and Affleck–Ludwig g-function."
            explanation={
              <>
                One sentence, five steps. The{" "}
                <GlossaryTerm id="betheansatz">Bethe Ansatz</GlossaryTerm> solves the Hamiltonian exactly; the{" "}
                <GlossaryTerm id="tba">thermodynamic Bethe Ansatz</GlossaryTerm> extends that to finite
                temperature; the output is the free energy and the{" "}
                <GlossaryTerm id="gfunction">g-function</GlossaryTerm> — every curve elsewhere on this site.
              </>
            }
          />
          <SolutionPipelineDiagram />
        </div>
      </Reveal>

      {/* intro 9 — effective couplings, cut off */}
      <Reveal delay={500}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={9} total={ITOTAL} phrase="The effective coupling: magnitude c and phase φ" color={TEAL} />
          <Paragraph
            original="Introducing the effective couplings c̃ = ce^(iφ) = 2λ/(1 − ¾λ²) and c̃* = ce^(−iφ) = 2λ*/(1 − ¾(λ*)²), we define the..."
            explanation="One last change of variables before the paper turns to the Bethe equations themselves: instead of the bare coupling λ, everything downstream is written in terms of an effective coupling with a clean magnitude c and phase φ — φ is exactly what becomes the α you've been dragging throughout this site."
          />
          <ColorCodedEquation
            tokens={[
              { text: "c̃ = ce" },
              { text: "iφ", color: VIOLET },
              { text: " = 2λ/(1 − ¾λ²)          c̃* = ce" },
              { text: "−iφ", color: EMBER },
              { text: " = 2λ*/(1 − ¾(λ*)²)" },
            ]}
            legend={[
              { label: "c", color: "var(--ink-soft)", desc: "the effective coupling's magnitude" },
              { label: "φ", color: VIOLET, desc: "the effective coupling's phase — becomes the α used everywhere on this site" },
            ]}
          />
          <div className="rounded-xl border-2 border-dashed p-4" style={{ borderColor: "var(--line)" }}>
            <p className="text-xs leading-relaxed text-ink-soft">
              This is exactly where the paper&apos;s own text breaks across a page — &ldquo;we define the...&rdquo;
              continues on the next page. Send the next chunk whenever you&apos;re ready and it&apos;ll pick up
              right here.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Basic quantum mechanics (spin operators, Hamiltonians) — nothing beyond that is assumed.",
            "Everything else is explained inline — click any dotted-underline term, or drag any live control.",
          ]}
          observations={[
            "α is the same variable throughout this entire site — dragging it here moves it everywhere else too.",
            "Every image on this page is either the paper's own figure (labeled and explained) or a generated diagram built to fill a gap the paper's figures don't cover.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips
          terms={[
            "ptsymmetric",
            "nonhermitian",
            "multichannel",
            "kondo",
            "rg",
            "betheansatz",
            "ysr",
            "impuritystring",
            "tower",
            "gfunction",
            "gtheorem",
            "tba",
            "cft",
            "wzw",
            "chiral",
            "defect",
            "marginal",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 1 — Abstract & Introduction"
          prompt="The reader has just gone through the paper's abstract (13 concepts: the PT-symmetric non-Hermitian model, channel count, complex-conjugate couplings, RG invariants, the four phases, PT breaking, the free energy/g-function, entropy endpoints, tower reorganization, YSR/cyclic flow, the g-theorem conjecture, and the breakdown-of-monotonicity payoff) followed by the introduction (9 concepts: the ordinary defect-flow picture, the chiral WZW formulation, the non-Hermitian-criticality research landscape, why this defect actually flows unlike earlier ones, the marginally-relevant operator mechanism, the microscopic Hamiltonian eq. 1, the ring geometry and forward-scattering-only structure, the Bethe-Ansatz-to-g-function solution pipeline, and the effective coupling c̃/φ). Explain how these fit together as one continuous argument, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
