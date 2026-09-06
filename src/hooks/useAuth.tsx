import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState = {
  /** True until the initial session + role lookup has completed on the client. */
  loading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  /** Re-run the role lookup (after bootstrap / role changes). */
  refreshRole: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

async function lookupIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) {
    console.error("[auth] role lookup failed", error);
    return false;
  }
  return !!data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const applySession = async (next: Session | null) => {
      setSession(next);
      if (next?.user) {
        const admin = await lookupIsAdmin(next.user.id);
        if (!cancelled) setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
      if (!cancelled) setLoading(false);
    };

    // Subscribe first so no auth event is missed, then hydrate from storage.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      // Defer Supabase calls out of the auth callback to avoid deadlocks.
      setTimeout(() => {
        void applySession(next);
      }, 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      void applySession(data.session);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  const refreshRole = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const uid = data.session?.user.id;
    setIsAdmin(uid ? await lookupIsAdmin(uid) : false);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      isAdmin,
      signOut,
      refreshRole,
    }),
    [loading, session, isAdmin, signOut, refreshRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
