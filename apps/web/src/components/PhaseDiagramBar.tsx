const N = 4; // shown for n=4 so all six sub-phases are visible

const SEGMENTS = [
  { from: 0, to: Math.PI / 2, label: "Kondo", color: "#6d5ef0", broken: false },
  { from: Math.PI / 2, to: Math.PI, label: "Zero mode I", color: "#2f8fdb", broken: false },
  { from: Math.PI, to: (N * Math.PI) / 2, label: "Zero mode II", color: "#0ea5a5", broken: false },
  { from: (N * Math.PI) / 2, to: ((N + 1) * Math.PI) / 2, label: "YSR I", color: "#e0524a", broken: true },
  { from: ((N + 1) * Math.PI) / 2, to: (N / 2 + 1) * Math.PI, label: "YSR II", color: "#c23c34", broken: true },
  { from: (N / 2 + 1) * Math.PI, to: (N / 2 + 1.6) * Math.PI, label: "Local moment", color: "#e8a23d", broken: false },
];

export function PhaseDiagramBar() {
  const total = (N / 2 + 1.6) * Math.PI;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-10 w-full overflow-hidden rounded-lg border border-line">
        {SEGMENTS.map((s) => (
          <div
            key={s.label}
            style={{ width: `${((s.to - s.from) / total) * 100}%`, background: s.color }}
            className="relative flex items-center justify-center"
            title={s.label}
          >
            <span className="truncate px-1 text-[10px] font-medium text-white/95">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-mono text-ink-soft">
        <span>α = 0</span>
        <span>overscreened, PT-unbroken</span>
        <span>PT-broken</span>
        <span>unscreened, PT-unbroken</span>
      </div>
      <p className="text-[11px] text-ink-soft">Shown for n=4 channels so both zero-mode sub-phases are visible.</p>
    </div>
  );
}
