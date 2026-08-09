import { Hero } from "@/components/Hero";
import { KnowledgeNav } from "@/components/KnowledgeNav";
import { KondoVirtualLab } from "@/components/lab/KondoVirtualLab";

export default function Home() {
  return (
    <div className="pb-4">
      <Hero />
      <section className="mx-auto max-w-5xl px-5 md:px-8">
        <KondoVirtualLab />
      </section>
      <div className="h-12" />
      <KnowledgeNav />
    </div>
  );
}
