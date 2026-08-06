"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  RotateCcw,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
  Thermometer,
} from "lucide-react";
import {
  loadTbaDataset,
  simp,
  classifyPhase,
  PHASE_LABEL,
  PHASE_COLOR,
  type TbaDataset,
} from "@/lib/tba";
import { usePaperState } from "@/lib/paper-state";

const T_MIN_EXP = -6;
const T_MAX_EXP = 6;
const T_POINTS = 140;
const LN2 = Math.log(2);
const LN4 = 2 * LN2;
const SPEEDS = [0.25, 0.5, 1, 2] as const;
const STEP = 0.4; // logT units per manual step

function phaseBoundaries(n: number) {
  return [
    { at: Math.PI / 2, label: "π/2" },
    { at: Math.PI, label: "π" },
    { at: (n * Math.PI) / 2, label: "nπ/2" },
    { at: ((n + 1) * Math.PI) / 2, label: "(n+1)π/2" },
    { at: (n / 2 + 1) * Math.PI, label: "(n/2+1)π" },
  ];
}

const SUPERSCRIPT: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
};
function toSuperscript(exp: number) {
  return String(exp)
    .split("")
    .map((c) => SUPERSCRIPT[c] ?? c)
    .join("");
}
function formatT(T: number) {
  const exp = Math.floor(Math.log10(T));
  const mantissa = T / Math.pow(10, exp);
  return `${mantissa.toFixed(2)}×10${toSuperscript(exp)}`;
}

interface Props {
  variant?: "embedded" | "full";
}

