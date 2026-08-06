import type { Post } from "@/lib/types";
import { PostCard } from "./PostCard";

// Vertical scroll = between Posts, horizontal swipe (inside PostCard) =
// between Pages within a Post. See docs/01-product-vision.md.
export function Feed({ posts }: { posts: Post[] }) {
  return (
    <div className="h-full snap-y snap-mandatory overflow-y-auto scroll-smooth">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
