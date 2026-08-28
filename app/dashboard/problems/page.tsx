import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { BadgeAlert, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";

export default async function ProblemsPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <DashboardShell
      user={{
        name: displayName,
        email: user?.email,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Problem detection</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Problems</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Monitor revenue risks, friction points, and opportunities that need your attention.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Last 30 days</Button>
              <Button variant="primary">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Active"
            title="Revenue problems"
            description="Issues currently putting revenue at risk."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <EmptyState
              title="No active problems"
              description="Your store is healthy for now. New issues will appear here as they are detected."
              icon={BadgeAlert}
            />
            <EmptyState
              title="No at-risk signals"
              description="All monitored areas look healthy. Risk signals will appear here when thresholds are crossed."
              icon={ShieldCheck}
            />
            <EmptyState
              title="No AI insights"
              description="AI-generated problem insights will appear here when new opportunities or risks are detected."
              icon={Sparkles}
            />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}