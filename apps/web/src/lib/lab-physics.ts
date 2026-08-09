// Shared derivation layer for the homepage virtual lab. Every visual control
// (PT toggle, coupling strength, gain/loss, temperature, channel count)
// resolves here into the same real parameters (alpha, n, T) the rest of the
// site's TBA engine (lib/tba.ts) already consumes — nothing in the lab is a
// fabricated number, only ever a real classifyPhase()/simp() call downstream.
export const HALF_PI = Math.PI / 2;

/** The largest alpha worth exploring for a given channel count — covers every phase, including local-moment. */
export function maxAlphaForN(n: number): number {
  return (n / 2 + 2) * Math.PI;
}

/**
 * PT symmetry requires balanced gain and loss (page 1, concept 1's proof: the
 * Hamiltonian is PT-invariant only because impurity 2's coupling is impurity
 * 1's exact complex conjugate). So gain and loss are kept numerically locked
 * together here rather than two independent knobs — alpha then grows with
 * that shared gain/loss magnitude, scaled by the coupling-strength slider.
 */
export function computeAlpha(ptOn: boolean, n: number, couplingStrength: number, gainLoss: number): number {
  if (!ptOn) return 0;
  const t = Math.min(Math.max(gainLoss * couplingStrength, 0), 1);
  return t * maxAlphaForN(n);
}

/**
 * The offline-solved xi-grid under-resolves the kernel's honest narrowing to
 * a delta function right at each phase/tower boundary (every one sits at a
 * multiple of pi/2 — see page 3's proof). Evaluate very slightly off it there
 * instead of letting that grid artifact show up as a visual/numeric glitch.
 */
const BOUNDARY_EPS = 0.08 * Math.PI;
export function nudgeAwayFromBoundary(alpha: number): number {
  const b = Math.round(alpha / HALF_PI) * HALF_PI;
  if (Math.abs(alpha - b) < BOUNDARY_EPS) return alpha < b ? b - BOUNDARY_EPS : b + BOUNDARY_EPS;
  return alpha;
}
