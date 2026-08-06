# Document 5: User Journey Maps

Four journeys, chosen to cover the highest-stakes paths in the product: first-time consumption (has to hook someone in the first session), the AI-generated publish flow (the core differentiator — has to earn researcher trust), the manual teaching-post flow (the persona 4-specific path Doc 4 flagged as underscoped), and goal-directed search (the practicing-engineer path, different shape from idle browsing).

Each stage lists: **Action → Thought/Feeling → Pain point → Design implication.**

---

## Journey A: First-time consumption (Persona 1 — Student, arrives via a shared link)

| Stage | Action | Thought/Feeling | Pain point if unhandled | Design implication |
|---|---|---|---|---|
| Arrival | Clicks a shared post link (e.g., from a classmate or professor) mid-lecture-review | "Let's see what this is" — skeptical, low patience | If it demands signup before showing any content, they bounce immediately | **Shared post links must render the full post (simulation included) before any signup wall** — signup can gate saving/following/commenting, not viewing |
| First page (simulation) | Lands directly on the simulation page (per PRD default ordering) | "Oh, I can actually move this" — curiosity spike | If the simulation is slow to load or the controls aren't obviously interactive, the moment is lost in seconds | Simulation must be interactive within ~1-2s of page load; controls need obvious affordance (sliders/switches visibly draggable, not just labeled) |
| Horizontal swipe | Swipes to AI explanation / diagram pages out of curiosity | "This explains the part I didn't get from the sim" | If the AI explanation just restates the abstract in simpler words without connecting to what they just manipulated, it feels redundant | AI explanation should reference the simulation's variables directly ("notice what happened when you increased X") — ties pages together instead of feeling like disconnected content |
| Realizing it's social | Notices like/comment/follow affordances, discussion thread | "Wait, people are actually discussing this" — surprise, re-evaluates the platform as a community, not a tool | If the discussion thread is empty (cold-start problem from Doc 2 §7), it undercuts the "community" impression right when it mattered most | Reinforces the Doc 2 cold-start risk — early posts need seeded discussion, not just seeded content |
| Return trigger | Scrolls vertically once, out of curiosity about what else exists | "Is this feed actually good, or was that one post a fluke?" | If the next 2-3 posts in the feed are lower quality (no simulation, weak AI extraction), first impression collapses | Feed algorithm for early users should bias toward highest-quality/most-complete posts, not strict reverse-chron, until there's enough volume that reverse-chron is reliably good — a deliberate, temporary exception to the PRD §3.3 default |
| Signup | Prompted to sign up when trying to follow/save/comment | "I'll sign up since I already got value" — the conversion the whole journey was building toward | If signup is generic (no continuity from what they were doing), they lose the moment and may not return | Signup flow should preserve context — resume exactly where they were (same post, same page) immediately after |

---

## Journey B: AI-generated publish flow (Persona 3 — Researcher publishing their own paper)

