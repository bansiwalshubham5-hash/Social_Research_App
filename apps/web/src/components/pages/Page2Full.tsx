import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { EquationCard } from "@/components/EquationCard";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

export function Page2Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The RG invariant, the phase diagram, and the Bethe Ansatz equations
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Paragraph
          original="For 0<α<π/2 the spectrum remains real, and the defect entropy flows from 2ln2 to 2ln[2cos(π/(n+2))]... Notably, such fractional entropy has recently been measured experimentally in Hermitian Kondo systems."
          explanation={
            <>
              The paper immediately grounds itself in reality: the fractional entropy value it
              predicts here isn&apos;t hypothetical — a closely related quantity has actually been{" "}
              measured in real quantum-dot devices. See{" "}
              <a href="/applications" className="text-violet-strong hover:underline">
                Applications
              </a>{" "}
              for the citations.
            </>
          }
        />
      </Reveal>

      <Reveal delay={140}>
        <EquationCard label="The RG invariant, defined precisely" equation="α = π|sin φ| / c">
          <p className="text-ink-soft">
            <GlossaryTerm id="rg">
              This single dimensionless number
            </GlossaryTerm>{" "}
            — built from the coupling&apos;s phase φ and magnitude-related parameter c — is what
            &ldquo;measures the departure from Hermiticity and determines the impurity phase
            diagram.&rdquo; It&apos;s the slider throughout this platform.
          </p>
        </EquationCard>
      </Reveal>

      <Reveal delay={200}>
        <Paragraph
          original="When 0 < α < π/2, corresponding to the overscreened Kondo phase, the solutions of the Bethe equations in the thermodynamic limit satisfy the string hypothesis and organize into p-strings."
          explanation={
            <>
              In the &ldquo;normal&rdquo; phase, the exact solution&apos;s building blocks (
              <GlossaryTerm id="rapidity">rapidities</GlossaryTerm>) arrange themselves into
              regular patterns called{" "}
              <GlossaryTerm id="stringhypothesis">p-strings</GlossaryTerm> — the same structure
              found in the ordinary, Hermitian Kondo problem.
            </>
          }
        />
      </Reveal>

      <Reveal delay={260}>
        <Paragraph
          original="For π/2 < α < nπ/2, corresponding to the zero mode phase, additional impurity-string solutions appear, whose energies vanish identically in the thermodynamic limit."
          explanation={
            <>
              Past α=π/2, brand-new solutions appear that didn&apos;t exist before — extra{" "}
              <GlossaryTerm id="impuritystring">impurity strings</GlossaryTerm> with exactly zero
              energy. Their appearance is the microscopic origin of the nonmonotonic entropy curve
              you can watch in the{" "}
              <a href="/simulation" className="text-violet-strong hover:underline">
                Simulation
              </a>{" "}
              section.
            </>
          }
        />
      </Reveal>

      <Reveal delay={320}>
        <Paragraph
          original="For nπ/2 < α < (n/2+1)π, corresponding to the YSR phases, the higher-order impurity strings persist, while the fundamental impurity strings acquire the complex energies E⁽¹⁾ = −2T_K e^(−i(πn/2−α)), signaling spontaneous PT-symmetry breaking."
          explanation={
            <>
              Here the exact solution&apos;s energies stop being real numbers — a{" "}
              <GlossaryTerm id="ysr">YSR</GlossaryTerm> state has formed, and PT symmetry has
              spontaneously broken. This is exactly the window where this platform&apos;s
              Simulation section honestly shows no curve rather than a fabricated one.
            </>
          }
        />
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Page 1 (the Hamiltonian and PT symmetry) — this page builds directly on it.",
            "Bethe Ansatz basics, explained inline via the glossary.",
          ]}
          observations={[
            "α combines both the magnitude and phase of the original coupling into one number — that's exactly why a single slider can capture this whole rich phase diagram.",
            "The zero-mode regime only exists for n≥2 channels — for n=1, the transition goes directly from Kondo to YSR with no zero-mode phase in between.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["betheansatz", "rapidity", "stringhypothesis", "impuritystring", "ysr", "overscreened"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 2"
          prompt="The reader is on page 2 of the paper: the precise definition of alpha, the start of the phase-diagram discussion (Kondo, zero-mode, and the onset of the YSR phase), and the string-hypothesis structure of the Bethe Ansatz solutions. Explain this page's content at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
