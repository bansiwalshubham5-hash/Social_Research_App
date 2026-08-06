"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { usePaperState } from "@/lib/paper-state";
import { EXPERIMENT_STEPS } from "@/lib/experiment-steps";

// ms spent building each step's piece of the diagram, in order
const STEP_DURATION = [3200, 3400, 3800, 3800];
const HOLD = 1400; // hold on the fully-built setup before resetting
const FADE = 700; // fade back to the bare ring before the next run

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const THRESHOLDS = STEP_DURATION.reduce<number[]>(
  (acc, d) => [...acc, acc[acc.length - 1] + d],
  [0]
); // [0, t1, t2, t3, t4]
const TOTAL = THRESHOLDS[THRESHOLDS.length - 1] + HOLD + FADE;

function stageForElapsed(e: number) {
  for (let i = STEP_DURATION.length - 1; i >= 0; i--) {
    if (e >= THRESHOLDS[i]) return i;
  }
  return 0;
}

// Runs the paper's own four setup steps as one continuous, always-playing
// build-up on a canvas — ring, then impurities, then channels, then the
// PT-symmetric coupling, then chirality — with every variable and the
// governing equation for that step labeled live, looping start to end.
export function ExperimentSimulation() {
  const { n } = usePaperState();
  const nRef = useRef(n);
  useEffect(() => {
    nRef.current = n;
  }, [n]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(true);
  const [stage, setStage] = useState(0);
  const playingRef = useRef(true);
  const elapsedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    playingRef.current = playing;
    if (playing) lastTsRef.current = null;
  }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(elapsed: number) {
      const W = canvas!.clientWidth;
      const H = canvas!.clientHeight;
      if (W === 0 || H === 0) return;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.32;
      const tilt = 0.42;
      ctx!.clearRect(0, 0, W, H);

      const style = getComputedStyle(canvas!);
      const violet = style.getPropertyValue("--violet").trim() || "#6d5ef0";
      const ember = style.getPropertyValue("--ember").trim() || "#e85d2f";
      const line = style.getPropertyValue("--line").trim() || "#e3e0ec";
      const inkSoft = style.getPropertyValue("--ink-soft").trim() || "#7a7690";

      const fadeOut = 1 - smoothstep(TOTAL - FADE, TOTAL, elapsed);
      const impuritiesOp = smoothstep(THRESHOLDS[0], THRESHOLDS[0] + 500, elapsed) * fadeOut;
      const channelsOp = smoothstep(THRESHOLDS[1], THRESHOLDS[1] + 500, elapsed) * fadeOut;
      const couplingOp = smoothstep(THRESHOLDS[2], THRESHOLDS[2] + 500, elapsed) * fadeOut;
      const chiralOp = smoothstep(THRESHOLDS[3], THRESHOLDS[3] + 500, elapsed) * fadeOut;

      const n = nRef.current;
      const t = reduceMotion ? 0 : elapsed / 1000;

      // the ring — always present, labeled L
      ctx!.strokeStyle = violet;
      ctx!.globalAlpha = 0.4;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, R, R * tilt, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.globalAlpha = 0.12;
      ctx!.lineWidth = 9;
      ctx!.stroke();
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = inkSoft;
      ctx!.font = "10px ui-monospace, monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("ring, circumference L", cx, cy - R * tilt - 16);

      // channels
      if (channelsOp > 0.01) {
        const chAngleOffset = 0.3;
        const forwardOnly = chiralOp > 0.5;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + chAngleOffset;
          const ex = cx + Math.cos(a) * R;
          const ey = cy + Math.sin(a) * R * tilt;
          const ox = cx + Math.cos(a) * R * 1.9;
          const oy = cy + Math.sin(a) * R * tilt * 1.9;

          ctx!.strokeStyle = line;
          ctx!.globalAlpha = channelsOp * 0.6;
          ctx!.lineWidth = 1;
          ctx!.setLineDash([1, 5]);
          ctx!.beginPath();
          ctx!.moveTo(ex, ey);
          ctx!.lineTo(ox, oy);
          ctx!.stroke();
          ctx!.setLineDash([]);

          const dirs = forwardOnly ? [1] : [1, -1];
          dirs.forEach((dir) => {
            for (let k = 0; k < 2; k++) {
              const speed = 0.22;
              let phaseT = (((t * speed * dir + i * 0.13 + k * 0.5) % 1) + 1) % 1;
              if (dir === -1) phaseT = 1 - phaseT;
              const px = ox + (ex - ox) * phaseT;
              const py = oy + (ey - oy) * phaseT;
              const fade = Math.sin(phaseT * Math.PI);
              ctx!.fillStyle = forwardOnly ? ember : violet;
              ctx!.globalAlpha = channelsOp * 0.65 * fade;
              ctx!.beginPath();
              ctx!.arc(px, py, 2.2, 0, Math.PI * 2);
              ctx!.fill();
            }
          });
        }
        ctx!.globalAlpha = channelsOp;
        ctx!.fillStyle = inkSoft;
        ctx!.font = "10px ui-monospace, monospace";
        ctx!.textAlign = "left";
        ctx!.fillText(`n = ${n} channels`, 10, H - 12);
        ctx!.globalAlpha = 1;
      }

      // two impurities, labeled S₁/S₂ and x₁/x₂
      const imp1a = Math.PI * 0.82;
      const imp2a = -0.18 * Math.PI;
      const imp1 = { x: cx + Math.cos(imp1a) * R, y: cy + Math.sin(imp1a) * R * tilt };
      const imp2 = { x: cx + Math.cos(imp2a) * R, y: cy + Math.sin(imp2a) * R * tilt };
      if (impuritiesOp > 0.01) {
        const pulse1 = reduceMotion ? 1 : 1 + 0.15 * Math.sin(t * 1.3);
        const pulse2 = reduceMotion ? 1 : 1 - 0.15 * Math.sin(t * 1.3);
        [
          { p: imp1, pulse: pulse1, color: violet, label: "S₁", xlabel: "x₁" },
          { p: imp2, pulse: pulse2, color: ember, label: "S₂", xlabel: "x₂" },
        ].forEach(({ p, pulse, color, label, xlabel }) => {
          const glowR = 26 * pulse;
          const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, color + "e6");
          grad.addColorStop(1, color + "00");
          ctx!.globalAlpha = impuritiesOp;
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.fillStyle = color;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.font = "10px ui-monospace, monospace";
          ctx!.textAlign = "center";
          ctx!.fillText(label, p.x, p.y - 12);
          ctx!.globalAlpha = impuritiesOp * 0.7;
          ctx!.fillText(xlabel, p.x, p.y + 18);
          ctx!.globalAlpha = 1;
        });
      }

      // coupling arc, labeled λ / λ*
      if (couplingOp > 0.01) {
        ctx!.globalAlpha = couplingOp * 0.5;
        ctx!.strokeStyle = inkSoft;
        ctx!.lineWidth = 1.4;
        ctx!.setLineDash([3, 4]);
        ctx!.lineDashOffset = reduceMotion ? 0 : -t * 12;
        ctx!.beginPath();
        ctx!.moveTo(imp1.x, imp1.y);
        ctx!.quadraticCurveTo(cx, cy, imp2.x, imp2.y);
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.globalAlpha = couplingOp;
        ctx!.fillStyle = inkSoft;
        ctx!.font = "10px ui-monospace, monospace";
        ctx!.textAlign = "center";
        ctx!.fillText("λ , λ*", cx, cy - 6);
        ctx!.globalAlpha = couplingOp * 0.7;
        ctx!.font = "9px ui-monospace, monospace";
        ctx!.fillText("PT-symmetric", cx, cy + 9);
        ctx!.globalAlpha = 1;
      }

      // chiral callout
      if (chiralOp > 0.3) {
        ctx!.globalAlpha = chiralOp;
        ctx!.fillStyle = ember;
        ctx!.font = "9px ui-monospace, monospace";
        ctx!.textAlign = "center";
        ctx!.fillText("forward scattering only, one direction per channel", cx, cy + R * tilt + 22);
        ctx!.globalAlpha = 1;
      }
    }

    function tick(ts: number) {
      if (playingRef.current) {
        if (lastTsRef.current !== null) {
          const dt = ts - lastTsRef.current;
          elapsedRef.current = (elapsedRef.current + dt) % TOTAL;
          const s = stageForElapsed(elapsedRef.current);
          setStage((prev) => (prev !== s ? s : prev));
        }
        lastTsRef.current = ts;
      }
      draw(elapsedRef.current);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function seek(i: number) {
    // land a little into the stage (not exactly at its threshold) so every
    // element that belongs to it has already finished fading in
    elapsedRef.current = Math.min(THRESHOLDS[i] + 700, THRESHOLDS[i + 1] ?? THRESHOLDS[i] + 700);
    setStage(i);
    setPlaying(false);
  }
  function restart() {
    elapsedRef.current = 0;
    setStage(0);
    setPlaying(true);
  }

  const active = EXPERIMENT_STEPS[stage];

  return (
    <div className="flex flex-col gap-4">
      <div className="dark relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-paper sm:aspect-video">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          aria-label="Animated build-up of the paper's setup: ring, impurities, channels, coupling, chirality"
          role="img"
        />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-paper-raised/90 px-3 py-1 text-[11px] font-mono text-ink shadow-sm">
          Step {stage + 1} of {EXPERIMENT_STEPS.length} — running live
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper-raised px-3 py-2">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-violet text-white transition hover:bg-violet-strong"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={restart}
          aria-label="Restart from the bare ring"
          title="Restart"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft hover:text-ink"
        >
          <RotateCcw size={14} />
        </button>
        <div className="mx-1 h-5 w-px bg-line" />
        <div className="flex items-center gap-1.5">
          {EXPERIMENT_STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => seek(i)}
              aria-label={`Jump to step ${i + 1}: ${s.title}`}
              className={`h-6 w-6 rounded-full text-[10px] font-semibold transition ${
                i === stage ? "bg-violet text-white" : "bg-line-soft text-ink-soft hover:bg-line"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-line bg-paper-raised p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">{active.title}</p>
        <p className="mt-2 font-mono text-[13px] leading-relaxed text-ink">{active.eq}</p>
        {active.vars.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {active.vars.map((v) => (
              <span
                key={v}
                className="rounded-full bg-violet-soft px-2 py-0.5 font-mono text-[11px] text-violet-strong"
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {EXPERIMENT_STEPS.map((s, i) => (
          <button
            key={s.title}
            onClick={() => seek(i)}
            className={`flex gap-4 rounded-xl border p-4 text-left transition ${
              i === stage
                ? "border-violet bg-violet-soft/40"
                : "border-line bg-paper-raised hover:border-violet/50"
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                i === stage ? "bg-violet text-white" : "bg-violet-soft text-violet-strong"
              }`}
            >
              {i + 1}
            </div>
            <div>
              <h3 className="font-medium text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
