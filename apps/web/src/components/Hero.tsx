import { HeroIllustration } from "./HeroIllustration";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-5 pt-10 pb-6 md:grid-cols-[1.2fr_1fr] md:px-8 md:pt-14">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-strong">
          cond-mat.str-el &middot; arXiv:2608.04083 &middot; 4 Aug 2026
        </span>
        <h1 className="font-serif text-3xl font-semibold leading-tight text-ink text-balance md:text-4xl">
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
      </div>
      <div className="mx-auto aspect-square w-full max-w-sm">
        <HeroIllustration />
      </div>
    </section>
  );
}
