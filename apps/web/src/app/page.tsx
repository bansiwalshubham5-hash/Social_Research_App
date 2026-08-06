import { AppHeader } from "@/components/AppHeader";
import { Feed } from "@/components/feed/Feed";
import { seedPosts } from "@/lib/seed-posts";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="min-h-0 flex-1">
        <Feed posts={seedPosts} />
      </main>
    </>
  );
}
