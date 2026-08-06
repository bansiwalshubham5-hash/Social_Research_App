import { Sparkles, UserCheck } from "lucide-react";
import type { Provenance } from "@/lib/types";

// Every AI-touched page must be visibly labeled — see docs/01 (trust
// requirement) and docs/02-prd.md §3.1 (non-negotiable provenance tag).
export function ProvenanceBadge({ provenance }: { provenance: Provenance }) {
  if (provenance === "ai_generated") {
    return (
      <span className="flex shrink-0 items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
        <Sparkles size={12} strokeWidth={2} />
        AI-generated
      </span>
    );
  }
  return (
    <span className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
      <UserCheck size={12} strokeWidth={2} />
      Author
    </span>
  );
}
