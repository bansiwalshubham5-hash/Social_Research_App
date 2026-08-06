import { SectionShell, Prose } from "@/components/SectionShell";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";
import { Microscope, Atom, Radio, Sparkles } from "lucide-react";

const APPS = [
  {
    icon: Microscope,
    title: "Fractional Kondo entropy — already measured",
    body: "The paper notes that fractional impurity entropy (the 2ln[2cos(π/(n+2))]-type value) has recently been measured experimentally in ordinary, Hermitian quantum-dot Kondo devices (Child et al. 2022; Piquard et al. 2026). That's the real-world anchor for the quantity this whole platform lets you explore — it's not a purely mathematical abstraction.",
  },
  {
    icon: Radio,
    title: "Open and dissipative quantum systems",
    body: "Non-Hermitian effective Hamiltonians are the standard language for describing a quantum system that's leaking energy or information to an environment you're not tracking in detail — a very common situation in real devices (qubits coupled to noisy baths, quantum dots with finite lifetime states). PT-symmetric couplings, specifically, describe the special case where gain and loss are balanced, which is what keeps the spectrum real over part of the phase diagram.",
  },
  {
    icon: Atom,
    title: "Photonic and cold-atom PT-symmetric platforms",
    body: "PT-symmetric physics isn't confined to condensed matter theory — it's actively engineered in photonic waveguide arrays (balancing optical gain and loss) and cold-atom experiments, both of which have been used to realize and probe PT-symmetric Hamiltonians directly. Those platforms are natural candidates for eventually testing predictions like this paper's non-monotonic entropy flow.",
  },
  {
    icon: Sparkles,
    title: "A stress test for a fundamental theorem",
    body: "Beyond any specific device, this result matters to theoretical physics broadly: the Affleck–Ludwig g-theorem is one of a family of monotonicity theorems (alongside the c-theorem, a-theorem, F-theorem) that constrain how quantum field theories can flow under coarse-graining. Finding a clean, exactly-solvable setting where a real spectrum and correct fixed points AREN'T enough to guarantee monotonicity sharpens what these theorems can and can't promise once Hermiticity is relaxed.",
  },
];

export default function ApplicationsPage() {
  return (
    <SectionShell eyebrow="Section ⑤ — Applications" title="Why this isn't just a mathematical curiosity">
      <Reveal>
        <Prose>
          <p>
            This is fundamental theory, not an engineering paper — so &ldquo;application&rdquo; means
            something more specific here: where does the physics this paper describes actually show
            up, and what does the result constrain?
          </p>
        </Prose>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {APPS.map((a, i) => (
          <Reveal key={a.title} delay={120 + i * 130}>
            <div className="flex flex-col gap-2 rounded-xl border border-line bg-paper-raised p-4">
              <div
                className="badge-pop flex h-8 w-8 items-center justify-center rounded-full bg-violet-soft text-violet-strong"
                style={{ animationDelay: `${120 + i * 130 + 150}ms` }}
              >
                <a.icon size={15} strokeWidth={1.75} />
              </div>
              <h3 className="font-medium text-ink">{a.title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{a.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Applications"
          prompt="Explain why non-Hermitian PT-symmetric Kondo physics matters beyond pure mathematics — connect to open/dissipative quantum systems, photonic and cold-atom PT-symmetric platforms, measured fractional Kondo entropy, and the broader family of RG monotonicity theorems (g-theorem, c-theorem) — at the requested depth level."
        />
      </Reveal>
    </SectionShell>
  );
}
