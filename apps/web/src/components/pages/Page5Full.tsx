import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { ConceptHeading } from "./abstract/ConceptHeading";
import { PaperFigure } from "./PaperFigure";
import { NumericVsExactBadge } from "./results2/NumericVsExactBadge";
import { OvershootMagnitudeChart } from "./results2/OvershootMagnitudeChart";
import { ResultsChecklist } from "./results2/ResultsChecklist";
import { LiveEntropyGraph } from "./shared/LiveEntropyGraph";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";
const TEAL = "#0ea5a5";
const TOTAL = 8;

export function Page5Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The paper&apos;s payoff, concept by concept
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: VIOLET }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Confirmed<span style={{ color: VIOLET }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Other groups had already glimpsed this crossover numerically. This page is where the exact
            solution catches up to — and explains — what those simulations saw, then pushes one phase
            further into territory nobody had reached analytically before: the local-moment phase, where the
            same endpoint hides a wild detour in between.
          </p>
        </div>
      </Reveal>

      {/* 1 — Fig 3 */}
      <Reveal delay={80}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={1} total={TOTAL} phrase="Fig. 3, straight from the paper: monotonic becomes nonmonotonic" color={VIOLET} />
          <Paragraph
            original="Fig. 3 shows the impurity entropy in the zero-mode phase. Although the ultraviolet and infrared fixed-point entropies remain unchanged, increasing α from π/2 toward nπ/2 drives the impurity entropy from a monotonic to a nonmonotonic temperature dependence. The nonmonotonicity becomes more pronounced with increasing channel number."
            explanation={
              <>
                Page 4&apos;s two- and three-tower free energies, plotted. Left: same endpoints, but the
                curve dips below <span className="font-mono">ln2</span> before rising as α grows. Right: more
                channels makes the dip deeper — exactly the{" "}
                <GlossaryTerm id="nonmonotonic">nonmonotonic</GlossaryTerm> behavior page 1&apos;s abstract
                promised.
              </>
            }
          />
          <PaperFigure
            src="/images/fig3-entropy-curves.png"
            width={1700}
            height={506}
            alt="Figure 3 from the paper: impurity entropy in the zero-mode phase, left panel showing the monotonic-to-nonmonotonic transition with alpha, right panel showing the effect deepening with channel number"
            label="Fig. 3"
            explanation="Needed here — the paper's own numerical evaluation of the two/three-tower free energy from page 4, the direct visual confirmation of the reorganization concepts 3 and 6 (page 3-4) predicted."
          />
        </div>
      </Reveal>

      {/* 2 */}
      <Reveal delay={100}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={2} total={TOTAL} phrase="From numerics to an exact explanation" color={EMBER} />
          <Paragraph
            original="While the crossover from monotonic to nonmonotonic impurity entropy was previously observed numerically using the non-Hermitian numerical renormalization group, the present exact Bethe Ansatz solution provides its analytical explanation by identifying the emergence of zero-energy impurity strings and the associated reorganization of the thermodynamic Bethe Ansatz into multiple excitation towers."
            explanation="Worth pausing on: this specific curve-shape change wasn't a new discovery of this paper. What's new is having an exact mechanism for it — not 'the simulation shows a dip' but 'here is the precise string solution responsible.'"
          />
          <NumericVsExactBadge />
        </div>
      </Reveal>

      {/* 3 — YSR out of scope, no widget */}
      <Reveal delay={120}>
        <Paragraph
          original="As discussed above, in the YSR phase the spontaneous breaking of PT symmetry renders the impurity spectrum complex, so that a straightforward thermodynamic Bethe Ansatz analysis is no longer applicable."
          explanation={
            <>
              A one-sentence reminder, restated for the third time across this paper (page 1, concept 10;
              page 2, concept 7): the{" "}
              <GlossaryTerm id="ysr">YSR</GlossaryTerm> phase&apos;s complex spectrum is explicitly outside
              what TBA can compute. Every plot on this platform honestly shows nothing there, rather than
              faking a curve.
            </>
          }
        />
      </Reveal>

      {/* 4 — local moment entropy recap, no widget */}
      <Reveal delay={140}>
        <Paragraph
          original="In the local-moment phase, PT symmetry is restored, and the energies of both the fundamental and higher-order impurity strings again vanish in the thermodynamic limit. Consequently, the impurity entropy is determined from the same excitation-tower construction as in the zero-mode phase, with the free-energy contributions given by Eq. (21). Using the asymptotic solutions in Eqs. (13) and (14), the impurity entropy approaches 2ln2 in both the ultraviolet and infrared limits, consistent with the cyclic RG flow."
          explanation="No new machinery needed — the local-moment phase reuses page 4's three-tower construction exactly (concept 7), just evaluated where every impurity-string energy has vanished (page 2, concept 9). Both endpoints land back on 2ln2, matching the cyclic RG flow from page 1."
        />
      </Reveal>

      {/* 5 */}
      <Reveal delay={160}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={5} total={TOTAL} phrase="Fig. 4 revisited: how big is the overshoot?" color={TEAL} />
          <Paragraph
            original="As shown in Fig. 4, the intermediate-temperature crossover exhibits both overshooting and undershooting before returning to 2ln2."
            explanation="Page 1 (concept 12) already showed Fig. 4's actual curves. Here's the same data from a different angle: how the size of the overshoot and undershoot changes across the three α values the paper plots."
          />
          <OvershootMagnitudeChart />
          <LiveEntropyGraph
            n={4}
            defaultAlphaOverPi={3.4}
            minAlphaOverPi={3.02}
            maxAlphaOverPi={4.3}
            accent={EMBER}
            caption="The local-moment window (α past (n/2+1)π=3π for n=4), live. Both endpoints sit at exactly 2ln2 no matter where you drag α — and the curve still visibly dips away from that flat line in between, this platform's own solver confirming the same qualitative overshoot/undershoot as Fig. 4 above. (That figure's own dramatic swing is at a different n and α than this slider reaches — shown here as the paper's own numerics, not reproduced live, to keep this graph's every point exact.)"
          />
        </div>
      </Reveal>

      {/* 6 */}
      <Reveal delay={180}>
        <div className="flex flex-col gap-4">
          <ConceptHeading index={6} total={TOTAL} phrase="What was solved, exactly" color={VIOLET} />
          <Paragraph
            original="We have solved exactly a PT-symmetric multichannel Kondo line defect by a generalized thermodynamic Bethe Ansatz. In the Kondo and zero-mode phases, the defect RG flow connects the same ultraviolet and infrared conformal defect fixed points as in the Hermitian theory, whereas the YSR phase spontaneously breaks PT symmetry and lies beyond the scope of our thermodynamic Bethe Ansatz. The local-moment phase instead exhibits cyclic RG flow, returning to the local-moment fixed point with impurity entropy 2ln2 in both the ultraviolet and infrared limits."
            explanation="The paper's own summary of its results, four pages of derivation compressed into four claims."
          />
          <ResultsChecklist />
        </div>
      </Reveal>

      {/* 7 — g-theorem, no widget */}
      <Reveal delay={200}>
        <Paragraph
          original="The Kondo phase, where excitations are organized into a single thermodynamic tower, satisfies RG irreversibility, suggesting that a generalized Affleck–Ludwig g-theorem survives small departures from Hermiticity. By contrast, our exact solution of the zero-mode phase shows that a real spectrum and the correct ultraviolet and infrared defect CFT g-values are not sufficient: once zero-energy impurity strings reorganize the spectrum into multiple excitation towers, the g-function becomes nonmonotonic and the RG flow reversible. Establishing the precise conditions for such a generalized g-theorem remains an important open problem."
          explanation={
            <>
              The paper&apos;s closing scientific claim, and its honest limit: the{" "}
              <GlossaryTerm id="gtheorem">g-theorem</GlossaryTerm> plausibly survives in the single-tower
              Kondo phase (page 1, concept 11) but provably fails once multiple towers appear — and the
              authors explicitly leave the general boundary as an open problem rather than overclaiming.
            </>
          }
        />
      </Reveal>

      {/* 8 — acknowledgments, no widget */}
      <Reveal delay={220}>
        <div className="rounded-xl border border-line bg-paper-raised p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Acknowledgments</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            &ldquo;We thank Colin Rylands for his careful review of the manuscript and for his valuable
            comments and insightful discussions. This work was supported by the Swiss National Science
            Foundation under Division II (Grant No. 200020-219400).&rdquo;
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Pages 3-4 (the TBA free energy and multi-tower construction) — this page shows what those formulas produce.",
            "Nothing beyond that is assumed — every equation and term is explained inline.",
          ]}
          observations={[
            "The overshoot/undershoot in concept 5 is the same phenomenon page 1's hook ('Breakdown.') built its whole argument around — you're now seeing exactly how large it actually is.",
            "The open problem in concept 7 is genuinely open — this platform doesn't claim an answer the paper doesn't give.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["nonmonotonic", "ysr", "gtheorem", "tower"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 5 — Results and Conclusion"
          prompt="The reader has just gone through page 5 broken into 8 concepts: Fig. 3 (the monotonic-to-nonmonotonic transition in the zero-mode phase), the numeric-to-exact upgrade this paper provides, why the YSR phase stays out of scope, the local-moment entropy construction, a fresh look at Fig. 4's overshoot magnitudes, the paper's own results checklist, the g-theorem conjecture and its honest limits, and the acknowledgments. Explain how this page ties together the derivations from pages 3-4 into the paper's final scientific claims, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
