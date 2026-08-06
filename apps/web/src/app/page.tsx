import { Hero } from "@/components/Hero";
import { KnowledgeNav } from "@/components/KnowledgeNav";
import { EntropyExplorer } from "@/components/simulation/EntropyExplorer";

export default function Home() {
  return (
    <div className="pb-4">
      <Hero />
      <section className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-[0_1px_2px_rgba(21,20,28,0.04),0_12px_32px_-12px_rgba(21,20,28,0.16)] md:p-7">
          <EntropyExplorer variant="embedded" />
        </div>
      </section>
      <div className="h-12" />
      <KnowledgeNav />
    </div>
  );
}
