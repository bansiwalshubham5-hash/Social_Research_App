"use client";

import { useEffect, useRef } from "react";
import { usePaperState } from "@/lib/paper-state";
import { classifyPhase, PHASE_COLOR } from "@/lib/tba";

// Ambient, always-playing rendering of the paper's actual object (two
// impurities on a ring, coupled to n conduction-electron channels via
// complex-conjugate couplings) — not a fabricated laboratory. This is a
// theory paper; there is no photograph to recreate, so the "cinematic"
// treatment is applied to the real setup instead of an invented one.
export function CinematicScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { n, alpha } = usePaperState();
  const nRef = useRef(n);
  const alphaRef = useRef(alpha);

  useEffect(() => {
    nRef.current = n;
    alphaRef.current = alpha;
  }, [n, alpha]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();

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

    function frame(now: number) {
      const W = canvas!.clientWidth;
      const H = canvas!.clientHeight;
      const t = reduceMotion ? 0 : (now - start) / 1000;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.34;
      const tilt = 0.42; // perspective squash for the ring

      ctx!.clearRect(0, 0, W, H);

      // read from the canvas itself (not the document root) so a locally
      // scoped `.dark` wrapper (used for the always-cinematic hero banner)
      // is respected even when the rest of the page is in light mode
      const style = getComputedStyle(canvas!);
      const violet = style.getPropertyValue("--violet").trim() || "#6d5ef0";
      const ember = style.getPropertyValue("--ember").trim() || "#e85d2f";
      const line = style.getPropertyValue("--line").trim() || "#e3e0ec";
      const inkSoft = style.getPropertyValue("--ink-soft").trim() || "#7a7690";

      const n = nRef.current;
      const alpha = alphaRef.current;
      const phase = classifyPhase(alpha, n);
      const phaseColor = PHASE_COLOR[phase];

      // ambient vignette glow behind everything, breathing slowly
      const breathe = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(t * 0.6);
      const vgrad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, R * 2.2);
      vgrad.addColorStop(0, phaseColor + Math.round(10 + breathe * 8).toString(16).padStart(2, "0"));
      vgrad.addColorStop(1, "transparent");
      ctx!.fillStyle = vgrad;
      ctx!.fillRect(0, 0, W, H);

      // channel lines with flowing particles (conduction electrons)
      const chAngleOffset = 0.3;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + chAngleOffset;
        const ex = cx + Math.cos(a) * R;
        const ey = cy + Math.sin(a) * R * tilt;
        const ox = cx + Math.cos(a) * R * 1.9;
        const oy = cy + Math.sin(a) * R * tilt * 1.9;

        ctx!.strokeStyle = line;
        ctx!.globalAlpha = 0.5;
        ctx!.lineWidth = 1;
        ctx!.setLineDash([1, 5]);
        ctx!.beginPath();
        ctx!.moveTo(ex, ey);
        ctx!.lineTo(ox, oy);
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.globalAlpha = 1;

        // 2 particles per channel, staggered, flowing inward toward the ring
        for (let k = 0; k < 2; k++) {
          const speed = 0.18;
          const phaseT = ((reduceMotion ? k * 0.5 : t * speed + i * 0.13 + k * 0.5) % 1 + 1) % 1;
          const px = ox + (ex - ox) * phaseT;
          const py = oy + (ey - oy) * phaseT;
          const fade = Math.sin(phaseT * Math.PI);
          ctx!.fillStyle = violet;
          ctx!.globalAlpha = 0.55 * fade;
          ctx!.beginPath();
          ctx!.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        }
      }

      // the ring itself
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

      // faint rotating energy-scale ring (RG flow cue)
      const rot = reduceMotion ? 0 : t * 0.15;
      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(rot);
      ctx!.strokeStyle = inkSoft;
      ctx!.globalAlpha = 0.18;
      ctx!.setLineDash([2, 10]);
      ctx!.beginPath();
      ctx!.ellipse(0, 0, R * 1.15, R * tilt * 1.15, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.restore();
      ctx!.globalAlpha = 1;

      // two impurities, breathing with a phase offset (gain/loss balance cue)
      const imp1a = Math.PI * 0.82;
      const imp2a = -0.18 * Math.PI;
      const imp1 = { x: cx + Math.cos(imp1a) * R, y: cy + Math.sin(imp1a) * R * tilt };
      const imp2 = { x: cx + Math.cos(imp2a) * R, y: cy + Math.sin(imp2a) * R * tilt };

      const pulse1 = reduceMotion ? 1 : 1 + 0.18 * Math.sin(t * 1.3);
      const pulse2 = reduceMotion ? 1 : 1 - 0.18 * Math.sin(t * 1.3); // anti-phase: gain vs loss

      [
        { p: imp1, pulse: pulse1, color: violet, label: "S₁" },
        { p: imp2, pulse: pulse2, color: ember, label: "S₂" },
      ].forEach(({ p, pulse, color }) => {
        const glowR = 30 * pulse;
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, color + "e6");
        grad.addColorStop(1, color + "00");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
        ctx!.fill();
      });

      // coupling arc between them, animated dash offset (marching ants = "live coupling")
      ctx!.strokeStyle = inkSoft;
      ctx!.globalAlpha = 0.45;
      ctx!.lineWidth = 1.4;
      ctx!.setLineDash([3, 4]);
      ctx!.lineDashOffset = reduceMotion ? 0 : -t * 12;
      ctx!.beginPath();
      ctx!.moveTo(imp1.x, imp1.y);
      ctx!.quadraticCurveTo(cx, cy, imp2.x, imp2.y);
      ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.globalAlpha = 1;

      ctx!.fillStyle = inkSoft;
      ctx!.font = "10px ui-monospace, monospace";
      ctx!.textAlign = "center";
      ctx!.fillText("λ , λ*", cx, cy - 6);
      ctx!.globalAlpha = 0.7;
      ctx!.font = "9px ui-monospace, monospace";
      ctx!.fillText(alpha < Math.PI / 2 || (phase !== "ysr-1" && phase !== "ysr-2") ? "PT-symmetric" : "PT-broken", cx, cy + 9);
      ctx!.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-label="Animated rendering of the two impurities on a ring, coupled to conduction-electron channels" role="img" />;
}
