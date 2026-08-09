"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Maximize2,
  Minimize2,
  Thermometer,
  Sparkles,
  Magnet as MagnetIcon,
  Snowflake,
  Flame,
  FlaskConical,
  Layers,
  Info,
  X,
} from "lucide-react";
import { loadTbaDataset, simp, classifyPhase, PHASE_LABEL, PHASE_COLOR, type TbaDataset } from "@/lib/tba";
import { usePaperState } from "@/lib/paper-state";
import { computeAlpha, nudgeAwayFromBoundary } from "@/lib/lab-physics";
import { EntropyComparisonGraph } from "./EntropyComparisonGraph";
import type { TransformMode } from "./KondoLabScene";

const KondoLabCanvas = dynamic(() => import("./KondoLabCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full bg-violet/30" />
    </div>
  ),
});

const T_MIN_EXP = -6;
const T_MAX_EXP = 6;
const LN2 = Math.log(2);
const LN4 = 2 * LN2;
const SPEEDS = [0.25, 0.5, 1, 2] as const;
const STEP = 0.4;
const TRANSFORM_HOLD_MS = 2600;

type DepthLevel = 1 | 2 | 3 | 4;

const SUPERSCRIPT: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};
function toSuperscript(exp: number) {
  return String(exp).split("").map((c) => SUPERSCRIPT[c] ?? c).join("");
}
function formatT(T: number) {
  const exp = Math.floor(Math.log10(T));
  const mantissa = T / Math.pow(10, exp);
  return `${mantissa.toFixed(2)}×10${toSuperscript(exp)}`;
}

interface ObjectInfo {
  title: string;
  body: string;
}

const OBJECT_INFO: Record<string, ObjectInfo> = {
  magnet: {
    title: "Magnetic impurity",
    body:
      "A single localized spin sitting inside the metal — the paper calls it S₁ (and its PT-mirror S₂). The red/blue N/S halves are a plain-language stand-in for that spin's magnetic moment. At high temperature it stands alone and fully exposed; as the surrounding electrons cool and organize, they progressively wrap around it and hide its magnetism — the Kondo effect.",
  },
  gain: {
    title: "Gain reservoir",
    body:
      "In the PT-symmetric model, impurity 2's coupling is the complex conjugate of impurity 1's — one side effectively pumps probability in (gain), the other drains it (loss). This sphere visualizes that inflow. It only appears when PT symmetry is switched on, because an ordinary Hermitian magnet has no such reservoir.",
  },
  loss: {
    title: "Loss reservoir",
    body:
      "The exact mirror of the gain reservoir. PT symmetry is only a symmetry of the Hamiltonian if gain and loss are perfectly balanced (proved on Page 1 — H is PT-invariant only because impurity 2's coupling is impurity 1's exact complex conjugate). That's why this lab keeps the gain and loss sliders locked together rather than letting you set them independently.",
  },
};
function objectInfoFor(id: string): ObjectInfo | null {
  if (id.startsWith("channel-")) {
    const idx = Number(id.split("-")[1]) + 1;
    return {
      title: `Conduction channel ${idx}`,
      body:
        "One of n independent seas of conduction electrons that all couple to the same central impurity. Each glowing dot is an electron carrying a spin arrow (↑ or ↓); the exchange coupling J lets the impurity flip an electron's spin as it passes, and vice versa. More channels means more independent screening attempts on the same magnet — which is exactly the 'multichannel' in multichannel Kondo.",
    };
  }
  return OBJECT_INFO[id] ?? null;
}

const TRANSFORM_CAPTION: Record<Exclude<TransformMode, "none">, string> = {
  P: "Parity (P): mirror the whole system left ↔ right. Gain and loss reservoirs swap places.",
  T: "Time-reversal (T): run the clock backward. Every electron's momentum and spin motion reverses.",
  PT: "Combined PT: mirror the system AND reverse time together. For the model in this paper, the two operations cancel — the system looks the same again. That's the 'PT symmetry' the paper's whole argument rests on.",
};

