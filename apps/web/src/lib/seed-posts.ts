import type { Post } from "./types";

// Hardcoded demo data for Phase 0 (proving the interaction model).
// Replaced by the real Post/Page tables + AI pipeline per docs/06 and docs/07.

export const seedPosts: Post[] = [
  {
    id: "post-1",
    title: "Projectile Motion Under Variable Gravity",
    field: "Classical Mechanics",
    author: {
      id: "author-1",
      name: "Dr. Amara Osei",
      institution: "MIT Dept. of Physics",
      verified: true,
      avatarInitials: "AO",
    },
    likeCount: 482,
    commentCount: 37,
    pages: [
      {
        id: "p1-sim",
        type: "simulation",
        provenance: "ai_generated",
        title: "Interactive Simulation",
        templateId: "projectile-motion",
      },
      {
        id: "p1-img",
        type: "image",
        provenance: "ai_generated",
        title: "Trajectory Diagram",
        src: "",
        alt: "Diagram of projectile trajectory showing launch angle and range",
        caption:
          "Parabolic trajectory decomposed into horizontal and vertical velocity components.",
      },
      {
        id: "p1-ai",
        type: "ai_explanation",
        provenance: "ai_generated",
        title: "AI Explanation",
        level: "undergraduate",
        body:
          "This paper models how projectile range and max height change as gravitational acceleration varies — relevant for trajectory planning on other planetary bodies. The core result: range scales inversely with g, so a launch that travels 100m on Earth would travel roughly 620m on the Moon at the same velocity and angle.",
      },
      {
        id: "p1-graph",
        type: "graph",
        provenance: "ai_generated",
        title: "Range vs. Gravity",
        description:
          "Range decreases non-linearly as gravitational acceleration increases, holding velocity and angle constant.",
      },
      {
        id: "p1-eq",
        type: "equation_walkthrough",
        provenance: "author",
        title: "Key Equation",
        equation: "R = (v₀² · sin(2θ)) / g",
        explanation:
          "Range R depends on initial velocity v₀, launch angle θ, and gravitational acceleration g. Doubling v₀ quadruples the range; halving g doubles it.",
      },
      {
        id: "p1-pdf",
        type: "paper_pdf",
        provenance: "author",
        title: "Full Paper",
        fileName: "osei-2026-variable-gravity-projectiles.pdf",
        pageCount: 14,
      },
      {
        id: "p1-refs",
        type: "references",
        provenance: "ai_generated",
        title: "References",
        references: [
          "Halliday, D. & Resnick, R. — Fundamentals of Physics, 11th ed.",
          "NASA Technical Report TR-2019-0447 — Lunar Trajectory Planning",
          "Osei, A. et al. (2024) — Ballistic Modeling for Low-Gravity EVA",
        ],
      },
      {
        id: "p1-disc",
        type: "discussion",
        provenance: "author",
        title: "Discussion",
        commentCount: 37,
      },
    ],
  },
  {
    id: "post-2",
    title: "RC Circuit Transient Response: A Teaching Post",
    field: "Electrical Engineering",
    author: {
      id: "author-2",
      name: "Prof. Daniel Kim",
      institution: "Georgia Tech",
      verified: true,
      avatarInitials: "DK",
    },
    likeCount: 219,
    commentCount: 14,
    pages: [
      {
        id: "p2-ai",
        type: "ai_explanation",
        provenance: "author",
        title: "Overview",
        level: "undergraduate",
        body:
          "A resistor-capacitor (RC) circuit's voltage response to a step input follows an exponential curve, characterized by the time constant τ = RC. This post walks through why, built as teaching material independent of any single paper — see docs/04 (Persona 4) and docs/05 (Journey C).",
      },
      {
        id: "p2-eq",
        type: "equation_walkthrough",
        provenance: "author",
        title: "Charging Equation",
        equation: "V(t) = V₀ · (1 − e^(−t/τ))",
        explanation:
          "Capacitor voltage approaches V₀ asymptotically. After one time constant τ, the capacitor reaches ~63% of V₀.",
      },
      {
        id: "p2-graph",
        type: "graph",
        provenance: "author",
        title: "Charge/Discharge Curves",
        description:
          "Exponential charging and discharging curves for three different RC time constants, overlaid for comparison.",
      },
      {
        id: "p2-disc",
        type: "discussion",
        provenance: "author",
        title: "Discussion",
        commentCount: 14,
      },
    ],
  },
  {
    id: "post-3",
    title: "Standing Waves in Bounded Media — Open Access",
    field: "Wave Physics",
    author: {
      id: "author-3",
      name: "arXiv:2601.04821 (unclaimed)",
      verified: false,
      avatarInitials: "AX",
    },
    likeCount: 96,
    commentCount: 5,
    pages: [
      {
        id: "p3-img",
        type: "image",
        provenance: "ai_generated",
        title: "Standing Wave Patterns",
        src: "",
        alt: "Diagram of standing wave nodes and antinodes on a fixed string",
        caption:
          "First three harmonic modes of a string fixed at both ends.",
      },
      {
        id: "p3-ai",
        type: "ai_explanation",
        provenance: "ai_generated",
        title: "AI Explanation",
        level: "undergraduate",
        body:
          "Ingested from an open-access source (§4 of the PRD) — no simulation was generated for this post because the feasibility classifier didn't find a confident match to a supported template yet; showing that transparently here rather than omitting it silently, per Journey B.",
      },
      {
        id: "p3-refs",
        type: "references",
        provenance: "ai_generated",
        title: "References",
        references: [
          "arXiv:2601.04821 — Standing Wave Boundary Conditions in Finite Media",
        ],
      },
      {
        id: "p3-disc",
        type: "discussion",
        provenance: "author",
        title: "Discussion",
        commentCount: 5,
      },
    ],
  },
];
