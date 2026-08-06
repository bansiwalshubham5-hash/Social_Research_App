"use client";

import { useEffect, useState } from "react";
import { Play, Pause, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

interface Step {
  title: string;
  equation: string;
  explanation: string;
}

// The real derivation chain from the paper's End Matter (eq. 22-39) — how
// the authors actually prove the model is exactly solvable and arrive at
// the Bethe Ansatz equations this platform's simulation solves numerically.
const STEPS: Step[] = [
  {
    title: "1. Bare electron-impurity scattering",
    equation: "S^{j0₁} = (I − icλe^{iφ}P) / (1 − icλe^{iφ})",
    explanation: "Start from quantum inverse scattering: compute how a conduction electron scatters off impurity 1 alone. P is the permutation operator (swaps the two spins involved).",
  },
  {
    title: "2. The second impurity's S-matrix",
    equation: "S^{j0₂} = (I − ice^{−iφ}P) / (1 − ice^{−iφ})",
    explanation: "Impurity 2's scattering matrix is the same form with the complex-conjugate coupling — the PT symmetry of the Hamiltonian shows up directly here.",
  },
  {
    title: "3. Periodic boundary conditions",
    equation: "(S^{jj−1}⋯S^{J0₁}⋯S^{j1}S^{jN}⋯S^{J0₂}⋯S^{jj+1}) e^{ikⱼL} = 1",
    explanation: "Demanding the many-electron wavefunction be single-valued around the ring (circumference L) ties all these scattering events together into one consistency condition.",
  },
  {
    title: "4. A continuous scattering matrix",
    equation: "S(u) = (uI + icP) / (u + ic) ≡ a(u)I + b(u)P",
    explanation: "Introduce a spectral parameter u — a continuous variable that reproduces the electron-electron and electron-impurity S-matrices at specific values (u=1 for electrons, u=0 for impurity 1, etc.).",
  },
  {
    title: "5. The Yang-Baxter equation",
    equation: "S^{kj}(u−v) S^{ki}(u) S^{ji}(v) = S^{ji}(v) S^{ki}(u) S^{kj}(u−v)",
    explanation: "The key consistency condition: scattering three particles pairwise gives the same result regardless of the order. S(u) satisfies this exactly — the algebraic reason the model is solvable at all.",
  },
  {
    title: "6. The monodromy matrix",
    equation: "Ξ(u) = ∏ᵧ S^{ya}(u − u_y)",
    explanation: "Scatter one fictitious \"auxiliary\" particle through every real particle in the system, one after another, and multiply the results together.",
  },
  {
    title: "7. The transfer matrix",
    equation: "T(u) ≡ Tr_a Ξ(u) = S^{jj−1}(u−u_{j−1}) ⋯ S^{jj+1}(u−u_{j+1})",
    explanation: "Trace the monodromy matrix over the auxiliary space. This single operator, evaluated at different u, will turn out to encode infinitely many conserved quantities.",
  },
  {
    title: "8. Proving integrability",
    equation: "[T(u), T(v)] = 0",
    explanation: "Repeated application of Yang-Baxter (via the R-matrix) proves the transfer matrix commutes with itself at every u — infinitely many mutually-commuting conserved quantities. This is the actual proof the model is exactly solvable.",
  },
  {
    title: "9. Bethe Ansatz equations (one channel)",
    equation: "e^{ikⱼL} = ∏ᵧ (Λᵧ−1+ic/2)/(Λᵧ−1−ic/2)",
    explanation: "Diagonalizing the transfer matrix (algebraic Bethe Ansatz) turns the many-body problem into these coupled equations for the rapidities Λ — the single-channel version.",
  },
  {
    title: "10. Generalizing to n channels",
    equation: "e^{ikⱼL} = ∏ᵧ (Λᵧ−1+icn/2)/(Λᵧ−1−icn/2)",
    explanation: "\"Dynamical fusion\" extends the one-channel equations to general n — this is the exact equation (38) whose thermodynamic limit this platform solves numerically to produce every curve in the Simulation section.",
  },
];

export function DerivationPlayer() {
  const [expanded, setExpanded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setIdx((i) => {
        if (i >= STEPS.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 3400);
    return () => clearInterval(t);
  }, [playing]);

  const step = STEPS[idx];

  if (!expanded) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
              Final equation
            </p>
            <p className="mt-1 font-mono text-sm text-ink">
              e^(ikⱼL) = ∏ (Λᵧ−1+icn/2)/(Λᵧ−1−icn/2)  — the Bethe Ansatz equations
            </p>
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-1.5 rounded-full bg-violet px-3 py-1.5 text-xs font-medium text-white transition hover:bg-violet-strong"
          >
            <ChevronDown size={13} /> Show step-by-step derivation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-paper-raised p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">
          Step-by-step derivation &middot; from the paper&apos;s End Matter
        </p>
        <button
          onClick={() => setExpanded(false)}
          className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:bg-line-soft"
        >
          <ChevronUp size={13} /> Hide derivation
        </button>
      </div>

      <div className="min-h-[9rem] rounded-lg bg-line-soft/50 p-4">
        <p className="text-sm font-semibold text-ink">{step.title}</p>
        <p className="mt-2 overflow-x-auto whitespace-nowrap font-mono text-[15px] text-ink">
          {step.equation}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.explanation}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setPlaying(false);
            setIdx((i) => Math.max(0, i - 1));
          }}
          disabled={idx === 0}
          aria-label="Previous step"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft disabled:opacity-30"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-violet text-white transition hover:bg-violet-strong"
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setIdx((i) => Math.min(STEPS.length - 1, i + 1));
          }}
          disabled={idx === STEPS.length - 1}
          aria-label="Next step"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-line-soft disabled:opacity-30"
        >
          <ChevronRight size={14} />
        </button>

        <div className="ml-2 flex flex-1 items-center gap-1">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPlaying(false);
                setIdx(i);
              }}
              aria-label={`Go to step ${i + 1}`}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= idx ? "bg-violet" : "bg-line"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-ink-soft">
          {idx + 1}/{STEPS.length}
        </span>
      </div>
    </div>
  );
}
