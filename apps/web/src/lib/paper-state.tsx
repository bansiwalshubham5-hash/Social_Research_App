"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface PaperState {
  alpha: number;
  n: number;
  setAlpha: (a: number) => void;
  setN: (n: number) => void;
}

const PaperStateContext = createContext<PaperState | null>(null);

export function PaperStateProvider({ children }: { children: ReactNode }) {
  const [alpha, setAlpha] = useState(Math.PI / 6);
  const [n, setN] = useState(2);
  const value = useMemo(() => ({ alpha, n, setAlpha, setN }), [alpha, n]);
  return <PaperStateContext.Provider value={value}>{children}</PaperStateContext.Provider>;
}

export function usePaperState() {
  const ctx = useContext(PaperStateContext);
  if (!ctx) throw new Error("usePaperState must be used within PaperStateProvider");
  return ctx;
}
