"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Scroll-triggered progressive reveal — content unfolds as the reader moves
// through a section instead of dumping everything at once. Fires once
// (content already on screen at mount reveals almost immediately; content
// further down reveals as it scrolls into view). prefers-reduced-motion is
// handled entirely in CSS (see .reveal in globals.css) rather than in JS,
// so there's no synchronous setState-from-effect and no hydration risk.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
