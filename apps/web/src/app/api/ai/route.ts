import Anthropic from "@anthropic-ai/sdk";
import { PAPER_SYSTEM_CONTEXT, levelInstruction } from "@/lib/paper-context";

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, reason: "not_configured" as const },
      { status: 200 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.prompt !== "string") {
    return Response.json({ ok: false, reason: "bad_request" as const }, { status: 400 });
  }

  const level: string = typeof body.level === "string" ? body.level : "undergraduate";

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 700,
      system: `${PAPER_SYSTEM_CONTEXT}\n\n${levelInstruction(level)}`,
      messages: [{ role: "user", content: body.prompt }],
    });

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return Response.json({ ok: true as const, text });
  } catch (err) {
    return Response.json(
      { ok: false as const, reason: "upstream_error", detail: String(err) },
      { status: 502 }
    );
  }
}
