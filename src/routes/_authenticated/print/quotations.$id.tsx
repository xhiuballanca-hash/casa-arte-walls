import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Printer } from "lucide-react";
import { quotationQuery } from "@/lib/admin-queries";
import {
  QUOTE_STATUS_LABEL,
  computeQuoteTotals,
  formatDate,
  formatMoney,
  lineTotal,
  parseQuoteItems,
  quoteStatus,
} from "@/lib/crm";
import { SITE } from "@/lib/site-config";

export const Route = createFileRoute("/_authenticated/print/quotations/$id")({
  head: () => ({
    meta: [{ title: "Quotation — Casa D'Arte" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PrintQuotationPage,
});

function PrintQuotationPage() {
  const { id } = Route.useParams();
  const q = useQuery(quotationQuery(id));

  useEffect(() => {
    if (q.data) document.title = `${q.data.quote_number} — Casa D'Arte`;
  }, [q.data]);

  if (q.isLoading) {
    return <div className="min-h-screen bg-card p-12 text-sm text-forest/40">Preparing document…</div>;
  }
  if (!q.data) {
    return (
      <div className="min-h-screen bg-card p-12">
        <p className="text-forest">This quotation could not be found.</p>
        <Link to="/admin/quotations" search={{}} className="link-line text-sm text-forest/70 mt-4 inline-block">
          Back to quotations
        </Link>
      </div>
    );
  }

  const d = q.data;
  const items = parseQuoteItems(d.items);
  const totals = computeQuoteTotals(items, Number(d.discount_pct) || 0, Number(d.tax_pct) || 0);
  const status = quoteStatus(d.status);
  const money = (n: number | string | null | undefined) => formatMoney(n, d.currency);

  return (
    <div className="min-h-screen bg-forest/5 print:bg-card text-forest">
      {/* Toolbar (screen only) */}
      <div className="print:hidden sticky top-0 z-10 bg-forest text-beige">
        <div className="mx-auto max-w-[210mm] px-6 py-3 flex items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.2em]">
            {d.quote_number} · {QUOTE_STATUS_LABEL[status]}
          </p>
          <div className="flex items-center gap-5">
            <Link to="/admin/quotations/$id" params={{ id: d.id }} className="text-[11px] uppercase tracking-[0.2em] text-beige/70 hover:text-beige">
              Back to editor
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-gold text-forest px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-beige transition-colors"
            >
              <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <article className="mx-auto max-w-[210mm] bg-card print:max-w-none my-8 print:my-0 px-12 py-14 print:px-0 print:py-0 shadow-sm print:shadow-none">
        <header className="flex items-start justify-between gap-8 pb-8 border-b border-forest/15">
          <div>
            <p className="font-serif text-3xl tracking-tight font-bold">CASA D'ARTE</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-forest/55">{SITE.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Quotation</p>
            <p className="font-serif text-2xl mt-1">{d.quote_number}</p>
          </div>
        </header>

        <section className="grid grid-cols-3 gap-8 py-8 text-sm">
          <div className="col-span-1">
            <p className="text-[10px] uppercase tracking-[0.22em] text-forest/45 mb-2">Prepared for</p>
            <p className="font-medium">{d.client_name}</p>
            {d.client_company && <p className="text-forest/75">{d.client_company}</p>}
            {d.client_email && <p className="text-forest/75 break-all">{d.client_email}</p>}
            {d.client_phone && <p className="text-forest/75">{d.client_phone}</p>}
          </div>
          <div className="col-span-1">
            <p className="text-[10px] uppercase tracking-[0.22em] text-forest/45 mb-2">Project</p>
            <p className="font-medium">{d.project_name || "—"}</p>
            {d.project_address && <p className="text-forest/75">{d.project_address}</p>}
          </div>
          <div className="col-span-1 text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-forest/45 mb-2">Details</p>
            <p>
              <span className="text-forest/55">Date </span>
              {formatDate(d.sent_at ?? d.created_at)}
            </p>
            {d.valid_until && (
              <p>
                <span className="text-forest/55">Valid until </span>
                {formatDate(d.valid_until)}
              </p>
            )}
            <p>
              <span className="text-forest/55">Currency </span>
              {d.currency}
            </p>
          </div>
        </section>

        <table className="w-full text-sm border-t border-forest">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-forest/50">
              <th className="py-3 pr-4 font-medium w-[46%]">Description</th>
              <th className="py-3 pr-4 font-medium">Finish</th>
              <th className="py-3 pr-4 font-medium text-right">Qty</th>
              <th className="py-3 pr-4 font-medium text-right">Unit</th>
              <th className="py-3 pr-4 font-medium text-right">Unit price</th>
              <th className="py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/10 border-t border-forest/15">
            {items.map((it) => (
              <tr key={it.id} className="break-inside-avoid">
                <td className="py-3 pr-4 whitespace-pre-wrap leading-relaxed">{it.description || "—"}</td>
                <td className="py-3 pr-4 text-forest/75">{it.finish || "—"}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{Number(it.quantity).toLocaleString("en-GB")}</td>
                <td className="py-3 pr-4 text-right text-forest/75">{it.unit}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{money(it.unit_price)}</td>
                <td className="py-3 text-right tabular-nums">{money(lineTotal(it))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <section className="flex justify-end pt-6 break-inside-avoid">
          <dl className="w-[300px] text-sm">
            <div className="flex justify-between py-1.5">
              <dt className="text-forest/55">Subtotal</dt>
              <dd className="tabular-nums">{money(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <>
                <div className="flex justify-between py-1.5">
                  <dt className="text-forest/55">Discount {Number(d.discount_pct)}%</dt>
                  <dd className="tabular-nums">− {money(totals.discount)}</dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-forest/55">Net</dt>
                  <dd className="tabular-nums">{money(totals.net)}</dd>
                </div>
              </>
            )}
            <div className="flex justify-between py-1.5">
              <dt className="text-forest/55">VAT {Number(d.tax_pct)}%</dt>
              <dd className="tabular-nums">{money(totals.tax)}</dd>
            </div>
            <div className="flex justify-between items-baseline pt-3 mt-2 border-t border-forest">
              <dt className="text-[10px] uppercase tracking-[0.22em]">Total</dt>
              <dd className="font-serif text-2xl tabular-nums">{money(totals.total)}</dd>
            </div>
          </dl>
        </section>

        {(d.notes || d.terms) && (
          <section className="grid grid-cols-2 gap-10 pt-10 text-[12.5px] leading-relaxed break-inside-avoid">
            {d.notes && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-forest/45 mb-2">Notes</p>
                <p className="whitespace-pre-wrap text-forest/85">{d.notes}</p>
              </div>
            )}
            {d.terms && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-forest/45 mb-2">Terms</p>
                <p className="whitespace-pre-wrap text-forest/85">{d.terms}</p>
              </div>
            )}
          </section>
        )}

        <footer className="mt-14 pt-6 border-t border-forest/15 flex items-end justify-between text-[11px] text-forest/55">
          <div>
            <p className="text-forest font-medium">{SITE.name}</p>
            <p>{SITE.addressLine}</p>
            <p>
              {SITE.phoneDisplay} · {SITE.email}
            </p>
          </div>
          <p className="text-right">Material and application by our own team.</p>
        </footer>
      </article>
    </div>
  );
}
