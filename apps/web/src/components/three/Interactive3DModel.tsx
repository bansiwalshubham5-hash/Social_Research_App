"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RotateCcw, Sparkles } from "lucide-react";
import { usePaperState } from "@/lib/paper-state";
import { classifyPhase, PHASE_LABEL, PHASE_COLOR } from "@/lib/tba";

const KondoRingCanvas = dynamic(() => import("./KondoRingCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-violet/30" />
    </div>
  ),
});

// The actual object the paper studies, made genuinely 3D and touchable —
// drag to rotate, scroll/pinch to zoom, and the n / alpha controls below
// reshape the model live using the same shared state as every other
// simulation on the site.
export function Interactive3DModel() {
  const { alpha, n, setAlpha, setN } = usePaperState();
  const [autoRotate, setAutoRotate] = useState(true);
  const phase = classifyPhase(alpha, n);
  const alphaMaxOverPi = n / 2 + 2;

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-[0_1px_2px_rgba(21,20,28,0.04),0_12px_32px_-12px_rgba(21,20,28,0.16)] md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            The real object, in 3D
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-ink">Drag to rotate. Reshape it yourself.</h2>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
          style={{ color: PHASE_COLOR[phase], background: `color-mix(in srgb, ${PHASE_COLOR[phase]} 14%, transparent)` }}
        >
          <Sparkles size={11} /> {PHASE_LABEL[phase]}
        </span>
      </div>

      <div className="dark relative mt-4 h-[360px] w-full overflow-hidden rounded-xl bg-paper md:h-[440px]">
        <KondoRingCanvas autoRotate={autoRotate} onInteractStart={() => setAutoRotate(false)} />
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-paper-raised/80 px-2.5 py-1.5 text-[11px] font-medium text-ink-soft backdrop-blur transition hover:text-ink"
        >
          <RotateCcw size={12} className={autoRotate ? "animate-spin [animation-duration:3s]" : ""} />
          {autoRotate ? "auto-rotating" : "rotate"}
        </button>
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-paper-raised/70 px-3 py-1 text-[10.5px] text-ink-soft backdrop-blur">
          drag to orbit &middot; scroll to zoom
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-soft">channels, n =</span>
          {[1, 2, 3, 4, 5, 6].map((c) => (
            <button
              key={c}
              onClick={() => setN(c)}
              className={`h-7 w-7 rounded-full text-xs font-medium transition ${
                c === n ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-2 sm:max-w-xs">
          <span className="shrink-0 text-xs text-ink-soft">α</span>
          <input
            type="range"
            min={0}
            max={alphaMaxOverPi * 1000}
            step={1}
            value={alpha * (1000 / Math.PI)}
            onChange={(e) => setAlpha((Number(e.target.value) / 1000) * Math.PI)}
            className="w-full accent-violet"
          />
          <span className="w-12 shrink-0 text-right font-mono text-xs text-ink">{(alpha / Math.PI).toFixed(2)}π</span>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        Two impurities (violet S₁, orange S₂) sit on a ring of n conduction-electron channels — the same
        α and n used throughout this site. The ring&apos;s color always matches the current phase; drag
        the α slider across π/2 and watch it shift live.
      </p>
    </div>
  );
}
