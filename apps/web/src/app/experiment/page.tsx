import { SectionShell, Prose } from "@/components/SectionShell";
import { CinematicScene } from "@/components/CinematicScene";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    title: "Place two impurities on a ring",
    body: "Two spin-1/2 magnetic impurities, S₁ and S₂, sit at fixed positions x₁ and x₂ on a ring of circumference L. The ring isn't a literal experimental apparatus — it's periodic boundary conditions, the standard trick for keeping a 1D many-body problem finite and exactly solvable.",
  },
  {
    title: "Surround them with n channels of conduction electrons",
    body: "Instead of one \"flavor\" of itinerant electron, the ring carries n independent channels (n=1 is the ordinary single-channel Kondo problem; the paper studies general n and plots results for n=1 through 6). More channels means more ways for electrons to screen each impurity's spin — this is what a plain Hermitian Kondo problem calls overscreening.",
  },
  {
    title: "Couple them with complex-conjugate strengths",
    body: "Impurity 1 couples to the electron spin current via strength λ; impurity 2 couples via λ* — the complex conjugate. Individually, a complex coupling makes the Hamiltonian non-Hermitian (energies could go complex, probabilities wouldn't conserve). But pairing λ with λ* makes the whole Hamiltonian PT-symmetric: invariant under simultaneously swapping parity (impurity 1 ↔ impurity 2) and reversing time. That symmetry is what keeps the spectrum real — until it doesn't (see Applications and Results for what breaks it).",
  },
  {
    title: "Keep only forward scattering",
    body: "The chiral formulation used here deliberately drops impurity backscattering and direct impurity-impurity interaction. That's not an approximation made for convenience — it's what makes the model exactly solvable via the Bethe Ansatz, and it's why the energies end up independent of where x₁, x₂ actually sit on the ring.",
  },
];

export default function ExperimentPage() {
  return (
    <SectionShell eyebrow="Section ① — Experiment" title="The setup, exactly as the paper defines it">
      <Reveal>
        <div className="dark mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-paper">
          <CinematicScene />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <Prose>
          <p>
            This is a theory paper — there is no physical lab bench, no measured
            data, no apparatus you could photograph. Being honest about that
            matters more than pretending otherwise: what follows is the{" "}
            <em>theoretical experiment</em> — the exact setup the authors define
            and then solve exactly, step by step.
          </p>
        </Prose>
      </Reveal>

      <div className="flex flex-col gap-5">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={200 + i * 140}>
            <div className="flex gap-4 rounded-xl border border-line bg-paper-raised p-4">
              <div
                className="badge-pop flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-soft text-xs font-semibold text-violet-strong"
                style={{ animationDelay: `${200 + i * 140 + 150}ms` }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-medium text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200 + STEPS.length * 140}>
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

      <Reveal delay={200 + (STEPS.length + 1) * 140}>
        <AiTutorPanel
          sectionName="Experiment"
          prompt="Explain the theoretical setup of this paper's model (two impurities on a ring, n conduction channels, complex-conjugate Kondo couplings, PT symmetry, chiral/forward-scattering-only formulation) — walk through why each modeling choice is made, at the requested depth level."
        />
      </Reveal>
    </SectionShell>
  );
}
