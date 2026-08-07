// A checklist recap — a new widget type (no SVG, a literal list of solved
// claims with checkmarks) fitting a concept that is explicitly a summary,
// not a new mechanism.
const ITEMS = [
  "An exact solution of a PT-symmetric multichannel Kondo line defect, via generalized TBA",
  "The Kondo and zero-mode phases: real spectrum, same UV/IR conformal fixed points as the Hermitian theory",
  "The YSR phase: exact identification of where PT symmetry breaks and TBA stops applying",
  "The local-moment phase: cyclic RG flow, both fixed points at 2ln2, with intermediate overshoot/undershoot",
];

export function ResultsChecklist() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-paper-raised p-5">
      {ITEMS.map((item) => (
        <div key={item} className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white">
            ✓
          </span>
          <p className="text-xs leading-relaxed text-ink">{item}</p>
        </div>
      ))}
    </div>
  );
}
