import { Atom, Search, Bell } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200/70 bg-white px-4 dark:border-neutral-800/70 dark:bg-neutral-950">
      <div className="flex items-center gap-2">
        <Atom size={20} strokeWidth={1.75} className="text-indigo-500" />
        <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Interactive Science
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
        >
          <Search size={16} />
        </button>
        <button
          aria-label="Notifications"
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
        >
          <Bell size={16} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
