// A genuine step-by-step derivation display — each line follows from the one
// above by one explicit, checkable move, rather than displaying a finished
// equation with a color legend. Used sparingly, only where the derivation is
// pure algebra/logic the paper itself states explicitly.
interface Step {
  expr: string;
  note: string;
}

interface Props {
  steps: Step[];
  accent?: string;
}

export function DerivationSteps({ steps, accent = "var(--violet)" }: Props) {
  return (
    <div className="rounded-xl border border-line bg-paper-raised p-5">
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white"
                style={{ background: accent }}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="my-1 w-px flex-1" style={{ background: "var(--line)", minHeight: 20 }} />}
            </div>
            <div className="flex flex-col gap-1 pb-5">
              <p className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink">{step.expr}</p>
              <p className="text-xs leading-relaxed text-ink-soft">{step.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
