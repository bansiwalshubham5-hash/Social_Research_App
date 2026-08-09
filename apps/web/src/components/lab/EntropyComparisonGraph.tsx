"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadTbaDataset, simp, type TbaDataset } from "@/lib/tba";

const T_MIN_EXP = -6;
const T_MAX_EXP = 6;
const T_POINTS = 120;
const LN2 = Math.log(2);
const LN4 = 2 * LN2;

interface Props {
  n: number;
  ptAlpha: number;
  playheadLogT: number;
}

// Two real curves, side by side, computed from the exact same simp() engine
// as every other graph on the site: the ordinary Hermitian case (alpha
// pinned to 0) next to whatever the lab's current PT-symmetric alpha is —
// so the smooth-vs-overshoot contrast the paper's whole argument rests on
// is something the reader watches happen, not just reads about.
export function EntropyComparisonGraph({ n, ptAlpha, playheadLogT }: Props) {
  const [ds, setDs] = useState<TbaDataset | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadTbaDataset().then(setDs);
  }, []);

  const hermitianCurve = useMemo(() => {
    if (!ds) return [];
    const pts: { logT: number; S: number | null }[] = [];
    for (let i = 0; i < T_POINTS; i++) {
      const logT = T_MIN_EXP + ((T_MAX_EXP - T_MIN_EXP) * i) / (T_POINTS - 1);
      pts.push({ logT, S: simp(ds, Math.pow(10, logT), 1e-4, n) });
    }
    return pts;
  }, [ds, n]);

  const ptCurve = useMemo(() => {
    if (!ds) return [];
    const pts: { logT: number; S: number | null }[] = [];
    for (let i = 0; i < T_POINTS; i++) {
      const logT = T_MIN_EXP + ((T_MAX_EXP - T_MIN_EXP) * i) / (T_POINTS - 1);
      pts.push({ logT, S: simp(ds, Math.pow(10, logT), ptAlpha, n) });
    }
    return pts;
  }, [ds, ptAlpha, n]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const style = getComputedStyle(canvas);
    const lineColor = style.getPropertyValue("--line").trim() || "#e3e0ec";
    const inkSoft = style.getPropertyValue("--ink-soft").trim() || "#7a7690";

    const half = W / 2;
    const panels: { x0: number; x1: number; curve: typeof hermitianCurve; color: string; label: string }[] = [
      { x0: 8, x1: half - 8, curve: hermitianCurve, color: "#4ade80", label: "Ordinary (Hermitian)" },
      { x0: half + 8, x1: W - 8, curve: ptCurve, color: "#e0524a", label: "PT-symmetric" },
    ];

    const PAD_T = 22;
    const PAD_B = 18;
    const yMin = 0;
    const yMax = 3 * LN2;

    panels.forEach(({ x0, x1, curve, color, label }) => {
      const xToPx = (logT: number) => x0 + ((logT - T_MIN_EXP) / (T_MAX_EXP - T_MIN_EXP)) * (x1 - x0);
      const yToPx = (s: number) => H - PAD_B - ((Math.min(Math.max(s, yMin), yMax) - yMin) / (yMax - yMin)) * (H - PAD_T - PAD_B);

      ctx.fillStyle = inkSoft;
      ctx.font = "600 10px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText(label, x0, 12);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      [LN2, LN4].forEach((v) => {
        ctx.beginPath();
        ctx.moveTo(x0, yToPx(v));
        ctx.lineTo(x1, yToPx(v));
        ctx.stroke();
      });
      ctx.setLineDash([]);

      ctx.strokeStyle = lineColor;
      ctx.beginPath();
      ctx.moveTo(x0, H - PAD_B);
      ctx.lineTo(x1, H - PAD_B);
      ctx.stroke();

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = color;
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

      const playX = xToPx(playheadLogT);
      ctx.strokeStyle = "#ffb020";
      ctx.globalAlpha = 0.6;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(playX, PAD_T);
      ctx.lineTo(playX, H - PAD_B);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    });
  }, [hermitianCurve, ptCurve, playheadLogT]);

  return (
    <div className="relative h-40 w-full rounded-xl border border-line bg-paper-raised md:h-48">
      {!ds && <div className="absolute inset-0 flex items-center justify-center text-xs text-ink-soft">Solving TBA table…</div>}
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
