# Planning Documents

This directory holds the founding planning docs for the platform, produced in order and updated as decisions are made. Each doc builds on the confirmed decisions in the ones before it — if an earlier decision changes, downstream docs need a pass to stay consistent.

## Status

| # | Document | Status |
|---|---|---|
| 1 | [Product Vision Refinement](./01-product-vision.md) | Draft |
| 2 | [Product Requirements Document (PRD)](./02-prd.md) | Draft |
| 3 | [Competitor Analysis](./03-competitor-analysis.md) | Draft |
| 4 | [User Personas](./04-user-personas.md) | Draft |
| 5 | User Journey Maps | Not started |
| 6 | Technical Architecture | Not started |
| 7 | Database Schema | Not started |
| 8 | API Design | Not started |
| 9 | Design System | Not started |
| 10 | UI/UX Wireframes | Not started |
| 11 | Development Roadmap | Not started |
| 12 | Security Plan | Not started |
| 13 | Scalability Plan | Not started |
| 14 | Risk Analysis | Not started |
| 15 | MVP Scope | Not started |
| 16 | Future Roadmap | Not started |

## Confirmed decisions (carried forward into every later doc)

- **Launch wedge**: physics & engineering, serious researchers/professors and students as core audience.
- **Post structure**: simulation leads, then images/diagrams, then AI explanation, graphs, paper/PDF, references, discussion — vertical scroll moves between posts, horizontal swipe moves through pages within a post.
- **Post creation**: two parallel paths producing the same post shape — (A) AI pipeline that converts an uploaded paper/material into a full post (simulation + images + explanation, etc.), and (B) manual creation by a user.
- **Content/IP**: both author-uploaded (rights-attestation) and open-access-ingested (arXiv/PMC-style OA sources) tracks, clearly labeled and separated.
- **Simulation quality gate**: no simulation page is shown rather than a wrong one — feasibility/correctness gating, not "always attempt something."

- **Publishing model**: no centralized moderation queue blocks publishing. Whoever initiates a post (uploader, or the user who triggers an open-access ingestion) self-reviews the AI-generated draft in their own "Review & Publish" queue and publishes directly. Post-publish trust relies on community flagging, the simulation quality gate, and takedown tooling rather than pre-publish moderation.
- **Everyone consumes**: creation is a capability layered on every account, not a separate account class — students, engineers, researchers, and professors are all full consumers of the feed by default; creation frequency varies by persona (see Doc 4).

## Open questions not yet resolved

- Business model / monetization — explicitly TBD, to be addressed with options in the Roadmap doc.
