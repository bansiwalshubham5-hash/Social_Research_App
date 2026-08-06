// Custom vector illustration of the paper's actual setup: two spin-1/2
// impurities on a ring, coupled to n conduction-electron channels via
// complex-conjugate couplings (lambda, lambda*) — not decorative, this is
// literally the Hamiltonian's geometry (eq. 1).
export function HeroIllustration() {
  const ringR = 120;
  const cx = 160;
  const cy = 160;
  const channelCount = 7;
  const channels = Array.from({ length: channelCount }, (_, i) => {
    const angle = (i / channelCount) * Math.PI * 2 + 0.3;
    return {
      x1: cx + Math.cos(angle) * (ringR - 4),
      y1: cy + Math.sin(angle) * (ringR - 4),
      x2: cx + Math.cos(angle) * (ringR + 34),
      y2: cy + Math.sin(angle) * (ringR + 34),
    };
  });

  const imp1 = { x: cx + ringR * Math.cos(Math.PI * 0.82), y: cy + ringR * Math.sin(Math.PI * 0.82) };
  const imp2 = { x: cx + ringR * Math.cos(Math.PI * -0.18), y: cy + ringR * Math.sin(Math.PI * -0.18) };

  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" role="img" aria-label="Two impurities on a ring coupled to conduction-electron channels via complex-conjugate Kondo couplings">
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {channels.map((c, i) => (
        <line
          key={i}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
      ))}

      <circle cx={cx} cy={cy} r={ringR} fill="none" stroke="var(--violet)" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={ringR} fill="none" stroke="var(--violet)" strokeOpacity="0.15" strokeWidth="10" />

      <circle cx={imp1.x} cy={imp1.y} r="34" fill="url(#glow1)" />
      <circle cx={imp2.x} cy={imp2.y} r="34" fill="url(#glow2)" />
      <circle cx={imp1.x} cy={imp1.y} r="7" fill="var(--violet)" />
      <circle cx={imp2.x} cy={imp2.y} r="7" fill="var(--ember)" />

      <path
        d={`M ${imp1.x} ${imp1.y} Q ${cx} ${cy} ${imp2.x} ${imp2.y}`}
        fill="none"
        stroke="var(--ink-soft)"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
        λ , λ*
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)" opacity="0.7">
        PT-symmetric
      </text>

      <text x={imp1.x} y={imp1.y - 16} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ink)">
        S₁
      </text>
      <text x={imp2.x} y={imp2.y - 16} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ink)">
        S₂
      </text>
      <text x={cx + ringR + 44} y={cy - ringR + 8} fontSize="10" fontFamily="ui-monospace, monospace" fill="var(--ink-soft)">
        n channels
      </text>
    </svg>
  );
}
