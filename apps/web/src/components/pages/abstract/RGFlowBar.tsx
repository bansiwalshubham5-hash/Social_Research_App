// A linear "flow" visualization — a marker sliding from the hot, ultraviolet
// end toward the cold, infrared end and looping back, with T_K marked as the
// crossover scale. Deliberately a different visual language (linear travel)
// from the circular one used for the local-moment phase later on the page.
export function RGFlowBar() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <div className="relative h-8">
        <div
          className="h-2 rounded-full"
          style={{ background: "linear-gradient(90deg, var(--ember) 0%, var(--paper) 50%, var(--violet) 100%)" }}
        />
        <div
          className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-ink shadow-sm"
          style={{ animation: "rg-flow-move 5s ease-in-out infinite" }}
        />
        <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-line-soft" />
      </div>
      <style>{`
        @keyframes rg-flow-move {
          0% { left: 0%; }
          50% { left: calc(100% - 0.875rem); }
          100% { left: 0%; }
        }
      `}</style>
      <div className="flex justify-between text-[11px] font-mono text-ink-soft">
        <span>
          <span className="font-semibold text-ember">UV</span> · hot, T ≫ T_K
        </span>
        <span className="text-ink">T_K</span>
        <span>
          <span className="font-semibold text-violet-strong">IR</span> · cold, T ≪ T_K
        </span>
      </div>
      <p className="text-xs leading-relaxed text-ink-soft">
        As you cool the system (move right along this bar), its effective behavior changes — that&apos;s RG
        flow. T_K marks where the crossover actually happens; α decides which of the four qualitatively
        different flows you get.
      </p>
    </div>
  );
}
