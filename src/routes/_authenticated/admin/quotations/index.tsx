import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, type ReactNode } from "react";
import { Download, Plus, Search } from "lucide-react";
import { AdminPage, Chip, EmptyState, LoadingRows, Panel, SelectInput, Stat, adminBtn, fieldInput } from "@/lib/admin-ui";
import { quotationsQuery } from "@/lib/admin-queries";
import {
  QUOTE_STATUSES,
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_TONE,
  downloadTextFile,
  formatDate,
  formatMoney,
  quoteStatus,
  relativeTime,
  toCsv,
  type QuoteStatus,
} from "@/lib/crm";
import { cn } from "@/lib/utils";

type Search = { status?: QuoteStatus | "all" };

export const Route = createFileRoute("/_authenticated/admin/quotations/")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    status:
      raw.status === "all" || (QUOTE_STATUSES as readonly string[]).includes(String(raw.status))
        ? (raw.status as Search["status"])
        : undefined,
  }),
  component: QuotationsPage,
});

function QuotationsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const quotes = useQuery(quotationsQuery);
  const [q, setQ] = useState("");
  const [period, setPeriod] = useState("all");

  const status = search.status ?? "all";
  const all = quotes.data ?? [];

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length };
    for (const s of QUOTE_STATUSES) c[s] = 0;
    for (const x of all) c[quoteStatus(x.status)] += 1;
    return c;
  }, [all]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const now = new Date();
    const cutoff =
      period === "30"
        ? new Date(now.getTime() - 30 * 86400000)
        : period === "90"
          ? new Date(now.getTime() - 90 * 86400000)
          : period === "year"
            ? new Date(now.getFullYear(), 0, 1)
            : null;
    return all.filter((x) => {
      if (status !== "all" && quoteStatus(x.status) !== status) return false;
      if (cutoff && new Date(x.created_at) < cutoff) return false;
      if (needle) {
        const hay = [x.quote_number, x.client_name, x.client_company, x.client_email, x.project_name, x.project_address]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [all, status, q, period]);

  const totals = useMemo(() => {
    const sum = (arr: typeof all) => arr.reduce((acc, x) => acc + Number(x.total || 0), 0);
    const accepted = filtered.filter((x) => quoteStatus(x.status) === "accepted");
    const open = filtered.filter((x) => quoteStatus(x.status) === "sent");
    const decided = filtered.filter((x) => ["accepted", "declined"].includes(quoteStatus(x.status)));
    return {
      pipeline: sum(open),
      accepted: sum(accepted),
      winRate: decided.length ? Math.round((accepted.length / decided.length) * 100) : null,
    };
  }, [filtered]);

  function exportCsv() {
    downloadTextFile(
      `casa-darte-quotations-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(
        filtered.map((x) => ({
          number: x.quote_number,
          date: formatDate(x.created_at),
          client: x.client_name,
          company: x.client_company,
          email: x.client_email,
          project: x.project_name,
          status: QUOTE_STATUS_LABEL[quoteStatus(x.status)],
          subtotal: x.subtotal,
          discount_pct: x.discount_pct,
          tax_pct: x.tax_pct,
          total: x.total,
          currency: x.currency,
          valid_until: x.valid_until,
          sent_at: x.sent_at,
          decided_at: x.decided_at,
        })),
      ),
    );
  }

  return (
    <AdminPage
      wide
      eyebrow="Documents"
      title="Quotations"
      description="Priced proposals for material and application. Draft, send, and record the outcome — accepted quotations feed the analytics."
      actions={
        <>
          <button type="button" onClick={exportCsv} disabled={filtered.length === 0} className={adminBtn.outline}>
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Export CSV
          </button>
          <Link to="/admin/quotations/new" search={{}} className={adminBtn.primary}>
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            New quotation
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Stat label="Awaiting decision" value={formatMoney(totals.pipeline)} hint={`${counts.sent ?? 0} sent`} />
        <Stat label="Accepted" value={formatMoney(totals.accepted)} hint={`${counts.accepted ?? 0} quotations`} tone="forest" />
        <Stat label="Acceptance rate" value={totals.winRate == null ? "—" : `${totals.winRate}%`} hint="of decided quotations" tone="gold" />
      </div>

      <div className="flex gap-x-6 gap-y-2 flex-wrap border-b border-forest/10 mb-6">
        {(["all", ...QUOTE_STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => void navigate({ search: { status: s === "all" ? undefined : s }, replace: true })}
            className={cn(
              "pb-3 -mb-px border-b-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2",
              status === s ? "border-gold text-forest" : "border-transparent text-forest/50 hover:text-forest",
            )}
          >
            {s === "all" ? "All" : QUOTE_STATUS_LABEL[s]}
            <span className="text-forest/40 font-normal tracking-normal">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_200px] mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/40" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search number, client, project…"
            className={cn(fieldInput, "pl-9 bg-card")}
          />
        </div>
        <SelectInput value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="all">All time</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="year">This year</option>
        </SelectInput>
      </div>

      <Panel padded={false}>
        {quotes.isLoading ? (
          <LoadingRows rows={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={all.length === 0 ? "No quotations yet." : "Nothing matches these filters."}
            description={
              all.length === 0
                ? "Create the first one from a lead, or start a blank quotation."
                : "Try another status or period."
            }
            action={
              all.length === 0 ? (
                <Link to="/admin/quotations/new" search={{}} className={adminBtn.primary}>
                  New quotation
                </Link>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-forest/10">
                  <Th>Number</Th>
                  <Th>Client</Th>
                  <Th className="hidden lg:table-cell">Project</Th>
                  <Th>Status</Th>
                  <Th className="hidden md:table-cell">Valid until</Th>
                  <Th className="text-right">Total</Th>
                  <Th className="hidden md:table-cell text-right">Updated</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {filtered.map((x) => {
                  const s = quoteStatus(x.status);
                  const expired = s === "sent" && !!x.valid_until && x.valid_until < new Date().toISOString().slice(0, 10);
                  return (
                    <tr key={x.id} className="hover:bg-beige/60 transition-colors">
                      <Td>
                        <Link to="/admin/quotations/$id" params={{ id: x.id }} className="font-medium text-forest tabular-nums">
                          {x.quote_number}
                        </Link>
                      </Td>
                      <Td>
                        <span className="block text-forest">{x.client_name}</span>
                        <span className="block text-xs text-forest/50 truncate max-w-[220px]">{x.client_company || x.client_email || "—"}</span>
                      </Td>
                      <Td className="hidden lg:table-cell text-forest/80">
                        <span className="block truncate max-w-[260px]">{x.project_name || "—"}</span>
                      </Td>
                      <Td>
                        <Chip className={QUOTE_STATUS_TONE[s]}>{QUOTE_STATUS_LABEL[s]}</Chip>
                      </Td>
                      <Td className={cn("hidden md:table-cell text-xs", expired ? "text-destructive" : "text-forest/60")}>
                        {x.valid_until ? formatDate(x.valid_until) : "—"}
                        {expired && " · overdue"}
                      </Td>
                      <Td className="text-right tabular-nums text-forest">{formatMoney(x.total, x.currency)}</Td>
                      <Td className="hidden md:table-cell text-right text-xs text-forest/50 whitespace-nowrap">{relativeTime(x.updated_at)}</Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
      <p className="mt-4 text-[11px] text-forest/40">
        Showing {filtered.length} of {all.length} quotations.
      </p>
    </AdminPage>
  );
}

function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return <th className={cn("eyebrow text-forest/45 font-medium px-5 md:px-6 py-3", className)}>{children}</th>;
}
function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("px-5 md:px-6 py-3.5 align-top", className)}>{children}</td>;
}
