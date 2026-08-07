"use client";

import { useState } from "react";

const VIOLET = "var(--violet)";
const EMBER = "var(--ember)";

// The single picture that makes "complex-conjugate couplings" click: two
// arrows on a compass, one tilted up by phi, the mirror one tilted down by
// phi, meeting exactly on the horizontal axis. A new "mirrored-vector"
// widget — nothing else on the site draws two vectors reflecting each other.
export function ComplexConjugatePair() {
  const [phiDeg, setPhiDeg] = useState(35);
  const phi = (phiDeg * Math.PI) / 180;
  const cx = 110;
  const cy = 100;
  const r = 70;
  const x1 = cx + r * Math.cos(-phi);
  const y1 = cy - r * Math.sin(-phi);
  const x2 = cx + r * Math.cos(phi);
  const y2 = cy - r * Math.sin(phi);

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper-raised p-5">
      <svg viewBox="0 0 220 200" className="h-auto w-full max-w-xs">
        <line x1={10} y1={cy} x2={210} y2={cy} stroke="var(--line)" strokeWidth={1} />
        <line x1={cx} y1={20} x2={cx} y2={180} stroke="var(--line)" strokeWidth={1} strokeDasharray="2 3" />
        <text x={205} y={cy - 6} fontSize="9" fill="var(--ink-soft)" fontFamily="ui-monospace, monospace">
          real
        </text>
        <line x1={cx} y1={cy} x2={x1} y2={y1} stroke={VIOLET} strokeWidth={2.5} markerEnd="url(#arrow1)" />
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={EMBER} strokeWidth={2.5} markerEnd="url(#arrow2)" />
        <defs>
          <marker id="arrow1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={VIOLET} />
          </marker>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={EMBER} />
          </marker>
        </defs>
        <text x={x1 + 8} y={y1 + 4} fontSize="13" fontWeight={700} fill={VIOLET} fontFamily="ui-monospace, monospace">
          λ
        </text>
        <text x={x2 + 8} y={y2 + 4} fontSize="13" fontWeight={700} fill={EMBER} fontFamily="ui-monospace, monospace">
          λ*
        </text>
        <path d={`M ${cx + 22} ${cy - 14} A 22 22 0 0 0 ${cx + 22} ${cy + 14}`} fill="none" stroke="var(--ink-soft)" strokeWidth={1} />
        <text x={cx + 30} y={cy + 4} fontSize="9" fill="var(--ink-soft)">
          ±φ
        </text>
      </svg>
      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5" style={{ color: VIOLET }}>
          <span className="h-2 w-2 rounded-full" style={{ background: VIOLET }} /> λ — impurity 1
        </span>
        <span className="flex items-center gap-1.5" style={{ color: EMBER }}>
          <span className="h-2 w-2 rounded-full" style={{ background: EMBER }} /> λ* — impurity 2
        </span>
      </div>
      <input
        type="range"
        min={5}
        max={80}
        value={phiDeg}
        onChange={(e) => setPhiDeg(Number(e.target.value))}
        className="w-full max-w-xs accent-violet"
      />
      <p className="max-w-xs text-center text-xs leading-relaxed text-ink-soft">
        Two arrows, same length, mirrored across the real axis — that is all &ldquo;complex conjugate&rdquo;
        means. Impurity 1&apos;s coupling points up by an angle φ; impurity 2&apos;s points down by the exact
        same angle. Drag φ — they always stay mirror images of each other.
      </p>
    </div>
  );
}
