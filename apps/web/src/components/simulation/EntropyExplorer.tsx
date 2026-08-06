"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  loadTbaDataset,
  simp,
  classifyPhase,
  PHASE_LABEL,
  type TbaDataset,
  type Phase,
} from "@/lib/tba";
import { usePaperState } from "@/lib/paper-state";

const T_MIN_EXP = -6;
const T_MAX_EXP = 6;
const T_POINTS = 140;
const LN2 = Math.log(2);
const LN4 = 2 * LN2;

const PHASE_COLOR: Record<Phase, string> = {
  kondo: "#6d5ef0",
  "zero-mode-1": "#2f8fdb",
  "zero-mode-2": "#0ea5a5",
  "ysr-1": "#e0524a",
  "ysr-2": "#e0524a",
  "local-moment": "#e8a23d",
};

function phaseBoundaries(n: number) {
  const bounds = [
    { at: Math.PI / 2, label: "π/2" },
    { at: Math.PI, label: "π" },
  ];
  if (n >= 3) bounds.push({ at: (n * Math.PI) / 2, label: "nπ/2" });
  else bounds.push({ at: (n * Math.PI) / 2, label: "nπ/2" });
  bounds.push({ at: ((n + 1) * Math.PI) / 2, label: "(n+1)π/2" });
  bounds.push({ at: (n / 2 + 1) * Math.PI, label: "(n/2+1)π" });
  return bounds;
}

interface Props {
  variant?: "embedded" | "full";
}

export function EntropyExplorer({ variant = "embedded" }: Props) {
  const { alpha, n, setAlpha, setN } = usePaperState();
  const [ds, setDs] = useState<TbaDataset | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<{ T: number; S: number | null } | null>(null);

  useEffect(() => {
    loadTbaDataset().then(setDs);
  }, []);

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

    const style = getComputedStyle(document.documentElement);
    const lineColor = style.getPropertyValue("--line").trim() || "#e3e0ec";
    const inkSoft = style.getPropertyValue("--ink-soft").trim() || "#7a7690";
    const ink = style.getPropertyValue("--ink").trim() || "#15141c";

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

    // hover marker
    if (hover && hover.S !== null) {
      const x = xToPx(Math.log10(hover.T));
      const y = yToPx(hover.S);
      ctx.fillStyle = "#e85d2f";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ink;
      ctx.font = "11px ui-monospace, monospace";
      ctx.textAlign = x > W - 90 ? "right" : "left";
      ctx.textBaseline = "bottom";
      ctx.fillText(`S=${hover.S.toFixed(3)}`, x + (x > W - 90 ? -8 : 8), y - 6);
    }
  }, [curve, hover, phase]);

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
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
            Interactive simulation &middot; exact result, not an animation
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
        {isBroken && (
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-lg border border-dashed border-red-400/50 bg-red-500/10 px-3 py-2 text-xs leading-relaxed text-ink-soft">
            <strong className="text-ink">No curve here — by design.</strong> PT symmetry is
            spontaneously broken in this window (the fundamental impurity strings acquire complex
            energies, eq. 8). The paper is explicit that a real-spectrum thermodynamic Bethe Ansatz
            doesn&apos;t apply here — so neither does this plot.
          </div>
        )}
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
              <RotateCcw size={12} /> reset
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
