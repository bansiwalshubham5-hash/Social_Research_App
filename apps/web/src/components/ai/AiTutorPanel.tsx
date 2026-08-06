"use client";

import { useState } from "react";
import { Sparkles, RefreshCw, KeyRound } from "lucide-react";

const LEVELS = [
  { id: "school", label: "ELI12" },
  { id: "undergraduate", label: "Undergrad" },
  { id: "postgraduate", label: "Grad" },
  { id: "phd", label: "PhD" },
  { id: "researcher", label: "Researcher" },
];

interface Props {
  sectionName: string; // e.g. "Experiment" -> button reads "Update Experiment"
  prompt: string; // what to ask the tutor about, section-specific
}

type Status = "idle" | "loading" | "done" | "not_configured" | "error";

export function AiTutorPanel({ sectionName, prompt }: Props) {
  const [level, setLevel] = useState("undergraduate");
  const [status, setStatus] = useState<Status>("idle");
  const [text, setText] = useState("");

  async function ask(withLevel: string) {
    setStatus("loading");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, level: withLevel }),
      });
      const data = await res.json();
      if (data.ok) {
        setText(data.text);
        setStatus("done");
      } else if (data.reason === "not_configured") {
        setStatus("not_configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleLevelChange(id: string) {
    setLevel(id);
    if (status === "done" || status === "loading") ask(id);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-paper-raised p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-strong">
          <Sparkles size={13} />
          AI Tutor — live
        </div>
        <button
          onClick={() => ask(level)}
          disabled={status === "loading"}
          className="flex items-center gap-1.5 rounded-full bg-violet px-3 py-1 text-xs font-medium text-white transition hover:bg-violet-strong disabled:opacity-60"
        >
          <RefreshCw size={11} className={status === "loading" ? "animate-spin" : ""} />
          Update {sectionName}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => handleLevelChange(l.id)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
              level === l.id
                ? "bg-violet text-white"
                : "bg-line-soft text-ink-soft hover:bg-line"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="min-h-[3.5rem] text-sm leading-relaxed text-ink-soft">
        {status === "idle" && (
          <p>Pick a level and click “Update {sectionName}” for a live, grounded explanation.</p>
        )}
        {status === "loading" && <p className="animate-pulse">Thinking…</p>}
        {status === "done" && <p className="whitespace-pre-wrap text-ink">{text}</p>}
        {status === "error" && (
          <p className="text-ember">Something went wrong reaching the model. Try again.</p>
        )}
        {status === "not_configured" && (
          <div className="flex items-start gap-2 rounded-lg border border-dashed border-line bg-line-soft/60 p-3 text-xs">
            <KeyRound size={14} className="mt-0.5 shrink-0" />
            <span>
              No <code className="font-mono">ANTHROPIC_API_KEY</code> is set for this app yet, so
              this is honestly showing nothing rather than faking a response. Add one to{" "}
              <code className="font-mono">apps/web/.env.local</code> and reload to enable live
              generation.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
