import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  client_type: z.string().trim().max(80).optional().or(z.literal("")),
  project_type: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(60).optional().or(z.literal("")),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => inquirySchema.parse(raw))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) throw new Error("Backend not configured");

    const supabase = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from("inquiries").insert({
      name: data.name,
      email: data.email || null,
      city: data.city || null,
      phone: data.phone || null,
      company: data.company || null,
      client_type: data.client_type || null,
      project_type: data.project_type || null,
      message: data.message || null,
      source: data.source || "website",
    });

    if (error) {
      console.error("[inquiries] insert failed", error);
      throw new Error("Could not submit inquiry");
    }

    try {
      const { sendTemplateEmail } = await import("./email-templates/send-email");
      await sendTemplateEmail("inquiry-notification", "info@casadarte.mk", {
        templateData: data,
        idempotencyKey: `inquiry-notification-${crypto.randomUUID()}`,
        ...(data.email ? { replyTo: data.email } : {}),
      });
    } catch (e) {
      // The inquiry is already saved; never fail the visitor's submission over email.
      console.error("[inquiries] notification email failed", e);
    }

    return { ok: true as const };
  });
