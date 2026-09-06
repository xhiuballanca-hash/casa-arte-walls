import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, Copy, Plus, Printer, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AdminPage, Chip, Field, Panel, SelectInput, TextArea, TextInput, adminBtn, fieldInput } from "@/lib/admin-ui";
import {
  addLeadNote,
  createQuotation,
  deleteQuotation,
  setLeadStatus,
  setQuotationStatus,
  updateQuotation,
  type QuotationDraft,
} from "@/lib/admin-queries";
import {
  QUOTE_STATUSES,
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_TONE,
  QUOTE_UNITS,
  computeQuoteTotals,
  formatDate,
  formatMoney,
  leadStatus,
  lineTotal,
  newQuoteItem,
  quoteStatus,
  type Inquiry,
  type QuoteItem,
  type QuoteStatus,
  type Quotation,
} from "@/lib/crm";
import { products } from "@/lib/products-data";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const DEFAULT_TERMS = [
  "Prices cover the supply of the specified finishes and their professional application by the Casa D'Arte team.",
  "Quantities are estimated from the information provided and are confirmed after a site measurement.",
  "Substrate preparation beyond the scope listed, scaffolding and access equipment are quoted separately unless stated.",
  "Colour and texture are confirmed on an approved sample before work begins.",
  "Payment schedule and programme are agreed in the contract.",
].join("\n");

export const CURRENCIES = ["EUR", "MKD"] as const;

export function emptyDraft(lead?: Inquiry | null): QuotationDraft {
  const valid = new Date();
  valid.setDate(valid.getDate() + 30);
  return {
    inquiry_id: lead?.id ?? null,
    client_name: lead?.name ?? "",
    client_email: lead?.email ?? "",
    client_phone: lead?.phone ?? "",
    client_company: lead?.company ?? "",
    project_name: lead?.project_type ?? "",
    project_address: "",
    status: "draft",
    currency: "EUR",
    items: [newQuoteItem({ unit: "m²" })],
    discount_pct: 0,
    tax_pct: 18,
    notes: "",
    terms: DEFAULT_TERMS,
    valid_until: valid.toISOString().slice(0, 10),
  };
}

export function draftFromQuotation(q: Quotation): QuotationDraft {
  return {
    inquiry_id: q.inquiry_id,
    client_name: q.client_name,
    client_email: q.client_email ?? "",
    client_phone: q.client_phone ?? "",
    client_company: q.client_company ?? "",
    project_name: q.project_name ?? "",
    project_address: q.project_address ?? "",
    status: quoteStatus(q.status),
    currency: q.currency,
    items: parseItems(q.items),
    discount_pct: Number(q.discount_pct) || 0,
    tax_pct: Number(q.tax_pct) || 0,
    notes: q.notes ?? "",
    terms: q.terms ?? "",
    valid_until: q.valid_until ?? "",
  };
}

function parseItems(raw: Quotation["items"]): QuoteItem[] {
  if (!Array.isArray(raw)) return [newQuoteItem()];
  const items = raw
    .filter((x): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x))
    .map((x) =>
      newQuoteItem({
        id: typeof x.id === "string" ? x.id : undefined,
        description: typeof x.description === "string" ? x.description : "",
        finish: typeof x.finish === "string" ? x.finish : "",
        unit: typeof x.unit === "string" ? x.unit : "m²",
        quantity: Number(x.quantity) || 0,
        unit_price: Number(x.unit_price) || 0,
      }),
    );
  return items.length ? items : [newQuoteItem()];
}

type Props =
  | { mode: "new"; initial: QuotationDraft; lead?: Inquiry | null }
  | { mode: "edit"; initial: QuotationDraft; quotation: Quotation; lead?: Inquiry | null };

