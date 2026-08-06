"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, ListTree } from "lucide-react";
import { FULL_PROOF, ALL_EQUATIONS, type ProofCard } from "@/lib/proof-content";

const STEP_MS = 5200;

function CardView({ card, active, onClick, setRef }: {
  card: ProofCard;
  active: boolean;
  onClick: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const isAxiom = card.kind === "axiom";
  return (
    <div
      ref={setRef}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition ${
        active
          ? "border-violet bg-violet-soft/40"
          : "border-line bg-paper-raised hover:border-violet/40"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
            isAxiom ? "bg-ember-soft text-ember" : "bg-violet-soft text-violet-strong"
          }`}
        >
          {isAxiom ? `Axiom ${card.n}` : `Step ${card.n}`}
        </span>
        {card.equationLabel && (
          <span className="font-mono text-[11px] text-ink-soft">{card.equationLabel}</span>
        )}
      </div>
      <p className="mt-2 text-sm font-semibold text-ink">{card.title}</p>
      <p className="mt-2 overflow-x-auto whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink">
        {card.equation}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{card.explanation}</p>
    </div>
  );
}

export function MathProofPlayer() {
  const [mode, setMode] = useState<"proof" | "equations">("proof");
  const [playing, setPlaying] = useState(true);
  const [idx, setIdx] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (mode !== "proof" || !playing) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % FULL_PROOF.length);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [mode, playing]);

  useEffect(() => {
    if (mode !== "proof") return;
    refs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [idx, mode]);

  function goTo(i: number) {
    setIdx(i);
    setPlaying(false);
  }

  const axiomCount = FULL_PROOF.filter((c) => c.kind === "axiom").length;
  const active = FULL_PROOF[idx];
  const posLabel =
    active.kind === "axiom" ? `Axiom ${active.n} of ${axiomCount}` : `Step ${active.n} of ${FULL_PROOF.length - axiomCount}`;

  const groupedEquations = ALL_EQUATIONS.reduce<Record<string, typeof ALL_EQUATIONS>>((acc, eq) => {
    (acc[eq.section] ??= []).push(eq);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-paper-raised p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
          {mode === "proof"
            ? "Full proof, from first principles — the paper's End Matter"
            : "Every key equation — in the paper's own order"}
        </p>
        <div className="flex items-center gap-2 rounded-full border border-line bg-paper p-1">
          <button
            onClick={() => {
              setMode("proof");
              setPlaying(true);
            }}
            aria-label="Play"
            title="Play"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
              mode === "proof" && playing ? "bg-violet text-white" : "text-ink-soft hover:bg-line-soft"
            }`}
          >
            <Play size={13} />
          </button>
          <button
            onClick={() => {
              setMode("proof");
              setPlaying(false);
            }}
            aria-label="Pause"
            title="Pause"
            className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
              mode === "proof" && !playing ? "bg-violet text-white" : "text-ink-soft hover:bg-line-soft"
            }`}
          >
            <Pause size={13} />
          </button>
          <button
            onClick={() => setMode("equations")}
            aria-label="All equations"
            title="All equations"
            className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition ${
              mode === "equations" ? "bg-violet text-white" : "text-ink-soft hover:bg-line-soft"
            }`}
          >
            <ListTree size={13} /> All equations
          </button>
        </div>
      </div>

      {mode === "proof" ? (
        <>
          <p className="text-xs leading-relaxed text-ink-soft">
            Starts from three postulates (axioms), then derives everything else in order —
            equation by equation, exactly as the paper does it. Playing auto-advances and scrolls;
            hit pause (or click any card, or scroll yourself) to read at your own pace — it keeps
            your place either way.
          </p>

          <div className="flex items-center gap-1.5">
            {FULL_PROOF.map((c, i) => (
              <button
                key={`${c.kind}-${c.n}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${c.kind === "axiom" ? "axiom" : "step"} ${c.n}`}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= idx ? (c.kind === "axiom" ? "bg-ember" : "bg-violet") : "bg-line"
                }`}
              />
            ))}
          </div>
          <span className="-mt-2 self-end font-mono text-[11px] text-ink-soft">{posLabel}</span>

          <div className="flex max-h-[32rem] flex-col gap-3 overflow-y-auto pr-1">
            {FULL_PROOF.map((c, i) => (
              <CardView
                key={`${c.kind}-${c.n}`}
                card={c}
                active={i === idx}
                onClick={() => goTo(i)}
                setRef={(el) => {
                  refs.current[i] = el;
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-5">
          {Object.entries(groupedEquations).map(([section, eqs]) => (
            <div key={section} className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{section}</p>
              <div className="flex flex-col gap-1.5">
                {eqs.map((eq) => (
                  <div
                    key={eq.num}
                    className="flex flex-col gap-1 rounded-lg border border-line bg-paper px-3 py-2 sm:flex-row sm:items-baseline sm:gap-3"
                  >
                    <span className="shrink-0 font-mono text-xs text-violet-strong">
                      ({eq.num}) {eq.name}
                    </span>
                    <span className="overflow-x-auto whitespace-nowrap font-mono text-[12.5px] text-ink">
                      {eq.equation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
