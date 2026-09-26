import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { createFirstAdmin, getAdminSetupState } from "@/lib/admin.functions";
import authImg from "@/assets/about-craft.jpg";

const MODES = ["signin", "setup", "forgot", "update"] as const;
type Mode = (typeof MODES)[number];

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { mode?: Mode } => {
    const m = typeof search.mode === "string" ? search.mode : undefined;
    return { mode: m && (MODES as readonly string[]).includes(m) ? (m as Mode) : undefined };
  },
  head: () => ({
    meta: [
      { title: "Studio Login — Casa D'Arte" },
      { name: "description", content: "Private access for the Casa D'Arte studio team." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Studio Login — Casa D'Arte" },
      { property: "og:description", content: "Private access for the Casa D'Arte studio team." },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "w-full bg-transparent border-b border-forest/25 py-3 text-sm text-forest outline-none focus:border-gold transition-colors placeholder:text-forest/30";

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [busy, setBusy] = useState(false);

  const fetchSetup = useServerFn(getAdminSetupState);
  const setup = useQuery({ queryKey: ["admin-setup-state"], queryFn: () => fetchSetup() });
  const doCreateFirstAdmin = useServerFn(createFirstAdmin);

  // Password-recovery links land here with a recovery session.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (search.mode) setMode(search.mode);
  }, [search.mode]);

  // Fresh install → jump straight to setup.
  useEffect(() => {
    if (setup.data?.needsSetup && mode === "signin") setMode("setup");
  }, [setup.data?.needsSetup, mode]);

  // Already signed in as an admin → go to the dashboard.
  useEffect(() => {
    if (!loading && session && isAdmin && mode !== "update") {
      void navigate({ to: "/admin" });
    }
  }, [loading, session, isAdmin, mode, navigate]);

  async function onSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(fd.get("email") ?? "").trim(),
      password: String(fd.get("password") ?? ""),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "Email or password is incorrect." : error.message);
      return;
    }
    toast.success("Welcome back.");
    void navigate({ to: "/admin" });
  }

  async function onSetup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const email = String(fd.get("email") ?? "").trim();
      await doCreateFirstAdmin({
        data: { name: String(fd.get("name") ?? "").trim(), email, password },
      });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Administrator account created.");
      void navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create the account.");
    } finally {
      setBusy(false);
    }
  }

  async function onForgot(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(String(fd.get("email") ?? "").trim(), {
      redirectTo: `${window.location.origin}/auth?mode=update`,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("If that address belongs to a team member, a reset link is on its way.");
    setMode("signin");
  }

  async function onUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password.length < 10) {
      toast.error("Use at least 10 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    void navigate({ to: "/admin" });
  }

  const heading: Record<Mode, { eyebrow: string; title: string; sub: string }> = {
    signin: {
      eyebrow: "Studio access",
      title: "Sign in.",
      sub: "The private workspace for leads, quotations and the journal.",
    },
    setup: {
      eyebrow: "First-time setup",
      title: "Create the first administrator.",
      sub: "This account will own the studio workspace. Further team members can be added from Settings.",
    },
    forgot: {
      eyebrow: "Reset password",
      title: "Forgotten your password?",
      sub: "Enter your email and we will send a link to choose a new one.",
    },
    update: {
      eyebrow: "Reset password",
      title: "Choose a new password.",
      sub: "Use at least 10 characters.",
    },
  };

  const h = heading[mode];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-beige">
      <div className="relative hidden lg:block bg-forest">
        <img
          src={authImg}
          alt="Trowel and plaster sample in the Casa D'Arte studio"
          width={1200}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-forest/40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-beige">
          <Link to="/" className="font-serif text-2xl tracking-tight font-bold">
            CASA D'ARTE
          </Link>
          <div>
            <p className="eyebrow text-gold mb-4">Studio workspace</p>
            <p className="font-serif text-4xl leading-tight max-w-md">
              Every inquiry, sample and quotation — in one place.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
        <div className="lg:hidden mb-12">
          <Link to="/" className="font-serif text-2xl tracking-tight font-bold text-forest">
            CASA D'ARTE
          </Link>
        </div>
        <div className="w-full max-w-md">
          <p className="eyebrow text-gold mb-5">{h.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-forest leading-tight mb-4">{h.title}</h1>
          <p className="text-forest/60 mb-10">{h.sub}</p>

          {mode === "signin" && (
            <form onSubmit={onSignIn} className="space-y-7">
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Email</span>
                <input name="email" type="email" required autoComplete="email" className={inputClass} />
              </label>
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Password</span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className={inputClass}
                />
              </label>
              <div className="flex items-center justify-between gap-4 pt-2">
                <button type="submit" disabled={busy} className="btn btn-forest">
                  {busy ? "Signing in…" : "Sign in"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="link-line text-forest/70 text-xs"
                >
                  Forgot password
                </button>
              </div>
              {setup.data?.needsSetup && (
                <p className="text-xs text-forest/60 pt-4">
                  No administrator yet?{" "}
                  <button type="button" onClick={() => setMode("setup")} className="link-line">
                    Create the first account
                  </button>
                </p>
              )}
            </form>
          )}

          {mode === "setup" && setup.data && !setup.data.needsSetup && (
            <div className="space-y-6">
              <p className="text-sm text-forest/70">
                An administrator already exists. Please sign in, or ask an existing administrator to add
                you from Settings.
              </p>
              <button type="button" onClick={() => setMode("signin")} className="btn btn-forest">
                Go to sign in
              </button>
            </div>
          )}

          {mode === "setup" && (setup.isLoading || setup.data?.needsSetup) && (
            <form onSubmit={onSetup} className="space-y-7">
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Your name</span>
                <input name="name" required autoComplete="name" maxLength={120} className={inputClass} />
              </label>
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Email</span>
                <input name="email" type="email" required autoComplete="email" className={inputClass} />
              </label>
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Password</span>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={10}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Confirm password</span>
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={10}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </label>
              <div className="pt-2">
                <button type="submit" disabled={busy || setup.isLoading} className="btn btn-forest">
                  {busy ? "Creating…" : "Create administrator"}
                </button>
              </div>
            </form>
          )}

          {mode === "forgot" && (
            <form onSubmit={onForgot} className="space-y-7">
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Email</span>
                <input name="email" type="email" required autoComplete="email" className={inputClass} />
              </label>
              <div className="flex items-center justify-between gap-4 pt-2">
                <button type="submit" disabled={busy} className="btn btn-forest">
                  {busy ? "Sending…" : "Send reset link"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="link-line text-forest/70 text-xs"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          )}

          {mode === "update" && (
            <form onSubmit={onUpdate} className="space-y-7">
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">New password</span>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={10}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="eyebrow text-forest/60 mb-2 block">Confirm password</span>
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={10}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </label>
              <div className="pt-2">
                <button type="submit" disabled={busy} className="btn btn-forest">
                  {busy ? "Saving…" : "Save password"}
                </button>
              </div>
            </form>
          )}

          <p className="mt-16 text-[10px] uppercase tracking-[0.25em] text-forest/35">
            <Link to="/" className="hover:text-gold transition-colors">
              ← Back to the website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
