import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { AdminPage, Chip, EmptyState, LoadingRows, Panel, Stat, adminBtn } from "@/lib/admin-ui";
import { leadsQuery, quotationsQuery } from "@/lib/admin-queries";
import {
  LEAD_STATUS_LABEL,
  LEAD_STATUS_TONE,
  OPEN_STATUSES,
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_TONE,
  formatDate,
  formatMoney,
  leadStatus,
  quoteStatus,
  relativeTime,
  sourceLabel,
} from "@/lib/crm";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: OverviewPage,
});

function startOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function OverviewPage() {
  const { user } = useAuth();
  const leads = useQuery(leadsQuery);
  const quotes = useQuery(quotationsQuery);

  const stats = useMemo(() => {
    const all = leads.data ?? [];
    const q = quotes.data ?? [];
    const month = startOfMonth().getTime();
    const sevenDays = Date.now() - 7 * 86400000;

    const newLeads = all.filter((l) => leadStatus(l.status) === "new").length;
    const open = all.filter((l) => OPEN_STATUSES.includes(leadStatus(l.status))).length;
    const thisMonth = all.filter((l) => new Date(l.created_at).getTime() >= month).length;
    const lastWeek = all.filter((l) => new Date(l.created_at).getTime() >= sevenDays).length;
    const won = all.filter((l) => leadStatus(l.status) === "won");
    const wonValue = won.reduce((s, l) => s + (Number(l.estimated_value) || 0), 0);

    const sent = q.filter((x) => quoteStatus(x.status) === "sent");
    const sentValue = sent.reduce((s, x) => s + Number(x.total || 0), 0);
    const accepted = q.filter((x) => quoteStatus(x.status) === "accepted");
    const acceptedValue = accepted.reduce((s, x) => s + Number(x.total || 0), 0);

    const today = new Date().toISOString().slice(0, 10);
    const followUps = all
      .filter((l) => l.next_action_at && OPEN_STATUSES.includes(leadStatus(l.status)))
      .sort((a, b) => (a.next_action_at! < b.next_action_at! ? -1 : 1))
      .slice(0, 6)
      .map((l) => ({ ...l, overdue: l.next_action_at! < today, dueToday: l.next_action_at === today }));

    return { newLeads, open, thisMonth, lastWeek, wonValue, wonCount: won.length, sent, sentValue, accepted, acceptedValue, followUps };
  }, [leads.data, quotes.data]);

  const firstName = ((user?.user_metadata?.full_name as string | undefined) || "").split(" ")[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <AdminPage
      eyebrow={formatDate(new Date().toISOString(), { weekday: "long", day: "numeric", month: "long" })}
      title={
        <>
          {greeting}
          {firstName ? `, ${firstName}` : ""}.
        </>
      }
      description="A snapshot of the studio pipeline — new inquiries, follow-ups due and quotations awaiting a decision."
      actions={
        <>
          <Link to="/admin/leads" className={adminBtn.outline}>
            All leads
          </Link>
          <Link to="/admin/quotations/new" search={{ lead: undefined }} className={adminBtn.primary}>
            New quotation
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Stat
          label="New inquiries"
          value={leads.isLoading ? "…" : stats.newLeads}
          hint={`${stats.lastWeek} in the last 7 days`}
          tone={stats.newLeads > 0 ? "gold" : "default"}
        />
        <Stat label="Open leads" value={leads.isLoading ? "…" : stats.open} hint={`${stats.thisMonth} received this month`} />
        <Stat
          label="Quotes awaiting"
          value={quotes.isLoading ? "…" : stats.sent.length}
          hint={formatMoney(stats.sentValue)}
        />
        <Stat
          label="Won"
          value={leads.isLoading ? "…" : stats.wonCount}
          hint={`${stats.accepted.length} accepted quotes · ${formatMoney(stats.acceptedValue)}`}
          tone="forest"
        />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <Panel
          eyebrow="Latest"
          title="Recent inquiries"
          padded={false}
          actions={
            <Link to="/admin/leads" className="link-line text-xs text-forest/70">
              View all
            </Link>
          }
        >
          {leads.isLoading ? (
            <LoadingRows />
          ) : (leads.data ?? []).length === 0 ? (
            <EmptyState
              title="No inquiries yet."
              description="Every form submitted on the website — home, contact, finishes, architects — will appear here as a lead."
            />
          ) : (
            <ul className="divide-y divide-forest/10">
              {(leads.data ?? []).slice(0, 8).map((l) => {
                const s = leadStatus(l.status);
                return (
                  <li key={l.id}>
                    <Link
                      to="/admin/leads/$id"
                      params={{ id: l.id }}
                      className="group grid grid-cols-[1fr_auto] gap-4 px-5 md:px-6 py-4 hover:bg-beige/60 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm text-forest font-medium truncate">
                          {l.name}
                          {l.company && <span className="text-forest/50 font-light"> · {l.company}</span>}
                        </p>
                        <p className="text-xs text-forest/55 truncate mt-0.5">
                          {l.project_type || "General inquiry"} · {sourceLabel(l.source)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <Chip className={LEAD_STATUS_TONE[s]}>{LEAD_STATUS_LABEL[s]}</Chip>
                        <span className="text-[11px] text-forest/45 w-16 hidden sm:block">{relativeTime(l.created_at)}</span>
                        <ArrowRight className="h-4 w-4 text-forest/30 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel eyebrow="Agenda" title="Follow-ups" padded={false}>
            {leads.isLoading ? (
              <LoadingRows rows={3} />
            ) : stats.followUps.length === 0 ? (
              <EmptyState
                title="Nothing scheduled."
                description="Set a next action on a lead and it will surface here."
              />
            ) : (
              <ul className="divide-y divide-forest/10">
                {stats.followUps.map((l) => (
                  <li key={l.id}>
                    <Link
                      to="/admin/leads/$id"
                      params={{ id: l.id }}
                      className="block px-5 md:px-6 py-4 hover:bg-beige/60 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm text-forest font-medium truncate">{l.name}</p>
                          <p className="text-xs text-forest/60 mt-0.5 line-clamp-2">{l.next_action || "Follow up"}</p>
                        </div>
                        <span
                          className={`eyebrow shrink-0 ${
                            l.overdue ? "text-destructive" : l.dueToday ? "text-gold" : "text-forest/45"
                          }`}
                        >
                          {l.overdue ? "Overdue" : l.dueToday ? "Today" : formatDate(l.next_action_at, { day: "2-digit", month: "short" })}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel
            eyebrow="Documents"
            title="Recent quotations"
            padded={false}
            actions={
              <Link to="/admin/quotations" className="link-line text-xs text-forest/70">
                View all
              </Link>
            }
          >
            {quotes.isLoading ? (
              <LoadingRows rows={3} />
            ) : (quotes.data ?? []).length === 0 ? (
              <EmptyState title="No quotations yet." description="Create one from a lead or from the Quotations page." />
            ) : (
              <ul className="divide-y divide-forest/10">
                {(quotes.data ?? []).slice(0, 5).map((q) => {
                  const s = quoteStatus(q.status);
                  return (
                    <li key={q.id}>
                      <Link
                        to="/admin/quotations/$id"
                        params={{ id: q.id }}
                        className="flex items-center justify-between gap-3 px-5 md:px-6 py-4 hover:bg-beige/60 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-forest font-medium truncate">
                            <span className="text-forest/45 font-light mr-2">{q.quote_number}</span>
                            {q.client_name}
                          </p>
                          <p className="text-xs text-forest/55 truncate mt-0.5">{q.project_name || "—"}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm text-forest">{formatMoney(q.total, q.currency)}</p>
                          <Chip className={`${QUOTE_STATUS_TONE[s]} mt-1`}>{QUOTE_STATUS_LABEL[s]}</Chip>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </AdminPage>
  );
}
