"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, ListTree, ChevronDown, ChevronUp } from "lucide-react";
import { FULL_PROOF, ALL_EQUATIONS } from "@/lib/proof-content";

const PRE_STEP_DELAY = 480; // pause before the pencil touches down on a new step
const PUNCT_DELAY = 165; // pause after operators/brackets — "thinking" beats
const CHAR_DELAY = 24;
const HOLD_AFTER_WRITE = 1400; // how long a finished equation sits before the next one starts below it

function delayForChar(ch: string) {
  if (/[=+\-−·()[\]{}]/.test(ch)) return PUNCT_DELAY;
  if (ch === " ") return CHAR_DELAY + 18;
  return CHAR_DELAY;
}

function StepCard({
  card,
  writeCount,
  writing,
  expanded,
  onToggleExpand,
  setRef,
}: {
  card: (typeof FULL_PROOF)[number];
  writeCount: number;
  writing: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const isAxiom = card.kind === "axiom";
  return (
    <div
      ref={setRef}
      className={`flex flex-col gap-3 rounded-xl border-2 p-4 transition-colors ${
        isAxiom ? "border-ember/40" : "border-violet/40"
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
        {card.equationLabel && <span className="font-mono text-[11px] text-ink-soft">{card.equationLabel}</span>}
      </div>
      <p className="text-sm font-semibold text-ink">{card.title}</p>

      <div className="min-h-[4.5rem] rounded-lg bg-[#16241c] p-4 shadow-inner">
        <p
          className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-[15px] leading-relaxed text-[#eef6ea]"
          style={{ textShadow: "0 0 5px rgba(238,246,234,0.35)" }}
        >
          {card.equation.slice(0, writeCount)}
          {writing && (
            <span
              className="ml-0.5 inline-block w-[2px] animate-pulse bg-[#eef6ea] align-middle"
              style={{ height: "1em" }}
            />
          )}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">{card.short}</p>
      <button
        onClick={onToggleExpand}
        className="flex w-fit items-center gap-1 text-xs font-medium text-violet-strong hover:underline"
      >
        {expanded ? (
          <>
            <ChevronUp size={12} /> Less
          </>
        ) : (
          <>
            <ChevronDown size={12} /> More
          </>
        )}
      </button>
      {expanded && <p className="text-sm leading-relaxed text-ink-soft">{card.explanation}</p>}
    </div>
  );
}

export function MathProofPlayer() {
  const [mode, setMode] = useState<"proof" | "equations">("proof");
  const [playing, setPlaying] = useState(true);
  const [idx, setIdx] = useState(0); // the step currently being written (or about to start)
  const [writeCount, setWriteCount] = useState(0);
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const current = FULL_PROOF[idx];
  const finished = writeCount >= current.equation.length;
  const isLast = idx === FULL_PROOF.length - 1;

  // one engine: writes the active equation character by character, holds once
  // finished, then reveals the next card below it — stops after the last one
  useEffect(() => {
    if (mode !== "proof" || !playing) return;
    if (!finished) {
      const delay = writeCount === 0 ? PRE_STEP_DELAY : delayForChar(current.equation[writeCount - 1]);
      const t = setTimeout(() => setWriteCount((c) => c + 1), delay);
      return () => clearTimeout(t);
    }
    if (isLast) return; // proof complete — stay put
    const t = setTimeout(() => {
      setIdx((i) => i + 1);
      setWriteCount(0);
    }, HOLD_AFTER_WRITE);
    return () => clearTimeout(t);
  }, [mode, playing, writeCount, finished, isLast, current.equation]);

  // keep the newest card in view as it grows
  useEffect(() => {
    if (mode !== "proof") return;
    cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [idx, writeCount, mode]);

  function togglePlay() {
    setMode("proof");
    if (isLast && finished) {
      // proof already complete — restart from the top
      setIdx(0);
      setWriteCount(0);
      setExpandedSet(new Set());
    }
    setPlaying(true);
  }

  const axiomCount = FULL_PROOF.filter((c) => c.kind === "axiom").length;
  const posLabel =
    current.kind === "axiom" ? `Axiom ${current.n} of ${axiomCount}` : `Step ${current.n} of ${FULL_PROOF.length - axiomCount}`;

  const groupedEquations = ALL_EQUATIONS.reduce<Record<string, typeof ALL_EQUATIONS>>((acc, eq) => {
    (acc[eq.section] ??= []).push(eq);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-paper-raised p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
          {mode === "proof" ? "Live derivation — from first principles" : "Every key equation — in the paper's own order"}
        </p>
        <div className="flex items-center gap-1 rounded-full border border-line bg-paper p-1">
          <button
            onClick={togglePlay}
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
          <div className="flex items-center gap-1.5">
            {FULL_PROOF.map((c, i) => (
              <div
                key={`${c.kind}-${c.n}`}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < idx || (i === idx && finished)
                    ? c.kind === "axiom"
                      ? "bg-ember"
                      : "bg-violet"
                    : i === idx
                      ? c.kind === "axiom"
                        ? "bg-ember/50"
                        : "bg-violet/50"
                      : "bg-line"
                }`}
              />
            ))}
          </div>
          <span className="-mt-2 self-end font-mono text-[11px] text-ink-soft">
            {posLabel}
            {isLast && finished ? " — complete" : ""}
          </span>

          <div className="flex flex-col gap-4">
            {FULL_PROOF.slice(0, idx + 1).map((c, i) => (
              <StepCard
                key={`${c.kind}-${c.n}`}
                card={c}
                writeCount={i === idx ? writeCount : c.equation.length}
                writing={i === idx && !finished}
                expanded={expandedSet.has(i)}
                onToggleExpand={() =>
                  setExpandedSet((prev) => {
                    const next = new Set(prev);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
                setRef={(el) => {
                  cardRefs.current[i] = el;
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
