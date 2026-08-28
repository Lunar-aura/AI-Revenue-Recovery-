"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { SearchInput } from "@/components/ui/search-input";
import { navigationItems } from "@/lib/dashboard-data";
import { createClient } from "@/lib/supabase";
import { logout } from "@/app/actions";
import { useEffect } from "react";

type DashboardShellProps = {
  children: React.ReactNode;
  user?: { name?: string; email?: string };
};

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authUser, setAuthUser] = useState<{ name: string; email: string } | null>(null);

  // Fallback: if no user info was passed in (client-only pages),
  // fetch the signed-in user's name/email from Supabase Auth so
  // the header never shows the generic "User / Signed in".
  const userNameProp = user?.name;
  useEffect(() => {
    if (userNameProp) return;
    let cancelled = false;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      const u = data.user;
      if (!u) return;
      setAuthUser({
        name: u.user_metadata?.full_name || u.email?.split("@")[0] || "User",
        email: u.email ?? "",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [userNameProp]);

  const displayName = user?.name || authUser?.name || "User";
  const displayEmail = user?.email || authUser?.email || "Signed in";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="rounded-[16px] bg-violet-600 p-2.5 text-white shadow-[0_12px_30px_-16px_rgba(124,92,252,0.6)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">AI Revenue Recovery</p>
              <p className="text-sm text-slate-500">Revenue intelligence</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-violet-600 text-white shadow-[0_10px_24px_-16px_rgba(124,92,252,0.75)]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setMobileOpen(false)} />
        ) : null}

        <div className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-5 transition-transform duration-200 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-[16px] bg-violet-600 p-2.5 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">AI Revenue Recovery</p>
                <p className="text-sm text-slate-500">Revenue intelligence</p>
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-8 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-violet-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  className="rounded-full border border-slate-200 p-2 text-slate-600 lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-sm text-slate-500">Workspace</p>
                  <p className="text-lg font-semibold tracking-tight text-slate-950">Revenue recovery overview</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SearchInput />
                <button className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100">
                  <Bell className="h-5 w-5" />
                </button>
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </form>
                <button className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
                  <Avatar name={displayName} initials={initials} tone="violet" />
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-slate-900">{displayName}</p>
                    <p className="text-xs text-slate-500">{displayEmail}</p>
                  </div>
                  <ChevronDown className="mr-1 h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
