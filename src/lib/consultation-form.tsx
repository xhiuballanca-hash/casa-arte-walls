import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitInquiry } from "./inquiries.functions";

type Variant = "dark" | "light";

export function ConsultationForm({
  variant = "dark",
  source = "website",
  defaultProject = "",
  title,
}: {
  variant?: Variant;
  source?: string;
  defaultProject?: string;
  title?: string;
}) {
  const submit = useServerFn(submitInquiry);
  const [pending, setPending] = useState(false);

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
          project_type: String(fd.get("project_type") ?? ""),
          message: String(fd.get("message") ?? ""),
          source,
        },
      });
      toast.success("Thank you — we'll be in touch within one business day.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try WhatsApp or email.");
    } finally {
      setPending(false);
    }
  }

  const dark = variant === "dark";
  const inputBase = dark
    ? "bg-transparent border-b border-beige/20 focus:border-gold text-beige placeholder:text-beige/40"
    : "bg-transparent border-b border-forest/20 focus:border-gold text-forest placeholder:text-forest/40";
  const labelColor = dark ? "text-beige/60" : "text-forest/60";
  const btn = dark
    ? "bg-gold text-forest hover:bg-beige"
    : "bg-forest text-beige hover:bg-gold hover:text-forest";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {title && (
        <h3 className={`font-serif text-3xl ${dark ? "text-beige" : "text-forest"}`}>{title}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Full name</span>
          <input
            name="name"
            required
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
            maxLength={255}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Phone (optional)</span>
          <input
            name="phone"
            maxLength={40}
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
        <label className="block">
          <span className={`eyebrow ${labelColor} mb-2 block`}>Project type</span>
          <input
            name="project_type"
            defaultValue={defaultProject}
            maxLength={120}
            placeholder="Residence, Hotel, Restaurant…"
            className={`w-full py-3 text-sm outline-none transition-colors ${inputBase}`}
          />
        </label>
      </div>
      <label className="block">
        <span className={`eyebrow ${labelColor} mb-2 block`}>Tell us about your project</span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          className={`w-full py-3 text-sm outline-none transition-colors resize-none ${inputBase}`}
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className={`w-full py-4 rounded-full text-[11px] uppercase tracking-[0.25em] font-medium transition-all disabled:opacity-60 ${btn}`}
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
