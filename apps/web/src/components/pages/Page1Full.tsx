import { DepthBadge, Paragraph, PrereqAndObservations, TermChips } from "./PageChrome";
import { GlossaryTerm } from "./GlossaryTerm";
import { VariableExplorer } from "@/components/math/VariableExplorer";
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

      <Reveal delay={140}>
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

      <Reveal delay={260}>
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

      <Reveal delay={320}>
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

      <Reveal delay={380}>
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
          ]}
        />
      </Reveal>

      <Reveal delay={140}>
        <TermChips terms={["impurity", "rg", "cft", "wzw", "ptsymmetric", "nonhermitian", "chiral", "kondo", "multichannel", "defect", "marginal"]} />
      </Reveal>

      <Reveal delay={140}>
        <AiTutorPanel
          sectionName="Page 1"
          prompt="The reader is on page 1 of the paper: the title, abstract, and introduction, including the Hamiltonian (eq. 1). Explain what this page establishes and why the complex-conjugate coupling choice matters, at the requested depth level."
        />
      </Reveal>
    </div>
  );
}
