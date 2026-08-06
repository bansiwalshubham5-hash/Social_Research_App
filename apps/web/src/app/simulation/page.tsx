import { SectionShell, Prose } from "@/components/SectionShell";
import { EntropyExplorer } from "@/components/simulation/EntropyExplorer";
import { Presets } from "@/components/simulation/Presets";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";

export default function SimulationPage() {
  return (
    <SectionShell eyebrow="Section ② — Simulation" title="Drive the exact solution yourself">
      <Prose>
        <p>
          Everything below is computed from the paper&apos;s own thermodynamic Bethe Ansatz (eqs.
          9–21), solved numerically for six channel counts and validated against the paper&apos;s
          stated closed-form checks — not a stylized animation. Moving α doesn&apos;t play a
          pre-baked clip; it re-solves the free energy integral and redraws the real curve.
        </p>
      </Prose>

      <div className="rounded-2xl border border-line bg-paper-raised p-5 md:p-7">
        <EntropyExplorer variant="full" />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Jump to a specific regime
        </p>
        <Presets />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Try this</p>
        <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">
          <li>
            <strong className="text-ink">1.</strong> Start at α ≈ 0.1 and slide up slowly, watching
            the curve — it should stay a smooth S-shape all the way to α = π/2.
          </li>
          <li>
            <strong className="text-ink">2.</strong> Cross π/2. The curve still starts and ends at
            the same two dashed lines — but now watch for a dip or bump appearing mid-curve.
          </li>
          <li>
            <strong className="text-ink">3.</strong> Push into the red YSR window. Notice the plot
            doesn&apos;t fabricate a curve — it tells you exactly why not.
          </li>
          <li>
            <strong className="text-ink">4.</strong> Compare n=2 against n=6 at the same α in the
            zero-mode phase — the paper says nonmonotonicity gets <em>more</em> pronounced with more
            channels. Does it?
          </li>
        </ul>
      </div>

      <AiTutorPanel
        sectionName="Simulation"
        prompt="The reader has been interacting with a live plot of S_imp(T/T_K) controlled by alpha and channel count n. Explain what the alpha slider physically represents, how the plot is actually computed (thermodynamic Bethe Ansatz, not a canned animation), and what to look for as they cross each phase boundary, at the requested depth level."
      />
    </SectionShell>
  );
}
