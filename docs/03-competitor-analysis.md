# Document 3: Competitor Analysis

No single competitor spans this whole space — that's the opportunity, but it also means the real competition is five *different* categories, each of which does one slice well. The risk isn't "someone builds the same thing," it's underestimating how good the best point-solution in each slice already is.

## Category 1 — Research paper discovery & social (ResearchGate, Academia.edu, Semantic Scholar, ResearchHub)

**Strong at**: researcher identity, citation graphs, follow/discussion, large existing paper corpora (Semantic Scholar especially, via its API).

**Missing**: everything is still fundamentally "here's a PDF and a comment section." Zero interactivity, zero simulation, minimal AI-native explanation. ResearchHub has tried social/incentive layers (crypto bounties) but still around the PDF, not past it.

**Gap we exploit**: none of them touch the actual *content* of the paper — they socialize around a static artifact instead of transforming it. This is the whole thesis of Doc 1, and it's genuinely undefended territory.

## Category 2 — AI paper summarization/Q&A tools (Elicit, Consensus, SciSpace, Explainpaper, ChatPDF-style tools)

**Strong at**: exactly the "Extraction" tier from Doc 1 — summaries, Q&A over a PDF, some equation explanation. SciSpace in particular is close to our AI-assistant feature (PRD §3.5).

**Missing**: no simulation generation, no social/feed layer, no persistent "post" as a shareable social object — these are utility tools you use once and leave, not a network you return to daily. No community around a paper.

**Gap we exploit**: they've proven the extraction-tier AI works and there's demand for it, which de-risks part of our Path A pipeline — but they stop exactly where our differentiator (simulation generation + social feed) begins. Worth studying their extraction UX closely; not worth trying to out-summarize them as a standalone feature.

## Category 3 — Interactive simulation platforms (PhET, Wolfram Demonstrations Project, Desmos, Labster)

**Strong at**: this is the bar for simulation quality. PhET in particular is the gold standard for physics — hand-built, pedagogically tested, free, and it's exactly the kind of artifact our AI pipeline needs to approach the quality of. Wolfram Demonstrations shows breadth (thousands of parametrized interactive models) is achievable, though built by domain experts, not AI.

**Missing**: all of these are static libraries, not tied to specific papers, not social, no feed, no AI generation — someone (a human) has to build each simulation by hand. Labster adds narrative/social elements but is closed, institution-licensed, and not paper-driven.

**Gap we exploit**: none of them connect a simulation to *the specific paper that produced the underlying science*, and none generate simulations automatically at scale. This is also the category where we're most exposed if our AI-generated simulations are noticeably worse than PhET's hand-built ones — the quality gate from Docs 1/2 exists specifically because this comparison is inevitable in users' minds.

## Category 4 — Science communication / short-form video (YouTube: 3Blue1Brown, Veritasium, PBS Space Time; TikTok/Reels science creators)

**Strong at**: this is where "science should be enjoyable and social" is already proven at massive scale — 3Blue1Brown alone shows visual, intuitive explanation of hard math/physics draws millions of viewers. It validates the *demand* side of the thesis directly.

**Missing**: one-way (watch, don't manipulate), not connected to primary research papers, no interactivity, no structured learning path, no community discussion tied to the actual science.

**Gap we exploit**: they've proven people *want* visual, intuitive science content in a social-feed-like context (that's literally what YouTube/TikTok recommendation is). We're offering the same appetite but interactive and tied to real primary research instead of a creator's retelling of it.

## Category 5 — Structured social learning (Brilliant.org, Khan Academy)

**Strong at**: interactive problem-solving, course structure, genuinely good UI/UX quality (Brilliant is a reasonable design-quality bar alongside Notion/Linear/Figma, per Doc 1's design philosophy).

**Missing**: curriculum-authored content, not tied to current/primary research, not social/feed-based, not researcher-driven, no upload-your-own-paper mechanism.

**Gap we exploit**: they teach *established* knowledge well; we're aiming at the frontier — actual papers, actual researchers, actual current science — which they structurally can't do since their content pipeline is centrally authored, not user/researcher-generated.

## Positioning statement

Every adjacent category has proven one piece of this thesis works — AI extraction works (Category 2), people want visual/interactive science (Categories 3-4), social layers around research have demand (Category 1), premium interactive-learning UX is achievable (Category 5) — but nobody has combined "built from a real, current research paper" + "AI-generated interactive simulation" + "social feed" into one loop. That combination, not any single feature, is the moat, and it's why the simulation-quality gate and the "same schema for AI-generated and manually-built posts" constraint from the PRD matter so much: they're what stops this from collapsing into "a slightly-social version of Category 2."

## Direct risk to flag

If a well-funded player in Category 2 (SciSpace, Consensus) or Category 1 (Semantic Scholar, backed by AI2) decides to bolt on simulation-generation and a feed, they have a corpus and distribution head start we don't. Speed to a genuinely good simulation-generation pipeline — the hardest technical piece — is the real competitive clock, more than the social/feed layer, which is comparatively easy to build well.
