"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, MessageCircle, Bookmark, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import type { Post } from "@/lib/types";
import { PageRenderer } from "./PageRenderer";

export function PostCard({ post }: { post: Post }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    align: "start",
    watchDrag: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // selectedIndex already starts at 0, matching embla's default startIndex —
    // no initial sync needed, only future 'select' events.
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="relative flex h-full w-full snap-start flex-col bg-white dark:bg-neutral-950">
      <header className="z-10 flex items-center justify-between gap-3 border-b border-neutral-200/70 bg-white/90 px-4 py-3 backdrop-blur md:px-8 dark:border-neutral-800/70 dark:bg-neutral-950/90">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-semibold text-white">
            {post.author.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                {post.author.name}
              </p>
              {post.author.verified && (
                <span
                  title="Verified researcher"
                  className="text-indigo-500 dark:text-indigo-400"
                >
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {post.author.institution ?? post.field}
            </p>
          </div>
        </div>
        <span className="hidden rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 sm:inline dark:bg-neutral-800 dark:text-neutral-400">
          {post.field}
        </span>
      </header>

      <div className="min-h-0 flex-1 px-4 pb-2 pt-3 md:px-8">
        <p className="mb-2 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-50">
          {post.title}
        </p>

        <div className="relative h-[calc(100%-2.5rem)] overflow-hidden rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70">
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {post.pages.map((page) => (
                <div key={page.id} className="h-full min-w-0 flex-[0_0_100%]">
                  <PageRenderer page={page} />
                </div>
              ))}
            </div>
          </div>

          {selectedIndex > 0 && (
            <button
              onClick={scrollPrev}
              aria-label="Previous page"
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-neutral-700 shadow-md transition hover:bg-white md:flex dark:bg-neutral-800/90 dark:text-neutral-200"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {selectedIndex < post.pages.length - 1 && (
            <button
              onClick={scrollNext}
              aria-label="Next page"
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 text-neutral-700 shadow-md transition hover:bg-white md:flex dark:bg-neutral-800/90 dark:text-neutral-200"
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {post.pages.map((page, i) => (
              <button
                key={page.id}
                onClick={() => scrollTo(i)}
                aria-label={`Go to ${page.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === selectedIndex
                    ? "w-5 bg-indigo-500"
                    : "w-1.5 bg-neutral-300 dark:bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="flex items-center gap-6 px-4 py-3 md:px-8">
        <button className="flex items-center gap-1.5 text-neutral-600 transition hover:text-rose-500 dark:text-neutral-300">
          <Heart size={20} strokeWidth={1.75} />
          <span className="text-sm">{post.likeCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-neutral-600 transition hover:text-indigo-500 dark:text-neutral-300">
          <MessageCircle size={20} strokeWidth={1.75} />
          <span className="text-sm">{post.commentCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-neutral-600 transition hover:text-indigo-500 dark:text-neutral-300">
          <Share2 size={20} strokeWidth={1.75} />
        </button>
        <button className="ml-auto flex items-center gap-1.5 text-neutral-600 transition hover:text-amber-500 dark:text-neutral-300">
          <Bookmark size={20} strokeWidth={1.75} />
        </button>
      </footer>
    </section>
  );
}
