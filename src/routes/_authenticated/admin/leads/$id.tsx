import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Check, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
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
import { AdminPage, Chip, DefRow, EmptyState, Field, Panel, SelectInput, TextArea, TextInput, adminBtn } from "@/lib/admin-ui";
import {
  addLeadNote,
  deleteLead,
  deleteLeadNote,
  leadNotesQuery,
  leadQuery,
  leadQuotationsQuery,
  setLeadStatus,
  updateLead,
} from "@/lib/admin-queries";
import {
  LEAD_PRIORITIES,
  LEAD_PRIORITY_LABEL,
  LEAD_STATUS_LABEL,
  LEAD_STATUS_TONE,
  NOTE_KINDS,
  NOTE_KIND_LABEL,
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_TONE,
  formatDate,
  formatDateTime,
  formatMoney,
  initials,
  leadPriority,
  leadStatus,
  quoteStatus,
  relativeTime,
  sourceLabel,
  type Inquiry,
  type LeadStatus,
  type NoteKind,
} from "@/lib/crm";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin/leads/$id")({
  component: LeadDetailPage,
});

const PIPELINE: LeadStatus[] = ["new", "contacted", "sample_sent", "quoted", "won"];

function LeadDetailPage() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const lead = useQuery(leadQuery(id));
  const notes = useQuery(leadNotesQuery(id));
  const quotes = useQuery(leadQuotationsQuery(id));

  const [busyStatus, setBusyStatus] = useState<LeadStatus | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const author = { id: user?.id ?? null, email: user?.email ?? null };
  const invalidate = () => qc.invalidateQueries({ queryKey: ["leads"] });

  async function changeStatus(next: LeadStatus) {
    if (!lead.data || leadStatus(lead.data.status) === next) return;
    setBusyStatus(next);
    try {
      await setLeadStatus(id, next, author, lead.data.status);
      await Promise.all([invalidate(), qc.invalidateQueries({ queryKey: ["leads", id, "notes"] })]);
      toast.success(`Marked as ${LEAD_STATUS_LABEL[next].toLowerCase()}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update status.");
    } finally {
      setBusyStatus(null);
    }
  }

  async function onDelete() {
    try {
      await deleteLead(id);
      await invalidate();
      toast.success("Lead deleted.");
      void navigate({ to: "/admin/leads", search: {} });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete the lead.");
    }
  }

  if (lead.isLoading) {
    return (
      <AdminPage title={<span className="text-forest/30">Loading…</span>}>
        <div className="h-40 bg-forest/5 animate-pulse" />
      </AdminPage>
    );
  }

  if (!lead.data) {
    return (
      <AdminPage title="Lead not found">
        <EmptyState
          title="This lead no longer exists."
          action={
            <Link to="/admin/leads" search={{}} className={adminBtn.outline}>
              Back to leads
            </Link>
          }
        />
      </AdminPage>
    );
  }

  const l = lead.data;
  const status = leadStatus(l.status);
  const isLost = status === "lost";
  const currentIdx = PIPELINE.indexOf(status);
  const waNumber = (l.phone ?? "").replace(/[^\d+]/g, "").replace(/^\+/, "");

  return (
    <AdminPage
      wide
      eyebrow={
        <span className="inline-flex items-center gap-3">
          <Link to="/admin/leads" search={{}} className="inline-flex items-center gap-1 hover:text-forest transition-colors">
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Leads
          </Link>
          <span className="text-forest/30">/</span>
          <span>{sourceLabel(l.source)}</span>
        </span>
      }
      title={
        <span className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex h-12 w-12 items-center justify-center bg-forest text-beige font-sans text-sm tracking-wider shrink-0">
            {initials(l.name)}
          </span>
          <span>
            {l.name}
            {l.company && <span className="text-forest/45"> · {l.company}</span>}
          </span>
          <Chip className={LEAD_STATUS_TONE[status]}>{LEAD_STATUS_LABEL[status]}</Chip>
        </span>
      }
      description={
        <>
          Received {formatDateTime(l.created_at)} · {relativeTime(l.created_at)}
          {l.client_type && <> · {l.client_type}</>}
        </>
      }
      actions={
        <>
          <Link to="/admin/quotations/new" search={{ lead: l.id }} className={adminBtn.primary}>
            New quotation
          </Link>
          <button type="button" onClick={() => setDeleteOpen(true)} className={adminBtn.danger} aria-label="Delete lead">
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </>
      }
    >
      {/* Pipeline */}
      <div className="mb-8 bg-card border border-forest/10 px-5 md:px-6 py-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="eyebrow text-forest/45">Pipeline</p>
          {!isLost ? (
            <button
              type="button"
              onClick={() => changeStatus("lost")}
              disabled={busyStatus !== null}
              className="text-[10px] uppercase tracking-[0.2em] text-forest/40 hover:text-destructive transition-colors"
            >
              Mark as lost
            </button>
          ) : (
            <button
              type="button"
              onClick={() => changeStatus("new")}
              disabled={busyStatus !== null}
              className="text-[10px] uppercase tracking-[0.2em] text-forest/50 hover:text-forest transition-colors"
            >
              Reopen lead
            </button>
          )}
        </div>
        <ol className="grid grid-cols-5 gap-2">
          {PIPELINE.map((s, i) => {
            const reached = !isLost && i <= currentIdx;
            const active = s === status;
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => changeStatus(s)}
                  disabled={busyStatus !== null}
                  className={cn(
                    "group w-full text-left",
                    busyStatus === s && "opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "block h-1 mb-3 transition-colors",
                      reached ? "bg-forest" : "bg-forest/10 group-hover:bg-forest/30",
                      active && "bg-gold",
                    )}
                  />
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium",
                      active ? "text-forest" : reached ? "text-forest/70" : "text-forest/40 group-hover:text-forest/70",
                    )}
                  >
                    {reached && !active && <Check className="h-3 w-3" strokeWidth={2} />}
                    {LEAD_STATUS_LABEL[s]}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          {/* Message */}
          <Panel eyebrow="Inquiry" title={l.project_type || "General inquiry"}>
            {l.message ? (
              <p className="text-sm leading-relaxed text-forest/85 whitespace-pre-wrap">{l.message}</p>
            ) : (
              <p className="text-sm text-forest/45">No message was included.</p>
            )}
          </Panel>

          {/* Timeline */}
          <Panel eyebrow="Activity" title="Notes & timeline" padded={false}>
            <NoteComposer
              onSubmit={async (kind, body) => {
                await addLeadNote(id, { kind, body, author });
                await qc.invalidateQueries({ queryKey: ["leads", id, "notes"] });
                if (status === "new" && kind !== "note") {
                  await setLeadStatus(id, "contacted", author, status);
                  await invalidate();
                }
              }}
            />
            {notes.isLoading ? (
              <div className="p-6 text-sm text-forest/40">Loading…</div>
            ) : (notes.data ?? []).length === 0 ? (
              <EmptyState title="No activity yet." description="Log calls, emails, site visits and samples so the whole team sees the history." />
            ) : (
              <ol className="divide-y divide-forest/10">
                {(notes.data ?? []).map((n) => {
                  const kind = (NOTE_KINDS as readonly string[]).includes(n.kind) ? (n.kind as NoteKind) : "note";
                  const system = kind === "status";
                  return (
                    <li key={n.id} className="group px-5 md:px-6 py-4 flex gap-4">
                      <div className="w-24 shrink-0">
                        <Chip className={cn(system ? "border-forest/10 text-forest/40" : "border-gold/40 text-forest bg-gold/10")}>
                          {NOTE_KIND_LABEL[kind]}
                        </Chip>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm whitespace-pre-wrap leading-relaxed", system ? "text-forest/55 italic" : "text-forest/85")}>
                          {n.body}
                        </p>
                        <p className="mt-1.5 text-[11px] text-forest/40">
                          {n.author_email || "System"} · {formatDateTime(n.created_at)}
                        </p>
                      </div>
                      {!system && (
                        <button
                          type="button"
                          aria-label="Delete note"
                          onClick={async () => {
                            try {
                              await deleteLeadNote(n.id);
                              await qc.invalidateQueries({ queryKey: ["leads", id, "notes"] });
                            } catch {
                              toast.error("Could not delete the note.");
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-forest/30 hover:text-destructive transition-all self-start"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </Panel>

          {/* Quotations */}
          <Panel
            eyebrow="Documents"
            title="Quotations"
            padded={false}
            actions={
              <Link to="/admin/quotations/new" search={{ lead: l.id }} className="link-line text-xs text-forest/70">
                New quotation
              </Link>
            }
          >
            {(quotes.data ?? []).length === 0 ? (
              <EmptyState title="No quotation yet." description="Create one from this lead — client details will be prefilled." />
            ) : (
              <ul className="divide-y divide-forest/10">
                {(quotes.data ?? []).map((q) => {
                  const s = quoteStatus(q.status);
                  return (
                    <li key={q.id}>
                      <Link
                        to="/admin/quotations/$id"
                        params={{ id: q.id }}
                        className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 hover:bg-beige/60 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-forest font-medium">
                            <span className="text-forest/45 font-light mr-2">{q.quote_number}</span>
                            {q.project_name || "Quotation"}
                          </p>
                          <p className="text-xs text-forest/50 mt-0.5">
                            {formatDate(q.created_at)}
                            {q.valid_until && <> · valid until {formatDate(q.valid_until)}</>}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm text-forest tabular-nums">{formatMoney(q.total, q.currency)}</p>
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

        {/* Sidebar */}
        <div className="space-y-6">
          <Panel eyebrow="Contact" title="Details">
            <dl>
              <DefRow label="Email">
                <a href={`mailto:${l.email}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors break-all">
                  <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {l.email}
                </a>
              </DefRow>
              <DefRow label="Phone">
                {l.phone ? (
                  <span className="flex flex-wrap gap-x-4 gap-y-1">
                    <a href={`tel:${l.phone}`} className="inline-flex items-center gap-2 hover:text-gold transition-colors">
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {l.phone}
                    </a>
                    {waNumber && (
                      <a
                        href={`https://wa.me/${waNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 hover:text-gold transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                        WhatsApp
                      </a>
                    )}
                  </span>
                ) : (
                  <span className="text-forest/40">—</span>
                )}
              </DefRow>
              <DefRow label="Company">{l.company || <span className="text-forest/40">—</span>}</DefRow>
              <DefRow label="Client type">{l.client_type || <span className="text-forest/40">—</span>}</DefRow>
              <DefRow label="Source">{sourceLabel(l.source)}</DefRow>
              <DefRow label="Updated">{relativeTime(l.updated_at)}</DefRow>
            </dl>
          </Panel>

          <QualificationPanel
            key={l.updated_at}
            lead={l}
            onSaved={async () => {
              await invalidate();
            }}
          />
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-cream border-forest/15">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-medium text-forest">Delete this lead?</AlertDialogTitle>
            <AlertDialogDescription className="text-forest/60">
              The inquiry, its notes and its link to any quotations will be removed. Quotations themselves are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={adminBtn.ghost}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className={adminBtn.danger}>
              Delete lead
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPage>
  );
}

function NoteComposer({ onSubmit }: { onSubmit: (kind: NoteKind, body: string) => Promise<void> }) {
  const [kind, setKind] = useState<NoteKind>("note");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    try {
      await onSubmit(kind, body.trim());
      setBody("");
      setKind("note");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the note.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="px-5 md:px-6 py-5 border-b border-forest/10 bg-beige/40">
      <div className="flex flex-wrap gap-2 mb-3">
        {NOTE_KINDS.filter((k) => k !== "status").map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={cn(
              "border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] transition-colors",
              kind === k ? "bg-forest text-beige border-forest" : "border-forest/20 text-forest/60 hover:border-forest/50",
            )}
          >
            {NOTE_KIND_LABEL[k]}
          </button>
        ))}
      </div>
      <TextArea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={
          kind === "call"
            ? "Who you spoke with, what was agreed…"
            : kind === "sample"
              ? "Which samples were sent or prepared…"
              : "Write a note for the team…"
        }
        className="bg-card min-h-[84px]"
        maxLength={4000}
      />
      <div className="flex justify-between items-center mt-3">
        <p className="text-[11px] text-forest/40">Logging a call, email, meeting or sample on a new lead marks it as contacted.</p>
        <button type="submit" disabled={busy || !body.trim()} className={adminBtn.primary}>
          {busy ? "Saving…" : "Log"}
        </button>
      </div>
    </form>
  );
}

function QualificationPanel({
  lead,
  onSaved,
}: {
  lead: Inquiry;
  onSaved: () => Promise<void>;
}) {
  const [priority, setPriority] = useState(leadPriority(lead.priority));
  const [value, setValue] = useState(lead.estimated_value != null ? String(lead.estimated_value) : "");
  const [nextAction, setNextAction] = useState(lead.next_action ?? "");
  const [nextAt, setNextAt] = useState(lead.next_action_at ?? "");
  const [lostReason, setLostReason] = useState(lead.lost_reason ?? "");
  const [projectType, setProjectType] = useState(lead.project_type ?? "");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(
      priority !== leadPriority(lead.priority) ||
        value !== (lead.estimated_value != null ? String(lead.estimated_value) : "") ||
        nextAction !== (lead.next_action ?? "") ||
        nextAt !== (lead.next_action_at ?? "") ||
        lostReason !== (lead.lost_reason ?? "") ||
        projectType !== (lead.project_type ?? ""),
    );
  }, [priority, value, nextAction, nextAt, lostReason, projectType, lead]);

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await updateLead(lead.id, {
        priority,
        estimated_value: value.trim() === "" ? null : Number(value),
        next_action: nextAction.trim() || null,
        next_action_at: nextAt || null,
        lost_reason: lostReason.trim() || null,
        project_type: projectType.trim() || null,
      });
      await onSaved();
      toast.success("Saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Panel eyebrow="Qualification" title="Project & follow-up">
      <form onSubmit={save} className="space-y-5">
        <Field label="Project">
          <TextInput value={projectType} onChange={(e) => setProjectType(e.target.value)} maxLength={120} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Priority">
            <SelectInput value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}>
              {LEAD_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {LEAD_PRIORITY_LABEL[p]}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Est. value (EUR)">
            <TextInput
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="0.00"
            />
          </Field>
        </div>
        <Field label="Next action">
          <TextInput value={nextAction} onChange={(e) => setNextAction(e.target.value)} maxLength={200} placeholder="e.g. Send Marmorino samples" />
        </Field>
        <Field label="Due">
          <TextInput type="date" value={nextAt} onChange={(e) => setNextAt(e.target.value)} />
        </Field>
        {leadStatus(lead.status) === "lost" && (
          <Field label="Reason lost">
            <TextArea value={lostReason} onChange={(e) => setLostReason(e.target.value)} maxLength={500} className="min-h-[70px]" />
          </Field>
        )}
        <div className="flex justify-end">
          <button type="submit" disabled={busy || !dirty} className={adminBtn.primary}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </Panel>
  );
}

