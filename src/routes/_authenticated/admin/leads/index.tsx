import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Download, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AdminPage,
  Chip,
  EmptyState,
  Field,
  LoadingRows,
  Panel,
  SelectInput,
  TextArea,
  TextInput,
  adminBtn,
  fieldInput,
} from "@/lib/admin-ui";
import { createLead, leadsQuery } from "@/lib/admin-queries";
import {
  LEAD_PRIORITIES,
  LEAD_PRIORITY_LABEL,
  LEAD_STATUSES,
  LEAD_STATUS_LABEL,
  LEAD_STATUS_TONE,
  downloadTextFile,
  formatDate,
  formatMoney,
  isLeadStatus,
  leadPriority,
  leadStatus,
  relativeTime,
  sourceLabel,
  toCsv,
  type LeadStatus,
} from "@/lib/crm";
import { CLIENT_TYPES } from "@/lib/consultation-form";
import { cn } from "@/lib/utils";

type Search = { status?: LeadStatus | "all"; q?: string };

export const Route = createFileRoute("/_authenticated/admin/leads/")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    status: raw.status === "all" || isLeadStatus(raw.status as string) ? (raw.status as Search["status"]) : undefined,
    q: typeof raw.q === "string" && raw.q ? raw.q : undefined,
  }),
  component: LeadsPage,
});

function LeadsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const leads = useQuery(leadsQuery);
  const [source, setSource] = useState("all");
  const [clientType, setClientType] = useState("all");
  const [priority, setPriority] = useState("all");
  const [addOpen, setAddOpen] = useState(false);

  const status = search.status ?? "all";
  const q = search.q ?? "";

  const setSearch = (patch: Partial<Search>) =>
    void navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const all = leads.data ?? [];

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length };
    for (const s of LEAD_STATUSES) c[s] = 0;
    for (const l of all) c[leadStatus(l.status)] += 1;
    return c;
  }, [all]);

  const sources = useMemo(
    () => Array.from(new Set(all.map((l) => l.source || "website"))).sort(),
    [all],
  );
  const clientTypes = useMemo(
    () => Array.from(new Set(all.map((l) => l.client_type).filter((x): x is string => !!x))).sort(),
    [all],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all.filter((l) => {
      if (status !== "all" && leadStatus(l.status) !== status) return false;
      if (source !== "all" && (l.source || "website") !== source) return false;
      if (clientType !== "all" && l.client_type !== clientType) return false;
      if (priority !== "all" && leadPriority(l.priority) !== priority) return false;
      if (needle) {
        const hay = [l.name, l.email, l.phone, l.company, l.project_type, l.message, l.client_type]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [all, status, source, clientType, priority, q]);

  function exportCsv() {
    const rows = filtered.map((l) => ({
      received: formatDate(l.created_at),
      name: l.name,
      company: l.company,
      email: l.email,
      phone: l.phone,
      client_type: l.client_type,
      project: l.project_type,
      status: LEAD_STATUS_LABEL[leadStatus(l.status)],
      priority: LEAD_PRIORITY_LABEL[leadPriority(l.priority)],
      estimated_value: l.estimated_value,
      source: sourceLabel(l.source),
      next_action: l.next_action,
      next_action_at: l.next_action_at,
      message: l.message,
    }));
    downloadTextFile(`casa-darte-leads-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(rows));
  }

  return (
    <AdminPage
      wide
      eyebrow="CRM"
      title="Leads"
      description="Every inquiry from the website lands here. Move each one through the pipeline — from first contact to sample, quotation and a finished surface."
      actions={
        <>
          <button type="button" onClick={exportCsv} disabled={filtered.length === 0} className={adminBtn.outline}>
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} />
            Export CSV
          </button>
          <button type="button" onClick={() => setAddOpen(true)} className={adminBtn.primary}>
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add lead
          </button>
        </>
      }
    >
      {/* Status tabs */}
      <div className="flex gap-x-6 gap-y-2 flex-wrap border-b border-forest/10 mb-6">
        {(["all", ...LEAD_STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSearch({ status: s === "all" ? undefined : s })}
            className={cn(
              "pb-3 -mb-px border-b-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-2",
              status === s ? "border-gold text-forest" : "border-transparent text-forest/50 hover:text-forest",
            )}
          >
            {s === "all" ? "All" : LEAD_STATUS_LABEL[s]}
            <span className="text-forest/40 font-normal tracking-normal">{counts[s] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid gap-3 md:grid-cols-[1fr_180px_200px_150px] mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/40" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => setSearch({ q: e.target.value || undefined })}
            placeholder="Search name, email, company, message…"
            className={cn(fieldInput, "pl-9 bg-card")}
          />
        </div>
        <SelectInput value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="all">All sources</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {sourceLabel(s)}
            </option>
          ))}
        </SelectInput>
        <SelectInput value={clientType} onChange={(e) => setClientType(e.target.value)}>
          <option value="all">All client types</option>
          {clientTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectInput>
        <SelectInput value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="all">Any priority</option>
          {LEAD_PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {LEAD_PRIORITY_LABEL[p]}
            </option>
          ))}
        </SelectInput>
      </div>

      <Panel padded={false}>
        {leads.isLoading ? (
          <LoadingRows rows={8} />
        ) : leads.isError ? (
          <EmptyState title="Could not load leads." description={(leads.error as Error).message} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={all.length === 0 ? "No inquiries yet." : "No leads match these filters."}
            description={
              all.length === 0
                ? "Every form submitted on the website will appear here automatically."
                : "Try clearing the search or choosing another status."
            }
            action={
              all.length > 0 ? (
                <button
                  type="button"
                  className={adminBtn.ghost}
                  onClick={() => {
                    setSearch({ status: undefined, q: undefined });
                    setSource("all");
                    setClientType("all");
                    setPriority("all");
                  }}
                >
                  Clear filters
                </button>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-forest/10">
                  <Th>Lead</Th>
                  <Th className="hidden md:table-cell">Contact</Th>
                  <Th className="hidden lg:table-cell">Project · Source</Th>
                  <Th>Status</Th>
                  <Th className="hidden xl:table-cell">Priority</Th>
                  <Th className="hidden lg:table-cell text-right">Value</Th>
                  <Th className="hidden md:table-cell">Next action</Th>
                  <Th className="text-right">Received</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10">
                {filtered.map((l) => {
                  const s = leadStatus(l.status);
                  const p = leadPriority(l.priority);
                  const today = new Date().toISOString().slice(0, 10);
                  const overdue = !!l.next_action_at && l.next_action_at < today && s !== "won" && s !== "lost";
                  return (
                    <tr key={l.id} className="hover:bg-beige/60 transition-colors">
                      <Td>
                        <Link to="/admin/leads/$id" params={{ id: l.id }} className="block">
                          <span className="font-medium text-forest block">{l.name}</span>
                          <span className="text-xs text-forest/55 block truncate max-w-[220px]">
                            {l.company || l.client_type || "—"}
                          </span>
                        </Link>
                      </Td>
                      <Td className="hidden md:table-cell">
                        <span className="block text-forest/80 truncate max-w-[220px]">{l.email}</span>
                        <span className="block text-xs text-forest/50">{l.phone || "—"}</span>
                      </Td>
                      <Td className="hidden lg:table-cell">
                        <span className="block text-forest/80 truncate max-w-[240px]">{l.project_type || "General inquiry"}</span>
                        <span className="block text-xs text-forest/50">{sourceLabel(l.source)}</span>
                      </Td>
                      <Td>
                        <Chip className={LEAD_STATUS_TONE[s]}>{LEAD_STATUS_LABEL[s]}</Chip>
                      </Td>
                      <Td className="hidden xl:table-cell">
                        <span
                          className={cn(
                            "text-xs",
                            p === "high" ? "text-gold font-medium" : p === "low" ? "text-forest/40" : "text-forest/70",
                          )}
                        >
                          {LEAD_PRIORITY_LABEL[p]}
                        </span>
                      </Td>
                      <Td className="hidden lg:table-cell text-right text-forest/80 tabular-nums">
                        {l.estimated_value != null ? formatMoney(l.estimated_value) : <span className="text-forest/30">—</span>}
                      </Td>
                      <Td className="hidden md:table-cell">
                        {l.next_action_at ? (
                          <span className={cn("text-xs", overdue ? "text-destructive" : "text-forest/70")}>
                            {formatDate(l.next_action_at, { day: "2-digit", month: "short" })}
                            {l.next_action && <span className="text-forest/50"> · {l.next_action}</span>}
                          </span>
                        ) : (
                          <span className="text-forest/30 text-xs">—</span>
                        )}
                      </Td>
                      <Td className="text-right text-xs text-forest/55 whitespace-nowrap">{relativeTime(l.created_at)}</Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <p className="mt-4 text-[11px] text-forest/40">
        Showing {filtered.length} of {all.length} leads.
      </p>

      <AddLeadDialog open={addOpen} onOpenChange={setAddOpen} />
    </AdminPage>
  );
}

function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return <th className={cn("eyebrow text-forest/45 font-medium px-5 md:px-6 py-3", className)}>{children}</th>;
}
function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("px-5 md:px-6 py-3.5 align-top", className)}>{children}</td>;
}

function AddLeadDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const id = await createLead({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        phone: String(fd.get("phone") ?? "").trim(),
        company: String(fd.get("company") ?? "").trim(),
        client_type: String(fd.get("client_type") ?? "").trim(),
        project_type: String(fd.get("project_type") ?? "").trim(),
        message: String(fd.get("message") ?? "").trim(),
        source: String(fd.get("source") ?? "manual"),
        priority: (String(fd.get("priority") ?? "normal") as "low" | "normal" | "high") || "normal",
      });
      await qc.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead added.");
      onOpenChange(false);
      void navigate({ to: "/admin/leads/$id", params: { id } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the lead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-cream border-forest/15 p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-forest/10">
          <p className="eyebrow text-gold mb-1">Manual entry</p>
          <DialogTitle className="font-serif text-2xl font-medium text-forest">Add a lead</DialogTitle>
          <DialogDescription className="text-forest/60">
            For inquiries that arrive by phone, WhatsApp, email or in person.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="px-6 py-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name">
              <TextInput name="name" required maxLength={120} />
            </Field>
            <Field label="Email">
              <TextInput name="email" type="email" required maxLength={255} />
            </Field>
            <Field label="Phone">
              <TextInput name="phone" type="tel" maxLength={40} />
            </Field>
            <Field label="Studio / Company">
              <TextInput name="company" maxLength={120} />
            </Field>
            <Field label="Client type">
              <SelectInput name="client_type" defaultValue="">
                <option value="">—</option>
                {CLIENT_TYPES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Source">
              <SelectInput name="source" defaultValue="phone">
                <option value="phone">Phone</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="showroom">Studio visit</option>
                <option value="referral">Referral</option>
                <option value="instagram">Instagram</option>
                <option value="manual">Other</option>
              </SelectInput>
            </Field>
            <Field label="Project" className="sm:col-span-2">
              <TextInput name="project_type" maxLength={120} placeholder="e.g. Hotel lobby, Marmorino · 180 m²" />
            </Field>
            <Field label="Priority">
              <SelectInput name="priority" defaultValue="normal">
                {LEAD_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {LEAD_PRIORITY_LABEL[p]}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>
          <Field label="Notes">
            <TextArea name="message" maxLength={2000} placeholder="What was discussed, scope, timing…" />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => onOpenChange(false)} className={adminBtn.ghost}>
              Cancel
            </button>
            <button type="submit" disabled={busy} className={adminBtn.primary}>
              {busy ? "Saving…" : "Save lead"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
