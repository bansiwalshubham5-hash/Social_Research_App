// A text-badge comparison — "guessed from numerics" vs "proven exactly" —
// a new lightweight widget type (no SVG, just typographic contrast) fitting
// a concept that's about scientific method, not physics geometry.
export function NumericVsExactBadge() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-line-soft px-3 py-1.5 text-xs font-medium text-ink-soft">
          Refs. [17,18] — non-Hermitian NRG, numerical
        </span>
        <span className="text-ink-soft">→</span>
        <span className="rounded-full bg-violet-soft px-3 py-1.5 text-xs font-semibold text-violet-strong">
          this paper — exact Bethe Ansatz
        </span>
      </div>
      <p className="text-xs leading-relaxed text-ink-soft">
        The monotonic-to-nonmonotonic crossover wasn&apos;t discovered here — it was already seen in
        non-Hermitian numerical renormalization group simulations. What&apos;s new is the <em>why</em>: an
        exact, closed-form identification of zero-energy impurity strings reorganizing the spectrum into
        multiple towers, replacing a numerical observation with a derivation.
      </p>
    </div>
  );
}
