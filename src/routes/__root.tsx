import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../lib/site-nav";
import { SiteFooter } from "../lib/site-footer";
import { WhatsAppButton } from "../lib/whatsapp-button";
import { CookieConsent } from "../lib/cookie-consent";
import { AuthProvider } from "../hooks/useAuth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold mb-6">404</p>
        <h1 className="font-serif text-5xl text-forest mb-4">Page not found</h1>
        <p className="text-forest/60 mb-8">
          The page you're looking for has been moved or no longer exists.
        </p>
        <a
          href="/"
          className="inline-flex text-[11px] uppercase tracking-[0.25em] border border-forest text-forest rounded-full px-8 py-3 hover:bg-forest hover:text-beige transition-all"
        >
          Return home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-forest mb-3">This page didn't load</h1>
        <p className="text-forest/60 text-sm mb-6">
          Something went wrong on our end. Please try again.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="text-[11px] uppercase tracking-[0.25em] bg-forest text-beige rounded-full px-6 py-3 hover:bg-gold hover:text-forest transition"
          >
            Try again
          </button>
          <a
            href="/"
            className="text-[11px] uppercase tracking-[0.25em] border border-forest/30 text-forest rounded-full px-6 py-3 hover:border-gold hover:text-gold transition"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Casa D'Arte | Italian Decorative Finishes & Application" },
      {
        name: "description",
        content:
          "Italian decorative finishes — Travertino, Marmorino, Venetian plaster, Sahara, Microcement — supplied and professionally applied by Casa D'Arte in North Macedonia.",
      },
      { name: "author", content: "Casa D'Arte" },
      { property: "og:site_name", content: "Casa D'Arte" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Routes that render their own chrome (no public nav/footer/WhatsApp). */
function isWorkspacePath(pathname: string) {
  return (
    pathname === "/auth" ||
    pathname.startsWith("/auth/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/print/")
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const workspace = isWorkspacePath(pathname);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {workspace ? (
          <Outlet />
        ) : (
          <>
            <SiteNav />
            <main className="min-h-screen">
              <Outlet />
            </main>
            <SiteFooter />
            <WhatsAppButton />
            <CookieConsent />
          </>
        )}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "var(--color-forest)",
              color: "var(--color-beige)",
              border: "1px solid color-mix(in oklab, var(--color-gold) 35%, transparent)",
              borderRadius: "2px",
              padding: "14px 20px",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
