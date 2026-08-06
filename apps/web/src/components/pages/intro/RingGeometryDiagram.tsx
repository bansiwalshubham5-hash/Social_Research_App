"use client";

import { useRef, useState } from "react";

// A draggable ring geometry — a new interaction shape (drag around a circle,
// not along a line or a toggle) that lets a reader concretely verify the
// paper's claim: dragging either impurity never changes the fixed energy
// readout, because only forward scattering exists.
export function RingGeometryDiagram() {
  const [angle1, setAngle1] = useState(-100);
  const [angle2, setAngle2] = useState(80);
  const [dragging, setDragging] = useState<1 | 2 | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const cx = 100;
  const cy = 100;
  const r = 70;

  function angleFromEvent(e: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - cx;
    const y = ((e.clientY - rect.top) / rect.height) * 200 - cy;
    return (Math.atan2(y, x) * 180) / Math.PI;
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const a = angleFromEvent(e);
    if (dragging === 1) setAngle1(a);
    else setAngle2(a);
  }

  function pt(angle: number) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
  }
  const p1 = pt(angle1);
  const p2 = pt(angle2);

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper-raised p-5">
      <svg
        ref={svgRef}
        viewBox="0 0 200 200"
        className="h-auto w-56 touch-none"
        onPointerMove={handlePointerMove}
        onPointerUp={() => setDragging(null)}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--line)" strokeWidth={2} />
        <path
          d={`M ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
          fill="none"
          stroke="var(--ink-soft)"
          strokeWidth={1.4}
          markerEnd="url(#ring-arrow)"
          opacity={0.5}
        />
        <defs>
          <marker id="ring-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-soft)" />
          </marker>
        </defs>
        <circle
          cx={p1.x}
          cy={p1.y}
          r={9}
          fill="var(--violet)"
          style={{ cursor: "grab" }}
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            setDragging(1);
          }}
        />
        <text x={p1.x} y={p1.y - 14} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--violet-strong)">
          S₁
        </text>
        <circle
          cx={p2.x}
          cy={p2.y}
          r={9}
          fill="var(--ember)"
          style={{ cursor: "grab" }}
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            setDragging(2);
          }}
        />
        <text x={p2.x} y={p2.y - 14} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--ember)">
          S₂
        </text>
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
          L
        </text>
      </svg>
      <p className="rounded-full bg-line-soft px-3 py-1 font-mono text-xs text-ink">
        energy = E₀ — unchanged, drag either impurity
      </p>
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Both impurities sit on a ring of circumference L that conduction electrons circle in one direction
        only (forward scattering, no backscattering). Drag either dot — the energy readout above never
        moves, exactly as the paper states.
      </p>
    </div>
  );
}
