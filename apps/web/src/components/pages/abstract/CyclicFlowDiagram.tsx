// A circular, looping flow — deliberately the opposite visual metaphor from
// RGFlowBar's straight UV-to-IR line. In the local-moment phase the RG
// trajectory doesn't connect two different fixed points; it leaves the
// local-moment fixed point and cycles back to the same one.
export function CyclicFlowDiagram() {
  const cx = 100;
  const cy = 90;
  const r = 55;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 200 180" className="h-auto w-52">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ember)" strokeWidth={2} strokeDasharray="1 7" strokeLinecap="round" opacity={0.7} />
        <circle
          r={5}
          fill="var(--ember)"
          style={{
            offsetPath: `path("M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r - 0.01} ${cy}")`,
            animation: "cyclic-flow-move 4.5s linear infinite",
          }}
        />
        <circle cx={cx + r} cy={cy} r={7} fill="var(--violet)" />
        <text x={cx + r} y={cy - 16} textAnchor="middle" fontSize="10" fill="var(--violet-strong)" fontFamily="ui-monospace, monospace">
          local-moment
        </text>
        <text x={cx + r} y={cy + 26} textAnchor="middle" fontSize="10" fill="var(--violet-strong)" fontFamily="ui-monospace, monospace">
          fixed point
        </text>
      </svg>
      <style>{`
        @keyframes cyclic-flow-move { from { offset-distance: 0%; } to { offset-distance: 100%; } }
      `}</style>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        For α &gt; (n/2+1)π both impurities are unscreened again and the RG trajectory doesn&apos;t connect two
        different fixed points — it leaves the local-moment fixed point and cycles back to it.
      </p>
    </div>
  );
}
