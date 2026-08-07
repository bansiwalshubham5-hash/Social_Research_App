// The TBA kernel's actual shape — a 1/cosh bump — plotted directly. A new
// "function shape" widget: nothing else on the site plots an abstract
// mathematical kernel rather than a physical observable.
export function KernelShapePlot() {
  const W = 260;
  const H = 90;
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const x = t * (W - 20) + 10;
    const lam = (t - 0.5) * 8;
    const y = H - 10 - (1 / Math.cosh(Math.PI * lam)) * (H - 20) * 3.2;
    pts.push(`${x},${Math.max(6, y)}`);
  }
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-xs">
        <line x1={10} y1={H - 10} x2={W - 10} y2={H - 10} stroke="var(--line)" strokeWidth={1} />
        <polyline points={pts.join(" ")} fill="none" stroke="var(--violet)" strokeWidth={2.5} strokeLinecap="round" />
        <text x={W / 2} y={H - 2} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          λ − μ
        </text>
      </svg>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Gf(λ) = ∫dμ f(μ)/(2cosh[π(λ−μ)]) — every tower talks to its neighbors through this exact bump.
        Narrow and sharply peaked: nearby rapidities matter, distant ones barely do.
      </p>
    </div>
  );
}
