import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { PTSymmetryIllustration } from "./PTSymmetryIllustration";
import { PaperFigure } from "./PaperFigure";
import { VariableExplorer } from "@/components/math/VariableExplorer";
import { EntropyExplorer } from "@/components/simulation/EntropyExplorer";
import { AiTutorPanel } from "@/components/ai/AiTutorPanel";
import { Reveal } from "@/components/Reveal";

export function Page1Full() {
  return (
    <div className="flex flex-col gap-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Title, abstract, and introduction
          </p>
          <DepthBadge depth="full" />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Paragraph
          original="We study a PT-symmetric non-Hermitian multichannel Kondo model consisting of a pair of spin-1/2 impurities coupled to n conduction-electron channels through complex-conjugate Kondo couplings."
          explanation={
            <>
              This is the paper&apos;s one-sentence summary of its own setup: two{" "}
              <GlossaryTerm id="impurity">tiny magnetic objects</GlossaryTerm> sitting in a sea of
              conduction electrons, coupled to them in a special way (complex-conjugate strengths)
              that makes the whole system{" "}
              <GlossaryTerm id="ptsymmetric">PT-symmetric</GlossaryTerm>.
            </>
          }
        />
      </Reveal>

      <Reveal delay={120}>
        <PTSymmetryIllustration />
      </Reveal>

      <Reveal delay={160}>
        <Paragraph
          original="The impurity renormalization-group (RG) flow is characterized by two invariants: the Kondo scale T_K, generalizing the conventional Kondo temperature, and a dimensionless parameter α measuring the departure from Hermiticity."
          explanation={
            <>
              As you cool the system down, its behavior changes — that change is called{" "}
              <GlossaryTerm id="rg">RG flow</GlossaryTerm>. Two numbers control everything about
              that flow here: an energy scale T_K (where the interesting physics happens) and a
              single dimensionless number α (which of four qualitatively different behaviors you
              get). α is the slider in this platform&apos;s Simulation section.
            </>
          }
        />
      </Reveal>

      <Reveal delay={200}>
        <Paragraph
          original="As α increases, the exact Bethe Ansatz solution reveals four impurity phases: overscreened Kondo (0<α<π/2), zero mode (π/2<α<nπ/2), Yu–Shiba–Rusinov (nπ/2<α<(n/2+1)π), and local moment (α>(n/2+1)π)."
          explanation={
            <>
              The paper&apos;s headline result in one sentence — four distinct regimes as α grows,
              solved exactly (not approximately) via the{" "}
              <GlossaryTerm id="betheansatz">Bethe Ansatz</GlossaryTerm>. See the{" "}
              <a href="/results" className="text-violet-strong hover:underline">
                Results
              </a>{" "}
              section for the full walkthrough of all four.
            </>
          }
        />
      </Reveal>

      <Reveal delay={240}>
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
            Try it — drag α and watch the phase change
          </p>
          <EntropyExplorer variant="embedded" />
          <p className="text-sm leading-relaxed text-ink-soft">
            This is the exact object the paragraph above is describing — not a stylized cartoon.
            Drag α across the boundaries and the phase badge above the plot switches between the four
            regimes, live.
          </p>
        </div>
      </Reveal>

      <Reveal delay={280}>
        <PaperFigure
          src="/images/fig1-phase-diagram.png"
          width={1700}
          height={506}
          alt="Figure 1 from the paper: phase diagram of the n-channel Kondo model showing Kondo, zero-mode, YSR, and local-moment phases as alpha increases, with excitation towers drawn for each"
          label="Fig. 1"
          explanation={
            <>
              This is the paper&apos;s own figure — the same four phases you just drove in the
              simulation above, drawn as excitation-energy diagrams. Each vertical comb is an{" "}
              <GlossaryTerm id="tower">excitation tower</GlossaryTerm>: one tower in the Kondo phase,
              splitting into two and then three as{" "}
              <GlossaryTerm id="impuritystring">impurity strings</GlossaryTerm> appear. The
              background color marks whether{" "}
              <GlossaryTerm id="ptsymmetric">PT symmetry</GlossaryTerm> is unbroken (blue/green) or
              spontaneously broken (red, the YSR phase).
            </>
          }
        />
      </Reveal>

      <Reveal delay={320}>
        <Paragraph
          original="In the Kondo phase, the defect RG flow connects the ultraviolet and infrared conformal fixed points, with the impurity entropy flowing from 2 ln 2 to 2 ln[2cos(π/(n+2))], in agreement with defect conformal field theory."
          explanation={
            <>
              A concrete number you can watch move: at high temperature the two decoupled
              spin-1/2 impurities contribute entropy ln 2 each (2 ln 2 total — pure &ldquo;I don&apos;t
              know which state it&apos;s in&rdquo; uncertainty). Cool the system down and conduction
              electrons partially screen that uncertainty away, so the entropy settles at a smaller,
              n-dependent value. This is exactly the{" "}
              <GlossaryTerm id="gfunction">g-function</GlossaryTerm> — the standard measure of
              &ldquo;how much boundary entropy is left&rdquo; in defect CFT.
            </>
          }
        />
      </Reveal>

      <Reveal delay={360}>
        <PaperFigure
          src="/images/fig2-entropy-curves.png"
          width={1700}
          height={502}
          alt="Figure 2 from the paper: impurity entropy S_imp as a function of T/T_K for different alpha values and different channel numbers, showing monotonic decrease from 2ln2 to a lower plateau"
          label="Fig. 2"
          explanation={
            <>
              Left panel: the entropy curve from the simulation above, plotted the way the paper
              plots it — smoothly decreasing from ln 4 (= 2 ln 2) down to a plateau, for a few values
              of α. Right panel: the same curve at fixed α = π/4 for channel numbers n = 1 through 6 —
              more channels means a higher infrared plateau, exactly the{" "}
              <span className="font-mono text-ink">2 ln[2cos(π/(n+2))]</span> formula above. Try
              changing n in the simulation and watch this plateau move.
            </>
          }
        />
      </Reveal>

      <Reveal delay={400}>
        <Paragraph
          original="Our exact solution shows, however, that neither a real spectrum nor ultraviolet and infrared defect entropies consistent with defect CFT are sufficient to guarantee RG irreversibility: in the zero-mode phase, the impurity entropy develops intermediate overshoots and undershoots between distinct ultraviolet and infrared fixed-point values."
          explanation={
            <>
              This is the paper&apos;s title, in one sentence. The{" "}
              <GlossaryTerm id="gtheorem">g-theorem</GlossaryTerm> is physicists&apos; usual guarantee
              that this kind of entropy only ever decreases as you cool a system — never bounces back
              up. Past α = π/2, extra zero-energy impurity strings reorganize the spectrum into
              multiple towers, and the entropy genuinely stops being{" "}
              <GlossaryTerm id="nonmonotonic">monotonic</GlossaryTerm> — it dips or bumps on the way
              down. Push α past π/2 in the simulation above and watch the curve stop being a smooth
              slide.
            </>
          }
        />
      </Reveal>

      <Reveal delay={440}>
        <Paragraph
          original="Quantum impurity systems provide canonical realizations of integrable defect renormalization-group (RG) flows. In the multichannel Kondo effect, a localized spin is screened by conduction electrons through a defect RG flow connecting ultraviolet and infrared conformal defect fixed points."
          explanation={
            <>
              Sets the stage: the ordinary{" "}
              <GlossaryTerm id="kondo">Kondo effect</GlossaryTerm> is already a well-understood
              example of a{" "}
              <GlossaryTerm id="defect">defect</GlossaryTerm> flowing between two{" "}
              <GlossaryTerm id="cft">conformal field theory</GlossaryTerm> fixed points — a
              &ldquo;hot&rdquo; unscreened one and a &ldquo;cold&rdquo; screened one. This paper
              asks what happens to that familiar picture once you make it{" "}
              <GlossaryTerm id="nonhermitian">non-Hermitian</GlossaryTerm>.
            </>
          }
        />
      </Reveal>

      <Reveal delay={480}>
        <Paragraph
          original="Unlike previous non-Hermitian conformal defects, which remain critical, our defect is perturbed by a classically marginal operator that becomes marginally relevant, generating an integrable defect RG flow."
          explanation={
            <>
              A technical but important distinction: some non-Hermitian models stay
              scale-invariant forever (nothing flows). This one doesn&apos;t — it has a{" "}
              <GlossaryTerm id="marginal">marginally relevant operator</GlossaryTerm>, the exact
              mechanism that also drives the ordinary Kondo effect, giving a genuine, non-trivial
              RG flow to study.
            </>
          }
        />
      </Reveal>

      <Reveal delay={520}>
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
            The Hamiltonian, eq. (1) — click any symbol
          </p>
          <VariableExplorer />
          <p className="text-sm leading-relaxed text-ink-soft">
            This is a{" "}
            <GlossaryTerm id="chiral">chiral</GlossaryTerm> formulation of a{" "}
            <GlossaryTerm id="multichannel">multichannel Kondo</GlossaryTerm> model — see{" "}
            <a href="/experiment" className="text-violet-strong hover:underline">
              Experiment
            </a>{" "}
            for the full walkthrough of why each piece is there.
          </p>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <PrereqAndObservations
          prerequisites={[
            "Basic quantum mechanics (spin operators, Hamiltonians) — nothing beyond that is assumed.",
            "The rest is explained inline via the glossary terms (click any dotted-underline word).",
          ]}
          observations={[
            "The complex-conjugate pairing (λ, λ*) is the one modeling choice that makes everything downstream in the paper possible.",
            "This is explicitly a chiral, forward-scattering-only formulation — a deliberate simplification made to keep the model exactly solvable.",
            "The paper's central claim — a real spectrum and correct CFT endpoints are not enough to guarantee monotonic entropy flow — is something you can reproduce yourself in the simulation embedded above.",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips
          terms={[
            "impurity",
            "rg",
            "cft",
            "wzw",
            "ptsymmetric",
            "nonhermitian",
            "chiral",
            "kondo",
            "multichannel",
            "defect",
            "marginal",
            "gfunction",
            "gtheorem",
            "nonmonotonic",
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 1"
          prompt="The reader is on page 1 of the paper: the title, abstract, and introduction, including the Hamiltonian (eq. 1), the four-phase result, the entropy flow values, and the breakdown-of-monotonicity claim. Explain what this page establishes and why the complex-conjugate coupling choice matters, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
