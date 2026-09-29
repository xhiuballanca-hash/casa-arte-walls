import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STRINGS, PRODUCT_TR, POST_TR, META_TR } from "./translations";

export const LANGS = ["en", "sq", "mk"] as const;
export type Lang = (typeof LANGS)[number];

const STORAGE_KEY = "casadarte-lang";

type Vars = Record<string, string | number>;
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (en: string, vars?: Vars) => string };

function fill(s: string, vars?: Vars) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export function translate(lang: Lang, en: string, vars?: Vars) {
  if (lang === "en") return fill(en, vars);
  return fill(STRINGS[en]?.[lang] ?? en, vars);
}

const I18nContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (en, vars) => fill(en, vars),
});

/** English is always the default; a visitor's manual choice is remembered. No auto-detection. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (LANGS as readonly string[]).includes(saved)) setLangState(saved as Lang);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (en, vars) => translate(lang, en, vars) }),
    [lang, setLang],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export function useT() {
  return useContext(I18nContext).t;
}

export function LanguageSwitcher({ className = "", tone = "text-forest/60" }: { className?: string; tone?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`flex shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] ${className}`} role="group" aria-label={t("Language")}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="opacity-40">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`min-h-8 min-w-8 transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${lang === l ? "text-gold" : tone}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}


export function useLocalizedProduct<T extends { slug: string; tagline: string; summary: string }>(p: T): T {
  const { lang } = useI18n();
  const tr = lang === "en" ? undefined : PRODUCT_TR[p.slug];
  return tr ? { ...p, tagline: tr.tagline[lang as "sq" | "mk"], summary: tr.summary[lang as "sq" | "mk"] } : p;
}

export function localizeProduct<T extends { slug: string; tagline: string; summary: string }>(p: T, lang: Lang): T {
  const tr = lang === "en" ? undefined : PRODUCT_TR[p.slug];
  return tr ? { ...p, tagline: tr.tagline[lang as "sq" | "mk"], summary: tr.summary[lang as "sq" | "mk"] } : p;
}

export function localizePost<T extends { slug: string }>(p: T, lang: Lang): T {
  const tr = lang === "en" ? undefined : POST_TR[p.slug]?.[lang as "sq" | "mk"];
  return tr ? { ...p, ...tr } : p;
}

/** Swaps the document title/description to the chosen language after each navigation. */
export function useLocalizedHead(pathname: string) {
  const { lang } = useI18n();
  useEffect(() => {
    const id = window.setTimeout(() => {
      const desc = document.querySelector('meta[name="description"]');
      const root = document.documentElement;
      // Remember the English values so switching back restores them.
      if (root.dataset.enPath !== pathname || lang === "en") {
        if (lang === "en" && root.dataset.enPath === pathname && root.dataset.enTitle) {
          document.title = root.dataset.enTitle;
          if (desc && root.dataset.enDesc) desc.setAttribute("content", root.dataset.enDesc);
          return;
        }
        root.dataset.enPath = pathname;
        root.dataset.enTitle = document.title;
        root.dataset.enDesc = desc?.getAttribute("content") ?? "";
      }
      if (lang === "en") return;
      const l = lang as "sq" | "mk";
      let meta = META_TR[pathname.replace(/\/$/, "") || "/"]?.[l];
      const prod = pathname.match(/^\/products\/([^/]+)/);
      const post = pathname.match(/^\/blog\/([^/]+)/);
      if (prod && PRODUCT_TR[prod[1]]) {
        const name = document.querySelector("h1")?.textContent ?? "";
        const suffix = l === "sq" ? "Furnizuar dhe aplikuar nga Casa D'Arte" : "Набавено и нанесено од Casa D'Arte";
        meta = { title: `${name} — ${suffix}`, description: PRODUCT_TR[prod[1]].summary[l] };
      } else if (post && POST_TR[post[1]]) {
        const tr = POST_TR[post[1]][l];
        meta = { title: `${tr.title} — Casa D'Arte`, description: tr.excerpt };
      }
      if (!meta) return;
      document.title = meta.title;
      desc?.setAttribute("content", meta.description);
    }, 60);
    return () => window.clearTimeout(id);
  }, [lang, pathname]);
}
