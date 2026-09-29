import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Copy, Trash2 } from "lucide-react";
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
import { AdminPage, DefRow, EmptyState, Field, LoadingRows, Panel, TextInput, adminBtn } from "@/lib/admin-ui";
import { addTeamMember, listTeam, removeTeamMember } from "@/lib/admin.functions";
import { formatDateTime, initials, relativeTime } from "@/lib/crm";
import { SITE } from "@/lib/site-config";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fetchTeam = useServerFn(listTeam);
  const doAdd = useServerFn(addTeamMember);
  const doRemove = useServerFn(removeTeamMember);

  const team = useQuery({ queryKey: ["team"], queryFn: () => fetchTeam() });
  const [tempPassword, setTempPassword] = useState<{ email: string; password: string } | null>(null);
  const [removing, setRemoving] = useState<{ user_id: string; email: string | null } | null>(null);

  const add = useMutation({
    mutationFn: (data: { name: string; email: string }) => doAdd({ data }),
    onSuccess: async (res, vars) => {
      await qc.invalidateQueries({ queryKey: ["team"] });
      if (res.temporaryPassword) setTempPassword({ email: vars.email, password: res.temporaryPassword });
      toast.success(res.alreadyExisted ? "Access granted to the existing account." : "Team member added.");
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Could not add the team member."),
  });

  const remove = useMutation({
    mutationFn: (user_id: string) => doRemove({ data: { user_id } }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["team"] });
      toast.success("Access removed.");
      setRemoving(null);
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Could not remove access."),
  });

  const [pwBusy, setPwBusy] = useState(false);

  async function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const form = e.currentTarget;
    await add.mutateAsync({ name: String(fd.get("name") ?? "").trim(), email: String(fd.get("email") ?? "").trim() });
    form.reset();
  }

  async function onPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password.length < 10) return toast.error("Use at least 10 characters.");
    if (password !== confirm) return toast.error("The passwords do not match.");
    setPwBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setPwBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated.");
    e.currentTarget.reset();
  }

  return (
    <AdminPage
      eyebrow="Workspace"
      title="Settings"
      description="Who can access this workspace, and your own account. Every team member has full access to leads, quotations and analytics."
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="space-y-6 min-w-0">
          <Panel eyebrow="Access" title="Team" padded={false}>
            {team.isLoading ? (
              <LoadingRows rows={3} />
            ) : team.isError ? (
              <EmptyState title="Could not load the team." description={(team.error as Error).message} />
            ) : (
              <ul className="divide-y divide-forest/10">
                {(team.data ?? []).map((m) => (
                  <li key={m.user_id} className="flex items-center gap-4 px-5 md:px-6 py-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center bg-forest text-beige text-xs tracking-wider shrink-0">
                      {initials(m.name ?? m.email)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-forest font-medium truncate">
                        {m.name ?? m.email ?? "—"}
                        {m.user_id === user?.id && <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-gold">You</span>}
                      </p>
                      <p className="text-xs text-forest/50 truncate">
                        {m.email}
                        {m.last_sign_in_at ? ` · last signed in ${relativeTime(m.last_sign_in_at)}` : " · never signed in"}
                      </p>
                    </div>
                    {m.user_id !== user?.id && (
                      <button
                        type="button"
                        onClick={() => setRemoving({ user_id: m.user_id, email: m.email })}
                        className="text-forest/30 hover:text-destructive transition-colors p-1"
                        aria-label={`Remove ${m.email ?? "member"}`}
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <form onSubmit={onAdd} className="border-t border-forest/10 px-5 md:px-6 py-5 bg-beige/40">
              <p className="eyebrow text-forest/45 mb-4">Invite a team member</p>
              <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
                <Field label="Name">
                  <TextInput name="name" required maxLength={120} className="bg-card" />
                </Field>
                <Field label="Email">
                  <TextInput name="email" type="email" required maxLength={255} className="bg-card" />
                </Field>
                <button type="submit" disabled={add.isPending} className={adminBtn.primary}>
                  {add.isPending ? "Adding…" : "Add"}
                </button>
              </div>
              <p className="mt-3 text-[11px] text-forest/45 leading-relaxed">
                A temporary password is generated once and shown only to you. Share it privately; they can change it after signing in.
              </p>
            </form>
          </Panel>

          {tempPassword && (
            <Panel eyebrow="One-time" title="Temporary sign-in details">
              <dl>
                <DefRow label="Email">{tempPassword.email}</DefRow>
                <DefRow label="Password">
                  <span className="inline-flex items-center gap-3">
                    <code className="font-mono text-sm tracking-wide">{tempPassword.password}</code>
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(tempPassword.password);
                        toast.success("Copied.");
                      }}
                      className="text-forest/50 hover:text-forest transition-colors"
                      aria-label="Copy password"
                    >
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  </span>
                </DefRow>
                <DefRow label="Sign-in page">{typeof window !== "undefined" ? `${window.location.origin}/auth` : "/auth"}</DefRow>
              </dl>
              <button type="button" onClick={() => setTempPassword(null)} className={`${adminBtn.ghost} mt-4`}>
                Dismiss
              </button>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel eyebrow="Your account" title={user?.email ?? "—"}>
            <form onSubmit={onPassword} className="space-y-4">
              <Field label="New password" hint="At least 10 characters">
                <TextInput name="password" type="password" autoComplete="new-password" required minLength={10} />
              </Field>
              <Field label="Confirm">
                <TextInput name="confirm" type="password" autoComplete="new-password" required minLength={10} />
              </Field>
              <div className="flex justify-end">
                <button type="submit" disabled={pwBusy} className={adminBtn.outline}>
                  {pwBusy ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </Panel>

          <Panel eyebrow="Public site" title="Studio details">
            <dl>
              <DefRow label="Phone">{SITE.phoneDisplay}</DefRow>
              <DefRow label="Email">{SITE.email}</DefRow>
              <DefRow label="Location">{SITE.addressLine}</DefRow>
            </dl>
            <p className="mt-4 text-[11px] text-forest/45 leading-relaxed">
              These appear on the website, in the footer and on printed quotations. Ask us in chat to change them.
            </p>
          </Panel>
        </div>
      </div>

      <AlertDialog open={!!removing} onOpenChange={(o) => !o && setRemoving(null)}>
        <AlertDialogContent className="bg-cream border-forest/15">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-medium text-forest">Remove access?</AlertDialogTitle>
            <AlertDialogDescription className="text-forest/60">
              {removing?.email} will lose access to the workspace and their sign-in will be deleted. Leads and quotations they created are kept.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={adminBtn.ghost}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removing && remove.mutate(removing.user_id)} className={adminBtn.danger}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPage>
  );
}

export { formatDateTime as _fmt };
