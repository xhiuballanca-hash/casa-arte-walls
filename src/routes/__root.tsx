import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
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
      { title: "Casa D'Arte — Premium Italian Decorative Wall Finishes" },
      {
        name: "description",
        content:
          "Casa D'Arte brings premium Italian decorative wall finishes — Travertino, Marmorino, Stucco Veneziano and Sahara — to North Macedonia's most refined homes, hotels and hospitality spaces.",
      },
      { name: "author", content: "Casa D'Arte" },
      { property: "og:title", content: "Casa D'Arte — Premium Italian Decorative Wall Finishes" },
      {
        property: "og:description",
        content:
          "Premium Italian decorative finishes for homes, hotels, restaurants, offices and luxury spaces across North Macedonia.",
      },
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <CookieConsent />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1F3A2E",
            color: "#F1EDE4",
            border: "1px solid rgba(197,160,89,0.35)",
            borderRadius: "999px",
            padding: "12px 20px",
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
          },
        }}
      />
    </QueryClientProvider>
  );
}
