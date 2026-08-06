# Document 2: Product Requirements Document (PRD)

## 1. Product summary

A social platform where the unit of content is a **Post**: one research paper or piece of research material, transformed into a swipeable, multi-page interactive experience (simulation → images/diagrams → AI explanation → graphs → paper/PDF → references → discussion), arranged in a vertical, Instagram-style feed. Posts are created two ways — **AI-generated** from uploaded material, or **manually built** by a user — and both produce the same post structure. Launch domain: physics & engineering, serving students, engineers, researchers, and professors.

## 2. Goals (what "working" looks like for v1)

| Goal | Metric |
|---|---|
| The AI pipeline reliably turns raw material into a good post | ≥70% of AI-generated posts require no more than minor author edits before publish (measured via edit-diff size) |
| The core interaction model is genuinely engaging | Median session includes horizontal swipes on ≥3 posts (proof people explore *within* posts, not just scroll past) |
| Researchers trust the platform enough to use it | A minimum number of verified researchers/professors publish at least one post in the first 90 days post-launch — exact target needs a real number once a distribution channel exists, not assumed here |
| Simulations are actually correct | Zero publicly-flagged "this simulation is scientifically wrong" incidents that go uncorrected more than 48 hours (a trust SLA, not aspirational) |

## 3. Core product pillars

### 3.1 The Post

