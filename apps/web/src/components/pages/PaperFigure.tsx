import Image from "next/image";
import type { ReactNode } from "react";

export function PaperFigure({
  src,
  width,
  height,
  alt,
  label,
  explanation,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  explanation: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-violet-strong">{label} — straight from the paper</p>
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <Image src={src} width={width} height={height} alt={alt} className="h-auto w-full" />
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{explanation}</p>
    </div>
  );
}
