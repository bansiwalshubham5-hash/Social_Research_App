"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const WIDTH = 640;
const HEIGHT = 360;
const PADDING = 40;

function computeTrajectory(v0: number, angleDeg: number, g: number) {
  const angle = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(angle);
  const vy = v0 * Math.sin(angle);
  const timeOfFlight = (2 * vy) / g;
  const range = vx * timeOfFlight;
  const maxHeight = (vy * vy) / (2 * g);

  const points: { x: number; y: number }[] = [];
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const t = (timeOfFlight * i) / steps;
    const x = vx * t;
    const y = vy * t - 0.5 * g * t * t;
    points.push({ x, y: Math.max(y, 0) });
  }

  return { points, timeOfFlight, range, maxHeight };
}

export function ProjectileMotionSimulation() {
  const [velocity, setVelocity] = useState(25);
  const [angle, setAngle] = useState(45);
  const [gravity, setGravity] = useState(9.8);
  const [launched, setLaunched] = useState(false);
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  const { points, timeOfFlight, range, maxHeight } = computeTrajectory(
    velocity,
    angle,
    gravity
  );

  const draw = useCallback(
    (fraction: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const plotW = WIDTH - PADDING * 2;
      const plotH = HEIGHT - PADDING * 2;
      const maxX = Math.max(range, 1);
      const maxY = Math.max(maxHeight, 1) * 1.15;

      const toScreen = (x: number, y: number) => ({
        sx: PADDING + (x / maxX) * plotW,
        sy: HEIGHT - PADDING - (y / maxY) * plotH,
      });

      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(PADDING, HEIGHT - PADDING);
      ctx.lineTo(WIDTH - PADDING, HEIGHT - PADDING);
      ctx.moveTo(PADDING, PADDING);
      ctx.lineTo(PADDING, HEIGHT - PADDING);
      ctx.stroke();

      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      points.forEach((p, i) => {
        const { sx, sy } = toScreen(p.x, p.y);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();

      const idx = Math.min(
        points.length - 1,
        Math.floor(fraction * (points.length - 1))
      );
      const ball = points[idx];
      if (ball) {
        const { sx, sy } = toScreen(ball.x, ball.y);
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [points, range, maxHeight]
  );

  useEffect(() => {
    draw(launched ? progress : 0);
  }, [draw, launched, progress]);

  const handleLaunch = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setLaunched(true);
    setProgress(0);
    const durationMs = Math.max(timeOfFlight * 400, 300);
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const fraction = Math.min(elapsed / durationMs, 1);
      setProgress(fraction);
      if (fraction < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };
    animRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-6 p-6 md:p-10">
      <div>
        <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
          Interactive Simulation
        </p>
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
          Projectile Motion
        </h2>
      </div>

      <div className="flex justify-center overflow-x-auto rounded-xl bg-neutral-50 dark:bg-neutral-900/60">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="max-w-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-300">
          Initial velocity: {velocity} m/s
          <input
            type="range"
            min={5}
            max={50}
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-300">
          Launch angle: {angle}°
          <input
            type="range"
            min={5}
            max={85}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-neutral-600 dark:text-neutral-300">
          Gravity: {gravity.toFixed(1)} m/s²
          <input
            type="range"
            min={1}
            max={25}
            step={0.1}
            value={gravity}
            onChange={(e) => setGravity(Number(e.target.value))}
            className="accent-indigo-500"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          onClick={handleLaunch}
          className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-600 active:scale-95"
        >
          Launch
        </button>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex gap-1">
            <dt className="font-medium text-neutral-700 dark:text-neutral-200">
              Range:
            </dt>
            <dd>{range.toFixed(1)} m</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-medium text-neutral-700 dark:text-neutral-200">
              Max height:
            </dt>
            <dd>{maxHeight.toFixed(1)} m</dd>
          </div>
          <div className="flex gap-1">
            <dt className="font-medium text-neutral-700 dark:text-neutral-200">
              Time of flight:
            </dt>
            <dd>{timeOfFlight.toFixed(2)} s</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
