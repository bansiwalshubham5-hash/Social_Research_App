import Link from "next/link";
import { Download, FlaskConical, Waves, Sigma, BarChart3, Lightbulb } from "lucide-react";
import { SectionShell, Prose } from "@/components/SectionShell";

const KEY_REFS = [
  "I. Affleck & A. W. Ludwig, \"Universal noninteger ground-state degeneracy in critical quantum systems,\" Phys. Rev. Lett. 67, 161 (1991).",
  "N. Andrei, K. Furuya & J. Lowenstein, \"Solution of the Kondo problem,\" Rev. Mod. Phys. 55, 331 (1983).",
  "P. Kattel, A. Zhakenov, P. R. Pasnoori, P. Azaria & N. Andrei, \"Dissipation driven phase transition in the non-Hermitian Kondo model,\" Phys. Rev. B 111, L201106 (2025).",
  "T. Child et al., \"Entropy measurement of a strongly coupled quantum dot,\" Phys. Rev. Lett. 129, 227702 (2022).",
  "C. Piquard et al., \"Experimental evidence of fractional entropy in critical Kondo systems,\" arXiv:2605.00669 (2026).",
  "P. C. Burke & A. K. Mitchell, \"Non-Hermitian numerical renormalization group: solution of the non-Hermitian Kondo model,\" Phys. Rev. Lett. 135, 206502 (2025).",
];

const JUMP_LINKS = [
  { href: "/experiment", icon: FlaskConical, label: "The setup" },
  { href: "/simulation", icon: Waves, label: "Try the exact solution" },
  { href: "/math", icon: Sigma, label: "Every equation" },
  { href: "/results", icon: BarChart3, label: "What it found" },
  { href: "/applications", icon: Lightbulb, label: "Why it matters" },
];

export default function PaperPage() {
  return (
    <SectionShell eyebrow="Section ⑥ — Original Paper" title="Read it yourself, any time">
      <Prose>
        <p>
          Every interactive section on this platform is built directly from this PDF — nothing here
          replaces it, it&apos;s meant to make a second (or first) read faster and more intuitive.
        </p>
      </Prose>

      <a
        href="/paper-2608.04083.pdf"
        download
        className="flex w-fit items-center gap-2 rounded-full bg-violet px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-strong"
      >
        <Download size={15} /> Download PDF (arXiv:2608.04083v1)
      </a>

      <div className="h-[70vh] w-full overflow-hidden rounded-xl border border-line">
        <object data="/paper-2608.04083.pdf" type="application/pdf" className="h-full w-full">
          <p className="p-4 text-sm text-ink-soft">
            Your browser can&apos;t preview PDFs inline —{" "}
            <a href="/paper-2608.04083.pdf" className="text-violet-strong hover:underline">
              open it directly
            </a>
            .
          </p>
        </object>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Key references
        </p>
        <ol className="flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">
          {KEY_REFS.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-violet-strong">[{i + 1}]</span>
              <span>{r}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Back into the explanations
        </p>
        <div className="flex flex-wrap gap-2">
          {JUMP_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-violet hover:text-violet-strong"
            >
              <l.icon size={13} /> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
