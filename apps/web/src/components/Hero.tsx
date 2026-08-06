import { CinematicScene } from "./CinematicScene";
import { ChevronDown } from "lucide-react";

// Deliberately always dark/cinematic regardless of the site's light/dark
// setting — an "entering the experiment" moment, not a themed content
// section. Everything below this banner follows the normal theme.
export function Hero() {
  return (
    <section className="dark relative flex min-h-[78vh] w-full flex-col justify-end overflow-hidden bg-paper text-ink md:min-h-[86vh]">
      <div className="absolute inset-0">
        <CinematicScene />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-4 px-5 pb-14 md:px-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-strong">
          cond-mat.str-el &middot; arXiv:2608.04083 &middot; 4 Aug 2026
        </span>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ink text-balance md:text-5xl">
          Breakdown of Monotonic Impurity Entropy Flow in PT-Symmetric
          Multichannel Kondo Systems
        </h1>
        <p className="text-sm text-ink-soft">
          Pradip Kattel<sup>1</sup>, Abay Zhakenov<sup>2</sup>, Natan Andrei
          <sup>2</sup> — <sup>1</sup>University of Geneva, <sup>2</sup>Rutgers
          University
        </p>
        <p className="max-w-xl text-base leading-relaxed text-ink-soft">
          <strong className="text-ink">Why it matters:</strong> physicists
          expect a screened magnetic impurity to lose &ldquo;disorder&rdquo;
          smoothly as you cool it — a kind of thermodynamic one-way street.
          This paper proves that once you let the impurity couple to its
          environment in a non-Hermitian, PT-symmetric way, that one-way
          street can develop a genuine detour: the exact solution shows the
          impurity entropy overshooting and undershooting before settling,
          even though nothing about the endpoints changed.
        </p>
        <div className="mt-2 flex animate-bounce items-center gap-1.5 text-xs text-ink-soft">
          <ChevronDown size={14} /> Cooling in real time below — this is the actual object, not a mockup
        </div>
      </div>
    </section>
  );
}
