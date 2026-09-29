import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { STRINGS } from "./translations";

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
  const { lang, setLang } = useI18n();
  return (
    <div className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium ${className}`} aria-label="Language">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="opacity-40">|</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`transition-colors hover:text-gold ${lang === l ? "text-gold" : tone}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
