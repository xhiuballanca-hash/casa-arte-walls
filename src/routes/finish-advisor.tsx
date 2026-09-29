import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { products } from "@/lib/products-data";

const ERROR_MARKER = "\u0000[[ADVISOR_ERROR]]";
const TITLE = "Finish Advisor — Casa D'Arte";
const DESCRIPTION =
  "Upload a photo of your room, describe the space, and get AI-powered suggestions for Casa D'Arte decorative finishes and next steps.";

export const Route = createFileRoute("/finish-advisor")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/finish-advisor" }],
  }),
  component: FinishAdvisor,
});

/** Downscale to a JPEG data URL (max 1280px) so uploads stay light. */
async function toDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function FinishAdvisor() {
  const { t, lang } = useI18n();
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file?: File) {
    setError(null);
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type) || file.size > 20_000_000) {
      setError(t("Please choose a JPG, PNG or WebP photo under 20 MB."));
      return;
    }
    try {
      setImage(await toDataUrl(file));
    } catch {
      setError(t("This photo couldn't be read. Please try another one."));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 3 || loading) return;
    setLoading(true);
    setAnswer("");
    setError(null);
    try {
      const res = await fetch("/api/finish-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, image, lang }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("We couldn't prepare a recommendation. Please try again."));
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const i = text.indexOf(ERROR_MARKER);
        if (i >= 0) {
          setAnswer(text.slice(0, i));
          throw new Error(text.slice(i + ERROR_MARKER.length));
        }
        setAnswer(text);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const mentioned = products.filter((p) => answer.includes(p.name));

  return (
    <>
      <section className="pt-40 pb-12 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1100px]">
          <p className="eyebrow text-gold mb-6">{t("Finish Advisor")}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-forest leading-[1.02] mb-8 text-balance">
            {t("Show us your space.")} <em className="italic">{t("We'll suggest the finish.")}</em>
          </h1>
          <p className="text-forest/70 text-lg max-w-2xl leading-relaxed">
            {t("Upload a photo of your room and describe it. Our AI-powered advisor suggests suitable finishes and next steps — a starting point for a conversation with our studio.")}
          </p>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-12 bg-beige">
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-12 gap-12 border-t border-forest/15 pt-12">
          <form onSubmit={submit} className="md:col-span-5 space-y-8">
            <div>
              <p className="eyebrow text-forest/60 mb-4">{t("Room photo (optional)")}</p>
              {image ? (
                <div className="relative">
                  <img src={image} alt={t("Your uploaded room")} className="w-full aspect-[4/3] object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    aria-label={t("Remove photo")}
                    className="absolute top-3 right-3 bg-beige/90 text-forest p-2 hover:text-gold"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-full aspect-[4/3] border border-dashed border-forest/30 flex flex-col items-center justify-center gap-3 text-forest/60 hover:border-gold hover:text-gold transition-colors"
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-sm">{t("Choose a photo")}</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
            </div>

            <div>
              <label htmlFor="desc" className="eyebrow text-forest/60 mb-4 block">
                {t("Describe your space")}
              </label>
              <textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1500}
                rows={5}
                required
                placeholder={t("e.g. A bright living room with oak floors. We'd like a warm, calm feature wall behind the sofa.")}
                className="w-full bg-transparent border border-forest/20 p-4 text-forest placeholder:text-forest/40 focus:outline-none focus:border-gold"
              />
            </div>

            <button type="submit" disabled={loading || description.trim().length < 3} className="btn btn-forest disabled:opacity-50">
              {loading ? t("Preparing suggestions…") : t("Get Recommendations")}
            </button>
          </form>

          <div className="md:col-span-7" aria-live="polite">
            {!answer && !error && !loading && (
              <p className="text-forest/50 leading-relaxed">
                {t("Your suggestions will appear here.")}
              </p>
            )}
            {loading && !answer && <p className="text-forest/50 animate-pulse">{t("Looking at your space…")}</p>}
            {answer && (
              <div className="whitespace-pre-wrap text-forest/85 text-lg leading-relaxed">{answer}</div>
            )}
            {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

            {answer && !loading && (
              <div className="mt-12 border-t border-forest/15 pt-8 space-y-6">
                {mentioned.length > 0 && (
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {mentioned.map((p) => (
                      <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="link-line text-forest">
                        {t("Explore {name}", { name: p.name })} <span aria-hidden>→</span>
                      </Link>
                    ))}
                  </div>
                )}
                <Link to="/contact" search={{ intent: "project" }} className="btn btn-forest inline-flex">
                  {t("Discuss Your Project")}
                </Link>
                <p className="text-xs text-forest/50">
                  {t("Suggestions are AI-generated and indicative. Our team confirms the right finish on site.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
