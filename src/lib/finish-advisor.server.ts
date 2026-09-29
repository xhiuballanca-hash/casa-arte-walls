import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
import { products } from "@/lib/products-data";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./ai-run-id.server.ts";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
export const ADVISOR_ERROR_MARKER = "\u0000[[ADVISOR_ERROR]]";

const inputSchema = z.object({
  description: z.string().trim().min(3).max(1500),
  image: z
    .string()
    .max(6_000_000)
    .regex(/^data:image\/(jpeg|png|webp);base64,/)
    .optional()
    .nullable(),
  lang: z.enum(["en", "sq", "mk"]).default("en"),
});

const LANG_NAME = { en: "English", sq: "Albanian", mk: "Macedonian" } as const;

const FORMAT_LABELS = {
  en: { observed: "What we see", recommendations: "Recommended finishes", next: "Next steps" },
  sq: { observed: "Çfarë shohim", recommendations: "Materialet e rekomanduara", next: "Hapat e ardhshëm" },
  mk: { observed: "Што забележуваме", recommendations: "Препорачани материјали", next: "Следни чекори" },
} as const;

function systemPrompt(lang: keyof typeof LANG_NAME) {
  const labels = FORMAT_LABELS[lang];
  const catalog = products
    .map((p) => `- ${p.name} (${p.tagline}): ${p.summary} Interior: ${p.interior.join(", ")}. Exterior: ${p.exterior ? p.exterior.join(", ") : "not offered"}.`)
    .join("\n");
  return `You are the finish advisor for Casa D'Arte, a North Macedonia studio with more than a decade of experience that supplies Italian decorative wall finishes and applies them with its own team.
Only recommend finishes from this list, using these exact names:
${catalog}

Rules:
- Never invent prices, timelines, durability figures, certifications, project references or technical claims.
- If the photo is unclear or not a room/surface, say so briefly and rely on the description.
- Be warm, concise and editorial. Under 250 words.
- Reply in ${LANG_NAME[lang]}. Keep finish names in their original form.

Format exactly in ${LANG_NAME[lang]} (plain text, no markdown symbols like # or *):
${labels.observed}
<1-2 sentences about the space and light>

${labels.recommendations}
1. <Finish name> — <why it suits this space, one sentence>
2. <Finish name> — <one sentence>
(2 or 3 finishes)

${labels.next}
- <short step, e.g. discuss the project with the studio, see the finish in person, arrange a site visit and quotation>
- <short step>
- <short step>`;
}

export async function handleFinishAdvisor(request: Request) {
  let body: z.infer<typeof inputSchema>;
  try {
    body = inputSchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Please describe your space (and optionally add a JPG, PNG or WebP photo)." }, { status: 400 });
  }

  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return Response.json({ error: "The advisor is not configured yet." }, { status: 500 });

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const content: Array<{ type: "text"; text: string } | { type: "image"; image: URL }> = [
    { type: "text", text: `Visitor's description of the space:\n${body.description}` },
  ];
  if (body.image) content.push({ type: "image", image: new URL(body.image) });

  const result = streamText({
    model: provider.responses(MODEL),
    system: systemPrompt(body.lang),
    messages: [{ role: "user", content }],
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      try {
        for await (const part of result.fullStream) {
          if (part.type === "text-delta" && part.text) {
            wrote = true;
            controller.enqueue(encoder.encode(part.text));
          } else if (part.type === "error") {
            throw part.error;
          }
        }
        if (!wrote) throw new Error("empty");
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return controller.close();
        const status = (error as { statusCode?: number })?.statusCode;
        console.error("[finish-advisor]", status, error);
        const msg =
          status === 429
            ? "The advisor is busy right now. Please try again in a minute."
            : status === 402 || status === 403
              ? "The advisor is temporarily unavailable. Please contact the studio directly."
              : "We couldn't prepare a recommendation. Please try again or contact the studio.";
        controller.enqueue(encoder.encode(ADVISOR_ERROR_MARKER + msg));
      }
      controller.close();
    },
  });

  return withLovableAiGatewayRunIdHeader(
    new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } }),
    runIdFetch,
  );
}
