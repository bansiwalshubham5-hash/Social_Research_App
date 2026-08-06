"use client";

import { Moon, Sun } from "lucide-react";

// The `.dark` class is applied before hydration by the inline script in
// layout.tsx, so the correct icon is derived purely via CSS (dark:hidden /
// dark:block) rather than React state — avoids a hydration mismatch and an
// effect-driven setState on mount for something CSS already knows.
export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
    >
      <Moon size={16} className="hidden dark:block" />
      <Sun size={16} className="block dark:hidden" />
    </button>
  );
}
