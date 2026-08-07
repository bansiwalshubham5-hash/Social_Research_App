import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { ReferenceExplorer } from "./refs/ReferenceExplorer";
import { ReferenceNetworkDiagram } from "./refs/ReferenceNetworkDiagram";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const EMBER = "var(--ember)";

export function Page6Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Acknowledgments &amp; references
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div className="rounded-xl border-2 border-dashed p-5" style={{ borderColor: EMBER }}>
          <p className="font-serif text-3xl font-bold text-ink">
            Built on<span style={{ color: EMBER }}>.</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            No paper stands alone. Page 6 is genuinely different from every other page here — no equations,
            no phase diagram, just the 30 works this one leans on, plus the one line of thanks that closes
            it. Grouped below by what each reference actually contributed, not just listed in numeric order.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Paragraph
          original="Acknowledgments: We thank Colin Rylands for his careful review of the manuscript and for his valuable comments and insightful discussions. This work was supported by the Swiss National Science Foundation under Division II (Grant No. 200020-219400)."
          explanation="Already shown in full on page 5 — repeated here because this is genuinely where it sits in the paper, right before the reference list itself."
        />
      </Reveal>

      <Reveal delay={100}>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The same 30 references, as a network
          </p>
          <ReferenceNetworkDiagram />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            30 references, grouped by role — tap a group to expand
          </p>
          <ReferenceExplorer />
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={["Nothing — this page is a reference list, readable on its own."]}
          observations={[
            "Refs. [13]-[18] are the direct predecessors this paper generalizes — one impurity to two, single channel to n channels (page 1, concept 4).",
            "Refs. [24]-[25] are the real quantum-dot experiments page 2 (concept 2) and the Applications section reference for the fractional-entropy prediction.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["kondo", "cft", "gtheorem", "betheansatz"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 6 — Acknowledgments & References"
          prompt="The reader is looking at page 6: the paper's acknowledgments and its 30 references, grouped by role (foundational Kondo/Bethe Ansatz work, CFT and the g-theorem, non-Hermitian Kondo predecessors, the broader non-Hermitian criticality landscape, integrability/TBA methods, and experimental confirmations). Explain how this reference list situates the paper within its field, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
