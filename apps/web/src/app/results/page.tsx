import { SectionShell, Prose } from "@/components/SectionShell";
import { PhaseDiagramBar } from "@/components/PhaseDiagramBar";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const RESULTS = [
  {
    title: "1. Kondo phase — the boring, expected result",
    color: "#6d5ef0",
    body: "For 0<α<π/2, both impurities are overscreened by the surrounding electrons, exactly like the ordinary (Hermitian) multichannel Kondo effect. The impurity entropy decreases monotonically from 2ln2 to 2ln[2cos(π/(n+2))] as T drops — a clean, single-tower RG flow that agrees with defect conformal field theory. Nothing here breaks the rules physicists expected.",
  },
  {
    title: "2. Zero-mode phase — the surprise",
    color: "#0ea5a5",
    body: "Past α=π/2, zero-energy 'impurity string' solutions appear in the exact Bethe Ansatz spectrum, splitting the excitations into two towers (zero-mode-I) or three (zero-mode-II, only for n≥3). The remarkable part: the ultraviolet and infrared fixed points are IDENTICAL to the Kondo phase's — same 2ln2, same 2ln[2cos(π/(n+2))] — yet the entropy curve connecting them develops a real overshoot or undershoot. Matching endpoints does not guarantee a monotonic path between them.",
  },
  {
    title: "3. YSR phase — where the method itself breaks down",
    color: "#e0524a",
    body: "For nπ/2<α<(n/2+1)π, the fundamental impurity strings acquire genuinely complex conjugate energies — PT symmetry spontaneously breaks. The paper is upfront that a real-spectrum thermodynamic Bethe Ansatz doesn't apply here, so no entropy curve is computed for this window, and neither is one shown in the Simulation section. In YSR-I the impurities are screened by these single-particle modes in the ground state; in YSR-II they're unscreened in the ground state but screened in an excited state.",
  },
  {
    title: "4. Local-moment phase — a flow that goes in a circle",
    color: "#e8a23d",
    body: "Past α=(n/2+1)π, PT symmetry is restored and both impurities end up fully unscreened. The RG trajectory is cyclic — it returns to the same weak-coupling fixed point (2ln2) in both the ultraviolet and infrared, rather than connecting two different fixed points, with overshoot and undershoot in between.",
  },
];

export default function ResultsPage() {
  return (
    <SectionShell eyebrow="Section ④ — Results" title="What the exact solution actually shows">
      <Reveal>
        <Prose>
          <p>
            As α increases from 0, the Bethe Ansatz solution passes through four qualitatively
            different phases (Fig. 1 in the paper). This is the same α you dragged in the Simulation
            section — here&apos;s what each stretch of it means.
          </p>
        </Prose>
      </Reveal>

      <Reveal delay={140}>
        <PhaseDiagramBar />
      </Reveal>

      <div className="flex flex-col gap-4">
        {RESULTS.map((r, i) => (
          <Reveal key={r.title} delay={120 + i * 150}>
            <ResultCard title={r.title} color={r.color} body={r.body} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <div className="rounded-xl border border-line bg-violet-soft/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
            The headline finding
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            The Affleck–Ludwig g-theorem is the usual guarantee that boundary/impurity entropy flows
            monotonically between RG fixed points — a kind of second law for defects. This paper shows
            that a real spectrum and matching, CFT-correct UV/IR entropies are <em>not sufficient</em>{" "}
            to guarantee that monotonicity once the system is genuinely non-Hermitian: the
            reorganization of excitations into multiple towers is enough to break it on its own. The
            authors conjecture a generalized g-theorem survives only in the single-tower Kondo phase
            (0&lt;α&lt;π/2) — establishing exactly when it does or doesn&apos;t remains, in their own
            words, an open problem.
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Results"
          prompt="Explain the paper's four-phase results and why the zero-mode phase's nonmonotonic entropy flow is the paper's central surprise relative to the Affleck-Ludwig g-theorem, at the requested depth level."
        />
      </Reveal>
    </SectionShell>
  );
}

function ResultCard({ title, color, body }: { title: string; color: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-line bg-paper-raised p-4">
      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
      <div>
        <h3 className="font-medium text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
      </div>
    </div>
  );
}
