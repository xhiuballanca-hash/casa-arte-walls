import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { useT } from "./i18n";

// Public key from web3forms.com (sends each inquiry to info@casadarte.mk). Safe to keep in the code.
const WEB3FORMS_ACCESS_KEY = "0e196f57-a98d-4b25-b6df-fa6af049a7d8";

type Variant = "dark" | "light";

export const CLIENT_TYPES = [
  "Architect / Interior designer",
  "Developer / Investor",
  "Hospitality / Commercial project",
  "Private residence",
  "Contractor / Other",
] as const;

export const SERVICE_OPTIONS = [
  "Travertino",
  "Marmorino",
  "Sahara",
  "Stucco Veneziano",
  "Microcement",
  "Beton Look",
  "Not sure yet — advice needed",
];

export type ClientType = (typeof CLIENT_TYPES)[number];

export function ConsultationForm({
  variant = "dark",
  source = "website",
  defaultProject = "",
  defaultMessage = "",
  defaultClientType,
  title,
  submitLabel = "Send inquiry",
}: {
  variant?: Variant;
  source?: string;
  defaultProject?: string;
  defaultMessage?: string;
  defaultClientType?: ClientType;
  title?: string;
  submitLabel?: string;
}) {
  const t = useT();
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setPending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New website inquiry: ${String(fd.get("name") ?? "")}`,
          from_name: "Casa D'Arte website",
          Name: String(fd.get("name") ?? ""),
          Phone: String(fd.get("phone") ?? ""),
          City: String(fd.get("city") ?? ""),
          "Finish / Service": String(fd.get("project_type") ?? ""),
          "Client type": defaultClientType ?? "",
          Message: String(fd.get("message") ?? ""),
          Form: source,
          botcheck: Boolean(fd.get("botcheck")),
        }),
      });
      const result = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !result.success) throw new Error("Form submission failed");
      toast.success(t("Thank you. Your inquiry has been received, and we will be in touch shortly."));
      form.reset();
      setSent(true);
    } catch (err) {
      console.error(err);
      toast.error(t("Something went wrong. Please try again or email us instead."));
    } finally {
      setPending(false);
    }
  }

  const dark = variant === "dark";
  const inputBase = dark
    ? "bg-transparent border-b border-beige/25 focus:border-gold text-beige placeholder:text-beige/35"
    : "bg-transparent border-b border-forest/25 focus:border-gold text-forest placeholder:text-forest/35";
  const labelColor = dark ? "text-beige/60" : "text-forest/60";
  const btn = dark ? "btn btn-gold" : "btn btn-forest";

  if (sent) {
    return (
      <div className={`py-10 ${dark ? "text-beige" : "text-forest"}`}>
        <p className="eyebrow text-gold mb-5">{t("Received")}</p>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">{t("Thank you.")}</h3>
        <p className={`${dark ? "text-beige/70" : "text-forest/70"} leading-relaxed max-w-md mb-8`}>
          {t("Your inquiry has reached the studio. We will review it and come back to you to arrange the next step: a conversation, samples, or a site visit.")}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className={`link-line ${dark ? "text-beige/80" : "text-forest/80"}`}
        >
          {t("Send another inquiry")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      {title && (
        <h3 className={`font-serif text-3xl ${dark ? "text-beige" : "text-forest"}`}>{title}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>{t("Name")}</span>
          <input
            name="name"
            required autoComplete="name" maxLength={120}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>{t("Phone")}</span>
          <input
            name="phone"
            type="tel" required autoComplete="tel" maxLength={40}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>{t("City")}</span>
          <input
            name="city"
            autoComplete="address-level2" maxLength={120}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>{t("Finish / Service of interest")}</span>
          <span className="relative block">
            <select
              name="project_type"
              defaultValue={SERVICE_OPTIONS.includes(defaultProject) ? defaultProject : ""}
              className={`w-full appearance-none py-3 pr-8 text-sm outline-none transition-colors cursor-pointer ${inputBase} [&>option]:text-forest`}
            >
              <option value="">{t("Select")}</option>
              {SERVICE_OPTIONS.map((c) => (
                <option key={c} value={c}>{t(c)}</option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-beige/50" : "text-forest/50"}`}
            />
          </span>
        </label>
      </div>
      <label className="block">
        <span className={`eyebrow ${labelColor} mb-2 block`}>{t("Message")}</span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={defaultMessage}
          className={`w-full py-3 text-sm outline-none transition-colors resize-none ${inputBase}`}
        />
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
        <button type="submit" disabled={pending} className={`${btn} w-full sm:w-auto`}>
          {pending ? t("Sending…") : t(submitLabel)}
        </button>
        <p className={`text-xs leading-relaxed ${dark ? "text-beige/50" : "text-forest/50"}`}>
          {t("Your details are used only to respond to this inquiry.")}
        </p>
      </div>
    </form>
  );
}