export function QuotationEditor(props: Props) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<QuotationDraft>(props.initial);
  const [busy, setBusy] = useState(false);
  const [statusBusy, setStatusBusy] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dirty, setDirty] = useState(false);

  const quotation = props.mode === "edit" ? props.quotation : null;
  const lead = props.lead ?? null;

  useEffect(() => {
    setDirty(JSON.stringify(draft) !== JSON.stringify(props.initial));
  }, [draft, props.initial]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const totals = useMemo(
    () => computeQuoteTotals(draft.items, Number(draft.discount_pct) || 0, Number(draft.tax_pct) || 0),
    [draft.items, draft.discount_pct, draft.tax_pct],
  );

  const patch = (p: Partial<QuotationDraft>) => setDraft((d) => ({ ...d, ...p }));
  const patchItem = (id: string, p: Partial<QuoteItem>) =>
    setDraft((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...p } : it)) }));
  const removeItem = (id: string) =>
    setDraft((d) => ({ ...d, items: d.items.length > 1 ? d.items.filter((it) => it.id !== id) : d.items }));
  const addItem = (partial: Partial<QuoteItem> = {}) =>
    setDraft((d) => ({ ...d, items: [...d.items, newQuoteItem({ unit: "m²", ...partial })] }));

  const invalidateAll = () =>
    Promise.all([qc.invalidateQueries({ queryKey: ["quotations"] }), qc.invalidateQueries({ queryKey: ["leads"] })]);

  async function save(e?: FormEvent) {
    e?.preventDefault();
    if (!draft.client_name.trim()) {
      toast.error("Add the client name before saving.");
      return;
    }
    if (draft.items.every((it) => !it.description.trim() && !it.finish)) {
      toast.error("Add at least one line to the quotation.");
      return;
    }
    setBusy(true);
    try {
      if (props.mode === "new") {
        const id = await createQuotation(draft, user?.id ?? null);
        if (draft.inquiry_id) {
          await addLeadNote(draft.inquiry_id, {
            kind: "quote",
            body: `Quotation created — ${formatMoney(totals.total, draft.currency)}${draft.project_name ? ` for ${draft.project_name}` : ""}.`,
            author: { id: user?.id ?? null, email: user?.email ?? null },
          });
        }
        await invalidateAll();
        toast.success("Quotation saved.");
        void navigate({ to: "/admin/quotations/$id", params: { id }, replace: true });
      } else {
        await updateQuotation(props.quotation.id, draft, user?.id ?? null);
        await invalidateAll();
        setDirty(false);
        toast.success("Changes saved.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the quotation.");
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus(next: QuoteStatus) {
    if (!quotation || quoteStatus(quotation.status) === next) return;
    setStatusBusy(true);
    try {
      await setQuotationStatus(quotation.id, next);
      patch({ status: next });
      const author = { id: user?.id ?? null, email: user?.email ?? null };
      if (lead) {
        const ls = leadStatus(lead.status);
        if (next === "sent" && ["new", "contacted", "sample_sent"].includes(ls)) {
          await setLeadStatus(lead.id, "quoted", author, lead.status);
        } else if (next === "accepted" && ls !== "won") {
          await setLeadStatus(lead.id, "won", author, lead.status);
        }
        await addLeadNote(lead.id, {
          kind: "quote",
          body: `Quotation ${quotation.quote_number} marked as ${QUOTE_STATUS_LABEL[next].toLowerCase()}.`,
          author,
        });
      }
      await invalidateAll();
      toast.success(`Quotation marked as ${QUOTE_STATUS_LABEL[next].toLowerCase()}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the status.");
    } finally {
      setStatusBusy(false);
    }
  }

  async function duplicate() {
    if (!quotation) return;
    setBusy(true);
    try {
      const copy: QuotationDraft = { ...draftFromQuotation(quotation), status: "draft" };
      const valid = new Date();
      valid.setDate(valid.getDate() + 30);
      copy.valid_until = valid.toISOString().slice(0, 10);
      const id = await createQuotation(copy, user?.id ?? null);
      await invalidateAll();
      toast.success("Duplicated as a new draft.");
      void navigate({ to: "/admin/quotations/$id", params: { id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not duplicate.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!quotation) return;
    try {
      await deleteQuotation(quotation.id);
      await invalidateAll();
      toast.success("Quotation deleted.");
      void navigate({ to: "/admin/quotations", search: {} });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    }
  }

  const currentStatus = quotation ? quoteStatus(draft.status) : "draft";
  const locked = quotation ? currentStatus === "accepted" || currentStatus === "declined" : false;

  return (
    <AdminPage
      wide
      eyebrow={
        <span className="inline-flex items-center gap-3">
          <Link to="/admin/quotations" search={{}} className="inline-flex items-center gap-1 hover:text-forest transition-colors">
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Quotations
          </Link>
          {lead && (
            <>
              <span className="text-forest/30">/</span>
              <Link to="/admin/leads/$id" params={{ id: lead.id }} className="hover:text-forest transition-colors">
                Lead · {lead.name}
              </Link>
            </>
          )}
        </span>
      }
      title={
        <span className="flex items-center gap-4 flex-wrap">
          <span>{quotation ? quotation.quote_number : "New quotation"}</span>
          {quotation && <Chip className={QUOTE_STATUS_TONE[currentStatus]}>{QUOTE_STATUS_LABEL[currentStatus]}</Chip>}
          {dirty && <span className="text-xs font-sans tracking-wide text-gold">Unsaved changes</span>}
        </span>
      }
      description={
        quotation
          ? `Created ${formatDate(quotation.created_at)}${quotation.sent_at ? ` · sent ${formatDate(quotation.sent_at)}` : ""}${
              quotation.decided_at ? ` · decided ${formatDate(quotation.decided_at)}` : ""
            }`
          : "Build the proposal line by line. A number is assigned when you save."
      }
      actions={
        <>
          {quotation && (
            <>
              <a
                href={`/print/quotations/${quotation.id}`}
                target="_blank"
                rel="noreferrer"
                className={adminBtn.outline}
                title={dirty ? "Save first to include your latest changes" : "Open printable version"}
              >
                <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />
                Print / PDF
              </a>
              <button type="button" onClick={duplicate} disabled={busy} className={adminBtn.outline}>
                <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                Duplicate
              </button>
              <button type="button" onClick={() => setDeleteOpen(true)} className={adminBtn.danger} aria-label="Delete quotation">
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </>
          )}
          <button type="button" onClick={() => void save()} disabled={busy || (props.mode === "edit" && !dirty)} className={adminBtn.primary}>
            {busy ? "Saving…" : props.mode === "new" ? "Save quotation" : "Save changes"}
          </button>
        </>
      }
    >
      {quotation && (
        <div className="mb-8 bg-card border border-forest/10 px-5 md:px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="eyebrow text-forest/45 mb-1">Status</p>
              <p className="text-sm text-forest/70">
                {currentStatus === "draft" && "Not yet shared with the client."}
                {currentStatus === "sent" && "Awaiting the client's decision."}
                {currentStatus === "accepted" && "Accepted — the linked lead is marked as won."}
                {currentStatus === "declined" && "Declined by the client."}
                {currentStatus === "expired" && "The validity date has passed."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUOTE_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={statusBusy || s === currentStatus}
                  onClick={() => changeStatus(s)}
                  className={cn(
                    "border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors disabled:cursor-default",
                    s === currentStatus
                      ? "bg-forest text-beige border-forest"
                      : "border-forest/20 text-forest/60 hover:border-forest hover:text-forest",
                  )}
                >
                  {QUOTE_STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={save} className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          <Panel eyebrow="Client" title="Who this is for">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Client name">
                <TextInput value={draft.client_name} onChange={(e) => patch({ client_name: e.target.value })} required maxLength={160} />
              </Field>
              <Field label="Studio / Company">
                <TextInput value={draft.client_company} onChange={(e) => patch({ client_company: e.target.value })} maxLength={160} />
              </Field>
              <Field label="Email">
                <TextInput type="email" value={draft.client_email} onChange={(e) => patch({ client_email: e.target.value })} maxLength={255} />
              </Field>
              <Field label="Phone">
                <TextInput type="tel" value={draft.client_phone} onChange={(e) => patch({ client_phone: e.target.value })} maxLength={40} />
              </Field>
              <Field label="Project">
                <TextInput
                  value={draft.project_name}
                  onChange={(e) => patch({ project_name: e.target.value })}
                  maxLength={160}
                  placeholder="e.g. Hotel lobby & corridors"
                />
              </Field>
              <Field label="Site address">
                <TextInput value={draft.project_address} onChange={(e) => patch({ project_address: e.target.value })} maxLength={200} />
              </Field>
            </div>
          </Panel>

          <Panel
            eyebrow="Scope"
            title="Line items"
            padded={false}
            actions={
              <div className="flex flex-wrap gap-2 justify-end">
                {products.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => addItem({ finish: p.name, description: `${p.name} — supply & application`, unit: "m²" })}
                    className="border border-forest/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-forest/60 hover:border-gold hover:text-forest transition-colors"
                  >
                    + {p.name}
                  </button>
                ))}
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="border-b border-forest/10 text-left">
                    <th className="eyebrow text-forest/45 font-medium px-5 py-3 w-[38%]">Description</th>
                    <th className="eyebrow text-forest/45 font-medium px-2 py-3">Finish</th>
                    <th className="eyebrow text-forest/45 font-medium px-2 py-3 w-[80px]">Unit</th>
                    <th className="eyebrow text-forest/45 font-medium px-2 py-3 w-[100px] text-right">Qty</th>
                    <th className="eyebrow text-forest/45 font-medium px-2 py-3 w-[120px] text-right">Unit price</th>
                    <th className="eyebrow text-forest/45 font-medium px-2 py-3 w-[120px] text-right">Total</th>
                    <th className="w-[44px]" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  {draft.items.map((it) => (
                    <tr key={it.id} className="align-top">
                      <td className="px-5 py-2.5">
                        <textarea
                          value={it.description}
                          onChange={(e) => patchItem(it.id, { description: e.target.value })}
                          rows={2}
                          placeholder="Surface, finish, preparation…"
                          className={cn(fieldInput, "min-h-[44px] resize-y py-2")}
                        />
                      </td>
                      <td className="px-2 py-2.5">
                        <select
                          value={it.finish}
                          onChange={(e) => patchItem(it.id, { finish: e.target.value })}
                          className={cn(fieldInput, "py-2")}
                        >
                          <option value="">—</option>
                          {products.map((p) => (
                            <option key={p.slug} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                          <option value="Preparation">Preparation</option>
                          <option value="Sampling">Sampling</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td className="px-2 py-2.5">
                        <select value={it.unit} onChange={(e) => patchItem(it.id, { unit: e.target.value })} className={cn(fieldInput, "py-2")}>
                          {QUOTE_UNITS.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-2 py-2.5">
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="0.01"
                          value={it.quantity}
                          onChange={(e) => patchItem(it.id, { quantity: Number(e.target.value) })}
                          className={cn(fieldInput, "py-2 text-right tabular-nums")}
                        />
                      </td>
                      <td className="px-2 py-2.5">
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="0.01"
                          value={it.unit_price}
                          onChange={(e) => patchItem(it.id, { unit_price: Number(e.target.value) })}
                          className={cn(fieldInput, "py-2 text-right tabular-nums")}
                        />
                      </td>
                      <td className="px-2 py-4 text-right tabular-nums text-forest">{formatMoney(lineTotal(it), draft.currency)}</td>
                      <td className="px-2 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          disabled={draft.items.length === 1}
                          aria-label="Remove line"
                          className="text-forest/30 hover:text-destructive disabled:opacity-30 transition-colors p-1"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-forest/10">
              <button type="button" onClick={() => addItem()} className={adminBtn.ghost}>
                <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                Add line
              </button>
            </div>
          </Panel>

          <div className="grid md:grid-cols-2 gap-6">
            <Panel eyebrow="For the client" title="Notes">
              <TextArea
                value={draft.notes}
                onChange={(e) => patch({ notes: e.target.value })}
                placeholder="Scope summary, assumptions, programme…"
                className="min-h-[160px]"
                maxLength={4000}
              />
            </Panel>
            <Panel eyebrow="Conditions" title="Terms">
              <TextArea value={draft.terms} onChange={(e) => patch({ terms: e.target.value })} className="min-h-[160px]" maxLength={4000} />
            </Panel>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Panel eyebrow="Summary" title="Totals">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Field label="Discount %">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step="0.5"
                  value={draft.discount_pct}
                  onChange={(e) => patch({ discount_pct: Number(e.target.value) })}
                />
              </Field>
              <Field label="VAT %">
                <TextInput
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={100}
                  step="0.5"
                  value={draft.tax_pct}
                  onChange={(e) => patch({ tax_pct: Number(e.target.value) })}
                />
              </Field>
              <Field label="Currency">
                <SelectInput value={draft.currency} onChange={(e) => patch({ currency: e.target.value })}>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Valid until">
                <TextInput type="date" value={draft.valid_until} onChange={(e) => patch({ valid_until: e.target.value })} />
              </Field>
            </div>
            <dl className="text-sm divide-y divide-forest/10 border-t border-forest/10">
              <Row label="Subtotal" value={formatMoney(totals.subtotal, draft.currency)} />
              {totals.discount > 0 && <Row label={`Discount ${draft.discount_pct}%`} value={`− ${formatMoney(totals.discount, draft.currency)}`} />}
              {totals.discount > 0 && <Row label="Net" value={formatMoney(totals.net, draft.currency)} />}
              <Row label={`VAT ${draft.tax_pct}%`} value={formatMoney(totals.tax, draft.currency)} />
              <div className="flex items-baseline justify-between py-4">
                <dt className="eyebrow text-forest">Total</dt>
                <dd className="font-serif text-3xl text-forest tabular-nums">{formatMoney(totals.total, draft.currency)}</dd>
              </div>
            </dl>
            {locked && (
              <p className="mt-2 text-[11px] text-forest/45 leading-relaxed">
                This quotation has been decided. Duplicate it to issue a revised version.
              </p>
            )}
          </Panel>

          {lead && (
            <Panel eyebrow="Linked lead" title={lead.name}>
              <p className="text-sm text-forest/70">{lead.company || lead.client_type || sourceLabelSafe(lead.source)}</p>
              <p className="text-xs text-forest/50 mt-1 break-all">{lead.email}</p>
              <Link to="/admin/leads/$id" params={{ id: lead.id }} className="link-line text-xs text-forest/70 mt-4 inline-block">
                Open lead
              </Link>
            </Panel>
          )}
        </div>
      </form>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-cream border-forest/15">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-medium text-forest">Delete this quotation?</AlertDialogTitle>
            <AlertDialogDescription className="text-forest/60">
              {quotation?.quote_number} will be permanently removed. The number will not be reused.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={adminBtn.ghost}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={remove} className={adminBtn.danger}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPage>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2.5">
      <dt className="text-forest/55">{label}</dt>
      <dd className="tabular-nums text-forest">{value}</dd>
    </div>
  );
}

function sourceLabelSafe(source: string | null | undefined) {
  return source ? source.replace(/[-_]/g, " ") : "Website";
}