| Stage | Action | Thought/Feeling | Pain point if unhandled | Design implication |
|---|---|---|---|---|
| Upload | Uploads their paper PDF (+ optionally dataset/figures) | Cautiously optimistic, but reputation-conscious — "this represents my work publicly" | Uncertainty about what happens next (how long, what gets generated) creates anxiety | Show a clear processing pipeline status (parsing → extracting → generating visuals → generating simulation → ready for review), not a black-box spinner |
| Processing wait | Waits for pipeline (Extract → Generate visuals → Generate simulation, per PRD §3.2) | If simulation generation fails the feasibility/correctness gate, they need to understand *why*, not just see it silently missing | Silent absence reads as a bug, not a deliberate quality decision | Explicitly show "no simulation generated for this paper" with a one-line reason (e.g., "subject matter not yet supported for simulation") — turns the quality gate from confusing into trustworthy |
| Review & Publish queue | Reviews each AI-generated page (summary, diagrams, equations) | High scrutiny specifically on anything that could misrepresent their findings | If editing is clunky (e.g., can't easily correct a wrong AI summary sentence, only regenerate-or-accept whole sections) they lose trust in the tool and possibly abandon | Every AI-generated page needs inline, granular editing — not just "accept" or "regenerate from scratch" |
| Publish | Confirms and publishes | Relief + a bit of exposure anxiety ("now it's live and public") | If there's no way to unpublish/edit after the fact, a spotted error post-publish becomes a credibility crisis | Author must retain full edit/unpublish rights on their own posts indefinitely, not just pre-publish |
| Post-publish | Watches for engagement (views, follows, comments) | Validates whether this was worth the effort vs. traditional publishing | If engagement is invisible/delayed, they don't come back to publish a second paper | Basic analytics (views, saves, engagement) visible to the author from day one — this is part of what makes creating on the platform worth it over arXiv alone |

---

## Journey C: Manual teaching-post creation (Persona 4 — Professor building original teaching content, not tied to a new paper)

| Stage | Action | Thought/Feeling | Pain point if unhandled | Design implication |
|---|---|---|---|---|
| Entry point | Looks for "create a post" without having a paper to upload | Expects a paper-upload-first flow (since that's the platform's headline mechanic) and may not realize a from-scratch path exists | If the manual editor is only reachable *from* a failed/partial AI generation, professors building original teaching content never find it | Manual creation (Path B) needs its own clear entry point in the UI, not just a fallback surfaced mid-AI-pipeline — directly actionable in the wireframes (Doc 10) |
| Building the post | Assembles pages: writes explanation, embeds existing simulation template (per PRD §3.2 Path B: "configure a simulation from a template"), attaches diagrams/images | Wants this to feel as fast as writing a good lecture slide, not like software development | If simulation templates are rigid or the editor requires understanding the underlying parametrization deeply, it's slower than just... making slides, and they give up | Simulation templates need sensible defaults and a simple parameter-adjustment UI — professors shouldn't need to understand the simulation engine internals |
| Attribution | Publishes with their verified profile | Wants credit as an educator, not just implicitly bundled with "researcher" posts | If the platform visually treats all posts identically, teaching content doesn't get the "great explainer" recognition it deserves distinct from "novel research" | Post metadata should optionally flag content type (original research vs. educational/explainer) — mentioned as a UI/data model consideration for Doc 7/10, not necessarily user-facing filtering at launch |

---

## Journey D: Goal-directed search (Persona 2 — Practicing Engineer solving a real problem)

| Stage | Action | Thought/Feeling | Pain point if unhandled | Design implication |
|---|---|---|---|---|
| Entry | Arrives via search (not the feed) with a specific technical question | Time-pressured, task-focused, not browsing for enjoyment | If the platform funnels them into the feed instead of directly answering, it wastes their limited time and they don't return | Search results should deep-link straight to the most relevant *page* of a post (e.g., straight to the simulation or AI explanation), not just the post's default landing page |
| Evaluation | Skims AI summary + simulation to judge applicability | Needs a fast yes/no on relevance | If the summary is generic/abstract-only rather than practically framed, they can't quickly tell if it applies to their problem | AI summary should include a "key findings" / practical-implication framing (already in PRD §3 extraction tier) — this persona is exactly why that field matters, not just "nice to have" |
| Deep dive | Manipulates the simulation with parameters close to their real-world case | "Does this actually hold under my conditions?" | If simulation parameter ranges are locked to the paper's original experimental range with no indication why, they can't test edge cases relevant to them | Simulations should expose the valid parameter range clearly (and ideally explain *why* it's bounded there) rather than silently clamping or breaking outside it |
| Follow-through | Bookmarks/saves for later reference at work | Wants to retrieve this quickly next time without re-searching | If saved items aren't organized (just a flat list), it becomes useless after a few dozen saves | Collections/folders for saved posts (PRD §3.4, P1) matter more for this persona than any other — worth prioritizing if this persona proves to be a strong early-adoption segment |

---

## Cross-journey patterns worth carrying into design

1. **Trust is earned or lost in single moments repeatedly** — the empty discussion thread (Journey A), the silent missing simulation (Journey B), the rigid template (Journey C), and the locked parameter range (Journey D) are all the same failure mode: the system does something reasonable but doesn't *explain itself*, and silence reads as brokenness. Prioritize system transparency (status, reasoning, limits) as a design principle across the whole product, not just error states.
2. **Cold-start risk shows up in three of four journeys independently** (A's empty discussion, B's "why publish here vs. arXiv" analytics need, and implicitly D's search only being useful once there's enough content) — reinforces that Doc 2 §7's content-seeding plan isn't optional polish, it's a launch blocker.
3. **The manual creation path is under-designed relative to its importance** — Journey C surfaced entry-point and template-complexity issues that don't have PRD answers yet. Worth a closer look when we get to Doc 10 (Wireframes).
