import { createFileRoute, Link, Navigate, Outlet, useLocation } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

/**
 * Client-only gate for the private workspace.
 * SSR is disabled below this layout: the session lives in browser storage,
 * so the server can never know who is asking.
 */
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { loading, session, isAdmin, signOut, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-forest mb-3">Casa D'Arte</p>
          <p className="eyebrow text-forest/40 animate-pulse">Opening the studio…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" search={{ mode: undefined }} replace state={{ from: location.pathname } as never} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="eyebrow text-gold mb-6">Access</p>
          <h1 className="font-serif text-4xl text-forest mb-4">This workspace is private.</h1>
          <p className="text-forest/60 mb-2">
            You are signed in as <span className="text-forest">{user?.email}</span>, but this account has
            not been granted studio access.
          </p>
          <p className="text-forest/60 mb-10 text-sm">
            Ask an existing administrator to add you from Settings → Team.
          </p>
          <div className="flex justify-center gap-3">
            <button type="button" onClick={() => void signOut()} className="btn btn-forest">
              Sign out
            </button>
            <Link to="/" className="btn btn-outline">
              Back to the website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
