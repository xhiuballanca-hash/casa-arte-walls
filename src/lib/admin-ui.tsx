import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function AdminPage({
  eyebrow,
  title,
  description,
  actions,
  children,
  wide,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 py-8 md:px-10 md:py-12", wide ? "max-w-[1600px]" : "max-w-[1240px]")}>
      <header className="mb-8 md:mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          {eyebrow && <p className="eyebrow text-gold mb-3">{eyebrow}</p>}
          <h1 className="font-serif text-3xl md:text-[2.6rem] leading-[1.1] text-forest">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-sm text-forest/60 leading-relaxed">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-3 shrink-0">{actions}</div>}
      </header>
      {children}
    </div>
  );
}

export function Panel({
  title,
  eyebrow,
  actions,
  children,
  className,
  padded = true,
}: {
  title?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("bg-card border border-forest/10", className)}>
      {(title || actions || eyebrow) && (
        <div className="flex items-center justify-between gap-4 border-b border-forest/10 px-5 py-4 md:px-6">
          <div>
            {eyebrow && <p className="eyebrow text-forest/45 mb-1">{eyebrow}</p>}
            {title && <h2 className="font-serif text-xl text-forest">{title}</h2>}
          </div>
          {actions}
        </div>
      )}
      <div className={cn(padded && "p-5 md:p-6")}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "gold" | "forest";
}) {
  return (
    <div
      className={cn(
        "border px-5 py-5 md:px-6 md:py-6",
        tone === "forest"
          ? "bg-forest text-beige border-forest"
          : tone === "gold"
            ? "bg-gold/10 border-gold/30 text-forest"
            : "bg-card border-forest/10 text-forest",
      )}
    >
      <p className={cn("eyebrow mb-3", tone === "forest" ? "text-gold" : "text-forest/45")}>{label}</p>
      <p className="font-serif text-3xl md:text-4xl leading-none">{value}</p>
      {hint && (
        <p className={cn("mt-3 text-xs", tone === "forest" ? "text-beige/60" : "text-forest/50")}>{hint}</p>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="font-serif text-2xl text-forest mb-2">{title}</p>
      {description && <p className="text-sm text-forest/55 max-w-md mx-auto">{description}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function LoadingRows({ rows = 6 }: { rows?: number }) {
  return (
    <div className="divide-y divide-forest/10">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-6 px-6 py-4">
          <div className="h-3 w-40 bg-forest/10 animate-pulse" />
          <div className="h-3 w-24 bg-forest/10 animate-pulse" />
          <div className="ml-auto h-3 w-16 bg-forest/10 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chips                                                               */
/* ------------------------------------------------------------------ */

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] font-medium whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Form controls                                                       */
/* ------------------------------------------------------------------ */

export const fieldInput =
  "w-full bg-transparent border border-forest/20 px-3 py-2.5 text-sm text-forest outline-none focus:border-gold transition-colors placeholder:text-forest/30 disabled:opacity-50";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow text-forest/55 mb-2 block">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-forest/45">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldInput, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldInput, "min-h-[100px] resize-y", props.className)} />;
}

export function SelectInput({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative block">
      <select {...props} className={cn(fieldInput, "appearance-none pr-9 cursor-pointer bg-card", className)}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest/50" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons (admin-scale, denser than public CTAs)                      */
/* ------------------------------------------------------------------ */

export const adminBtn = {
  primary:
    "inline-flex items-center justify-center gap-2 bg-forest text-beige px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold hover:text-forest transition-colors disabled:opacity-50 disabled:pointer-events-none",
  outline:
    "inline-flex items-center justify-center gap-2 border border-forest/30 text-forest px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-forest hover:bg-forest hover:text-beige transition-colors disabled:opacity-50 disabled:pointer-events-none",
  ghost:
    "inline-flex items-center justify-center gap-2 text-forest/70 px-3 py-2 text-[11px] uppercase tracking-[0.2em] font-medium hover:text-forest transition-colors disabled:opacity-50 disabled:pointer-events-none",
  danger:
    "inline-flex items-center justify-center gap-2 border border-destructive/40 text-destructive px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none",
};

/* ------------------------------------------------------------------ */
/* Definition list                                                     */
/* ------------------------------------------------------------------ */

export function DefRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-3 border-b border-forest/10 last:border-b-0 text-sm">
      <dt className="eyebrow text-forest/45 pt-0.5">{label}</dt>
      <dd className="text-forest break-words min-w-0">{children}</dd>
    </div>
  );
}
