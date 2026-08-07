// The Yang–Yang counting picture: quantized rapidity slots, some occupied
// (particles), some empty (holes) — the combinatorial object every TBA
// derivation starts from. A new "lattice + envelope" widget, distinct from
// every curve/diagram elsewhere on the site.
const SLOTS = [1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];

export function CountingFunctionDiagram() {
  const W = 340;
  const H = 130;
  const padL = 16;
  const padR = 16;
  const n = SLOTS.length;
  const step = (W - padL - padR) / (n - 1);
  const yRow = 78;

  const rhoPts = SLOTS.map((_, i) => {
    const x = padL + i * step;
    const t = i / (n - 1);
    const y = 40 - 14 * Math.sin(t * Math.PI * 1.3 + 0.4);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const rhoHPts = SLOTS.map((_, i) => {
    const x = padL + i * step;
    const t = i / (n - 1);
    const y = 112 + 10 * Math.sin(t * Math.PI * 1.1 + 1.1);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-md">
        <polyline points={rhoPts} fill="none" stroke="var(--violet)" strokeWidth={2} strokeLinecap="round" opacity={0.85} />
        <text x={padL} y={22} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--violet)">
          ρ_p(λ) — particle density
        </text>
        <line x1={padL} x2={W - padR} y1={yRow} y2={yRow} stroke="var(--line)" strokeWidth={1} />
        {SLOTS.map((occupied, i) => {
          const x = padL + i * step;
          return (
            <circle
              key={i}
              cx={x}
              cy={yRow}
              r={5}
              fill={occupied ? "var(--violet)" : "none"}
              stroke={occupied ? "var(--violet)" : "var(--ink-soft)"}
              strokeWidth={occupied ? 0 : 1.3}
            />
          );
        })}
        <polyline points={rhoHPts} fill="none" stroke="var(--ember)" strokeWidth={2} strokeLinecap="round" opacity={0.85} />
        <text x={padL} y={128} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ember)">
          ρ_p^h(λ) — hole density
        </text>
      </svg>
      <p className="max-w-md text-center text-xs leading-relaxed text-ink-soft">
        Filled dots are occupied p-string momenta (particles), open circles are the unoccupied slots
        (holes) — at finite T every allowed way of filling them contributes to the ensemble. ρ_p and ρ_p^h
        are the smooth densities of each, per unit rapidity; their ratio η_p ≡ ρ_p^h/ρ_p is the single
        function this entire page is about.
      </p>
    </div>
  );
}
