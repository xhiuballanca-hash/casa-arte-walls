import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { submitInquiry } from "./inquiries.functions";

type Variant = "dark" | "light";

export const CLIENT_TYPES = [
  "Architect / Interior designer",
  "Developer / Investor",
  "Hospitality / Commercial project",
  "Private residence",
  "Contractor / Other",
] as const;

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
  const submit = useServerFn(submitInquiry);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setPending(true);
    try {
      await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          company: String(fd.get("company") ?? ""),
          client_type: String(fd.get("client_type") ?? ""),
          project_type: String(fd.get("project_type") ?? ""),
          message: String(fd.get("message") ?? ""),
          source,
        },
      });
      toast.success("Thank you — your inquiry has been received. We will be in touch shortly.");
      form.reset();
      setSent(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try WhatsApp or email instead.");
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
        <p className="eyebrow text-gold mb-5">Received</p>
        <h3 className="font-serif text-3xl md:text-4xl mb-4">Thank you.</h3>
        <p className={`${dark ? "text-beige/70" : "text-forest/70"} leading-relaxed max-w-md mb-8`}>
          Your inquiry has reached the studio. We will review it and come back to you to
          arrange the next step — a conversation, samples, or a site visit.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className={`link-line ${dark ? "text-beige/80" : "text-forest/80"}`}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      {title && (
        <h3 className={`font-serif text-3xl ${dark ? "text-beige" : "text-forest"}`}>{title}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Full name</span>
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={255}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Phone (optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Studio / Company (optional)</span>
          <input
            name="company"
            autoComplete="organization"
            maxLength={120}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>I am a…</span>
          <span className="relative block">
            <select
              name="client_type"
              required
              defaultValue={defaultClientType ?? ""}
              className={`w-full appearance-none py-3 pr-8 text-sm outline-none transition-colors cursor-pointer ${inputBase} [&>option]:text-forest`}
            >
              <option value="" disabled>
                Select
              </option>
              {CLIENT_TYPES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-beige/50" : "text-forest/50"}`}
            />
          </span>
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Project</span>
          <input
            name="project_type"
            defaultValue={defaultProject}
            maxLength={120}
            placeholder="Residence, hotel, restaurant, office…"
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
      </div>
      <label className="block">
        <span className={`eyebrow ${labelColor} mb-2 block`}>About the project</span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={defaultMessage}
          placeholder="Location, approximate surface area, timeline, finishes you are considering…"
          className={`w-full py-3 text-sm outline-none transition-colors resize-none ${inputBase}`}
        />
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
        <button type="submit" disabled={pending} className={`${btn} w-full sm:w-auto`}>
          {pending ? "Sending…" : submitLabel}
        </button>
        <p className={`text-xs leading-relaxed ${dark ? "text-beige/50" : "text-forest/50"}`}>
          Your details are used only to respond to this inquiry.
        </p>
      </div>
    </form>
  );
}
