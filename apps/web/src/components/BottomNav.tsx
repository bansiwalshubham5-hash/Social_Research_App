"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FlaskConical,
  Waves,
  Sigma,
  BarChart3,
  Lightbulb,
  FileText,
  BookOpenText,
} from "lucide-react";

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/experiment", label: "Experiment", icon: FlaskConical },
  { href: "/simulation", label: "Simulation", icon: Waves },
  { href: "/math", label: "Math", icon: Sigma },
  { href: "/results", label: "Results", icon: BarChart3 },
  { href: "/applications", label: "Applications", icon: Lightbulb },
  { href: "/paper", label: "Paper", icon: FileText },
  { href: "/pages", label: "Pages", icon: BookOpenText },
];

// A native-app-style bottom tab bar — fixed to the viewport, safe-area aware,
// horizontally scrollable so all sections stay reachable with one thumb.
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper-raised/95 backdrop-blur-md"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-0.5 overflow-x-auto px-1.5 pt-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname === t.href || pathname.startsWith(`${t.href}/`);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex min-w-[64px] shrink-0 flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 text-center transition ${
                active ? "text-violet-strong" : "text-ink-soft active:bg-line-soft"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.75} />
              <span className={`text-[10px] leading-none ${active ? "font-semibold" : "font-medium"}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
