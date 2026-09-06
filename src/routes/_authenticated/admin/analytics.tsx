import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminPage, EmptyState, Panel, Stat } from "@/lib/admin-ui";
import { leadsQuery, quotationsQuery } from "@/lib/admin-queries";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABEL,
  formatMoney,
  leadStatus,
  quoteStatus,
  sourceLabel,
  type Inquiry,
  type Quotation,
} from "@/lib/crm";
import { products } from "@/lib/products-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/analytics")({
  component: AnalyticsPage,
});

const PERIODS = [
  { key: "30", label: "30 days", days: 30 },
  { key: "90", label: "90 days", days: 90 },
  { key: "365", label: "12 months", days: 365 },
  { key: "all", label: "All time", days: null },
] as const;
type PeriodKey = (typeof PERIODS)[number]["key"];

const DAY = 86400000;

function AnalyticsPage() {
  const leads = useQuery(leadsQuery);
  const quotes = useQuery(quotationsQuery);
  const [period, setPeriod] = useState<PeriodKey>("90");

  const data = useMemo(() => build(leads.data ?? [], quotes.data ?? [], period), [leads.data, quotes.data, period]);

  const loading = leads.isLoading || quotes.isLoading;
  const empty = !loading && (leads.data ?? []).length === 0;

  return (
    <AdminPage
      wide
      eyebrow="Insight"
      title="Analytics"
      description="Where inquiries come from, how they move through the pipeline, and what the quotations add up to. Figures are computed from the CRM records only."
      actions={
        <div className="flex border border-forest/15 bg-card">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={cn(
                "px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors",
                period === p.key ? "bg-forest text-beige" : "text-forest/60 hover:text-forest",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      }
    >
      {empty ? (
        <EmptyState
          title="No data yet."
          description="Analytics fill in as inquiries arrive through the website and quotations are recorded."
          action={
            <Link to="/admin/leads" search={{}} className="link-line text-xs text-forest/70">
              Go to leads
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Stat
              label="Inquiries"
              value={loading ? "—" : String(data.kpis.inquiries)}
              hint={data.kpis.inquiriesDelta}
            />
            <Stat
              label="Won"
              value={loading ? "—" : String(data.kpis.won)}
              hint={data.kpis.conversion == null ? "no closed leads yet" : `${data.kpis.conversion}% of closed leads`}
              tone="forest"
            />
            <Stat
              label="Quoted value"
              value={loading ? "—" : formatMoney(data.kpis.quotedValue)}
              hint={`${data.kpis.quotedCount} quotations issued`}
            />
            <Stat
              label="Accepted value"
              value={loading ? "—" : formatMoney(data.kpis.acceptedValue)}
              hint={data.kpis.acceptRate == null ? "no decisions yet" : `${data.kpis.acceptRate}% acceptance rate`}
              tone="gold"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <Panel eyebrow="Volume" title="Inquiries over time" className="lg:col-span-2">
              <div className="h-[260px] -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.series} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="color-mix(in oklab, var(--color-forest) 10%, transparent)" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "color-mix(in oklab, var(--color-forest) 50%, transparent)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "color-mix(in oklab, var(--color-forest) 50%, transparent)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "color-mix(in oklab, var(--color-forest) 6%, transparent)" }}
                      contentStyle={{
                        background: "var(--color-forest)",
                        border: "none",
                        borderRadius: 2,
                        color: "var(--color-beige)",
                        fontSize: 12,
                      }}
                      labelStyle={{ color: "var(--color-gold)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" }}
                      itemStyle={{ color: "var(--color-beige)" }}
                    />
                    <Bar dataKey="inquiries" name="Inquiries" fill="var(--color-forest)" radius={[1, 1, 0, 0]} maxBarSize={36} />
                    <Bar dataKey="won" name="Won" fill="var(--color-gold)" radius={[1, 1, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-3 text-[10px] uppercase tracking-[0.18em] text-forest/50">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 bg-forest" /> Inquiries received
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 bg-gold" /> Marked won
                </span>
              </div>
            </Panel>

            <Panel eyebrow="Pipeline" title="Funnel">
              <ol className="space-y-3">
                {data.funnel.map((f) => (
                  <li key={f.status}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-forest/70">{f.label}</span>
                      <span className="tabular-nums text-forest">
                        {f.count}
                        <span className="text-forest/40"> · {f.pct}%</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-forest/8">
                      <div
                        className={cn("h-full", f.status === "won" ? "bg-gold" : f.status === "lost" ? "bg-forest/30" : "bg-forest")}
                        style={{ width: `${Math.max(f.pct, f.count > 0 ? 2 : 0)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[11px] text-forest/45 leading-relaxed">
                Share of all leads in the period currently at each stage. Won and lost are terminal.
              </p>
            </Panel>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Breakdown title="By source" eyebrow="Origin" rows={data.bySource} />
            <Breakdown title="By client type" eyebrow="Audience" rows={data.byClientType} />
            <Breakdown title="Finishes of interest" eyebrow="Mentions" rows={data.byFinish} hint="Counted from project descriptions and inquiry messages." />
            <Panel eyebrow="Quotations" title="Outcomes">
              <dl className="text-sm divide-y divide-forest/10">
                {data.quoteOutcomes.map((r) => (
                  <div key={r.label} className="flex items-center justify-between py-2.5">
                    <dt className="text-forest/65">{r.label}</dt>
                    <dd className="text-right">
                      <span className="tabular-nums text-forest">{r.count}</span>
                      <span className="block text-[11px] text-forest/45 tabular-nums">{formatMoney(r.value)}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 pt-4 border-t border-forest/10 text-xs text-forest/60 space-y-1.5">
                <p>
                  Average quotation: <span className="text-forest tabular-nums">{formatMoney(data.kpis.avgQuote)}</span>
                </p>
                <p>
                  Overdue follow-ups: <span className={cn("tabular-nums", data.kpis.overdue > 0 ? "text-destructive" : "text-forest")}>{data.kpis.overdue}</span>
                </p>
              </div>
            </Panel>
          </div>
        </>
      )}
    </AdminPage>
  );
}

function Breakdown({
  title,
  eyebrow,
  rows,
  hint,
}: {
  title: string;
  eyebrow: string;
  rows: Array<{ label: string; count: number; pct: number }>;
  hint?: string;
}) {
  return (
    <Panel eyebrow={eyebrow} title={title}>
      {rows.length === 0 ? (
        <p className="text-sm text-forest/45">Nothing recorded in this period.</p>
      ) : (
        <ol className="space-y-3">
          {rows.map((r) => (
            <li key={r.label}>
              <div className="flex justify-between text-xs mb-1.5 gap-3">
                <span className="text-forest/70 truncate">{r.label}</span>
                <span className="tabular-nums text-forest shrink-0">
                  {r.count}
                  <span className="text-forest/40"> · {r.pct}%</span>
                </span>
              </div>
              <div className="h-1 bg-forest/8">
                <div className="h-full bg-forest/70" style={{ width: `${r.pct}%` }} />
              </div>
            </li>
          ))}
        </ol>
      )}
      {hint && <p className="mt-4 text-[11px] text-forest/40 leading-relaxed">{hint}</p>}
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Computation                                                         */
/* ------------------------------------------------------------------ */

function build(allLeads: Inquiry[], allQuotes: Quotation[], period: PeriodKey) {
  const now = new Date();
  const def = PERIODS.find((p) => p.key === period)!;
  const start = def.days ? new Date(now.getTime() - def.days * DAY) : null;
  const prevStart = def.days && start ? new Date(start.getTime() - def.days * DAY) : null;

  const inRange = (iso: string, from: Date | null, to: Date | null) => {
    const t = new Date(iso).getTime();
    if (from && t < from.getTime()) return false;
    if (to && t >= to.getTime()) return false;
    return true;
  };

  const leads = allLeads.filter((l) => inRange(l.created_at, start, null));
  const prevLeads = prevStart && start ? allLeads.filter((l) => inRange(l.created_at, prevStart, start)) : [];
  const quotes = allQuotes.filter((q) => inRange(q.created_at, start, null));

  const won = leads.filter((l) => leadStatus(l.status) === "won").length;
  const lost = leads.filter((l) => leadStatus(l.status) === "lost").length;
  const closed = won + lost;

  const delta =
    prevStart == null
      ? `${allLeads.length} total`
      : prevLeads.length === 0
        ? leads.length > 0
          ? "up from 0 in the previous period"
          : "none in either period"
        : `${Math.round(((leads.length - prevLeads.length) / prevLeads.length) * 100) >= 0 ? "+" : ""}${Math.round(
            ((leads.length - prevLeads.length) / prevLeads.length) * 100,
          )}% vs previous ${def.days} days`;

  const sum = (arr: Quotation[]) => arr.reduce((a, q) => a + Number(q.total || 0), 0);
  const issued = quotes.filter((q) => quoteStatus(q.status) !== "draft");
  const accepted = quotes.filter((q) => quoteStatus(q.status) === "accepted");
  const declined = quotes.filter((q) => quoteStatus(q.status) === "declined");
  const decided = accepted.length + declined.length;

  const today = now.toISOString().slice(0, 10);
  const overdue = allLeads.filter(
    (l) => l.next_action_at && l.next_action_at < today && !["won", "lost"].includes(leadStatus(l.status)),
  ).length;

  // Time series: weekly buckets for ≤ 90 days, monthly otherwise.
  const monthly = def.days == null || def.days > 120;
  const buckets = new Map<string, { label: string; inquiries: number; won: number; order: number }>();
  const keyFor = (d: Date) => {
    if (monthly) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return { k, label: d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }), order: d.getFullYear() * 12 + d.getMonth() };
    }
    const monday = new Date(d);
    const day = (monday.getDay() + 6) % 7;
    monday.setDate(monday.getDate() - day);
    monday.setHours(0, 0, 0, 0);
    const k = monday.toISOString().slice(0, 10);
    return { k, label: monday.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), order: monday.getTime() };
  };
  // Pre-fill empty buckets so the axis is continuous.
  const seriesStart = start ?? (allLeads.length ? new Date(allLeads[allLeads.length - 1]!.created_at) : now);
  for (let d = new Date(seriesStart); d <= now; ) {
    const { k, label, order } = keyFor(d);
    if (!buckets.has(k)) buckets.set(k, { label, inquiries: 0, won: 0, order });
    if (monthly) d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    else d = new Date(d.getTime() + 7 * DAY);
  }
  for (const l of leads) {
    const { k, label, order } = keyFor(new Date(l.created_at));
    const b = buckets.get(k) ?? { label, inquiries: 0, won: 0, order };
    b.inquiries += 1;
    if (leadStatus(l.status) === "won") b.won += 1;
    buckets.set(k, b);
  }
  const series = Array.from(buckets.values()).sort((a, b) => a.order - b.order);

  const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 100));

  const funnel = LEAD_STATUSES.map((s) => {
    const count = leads.filter((l) => leadStatus(l.status) === s).length;
    return { status: s, label: LEAD_STATUS_LABEL[s], count, pct: pct(count, leads.length) };
  });

  const tally = (get: (l: Inquiry) => string | null | undefined, limit = 6) => {
    const m = new Map<string, number>();
    for (const l of leads) {
      const k = get(l);
      if (!k) continue;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return Array.from(m.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([label, count]) => ({ label, count, pct: pct(count, leads.length) }));
  };

  const bySource = tally((l) => sourceLabel(l.source));
  const byClientType = tally((l) => l.client_type || "Not specified");

  const finishMentions = new Map<string, number>();
  const patterns = products.map((p) => ({
    name: p.name,
    re: new RegExp(
      [p.name, ...(p.alias ? [p.alias] : []), p.slug.replace(/-/g, " ")]
        .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|"),
      "i",
    ),
  }));
  for (const l of leads) {
    const text = `${l.project_type ?? ""} ${l.message ?? ""}`;
    for (const p of patterns) if (p.re.test(text)) finishMentions.set(p.name, (finishMentions.get(p.name) ?? 0) + 1);
  }
  const byFinish = Array.from(finishMentions.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, count, pct: pct(count, leads.length) }));

  const quoteOutcomes = [
    { label: "Draft", arr: quotes.filter((q) => quoteStatus(q.status) === "draft") },
    { label: "Sent", arr: quotes.filter((q) => quoteStatus(q.status) === "sent") },
    { label: "Accepted", arr: accepted },
    { label: "Declined", arr: declined },
    { label: "Expired", arr: quotes.filter((q) => quoteStatus(q.status) === "expired") },
  ].map((r) => ({ label: r.label, count: r.arr.length, value: sum(r.arr) }));

  return {
    kpis: {
      inquiries: leads.length,
      inquiriesDelta: delta,
      won,
      conversion: closed === 0 ? null : pct(won, closed),
      quotedValue: sum(issued),
      quotedCount: issued.length,
      acceptedValue: sum(accepted),
      acceptRate: decided === 0 ? null : pct(accepted.length, decided),
      avgQuote: quotes.length ? sum(quotes) / quotes.length : 0,
      overdue,
    },
    series,
    funnel,
    bySource,
    byClientType,
    byFinish,
    quoteOutcomes,
  };
}