export function KondoVirtualLab() {
  const { n, setN, setAlpha: setGlobalAlpha } = usePaperState();
  const [ds, setDs] = useState<TbaDataset | null>(null);
  useEffect(() => {
    loadTbaDataset().then(setDs);
  }, []);

  // ---- lab controls ----
  const [ptOn, setPtOn] = useState(true);
  const [couplingStrength, setCouplingStrength] = useState(0.5);
  const [gainLoss, setGainLoss] = useState(0.5);
  const [transformMode, setTransformMode] = useState<TransformMode>("none");
  const transformTimeout = useRef<number | null>(null);
  const [depthLevel, setDepthLevel] = useState<DepthLevel>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ---- temperature playback ("living" cooling sweep, and the primary slider) ----
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [playheadLogT, setPlayheadLogT] = useState(T_MAX_EXP);
  const directionRef = useRef<-1 | 1>(-1);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    function tick(ts: number) {
      if (lastTsRef.current !== null) {
        const dt = (ts - lastTsRef.current) / 1000;
        const rate = 1.1 * speed;
        setPlayheadLogT((prev) => {
          let next = prev + directionRef.current * rate * dt;
          if (next <= T_MIN_EXP) {
            next = T_MIN_EXP;
            directionRef.current = 1;
          } else if (next >= T_MAX_EXP) {
            next = T_MAX_EXP;
            directionRef.current = -1;
          }
          return next;
        });
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, speed]);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(document.fullscreenElement === wrapRef.current);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen();
  }, []);

  const step = (dir: -1 | 1) => {
    setPlaying(false);
    setPlayheadLogT((prev) => Math.min(T_MAX_EXP, Math.max(T_MIN_EXP, prev + dir * STEP)));
  };
  const resetAll = () => {
    setPlayheadLogT(T_MAX_EXP);
    directionRef.current = -1;
    setPlaying(true);
    setTransformMode("none");
    setSelectedId(null);
  };

  const triggerTransform = useCallback((mode: Exclude<TransformMode, "none">) => {
    setTransformMode(mode);
    if (transformTimeout.current) window.clearTimeout(transformTimeout.current);
    transformTimeout.current = window.setTimeout(() => setTransformMode("none"), TRANSFORM_HOLD_MS);
  }, []);
  useEffect(
    () => () => {
      if (transformTimeout.current) window.clearTimeout(transformTimeout.current);
    },
    []
  );

  // ---- the one real physical parameter everything else derives from ----
  const rawAlpha = useMemo(
    () => computeAlpha(ptOn, n, couplingStrength, gainLoss),
    [ptOn, n, couplingStrength, gainLoss]
  );
  const alpha = useMemo(() => nudgeAwayFromBoundary(rawAlpha), [rawAlpha]);
  const phase = classifyPhase(alpha, n);

  // keep the rest of the site's shared state in sync with what the lab is showing
  useEffect(() => {
    setGlobalAlpha(alpha);
  }, [alpha, setGlobalAlpha]);

  const playheadT = Math.pow(10, playheadLogT);
  const S = ds ? simp(ds, playheadT, alpha, n) : null;
  const normalizedEntropy = S === null ? null : Math.min(1, Math.max(0, S / LN4));
  const hermitianS = ds ? simp(ds, playheadT, 1e-4, n) : null;

  const selectedInfo = selectedId ? objectInfoFor(selectedId) : null;

  const coldFrac = (T_MAX_EXP - playheadLogT) / (T_MAX_EXP - T_MIN_EXP); // 0 = hot, 1 = cold

  return (
    <div
      ref={wrapRef}
      className={`rounded-2xl border border-line bg-paper-raised p-5 shadow-[0_1px_2px_rgba(21,20,28,0.04),0_12px_32px_-12px_rgba(21,20,28,0.16)] md:p-7 ${
        isFullscreen ? "flex h-full flex-col justify-center overflow-y-auto bg-paper" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
            Interactive virtual laboratory &middot; live physics, not animation
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-ink md:text-2xl">
            Magnet → field → electrons → screening → strange entropy
          </h2>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold"
          style={{ color: PHASE_COLOR[phase], background: `color-mix(in srgb, ${PHASE_COLOR[phase]} 14%, transparent)` }}
        >
          <Sparkles size={11} /> {PHASE_LABEL[phase]}
        </span>
      </div>

      {/* ---- 3D scene ---- */}
      <div className="relative mt-4 h-[380px] w-full overflow-hidden rounded-xl bg-[#0c0b12] md:h-[460px]">
        <KondoLabCanvas
          n={n}
          alpha={alpha}
          ptOn={ptOn}
          normalizedEntropy={normalizedEntropy}
          phaseColor={PHASE_COLOR[phase]}
          showLabels={showLabels}
          transformMode={transformMode}
          onSelect={setSelectedId}
          autoRotate={autoRotate}
          onInteractStart={() => setAutoRotate(false)}
        />

        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur transition hover:text-white"
        >
          <RotateCcw size={12} className={autoRotate ? "animate-spin [animation-duration:3s]" : ""} />
          {autoRotate ? "auto-rotating" : "rotate"}
        </button>
        <button
          onClick={() => setShowLabels((v) => !v)}
          className="absolute right-3 top-11 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur transition hover:text-white"
        >
          <Layers size={12} /> {showLabels ? "labels on" : "labels off"}
        </button>

        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-mono text-white/85 backdrop-blur">
          <Thermometer size={11} className={coldFrac > 0.6 ? "text-sky-300" : "text-ember"} />
          T/T_K = {formatT(playheadT)}
          {S !== null && <span className="text-white/60">&nbsp;S = {S.toFixed(3)}</span>}
        </div>

        {phase === "ysr-1" || phase === "ysr-2" ? (
          <div className="pointer-events-none absolute inset-x-4 bottom-14 rounded-lg border border-dashed border-red-400/50 bg-red-500/10 px-3 py-2 text-[11px] leading-relaxed text-white/80 backdrop-blur">
            <strong className="text-white">PT symmetry is spontaneously broken here.</strong> The impurity strings
            gain complex energies (eq. 8) — there is no real-spectrum thermodynamic state to screen into, so the
            screening cloud and entropy curve both go quiet in this window, by design.
          </div>
        ) : null}

        {transformMode !== "none" && (
          <div className="pointer-events-none absolute inset-x-3 top-20 rounded-lg bg-violet/90 px-3 py-2 text-[11px] font-medium leading-relaxed text-white shadow-lg">
            {TRANSFORM_CAPTION[transformMode]}
          </div>
        )}

        {selectedInfo && (
          <div className="absolute inset-x-3 bottom-3 max-w-sm rounded-xl border border-white/10 bg-black/75 p-3 text-white backdrop-blur">
            <div className="flex items-start justify-between gap-2">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-violet-200">
                <Info size={12} /> {selectedInfo.title}
              </p>
              <button onClick={() => setSelectedId(null)} className="text-white/50 hover:text-white">
                <X size={13} />
              </button>
            </div>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/85">{selectedInfo.body}</p>
          </div>
        )}

        {!selectedInfo && (
          <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[10.5px] text-white/70 backdrop-blur">
            drag to orbit &middot; scroll to zoom &middot; click the magnet, a channel, or a reservoir
          </p>
        )}
      </div>

      {/* ---- HOT/COLD bar ---- */}
      <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-soft">
        <Flame size={12} className="shrink-0 text-ember" />
        <div className="relative h-2 flex-1 rounded-full bg-gradient-to-r from-ember via-violet to-sky-400">
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-white bg-ink shadow"
            style={{ left: `${coldFrac * 100}%` }}
          />
        </div>
        <Snowflake size={12} className="shrink-0 text-sky-400" />
      </div>

      {/* ---- transport controls ---- */}
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-violet text-white transition hover:bg-violet-strong"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button onClick={() => step(1)} title="Step warmer" className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink">
          <SkipBack size={14} />
        </button>
        <button onClick={() => step(-1)} title="Step cooler" className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink">
          <SkipForward size={14} />
        </button>
        <button onClick={resetAll} title="Reset" className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink">
          <RotateCcw size={14} />
        </button>
        <div className="mx-1 h-5 w-px bg-line" />
        <div className="flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-full px-2 py-1 text-[11px] font-mono transition ${
                speed === s ? "bg-violet-soft text-violet-strong" : "text-ink-soft hover:bg-line-soft"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
        <button onClick={toggleFullscreen} title="Fullscreen" className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink">
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* ---- CONTROLS panel ---- */}
      <div className="mt-5 grid grid-cols-1 gap-5 rounded-xl border border-line bg-paper p-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wide">Temperature</span>
            <span className="font-mono text-ink">{formatT(playheadT)} T_K</span>
          </div>
          <div className="flex items-center gap-2">
            <Snowflake size={13} className="shrink-0 text-sky-400" />
            <input
              type="range"
              min={T_MIN_EXP}
              max={T_MAX_EXP}
              step={0.01}
              value={playheadLogT}
              onChange={(e) => {
                setPlaying(false);
                setPlayheadLogT(Number(e.target.value));
              }}
              className="w-full accent-violet"
            />
            <Flame size={13} className="shrink-0 text-ember" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wide">Coupling strength J</span>
            <span className="font-mono text-ink">{couplingStrength.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 shrink-0 text-[10px] text-ink-soft">WEAK</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={couplingStrength}
              onChange={(e) => setCouplingStrength(Number(e.target.value))}
              className="w-full accent-violet"
            />
            <span className="w-14 shrink-0 text-right text-[10px] text-ink-soft">STRONG</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wide">Gain</span>
            <span className="font-mono text-ink">{ptOn ? gainLoss.toFixed(2) : "0.00"}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            disabled={!ptOn}
            value={ptOn ? gainLoss : 0}
            onChange={(e) => setGainLoss(Number(e.target.value))}
            className="w-full accent-emerald-500 disabled:opacity-40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span className="font-semibold uppercase tracking-wide">Loss</span>
            <span className="font-mono text-ink">{ptOn ? gainLoss.toFixed(2) : "0.00"}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            disabled={!ptOn}
            value={ptOn ? gainLoss : 0}
            onChange={(e) => setGainLoss(Number(e.target.value))}
            className="w-full accent-red-500 disabled:opacity-40"
          />
        </div>
        <p className="-mt-3 text-[10.5px] leading-relaxed text-ink-soft md:col-span-2">
          Gain and loss move together on purpose: PT symmetry only holds when they&apos;re exactly balanced (proved
          on Page 1) — an unbalanced pump/drain isn&apos;t the model this paper studies.
        </p>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Number of channels, n</span>
          <div className="flex items-center gap-1.5">
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
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">System mode</span>
          <div className="flex overflow-hidden rounded-full border border-line text-[11px] font-medium">
            <button
              onClick={() => setPtOn(false)}
              className={`flex-1 px-2 py-1.5 transition ${!ptOn ? "bg-violet text-white" : "bg-paper-raised text-ink-soft hover:bg-line-soft"}`}
            >
              Ordinary (Hermitian)
            </button>
            <button
              onClick={() => setPtOn(true)}
              className={`flex-1 px-2 py-1.5 transition ${ptOn ? "bg-violet text-white" : "bg-paper-raised text-ink-soft hover:bg-line-soft"}`}
            >
              PT-symmetric (non-Hermitian)
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Symmetry transformations — press to watch it happen
          </span>
          <div className="flex flex-wrap gap-2">
            {(["P", "T", "PT"] as const).map((m) => (
              <button
                key={m}
                onClick={() => triggerTransform(m)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition ${
                  transformMode === m ? "border-violet bg-violet text-white" : "border-line bg-paper-raised text-ink-soft hover:bg-line-soft"
                }`}
              >
                {m}
              </button>
            ))}
            <span className="self-center text-[10.5px] text-ink-soft">
              PT symmetric ⇔ the impurity looks unchanged under P and T applied together
            </span>
          </div>
        </div>
      </div>

      {/* ---- live observables ---- */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-line bg-paper p-4 text-xs sm:grid-cols-4">
        <div>
          <p className="text-ink-soft">α (non-Hermiticity)</p>
          <p className="font-mono text-sm text-ink">{(alpha / Math.PI).toFixed(2)}π</p>
        </div>
        <div>
          <p className="text-ink-soft">Impurity entropy S</p>
          <p className="font-mono text-sm text-ink">{S === null ? "undefined" : S.toFixed(3)}</p>
        </div>
        <div>
          <p className="text-ink-soft">Screening (1 − S/ln4)</p>
          <p className="font-mono text-sm text-ink">{normalizedEntropy === null ? "—" : `${((1 - normalizedEntropy) * 100).toFixed(0)}%`}</p>
        </div>
        <div>
          <p className="text-ink-soft">Phase</p>
          <p className="font-mono text-sm" style={{ color: PHASE_COLOR[phase] }}>{PHASE_LABEL[phase]}</p>
        </div>
      </div>

      {/* ---- entropy: ordinary vs PT-symmetric, synced to the same playhead ---- */}
      <div className="mt-5">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <FlaskConical size={13} /> Impurity entropy — cooling from hot (right) to cold (left)
        </p>
        <EntropyComparisonGraph n={n} ptAlpha={alpha} playheadLogT={playheadLogT} />
        <p className="mt-2 text-[11px] leading-relaxed text-ink-soft">
          Same T-sweep, two universes. On the left, an ordinary magnetic impurity: entropy falls smoothly from
          {" "}2 ln 2 toward its ground-state plateau as it cools — the textbook Kondo effect. On the right, this
          lab&apos;s current PT-symmetric α: watch for a dip or bump instead of a smooth slide — the paper&apos;s
          central claim is that non-Hermitian screening doesn&apos;t have to be monotonic.
          {hermitianS !== null && S !== null && (
            <> Right now: ordinary S = {hermitianS.toFixed(3)}, PT-symmetric S = {S.toFixed(3)}.</>
          )}
        </p>
      </div>

      {/* ---- depth levels ---- */}
      <div className="mt-6 flex gap-1.5 border-b border-line pb-2">
        {([
          [1, "For everyone"],
          [2, "Physics"],
          [3, "Advanced"],
          [4, "Research"],
        ] as [DepthLevel, string][]).map(([lvl, label]) => (
          <button
            key={lvl}
            onClick={() => setDepthLevel(lvl)}
            className={`rounded-t-lg px-3 py-1.5 text-xs font-medium transition ${
              depthLevel === lvl ? "bg-violet text-white" : "text-ink-soft hover:bg-line-soft"
            }`}
          >
            Level {lvl} &middot; {label}
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm leading-relaxed text-ink">
        {depthLevel === 1 && (
          <p>
            <strong>A tiny bar magnet</strong> sits at the center, with an N and an S end, like a fridge magnet. Cold
            electrons flowing past it (the little glowing dots) can crowd around and hide its magnetism — that
            crowd is called a <strong>Kondo screening cloud</strong>. Slide the temperature toward COLD and watch the
            electrons organize; slide it toward HOT and watch them scatter randomly instead. Turn on{" "}
            <strong>PT symmetry</strong> and something strange can happen on the way down: the amount of
            &ldquo;hidden-ness&rdquo; doesn&apos;t always shrink smoothly — it can wobble first.
          </p>
        )}
        {depthLevel === 2 && (
          <div className="space-y-2">
            <p>
              The impurity is a localized spin-½ coupled to n independent conduction-electron channels via exchange
              coupling J (the <em>coupling strength</em> slider). In the PT-symmetric setup there are two impurities
              whose couplings are exact complex conjugates of each other — one effectively gains amplitude, the
              other loses it, at rates you control with the gain/loss slider (locked together, since PT symmetry
              requires that balance).
            </p>
            <p>
              Non-Hermiticity is packaged into a single angle α, growing from 0 (ordinary Hermitian magnet) as gain,
              loss, and coupling strength increase. That α is exactly what the entropy graph above and every other
              graph on this site plots against.
            </p>
          </div>
        )}
        {depthLevel === 3 && (
          <div className="space-y-3">
            <p>The impurity Hamiltonian this lab is driven by (see Page 1 for the full derivation):</p>
            <pre className="overflow-x-auto rounded-lg bg-ink px-4 py-3 font-mono text-[12px] leading-relaxed text-paper">
{`H = H_bulk  +  J · S₁·s(0)  +  J* · S₂·s(0)
α  =  arg(J)  =  the non-Hermiticity angle this lab's controls set`}
            </pre>
            <p>
              At α = 0 the two impurities are identical and Hermitian. As α grows past π/2, π, nπ/2, … the number of
              excitation &ldquo;towers&rdquo; feeding the free energy changes (that&apos;s <code>classifyPhase</code>{" "}
              in <code>lib/tba.ts</code>) — each boundary is a place the entropy curve can pick up a kink instead of
              sliding smoothly.
            </p>
          </div>
        )}
        {depthLevel === 4 && (
          <div className="space-y-2">
            <p>
              Every number in this lab — S, α&apos;s phase, both entropy curves — comes from the same offline-solved
              thermodynamic Bethe Ansatz table (<code>public/data/tba-eta.json</code>) evaluated by{" "}
              <code>lib/tba.ts</code>, validated against the paper&apos;s closed-form UV/IR checks. Nothing here is
              fabricated for effect.
            </p>
            <p>
              For the full numerical proof — RG flow, the boundary-stiffness fix, and step-by-step derivations of
              eqs. (15)–(21) — open{" "}
              <Link href="/pages/1" className="text-violet-strong underline underline-offset-2">Page 1</Link> and{" "}
              <Link href="/pages/3" className="text-violet-strong underline underline-offset-2">Page 3</Link> in
              Pages Mode.
            </p>
          </div>
        )}
      </div>

      {/* ---- bottom explainer cards ---- */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Magnetic field of a bar magnet",
            body: "Field lines loop out of N and back into S — the same shape a fridge magnet's field has, just centered on a single atomic-scale spin here.",
          },
          {
            title: "Spin ↑ / ↓",
            body: "Every electron carries an intrinsic spin, drawn as a tiny arrow. Exchange coupling to the impurity is what lets these arrows flip.",
          },
          {
            title: "Kondo screening",
            body: "Below the Kondo temperature, conduction electrons organize into a cloud that partially cancels the impurity's moment — the entropy drop from ln2 you see in the graph.",
          },
          {
            title: "Multichannel setup",
            body: "n separate electron seas all coupling to one impurity — increasing n changes how completely the impurity can ever be screened.",
          },
          {
            title: "PT symmetry, visually",
            body: "Two mirrored halves of the system (P = spatial mirror) that also swap under running time backward (T). Press P, T, and PT above to see each transform.",
          },
          {
            title: "The entropy journey",
            body: "Hot → disordered (S ≈ 2 ln 2) → partial screening → (PT case) a dip/bump instead of a straight slide → cold ground state. That non-monotonic middle step is the paper's discovery.",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-line bg-paper p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
              <MagnetIcon size={12} className="text-violet-strong" /> {card.title}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-soft">{card.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
