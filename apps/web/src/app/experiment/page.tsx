import { SectionShell, Prose } from "@/components/SectionShell";
import { ExperimentSimulation } from "@/components/experiment/ExperimentSimulation";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";
import { EXPERIMENT_STEPS } from "@/lib/experiment-steps";

export default function ExperimentPage() {
  return (
    <SectionShell eyebrow="Section ① — Experiment" title="The setup, exactly as the paper defines it">
      <Reveal delay={120}>
        <Prose>
          <p>
            This is a theory paper — there is no physical lab bench, no measured
            data, no apparatus you could photograph. Being honest about that
            matters more than pretending otherwise: what follows is the{" "}
            <em>theoretical experiment</em>, run end to end below — the exact
            setup the authors define and then solve exactly, built up one step
            at a time and looping continuously. Every variable and the governing
            expression for each step is labeled live; pause it, or jump straight
            to a step, whenever you want to look closer.
          </p>
        </Prose>
      </Reveal>

      <Reveal>
        <ExperimentSimulation />
      </Reveal>

      <Reveal delay={200 + EXPERIMENT_STEPS.length * 140}>
        <div className="rounded-xl border border-dashed border-line bg-line-soft/50 p-4 text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">A source of confusion worth heading off:</strong> &ldquo;non-Hermitian&rdquo;
          does not mean &ldquo;unphysical.&rdquo; It&apos;s the standard language for any system that exchanges energy
          or particles with something outside the model — here, effectively, a Hamiltonian description of gain
          and loss balanced just so (PT symmetry) rather than a closed, isolated system. See{" "}
          <a href="/applications" className="text-violet-strong hover:underline">
            Applications
          </a>{" "}
          for where such couplings actually arise physically.
        </div>
      </Reveal>

      <Reveal delay={200 + (EXPERIMENT_STEPS.length + 1) * 140}>
        <AiTutorPanel
          sectionName="Experiment"
          prompt="Explain the theoretical setup of this paper's model (two impurities on a ring, n conduction channels, complex-conjugate Kondo couplings, PT symmetry, chiral/forward-scattering-only formulation) — walk through why each modeling choice is made, at the requested depth level."
        />
      </Reveal>
    </SectionShell>
  );
}
