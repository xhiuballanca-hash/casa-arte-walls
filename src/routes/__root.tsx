import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { SiteNav } from "../lib/site-nav";
import { SiteFooter } from "../lib/site-footer";
import { WhatsAppButton } from "../lib/whatsapp-button";
import { CookieConsent } from "../lib/cookie-consent";
import { LanguageProvider, useT, useLocalizedHead } from "../lib/i18n";

function NotFoundComponent() {
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-6">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold mb-6">404</p>
        <h1 className="font-serif text-5xl text-forest mb-4">{t("Page not found")}</h1>
        <p className="text-forest/60 mb-8">
          {t("The page you're looking for has been moved or no longer exists.")}
        </p>
        <a
          href="/"
          className="inline-flex text-[11px] uppercase tracking-[0.25em] border border-forest text-forest rounded-full px-8 py-3 hover:bg-forest hover:text-beige transition-all"
        >
          {t("Return home")}
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const t = useT();
  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-6">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-forest mb-3">{t("This page didn't load")}</h1>
        <p className="text-forest/60 text-sm mb-6">
          {t("Something went wrong on our end. Please try again.")}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="text-[11px] uppercase tracking-[0.25em] bg-forest text-beige rounded-full px-6 py-3 hover:bg-gold hover:text-forest transition"
          >
            {t("Try again")}
          </button>
          <a
            href="/"
            className="text-[11px] uppercase tracking-[0.25em] border border-forest/30 text-forest rounded-full px-6 py-3 hover:border-gold hover:text-gold transition"
          >
            {t("Go home")}
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
          "Premium decorative finishes, including Travertino, Marmorino, Sahara, Stucco Veneziano, Microcement and Beton Look, professionally applied by Casa D'Arte.",
      },
      { name: "author", content: "Casa D'Arte" },
      { property: "og:site_name", content: "Casa D'Arte" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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

function HeadLocalizer({ pathname }: { pathname: string }) {
  useLocalizedHead(pathname);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <HeadLocalizer pathname={pathname} />
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
      </LanguageProvider>
    </QueryClientProvider>
  );
}
