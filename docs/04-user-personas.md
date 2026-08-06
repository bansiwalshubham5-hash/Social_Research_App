# Document 4: User Personas

## Framing update from Doc 1

Doc 1 initially framed "creators" and "learners" as two sides of a network. Confirmed correction: **everyone consumes** — a professor scrolls the feed and learns from other researchers' posts just as much as a student does. Creation (publishing a post, AI-generated or manual) is an additional capability layered on top of every account, exercised more or less often depending on the persona, not a separate account class. The product should never gate the consumption experience (feed, simulations, discussion, follow, AI assistant) behind "are you a creator" — every persona below gets the full feed experience by default.

All four personas sit inside the confirmed launch wedge (physics & engineering, serious/academic register). A general lay-public "curious enthusiast" persona is deliberately excluded here — it's a plausible future expansion (Doc 16) but not who v1 is designed for, per the wedge decision in Doc 1.

---

## Persona 1: The Student (undergrad/graduate, physics or engineering major)

**Who**: 19-26, studying mechanics/EM/circuits/thermo/signals coursework or doing early research (thesis, lab assistant).

**Primary mode**: heavy consumer. Uses the feed to build intuition for concepts their textbook explains only algebraically — e.g., swiping into a simulation before/instead of reading the paper's equations.

**Goals**: understand hard concepts faster than lecture/textbook alone, keep up with what's happening in their field beyond the syllabus, look credible to peers/professors by engaging with real papers instead of only textbooks.

**Pain points today**: papers are written for peers, not students — dense notation with no on-ramp. YouTube explainers are good but disconnected from the actual paper. No way to *manipulate* the physics to build intuition.

**How the product serves them**: simulation-first posts let them build intuition before decoding notation. AI assistant at "undergraduate" explanation level. Discussion threads let them ask questions that would be embarrassing to ask a professor directly.

**Do they create?** Occasionally — a manually-built post for a class project or personal notes-sharing, rarely an AI-generated post from their own paper (most don't have a first-author paper yet). Low-frequency creator, high-frequency consumer.

---

## Persona 2: The Practicing Engineer (industry, 3-15 years experience)

**Who**: works in an engineering discipline (semiconductor, controls, power, robotics, etc.), needs to stay current with research relevant to their work but has limited time.

**Primary mode**: consumer, but goal-directed rather than browsing — comes in searching for a specific problem ("papers on X control technique") more than scrolling the feed idly.

**Goals**: quickly assess whether a paper is relevant/applicable to a real problem without reading it fully, understand a concept well enough to apply it, not fall behind on the state of the art in a narrow slice of their field.

**Pain points today**: no time to read full papers; AI summarizer tools help but strip out the intuition a simulation would give; no community of peers to sanity-check "does this actually work in practice."

**How the product serves them**: search (PRD §3.6) to jump straight to relevant posts, AI summary + simulation to assess applicability fast, discussion thread to see practitioner commentary (not just academic commentary) on a paper.

**Do they create?** Rarely publishes original papers, but plausibly writes discussion/commentary or manually builds a post distilling a paper for their team — a legitimate, lower-friction creation use case worth designing the manual editor around, not just "researcher publishing their own paper."

---

## Persona 3: The Researcher / PhD Candidate

**Who**: actively producing research (thesis chapters, conference papers, preprints), needs visibility and citation, also needs to track their subfield closely.

**Primary mode**: balanced — significant consumer (tracks their subfield, follows specific researchers, reads related work) *and* a meaningful creator (publishes their own papers as posts, wants them to look good/credible).

**Goals**: get their work seen and understood by more people than a traditional journal/arXiv posting reaches, build a reputation/following, correctly and favorably represent their own research (this is where the "AI provenance labeling" and "self-review before publish" decisions from Docs 1-2 matter most — they need to trust the platform won't misrepresent their work).

**Pain points today**: traditional publishing has near-zero discoverability outside their immediate subfield; social platforms like ResearchGate get engagement but add no value to the paper itself; no way to show *why* their result matters to a non-specialist without writing a separate blog post.

**How the product serves them**: Path A pipeline turns their own paper into a rich post with minimal effort (upload → review → publish), Path B lets them refine/override anything the AI got wrong before it's public, verified profile for credibility, follower/discussion mechanics for actual visibility gains over a static repository listing.

**Do they create?** High-frequency creator relative to other personas, but still spends real time consuming — tracking related work, following peers, is directly part of how they do research.

---

## Persona 4: The Professor / Educator

**Who**: teaches undergrad/grad courses, may also be an active researcher (large overlap with Persona 3), cares about pedagogy specifically, not just publication.

**Primary mode**: both, distinctly from Persona 3 — consumes to find good material to use/reference in teaching (this is a *new* use case, not just "browsing"), and creates specifically to teach, not just to publish original research (e.g., builds a manual post explaining a classic result for their students, independent of publishing new research).

**Goals**: find high-quality interactive material to point students at instead of building it themselves, publish their own research with the credibility/reach benefits from Persona 3, occasionally build teaching-only posts (no novel research, just a great explanation of existing science) — this is the case the manual creation path (PRD §3.2, Path B) needs to support well, since it's not "convert my paper," it's "build a post from scratch to teach a concept."

**Pain points today**: building interactive teaching material (in PhET-style tools) is high-effort per-topic and disconnected from primary literature; no single place to both publish original work *and* curate/teach.

**How the product serves them**: same publish flow as Persona 3 for original research; the manual editor (Path B) as a first-class teaching-content tool, not just a "fallback when AI generation fails"; verified profile signals authority for students deciding what to trust.

**Do they create?** High-frequency creator, but a meaningfully different *kind* of creation than Persona 3 (teaching-focused, not always tied to a new paper) — worth keeping distinct in the PRD/roadmap so the manual editor isn't scoped only around "fix what the AI got wrong."

---

## Cross-persona implications for the product

- The feed, simulations, AI assistant, search, and discussion must be excellent for *every* persona as a consumer — there's no persona for whom consumption is a secondary experience.
- The manual creation path (Path B) has two genuinely different jobs: (1) fixing/overriding AI-generated posts (all creator personas), and (2) building original teaching content with no source paper (Professor persona specifically). The PRD currently frames Path B mostly as job #1 — worth explicitly broadening its scope statement once we get to the UI/UX wireframes (Doc 10).
- Trust and provenance labeling (Doc 1) matters most to Persona 3/4 (their reputation is on the line) but benefits everyone — Persona 1/2 need to know what's AI-inferred vs. author-verified to use it responsibly.
