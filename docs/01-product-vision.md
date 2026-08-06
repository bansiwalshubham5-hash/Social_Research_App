# Document 1: Product Vision Refinement

## The core thesis, sharpened

Research papers fail as a medium for understanding, not because the *science* is inaccessible, but because the *format* is wrong: static, linear, text-and-equation PDFs force every reader — regardless of background — through the same dense path. The bet is that if we decouple scientific *knowledge* from the PDF *artifact* and rebuild it as something layered, visual, and manipulable, comprehension and engagement both go up, for audiences from curious students to domain PhDs.

Two things make this a *platform* instead of just a tool:

1. **The interaction model is proprietary** — the vertical-feed / horizontal-swipe-through-layers structure is a genuine UX invention, not a copy of Instagram or Distill.pub. This is the thing to protect and refine most carefully.
2. **The content loop compounds** — every paper processed makes the AI pipeline (explanations, diagrams, simulations) better at processing the next one, and every researcher who joins brings their audience with them. That's what makes it a network, not a tool.

## What a "Post" actually is

A Post is **one scientific unit of knowledge, rendered as an ordered stack of interchangeable "pages,"** where:

- Page order is a recommended reading path — simulation-first when a simulation exists, otherwise the highest-signal page leads (e.g., AI summary).
- Every page type is optional except that at least one must exist. A post with no simulation, just a paper + AI summary + discussion, is still valid — not every paper *can* get a good simulation, and forcing one produces junk that erodes trust in the whole platform.
- A Post is authored by whoever uploads it (researcher-authored) but *augmented* by AI (system-generated pages). These two provenances are always visually distinguishable to the reader — a reader should never confuse "the author said this" with "the AI inferred this." This is a trust-and-correctness requirement: get it wrong once publicly and it's a credibility crisis for a science platform specifically.

**Working rule**: the simulation-quality bar is a hard gate. The platform is willing to *not* generate a simulation rather than generate a misleading one. This shapes the AI pipeline's acceptance criteria throughout.

## The launch wedge — confirmed

**Physics, engineering, and serious researchers/professors.** Mechanics, circuits, waves, thermodynamics, EM, control systems, signal processing. Reasoning:

- These domains have well-understood, deterministic simulation math (ODEs, circuit equations, wave equations) — buildable with a physics/plotting engine, not a research project in itself. Biology, chemistry, and ML-visualization domains are viable later but each needs materially different simulation infrastructure.
- The audience is large, already online, and primed to want this by existing tools (PhET, Desmos, 3Blue1Brown) — with a natural "share with classmates/colleagues" virality loop.
- It gives the AI pipeline a narrow, learnable domain instead of "understand all of science," which is materially more tractable for reliable summary/diagram/equation-extraction quality.

## The AI's role — three distinct jobs

1. **Extraction** (summaries, key findings, terminology, equations, references) — "read the material and pull structure out." High accuracy achievable, low risk if occasionally imperfect since it's labeled AI-generated and checkable against the source.
2. **Generation** (diagrams, illustrations, simulations) — "invent a new artifact from understanding." Much harder to get right; wrong outputs are actively misleading rather than just unhelpful. This is where the quality gate matters most.
3. **Interaction** (AI assistant Q&A, explaining at different levels, quizzes/flashcards) — conversational and self-correcting in the moment (the user can ask a follow-up), so it tolerates more imperfection than #2.

Build/iteration priority: **Extraction → Interaction → Generation**, because Generation is both the platform's biggest differentiator and its biggest way to lose trust if shipped badly — it deserves the most iteration time, not the least.

## Two audiences, one platform

This is a two-sided network: **creators** (researchers/professors who upload and get discovered) and **learners** (students/engineers/curious people who consume and discuss). They likely need different onboarding, different home-feed defaults, and different success metrics, even though every account can technically do both. Formalized further in Document 4 (User Personas).

## Content & IP sourcing — confirmed: both, clearly separated

- **Author-uploaded**: the uploader attests they hold rights to the material (arXiv/SSRN-style attestation).
- **Open-access ingested**: sourced from feeds/APIs whose license explicitly permits redistribution and derivative works (e.g., arXiv's CC-licensed subset, PubMed Central OA subset) — not a general scraper against paywalled publisher content.

Both tracks are visibly labeled by provenance, with a "claim this paper" flow for open-access posts and a takedown-request path from day one. Full legal treatment in the Security Plan (Doc 12) and Risk Analysis (Doc 14).

## The core mechanism — confirmed

The platform ingests a research paper or research material of essentially any kind and the AI pipeline converts it into a full Post (simulation, images, explanation, graphs, etc.) automatically. Users can *also* build a post manually. Both paths produce the same Post structure — this is a hard constraint carried into the database schema and API design.

## Success framing for the vision (qualitative, metrics detailed in the PRD)

The vision is validated when: a physics/engineering paper that would normally be a 20-page unread PDF instead becomes something a student *plays with* before they read a single equation, and a professor trusts the platform enough to publish their own work on it without fearing the simulation misrepresents their research.
