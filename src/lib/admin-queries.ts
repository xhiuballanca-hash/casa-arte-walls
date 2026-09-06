import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import {
  computeQuoteTotals,
  type Inquiry,
  type LeadNote,
  type LeadPriority,
  type LeadStatus,
  type NoteKind,
  type QuoteItem,
  type QuoteStatus,
  type Quotation,
} from "@/lib/crm";

type InquiryUpdate = Database["public"]["Tables"]["inquiries"]["Update"];
type InquiryInsert = Database["public"]["Tables"]["inquiries"]["Insert"];
type QuotationInsert = Database["public"]["Tables"]["quotations"]["Insert"];
type QuotationUpdate = Database["public"]["Tables"]["quotations"]["Update"];

/* ------------------------------------------------------------------ */
/* Leads                                                               */
/* ------------------------------------------------------------------ */

export const leadsQuery = queryOptions({
  queryKey: ["leads", "all"],
  queryFn: async (): Promise<Inquiry[]> => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) throw error;
    return data;
  },
});

export const leadQuery = (id: string) =>
  queryOptions({
    queryKey: ["leads", id],
    queryFn: async (): Promise<Inquiry | null> => {
      const { data, error } = await supabase.from("inquiries").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const leadNotesQuery = (id: string) =>
  queryOptions({
    queryKey: ["leads", id, "notes"],
    queryFn: async (): Promise<LeadNote[]> => {
      const { data, error } = await supabase
        .from("lead_notes")
        .select("*")
        .eq("inquiry_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export async function updateLead(id: string, patch: InquiryUpdate) {
  const { error } = await supabase.from("inquiries").update(patch).eq("id", id);
  if (error) throw error;
}

export type NoteAuthor = { id: string | null; email: string | null };

export async function setLeadStatus(
  id: string,
  status: LeadStatus,
  author: NoteAuthor,
  previous?: string | null,
) {
  await updateLead(id, { status });
  await addLeadNote(id, {
    kind: "status",
    body: previous ? `Status changed from ${previous} to ${status}.` : `Status set to ${status}.`,
    author,
  });
}

export async function addLeadNote(
  inquiryId: string,
  input: { kind: NoteKind; body: string; author: NoteAuthor },
) {
  const { error } = await supabase.from("lead_notes").insert({
    inquiry_id: inquiryId,
    kind: input.kind,
    body: input.body,
    author_id: input.author.id,
    author_email: input.author.email,
  });
  if (error) throw error;
}

export async function deleteLeadNote(noteId: string) {
  const { error } = await supabase.from("lead_notes").delete().eq("id", noteId);
  if (error) throw error;
}

export async function createLead(input: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  client_type?: string | null;
  project_type?: string | null;
  message?: string | null;
  source?: string | null;
  priority?: LeadPriority;
}): Promise<string> {
  const row: InquiryInsert = {
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    company: input.company || null,
    client_type: input.client_type || null,
    project_type: input.project_type || null,
    message: input.message || null,
    source: input.source || "manual",
    priority: input.priority ?? "normal",
  };
  const { data, error } = await supabase.from("inquiries").insert(row).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function deleteLead(id: string) {
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Quotations                                                          */
/* ------------------------------------------------------------------ */

export const quotationsQuery = queryOptions({
  queryKey: ["quotations", "all"],
  queryFn: async (): Promise<Quotation[]> => {
    const { data, error } = await supabase
      .from("quotations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) throw error;
    return data;
  },
});

export const quotationQuery = (id: string) =>
  queryOptions({
    queryKey: ["quotations", id],
    queryFn: async (): Promise<Quotation | null> => {
      const { data, error } = await supabase.from("quotations").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

export const leadQuotationsQuery = (leadId: string) =>
  queryOptions({
    queryKey: ["quotations", "lead", leadId],
    queryFn: async (): Promise<Quotation[]> => {
      const { data, error } = await supabase
        .from("quotations")
        .select("*")
        .eq("inquiry_id", leadId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export type QuotationDraft = {
  inquiry_id: string | null;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company: string;
  project_name: string;
  project_address: string;
  status: QuoteStatus;
  currency: string;
  items: QuoteItem[];
  discount_pct: number;
  tax_pct: number;
  notes: string;
  terms: string;
  valid_until: string; // yyyy-mm-dd or ""
};

function draftToRow(draft: QuotationDraft, userId: string | null): QuotationInsert {
  const totals = computeQuoteTotals(draft.items, draft.discount_pct, draft.tax_pct);
  return {
    inquiry_id: draft.inquiry_id,
    client_name: draft.client_name.trim(),
    client_email: draft.client_email.trim() || null,
    client_phone: draft.client_phone.trim() || null,
    client_company: draft.client_company.trim() || null,
    project_name: draft.project_name.trim() || null,
    project_address: draft.project_address.trim() || null,
    status: draft.status,
    currency: draft.currency,
    items: draft.items.map((it) => ({
      id: it.id,
      description: it.description,
      finish: it.finish,
      unit: it.unit,
      quantity: Number(it.quantity) || 0,
      unit_price: Number(it.unit_price) || 0,
    })),
    subtotal: totals.subtotal,
    discount_pct: Number(draft.discount_pct) || 0,
    tax_pct: Number(draft.tax_pct) || 0,
    total: totals.total,
    notes: draft.notes.trim() || null,
    terms: draft.terms.trim() || null,
    valid_until: draft.valid_until || null,
    created_by: userId,
  };
}

export async function createQuotation(draft: QuotationDraft, userId: string | null): Promise<string> {
  const { data, error } = await supabase
    .from("quotations")
    .insert(draftToRow(draft, userId))
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function updateQuotation(id: string, draft: QuotationDraft, userId: string | null) {
  const row = draftToRow(draft, userId);
  const { created_by: _ignored, ...patch } = row;
  void _ignored;
  const { error } = await supabase.from("quotations").update(patch).eq("id", id);
  if (error) throw error;
}

export async function setQuotationStatus(id: string, status: QuoteStatus) {
  const patch: QuotationUpdate = { status };
  if (status === "sent") patch.sent_at = new Date().toISOString();
  if (status === "accepted" || status === "declined") patch.decided_at = new Date().toISOString();
  const { error } = await supabase.from("quotations").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteQuotation(id: string) {
  const { error } = await supabase.from("quotations").delete().eq("id", id);
  if (error) throw error;
}
