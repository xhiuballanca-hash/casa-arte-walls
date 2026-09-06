import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  BarChart3,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminShell,
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/quotations", label: "Quotations", icon: FileText },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function AdminShell() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const newCount = useQuery({
    queryKey: ["leads", "new-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new");
      if (error) throw error;
      return count ?? 0;
    },
    refetchInterval: 60_000,
  });

  const displayName = (user?.user_metadata?.full_name as string | undefined) || user?.email || "";

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-7 pb-6 border-b border-beige/10">
        <Link to="/admin" className="font-serif text-xl font-bold tracking-tight text-beige">
          CASA D'ARTE
        </Link>
        <p className="eyebrow text-gold mt-2">Studio workspace</p>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {nav.map((item) => {
          const active = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors",
                active ? "bg-beige/10 text-beige" : "text-beige/60 hover:text-beige hover:bg-beige/5",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="flex-1">{item.label}</span>
              {item.to === "/admin/leads" && (newCount.data ?? 0) > 0 && (
                <span className="bg-gold text-forest text-[10px] font-semibold px-1.5 py-0.5 leading-none">
                  {newCount.data}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-5 border-t border-beige/10 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-beige/50 hover:text-gold transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
          View website
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-beige truncate">{displayName}</p>
            {displayName !== user?.email && <p className="text-[11px] text-beige/45 truncate">{user?.email}</p>}
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            aria-label="Sign out"
            className="text-beige/50 hover:text-gold transition-colors p-1.5"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream text-forest lg:grid lg:grid-cols-[248px_1fr]">
      <aside className="hidden lg:block bg-forest sticky top-0 h-screen overflow-y-auto">{sidebar}</aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-forest px-5 py-4 text-beige">
        <Link to="/admin" className="font-serif text-lg font-bold tracking-tight">
          CASA D'ARTE
        </Link>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="p-1.5"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-forest text-beige pt-16 overflow-y-auto">{sidebar}</div>
      )}

      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