export function EntropyExplorer({ variant = "embedded" }: Props) {
  const { alpha, n, setAlpha, setN } = usePaperState();
  const [ds, setDs] = useState<TbaDataset | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ T: number; S: number | null } | null>(null);

  // ---- playback ("living" T-sweep) ----
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [playheadLogT, setPlayheadLogT] = useState(T_MAX_EXP);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const directionRef = useRef<-1 | 1>(-1); // -1 = cooling (UV -> IR)
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    loadTbaDataset().then(setDs);
  }, []);

  useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    function tick(ts: number) {
      if (lastTsRef.current !== null) {
        const dt = (ts - lastTsRef.current) / 1000;
        const rate = 1.4 * speed; // logT units per second at 1x
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
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapRef.current?.requestFullscreen();
    }
  }, []);

  const step = (dir: -1 | 1) => {
    setPlayheadLogT((prev) => Math.min(T_MAX_EXP, Math.max(T_MIN_EXP, prev + dir * STEP)));
  };
  const resetPlayhead = () => {
    setPlayheadLogT(T_MAX_EXP);
    directionRef.current = -1;
  };

  const alphaMax = (n / 2 + 1) * Math.PI + Math.PI;

  const curve = useMemo(() => {
    if (!ds) return [];
    const pts: { logT: number; T: number; S: number | null }[] = [];
    for (let i = 0; i < T_POINTS; i++) {
      const logT = T_MIN_EXP + ((T_MAX_EXP - T_MIN_EXP) * i) / (T_POINTS - 1);
      const T = Math.pow(10, logT);
      const S = simp(ds, T, alpha, n);
      pts.push({ logT, T, S });
    }
    return pts;
  }, [ds, alpha, n]);

  const phase = classifyPhase(alpha, n);
  const isBroken = phase === "ysr-1" || phase === "ysr-2";

  const playheadT = Math.pow(10, playheadLogT);
  const playheadS = ds ? simp(ds, playheadT, alpha, n) : null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || curve.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const PAD_L = 46;
    const PAD_R = 16;
    const PAD_T = 16;
    const PAD_B = 30;

    const finiteS = curve.filter((p) => p.S !== null).map((p) => p.S as number);
    const yMin = Math.min(0, ...finiteS) - 0.08;
    const yMax = Math.max(LN4, ...finiteS) + 0.08;

    const xToPx = (logT: number) =>
      PAD_L + ((logT - T_MIN_EXP) / (T_MAX_EXP - T_MIN_EXP)) * (W - PAD_L - PAD_R);
    const yToPx = (s: number) => H - PAD_B - ((s - yMin) / (yMax - yMin)) * (H - PAD_T - PAD_B);

    const style = getComputedStyle(canvas);
    const lineColor = style.getPropertyValue("--line").trim() || "#e3e0ec";
    const inkSoft = style.getPropertyValue("--ink-soft").trim() || "#7a7690";
    const ink = style.getPropertyValue("--ink").trim() || "#15141c";
    const ember = style.getPropertyValue("--ember").trim() || "#e85d2f";

    // gridlines at ln2 and 2ln2
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    [LN2, LN4].forEach((v) => {
      const y = yToPx(v);
      ctx.beginPath();
      ctx.moveTo(PAD_L, y);
      ctx.lineTo(W - PAD_R, y);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // axes
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(PAD_L, PAD_T);
    ctx.lineTo(PAD_L, H - PAD_B);
    ctx.lineTo(W - PAD_R, H - PAD_B);
    ctx.stroke();

    ctx.fillStyle = inkSoft;
    ctx.font = "10px ui-monospace, monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    [
      [LN2, "ln 2"],
      [LN4, "ln 4"],
    ].forEach(([v, label]) => {
      ctx.fillText(label as string, PAD_L - 6, yToPx(v as number));
    });
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let e = T_MIN_EXP; e <= T_MAX_EXP; e += 3) {
      ctx.fillText(`1e${e}`, xToPx(e), H - PAD_B + 6);
    }

    // curve, broken into contiguous finite segments (gap through YSR)
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = PHASE_COLOR[phase];
    let drawing = false;
    for (const p of curve) {
      if (p.S === null) {
        drawing = false;
        continue;
      }
      const x = xToPx(p.logT);
      const y = yToPx(p.S);
      if (!drawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        drawing = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    if (drawing) ctx.stroke();
    else ctx.beginPath(); // clear any stale path (e.g. from axis drawing) so nothing stray gets stroked later

    // playhead ("living" sweep position) — always shown when curve is finite there
    if (playheadS !== null) {
      const x = xToPx(playheadLogT);
      const y = yToPx(playheadS);
      ctx.strokeStyle = ember;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(x, PAD_T);
      ctx.lineTo(x, H - PAD_B);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.fillStyle = ember;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.globalAlpha = 0.25;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // hover marker (on-demand, from mouse)
    if (hover && hover.S !== null) {
      const x = xToPx(Math.log10(hover.T));
      const y = yToPx(hover.S);
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "11px ui-monospace, monospace";
      ctx.textAlign = x > W - 90 ? "right" : "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(`S=${hover.S.toFixed(3)}`, x + (x > W - 90 ? -8 : 8), y - 8);
    }
  }, [curve, hover, phase, playheadLogT, playheadS]);

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || !ds) return;
    const rect = canvas.getBoundingClientRect();
    const frac = (e.clientX - rect.left - 46) / (rect.width - 46 - 16);
    const logT = T_MIN_EXP + frac * (T_MAX_EXP - T_MIN_EXP);
    if (logT < T_MIN_EXP || logT > T_MAX_EXP) {
      setHover(null);
      return;
    }
    const T = Math.pow(10, logT);
    setHover({ T, S: simp(ds, T, alpha, n) });
  }

  const bounds = phaseBoundaries(n);

  return (
    <div
      ref={wrapRef}
      className={`flex flex-col gap-5 ${isFullscreen ? "h-full justify-center bg-paper p-6" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
            Interactive simulation &middot; exact result, running live
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ink md:text-2xl">
            Impurity entropy S(T) across the phase diagram
          </h2>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: `${PHASE_COLOR[phase]}1a`, color: PHASE_COLOR[phase] }}
        >
          {PHASE_LABEL[phase]}
        </span>
      </div>

      <div className="relative h-64 w-full rounded-xl border border-line bg-paper-raised md:h-80">
        {!ds && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-soft">
            Solving thermodynamic Bethe Ansatz table…
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-crosshair"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHover(null)}
        />
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-paper-raised/90 px-2.5 py-1 text-[11px] font-mono text-ink shadow-sm">
          <Thermometer size={11} className="text-ember" />
          T/T_K = {formatT(playheadT)}
          {playheadS !== null && <span className="text-ink-soft">&nbsp;S = {playheadS.toFixed(3)}</span>}
        </div>
        {isBroken && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-lg border border-dashed border-red-400/50 bg-red-500/10 px-3 py-2 text-xs leading-relaxed text-ink-soft">
            <strong className="text-ink">No curve here — by design.</strong> PT symmetry is
            spontaneously broken in this window (the fundamental impurity strings acquire complex
            energies, eq. 8). The paper is explicit that a real-spectrum thermodynamic Bethe Ansatz
            doesn&apos;t apply here — so neither does this plot.
          </div>
        )}
      </div>

      {/* transport controls — the "living" playback */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper-raised px-3 py-2">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-violet text-white transition hover:bg-violet-strong"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={() => step(1)}
          aria-label="Step backward (warmer)"
          title="Step backward (warmer)"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink"
        >
          <SkipBack size={14} />
        </button>
        <button
          onClick={() => step(-1)}
          aria-label="Step forward (cooler)"
          title="Step forward (cooler)"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink"
        >
          <SkipForward size={14} />
        </button>
        <button
          onClick={resetPlayhead}
          aria-label="Reset to hottest temperature"
          title="Reset"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink"
        >
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

        <button
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
          title="Fullscreen"
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <span>
              Non-Hermiticity <span className="font-mono text-ink">α = {alpha.toFixed(3)}</span>
            </span>
            <button
              onClick={() => setAlpha(Math.PI / 6)}
              className="flex items-center gap-1 text-ink-soft hover:text-ink"
              aria-label="Reset alpha"
            >
              <RotateCcw size={12} /> reset α
            </button>
          </div>
          <input
            type="range"
            min={0.001}
            max={alphaMax}
            step={0.001}
            value={Math.min(alpha, alphaMax)}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="accent-violet"
          />
          <div className="relative h-4 text-[9px] text-ink-soft">
            {bounds.map((b) => (
              <span
                key={b.label}
                className="absolute -translate-x-1/2 font-mono"
                style={{ left: `${(b.at / alphaMax) * 100}%` }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-soft">Channels n =</span>
          {[1, 2, 3, 4, 5, 6].map((c) => (
            <button
              key={c}
              onClick={() => setN(c)}
              className={`h-7 w-7 rounded-full text-xs font-medium transition ${
                c === n
                  ? "bg-violet text-white"
                  : "bg-line-soft text-ink-soft hover:bg-line"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {variant === "full" && (
        <p className="text-xs leading-relaxed text-ink-soft">
          The orange dot is the system cooling in real time — watch it sweep from the hot,
          free-spin regime on the right toward absolute zero on the left, then reheat and repeat.
          Drag α slowly from 0: the curve decays smoothly from 2 ln 2 (top dashed line) to a
          lower plateau — the ordinary, monotonic Kondo effect. Past α = π/2 the same UV and IR
          values connect through a visible dip or bump instead of a smooth slide — extra
          zero-energy “impurity strings” reorganize the spectrum into multiple excitation towers.
          That reorganization, not any change in the endpoints, is what breaks monotonicity.
        </p>
      )}
    </div>
  );
}
