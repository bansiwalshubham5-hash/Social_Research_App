// Post/Page model — see docs/02-prd.md §3.1 and docs/06-technical-architecture.md.
// Lives here (not packages/shared-types) until a second consumer (API/worker
// app) actually needs it — see Doc 6's note on not over-building the monorepo
// split before Doc 15 (MVP Scope) forces the real cut line.

export type PageType =
  | "simulation"
  | "image"
  | "ai_explanation"
  | "graph"
  | "equation_walkthrough"
  | "paper_pdf"
  | "dataset"
  | "references"
  | "discussion";

export type Provenance = "author" | "ai_generated";

export interface BasePage {
  id: string;
  type: PageType;
  provenance: Provenance;
  title: string;
}

export interface SimulationPage extends BasePage {
  type: "simulation";
  templateId: "projectile-motion"; // more templates land as they're built
}

export interface ImagePage extends BasePage {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface AiExplanationPage extends BasePage {
  type: "ai_explanation";
  level: "school" | "undergraduate" | "postgraduate" | "phd";
  body: string;
}

export interface GraphPage extends BasePage {
  type: "graph";
  description: string;
}

export interface EquationWalkthroughPage extends BasePage {
  type: "equation_walkthrough";
  equation: string;
  explanation: string;
}

export interface PaperPdfPage extends BasePage {
  type: "paper_pdf";
  fileName: string;
  pageCount: number;
}

export interface DatasetPage extends BasePage {
  type: "dataset";
  fileName: string;
  rowCount: number;
}

export interface ReferencesPage extends BasePage {
  type: "references";
  references: string[];
}

export interface DiscussionPage extends BasePage {
  type: "discussion";
  commentCount: number;
}

export type Page =
  | SimulationPage
  | ImagePage
  | AiExplanationPage
  | GraphPage
  | EquationWalkthroughPage
  | PaperPdfPage
  | DatasetPage
  | ReferencesPage
  | DiscussionPage;

export interface Author {
  id: string;
  name: string;
  institution?: string;
  verified: boolean;
  avatarInitials: string;
}

export interface Post {
  id: string;
  title: string;
  field: string;
  author: Author;
  pages: Page[]; // ordered — simulation first when present, per PRD §3.1
  likeCount: number;
  commentCount: number;
}