- A Post has an **ordered page stack**. Canonical page types: `simulation`, `image/diagram`, `ai_explanation`, `graph`, `equation_walkthrough`, `paper_pdf`, `dataset`, `references`, `discussion`. Simulation leads when present; otherwise the highest-value available page leads (author/AI can override default order).
- Every page carries a **provenance tag**: `author` (uploader wrote/uploaded it directly) or `ai_generated` (system produced it). Rendered visibly on every AI-touched page (e.g., a small "AI-generated — via [model]" badge). Non-negotiable per the trust requirement in Doc 1.
- A Post has exactly one **primary research artifact** (the paper/material it's built from) and belongs to exactly one **author account** (the uploader), even if the underlying paper has multiple real-world co-authors. Co-author linking is P1, not P0 (see Non-Goals).

### 3.2 Post creation — two paths, one output shape

**Path A — AI-generated pipeline** (the platform's core differentiator):

1. **Ingest**: user uploads a paper/PDF, dataset, images, video, or supporting material — or provides a DOI/arXiv ID for open-access fetch.
2. **Understand**: parse structure (sections, equations, figures, references, terminology) using document parsing + an LLM pass.
3. **Extract** (high-confidence, always attempted): AI summary, key findings, definitions, equations-with-explanations, timeline, reference list. This is the "safe" tier — ships even if nothing else works.
4. **Generate visuals** (medium-confidence): diagrams/illustrations of concepts. Attempted per-concept, not forced platform-wide.
5. **Generate simulation** (quality-gated): a *feasibility classifier* decides whether the paper's subject matter maps to a supported simulation type (initially: mechanics, circuits, waves, thermo, EM, control systems). If yes, generate a parametrized interactive sim. If no — or if generated but fails a correctness self-check — no simulation page is created, rather than shipping a wrong one. This is the single most important quality gate in the product.
6. **Assemble**: pages ordered into a draft Post.
7. **Review gate — confirmed**: no centralized moderation queue blocks publishing. The person who *initiated* the post (the uploader for author-uploaded material, or the user who triggered an open-access ingestion) lands in their own "Review & Publish" queue, can edit/remove/reorder any AI-generated page, and publishes directly — self-review by the creator, not a platform gatekeeper. This applies uniformly across both content tracks (§4): every post has an initiating account responsible for reviewing it before it goes live, even when the underlying source material is open-access.
   - Consequence for §4: open-access ingestion is not "system-authored with no owner" — it's attributed to whichever user triggered the ingestion, who is accountable for reviewing it, same as any other uploader. The "claim this paper" flow still matters for the *original real-world author* (e.g., the professor who wrote the paper) to later take formal ownership if someone else ingested their work, but it is a re-attribution flow, not a review gate.
   - Trust implication: since there's no moderation backstop before publish, post-publish signals (community flagging, the simulation quality gate in step 5, and rapid takedown/correction tooling) carry more weight — detailed further in the Security Plan (Doc 12) and Risk Analysis (Doc 14).

**Path B — Manual creation**: a structured editor lets a user build the same page stack directly — upload their own images/diagrams, write explanations, embed a dataset/graph, attach a PDF, and (P1, not P0) configure a simulation from a template rather than generate one. This is the escape valve when AI generation is weak or wrong, and how users without a "paper" (e.g., a professor building a teaching post) participate.

Both paths write to the *same* Post schema — a hard architectural constraint carried into the Database Schema and API Design docs.

### 3.3 Feed & navigation

- **Vertical scroll** = moves between distinct Posts (the "for you" / following feed).
- **Horizontal swipe** = moves between pages *within* the current Post.
- Simulation page leads by default when one exists.
- Feed ranking for v1: reverse-chronological + follow graph is sufficient; ML-based relevance ranking is explicitly P2 — don't build a recommendation system before there's enough content/engagement data for one to beat chronological.

### 3.4 Social layer

- **P0**: profiles (basic + verified-researcher variant), follow, like, comment, bookmark/save, per-paper discussion thread.
- **P1**: collections, share, citations-on-profile, notifications beyond basic activity.
- **P2**: DMs, live discussions/events — not needed to validate the core thesis.

### 3.5 AI assistant (chat-style, separate from the generation pipeline)

- **P0**: explain-this-post at a chosen level (school/undergrad/grad/PhD), Q&A grounded in the specific paper.
- **P1**: quizzes, flashcards, cross-paper comparison.
- **P2**: fully personalized learning paths — valuable, but needs a content graph that doesn't exist yet at launch.

### 3.6 Search

- **P0**: full-text search over titles/abstracts/authors/terms.
- **P1**: DOI/arXiv lookup, faceted filters (field, simulation-available, institution).
- **P2**: equation search, image/visual search.

## 4. Content & IP model

Two clearly-separated content tracks, both live at launch:

- **Author-uploaded**: the uploader attests they hold rights (arXiv/SSRN-style click-through attestation, logged with timestamp/account for legal traceability). Full editorial control via the Review & Publish gate.
- **Open-access ingested**: sourced only from feeds/APIs whose license explicitly permits redistribution and derivative works (e.g., arXiv's CC-licensed subset, PubMed Central OA subset) — not a general scraper against paywalled publisher content. Every such post is visibly labeled "sourced from [X], unclaimed," with a claim flow and a takedown-request path from day one. Full legal treatment in the Security Plan and Risk Analysis.

## 5. Explicit non-goals for v1

- Chemistry/biology/full ML-visualization simulation types (physics/engineering only at launch)
- Native mobile apps (responsive web first — first-class on mobile *browser*, not a native app)
- Personalized ML-driven feed ranking and learning-path generation
- Monetization/billing features (see below)
- Multi-author/co-author account linking, institutional admin tooling

## 6. Business model — TBD, flagged not assumed

Monetization has not been decided. It's carried as an open question into the MVP Scope (Doc 15) and Development Roadmap (Doc 11) rather than assumed. The data model (Doc 7) will be designed so a future paywall/subscription/institutional tier doesn't require a rebuild. Ads are a poor fit given the platform's premium design philosophy, so realistic candidates are subscription, institutional licensing, or a grow-first-monetize-later approach — to be presented as sequenced options with a recommendation once revisited.

## 7. Top product risks (brief; full Risk Analysis is Doc 14)

- **Simulation correctness at AI-generation scale** is the single biggest trust risk — the quality gate in §3.2 is the mitigation, and it needs to stay a hard gate under pressure to "show more simulations."
- **Content supply cold-start**: open-access ingestion partially solves this, but a physics/engineering feed with no real researchers yet will feel empty — the Roadmap needs a concrete seeding plan (e.g., founder/early-team-curated first N posts).

## Open items carried forward

- Business model (§6) — TBD, to be addressed with options in the Roadmap doc.
