import type { Database, Json } from "@/integrations/supabase/types";

export type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];
export type LeadNote = Database["public"]["Tables"]["lead_notes"]["Row"];
export type Quotation = Database["public"]["Tables"]["quotations"]["Row"];

// ---------------------------------------------------------------------------
// Lead pipeline
// ---------------------------------------------------------------------------

export const LEAD_STATUSES = ["new", "contacted", "sample_sent", "quoted", "won", "lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  sample_sent: "Sample sent",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

/** Tailwind classes for status chips — brand-token based. */
export const LEAD_STATUS_TONE: Record<LeadStatus, string> = {
  new: "bg-gold/15 text-forest border-gold/40",
  contacted: "bg-forest/5 text-forest border-forest/20",
  sample_sent: "bg-forest/5 text-forest border-forest/20",
  quoted: "bg-forest/10 text-forest border-forest/30",
  won: "bg-forest text-beige border-forest",
  lost: "bg-transparent text-forest/45 border-forest/15 line-through",
};

export const OPEN_STATUSES: LeadStatus[] = ["new", "contacted", "sample_sent", "quoted"];

export const LEAD_PRIORITIES = ["low", "normal", "high"] as const;
export type LeadPriority = (typeof LEAD_PRIORITIES)[number];
export const LEAD_PRIORITY_LABEL: Record<LeadPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
};

export const NOTE_KINDS = [
  "note",
  "call",
  "email",
  "meeting",
  "site_visit",
  "sample",
  "quote",
  "status",
] as const;
export type NoteKind = (typeof NOTE_KINDS)[number];
export const NOTE_KIND_LABEL: Record<NoteKind, string> = {
  note: "Note",
  call: "Call",
  email: "Email",
  meeting: "Meeting",
  site_visit: "Site visit",
  sample: "Sample",
  quote: "Quotation",
  status: "Status",
};

export function isLeadStatus(v: string | null | undefined): v is LeadStatus {
  return !!v && (LEAD_STATUSES as readonly string[]).includes(v);
}

export function leadStatus(v: string | null | undefined): LeadStatus {
  return isLeadStatus(v) ? v : "new";
}

export function leadPriority(v: string | null | undefined): LeadPriority {
  return v === "low" || v === "high" ? v : "normal";
}

/** Human label for a raw `source` value stored with each inquiry. */
export function sourceLabel(source: string | null | undefined): string {
  if (!source) return "Website";
  const map: Record<string, string> = {
    website: "Website",
    "home-inquiry": "Home page",
    "contact-project": "Contact · Project",
    "contact-sample": "Contact · Sample",
    "contact-quote": "Contact · Quote",
    "contact-partner": "Contact · Partner",
    architects: "Architects page",
    about: "Studio page",
  };
  if (map[source]) return map[source];
  if (source.startsWith("product-")) {
    const slug = source.replace("product-", "");
    return `Finish · ${slug.replace(/-/g, " ")}`;
  }
  return source.replace(/[-_]/g, " ");
}

// ---------------------------------------------------------------------------
// Quotations
// ---------------------------------------------------------------------------

export const QUOTE_STATUSES = ["draft", "sent", "accepted", "declined", "expired"] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];
export const QUOTE_STATUS_LABEL: Record<QuoteStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
};
export const QUOTE_STATUS_TONE: Record<QuoteStatus, string> = {
  draft: "bg-transparent text-forest/60 border-forest/20",
  sent: "bg-gold/15 text-forest border-gold/40",
  accepted: "bg-forest text-beige border-forest",
  declined: "bg-transparent text-forest/45 border-forest/15 line-through",
  expired: "bg-transparent text-forest/45 border-forest/15",
};

export function quoteStatus(v: string | null | undefined): QuoteStatus {
  return (QUOTE_STATUSES as readonly string[]).includes(v ?? "") ? (v as QuoteStatus) : "draft";
}

export type QuoteItem = {
  id: string;
  description: string;
  finish: string;
  unit: string; // m², lm, item, day
  quantity: number;
  unit_price: number;
};

export const QUOTE_UNITS = ["m²", "lm", "item", "day", "lot"] as const;

export function newQuoteItem(partial: Partial<QuoteItem> = {}): QuoteItem {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Math.random()),
    description: "",
    finish: "",
    unit: "m²",
    quantity: 1,
    unit_price: 0,
    ...partial,
  };
}

export function parseQuoteItems(raw: Json | null | undefined): QuoteItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((r) => (r && typeof r === "object" && !Array.isArray(r) ? r : null))
    .filter((r): r is Record<string, Json | undefined> => r !== null)
    .map((r) =>
      newQuoteItem({
        id: typeof r.id === "string" ? r.id : undefined,
        description: typeof r.description === "string" ? r.description : "",
        finish: typeof r.finish === "string" ? r.finish : "",
        unit: typeof r.unit === "string" ? r.unit : "m²",
        quantity: typeof r.quantity === "number" ? r.quantity : Number(r.quantity) || 0,
        unit_price: typeof r.unit_price === "number" ? r.unit_price : Number(r.unit_price) || 0,
      }),
    );
}

export function lineTotal(item: QuoteItem): number {
  return round2((Number(item.quantity) || 0) * (Number(item.unit_price) || 0));
}

export function computeQuoteTotals(items: QuoteItem[], discountPct: number, taxPct: number) {
  const subtotal = round2(items.reduce((sum, it) => sum + lineTotal(it), 0));
  const discount = round2(subtotal * ((Number(discountPct) || 0) / 100));
  const net = round2(subtotal - discount);
  const tax = round2(net * ((Number(taxPct) || 0) / 100));
  const total = round2(net + tax);
  return { subtotal, discount, net, tax, total };
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatMoney(value: number | string | null | undefined, currency = "EUR"): string {
  const n = typeof value === "string" ? Number(value) : (value ?? 0);
  try {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(Number.isFinite(n) ? n : 0);
  } catch {
    return `${currency} ${(Number.isFinite(n) ? n : 0).toFixed(2)}`;
  }
}

export function formatDate(value: string | null | undefined, opts?: Intl.DateTimeFormatOptions): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", opts ?? { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function relativeTime(value: string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value).getTime();
  if (Number.isNaN(d)) return "—";
  const diff = Date.now() - d;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} mo ago`;
  return `${Math.round(months / 12)} y ago`;
}

export function initials(name: string | null | undefined): string {
  if (!name) return "—";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

/** CSV export helper — quotes every cell, RFC-4180 style. */
export function toCsv(rows: Array<Record<string, string | number | null | undefined>>): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: string | number | null | undefined) => {
    const s = v == null ? "" : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [headers.map(esc).join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join(
    "\r\n",
  );
}

export function downloadTextFile(filename: string, content: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
