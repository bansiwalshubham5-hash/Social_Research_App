import {
  Image as ImageIcon,
  FileText,
  Table2,
  BookMarked,
  MessageSquare,
  Sigma,
  LineChart,
} from "lucide-react";
import type { Page } from "@/lib/types";
import { ProjectileMotionSimulation } from "@/components/simulations/ProjectileMotionSimulation";
import { ProvenanceBadge } from "./ProvenanceBadge";

function PlaceholderPage({
  icon,
  title,
  subtitle,
  provenance,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  provenance: Page["provenance"];
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-6 p-6 md:p-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
            {subtitle}
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            {title}
          </h2>
        </div>
        <ProvenanceBadge provenance={provenance} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl bg-neutral-50 text-neutral-400 dark:bg-neutral-900/60 dark:text-neutral-600">
        {icon}
        {children}
      </div>
    </div>
  );
}

export function PageRenderer({ page }: { page: Page }) {
  switch (page.type) {
    case "simulation":
      return <ProjectileMotionSimulation />;

    case "image":
      return (
        <PlaceholderPage
          icon={<ImageIcon size={48} strokeWidth={1.25} />}
          title={page.title}
          subtitle="Scientific Diagram"
          provenance={page.provenance}
        >
          {page.caption && (
            <p className="max-w-md px-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {page.caption}
            </p>
          )}
        </PlaceholderPage>
      );

    case "ai_explanation":
      return (
        <div className="flex h-full w-full flex-col gap-6 p-6 md:p-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
                AI Explanation &middot; {page.level}
              </p>
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                {page.title}
              </h2>
            </div>
            <ProvenanceBadge provenance={page.provenance} />
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            {page.body}
          </p>
        </div>
      );

    case "graph":
      return (
        <PlaceholderPage
          icon={<LineChart size={48} strokeWidth={1.25} />}
          title={page.title}
          subtitle="Interactive Graph"
          provenance={page.provenance}
        >
          <p className="max-w-md px-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            {page.description}
          </p>
        </PlaceholderPage>
      );

    case "equation_walkthrough":
      return (
        <div className="flex h-full w-full flex-col gap-6 p-6 md:p-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
                Equation
              </p>
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                {page.title}
              </h2>
            </div>
            <ProvenanceBadge provenance={page.provenance} />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-xl bg-neutral-50 dark:bg-neutral-900/60">
            <Sigma size={32} strokeWidth={1.25} className="text-indigo-400" />
            <p className="font-mono text-2xl text-neutral-900 dark:text-neutral-50">
              {page.equation}
            </p>
            <p className="max-w-md px-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
              {page.explanation}
            </p>
          </div>
        </div>
      );

    case "paper_pdf":
      return (
        <PlaceholderPage
          icon={<FileText size={48} strokeWidth={1.25} />}
          title={page.title}
          subtitle="Research Paper"
          provenance={page.provenance}
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {page.fileName} &middot; {page.pageCount} pages
          </p>
        </PlaceholderPage>
      );

    case "dataset":
      return (
        <PlaceholderPage
          icon={<Table2 size={48} strokeWidth={1.25} />}
          title={page.title}
          subtitle="Dataset"
          provenance={page.provenance}
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {page.fileName} &middot; {page.rowCount.toLocaleString()} rows
          </p>
        </PlaceholderPage>
      );

    case "references":
      return (
        <div className="flex h-full w-full flex-col gap-6 p-6 md:p-10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
                References
              </p>
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                {page.title}
              </h2>
            </div>
            <ProvenanceBadge provenance={page.provenance} />
          </div>
          <ol className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            {page.references.map((ref, i) => (
              <li key={i} className="flex gap-3">
                <BookMarked
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-indigo-400"
                />
                <span>{ref}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "discussion":
      return (
        <PlaceholderPage
          icon={<MessageSquare size={48} strokeWidth={1.25} />}
          title={page.title}
          subtitle="Community Discussion"
          provenance={page.provenance}
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {page.commentCount} comments
          </p>
        </PlaceholderPage>
      );
  }
}
