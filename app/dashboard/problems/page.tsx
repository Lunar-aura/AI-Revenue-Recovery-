import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { BadgeAlert, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import { getDashboardData } from "@/app/actions";
import { RevenueProblemsCard } from "@/components/dashboard/revenue-problems-card";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";

export default async function ProblemsPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const overview = await getDashboardData();

  const recentActivity = overview.recentOrders.map((order) => ({
    title: order.customerName ?? "New order",
    detail: `${order.storeName ? `${order.storeName} · ` : ""}$${order.total.toLocaleString()} · ${order.status}`,
    time: new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

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
            {overview.revenueProblems.length > 0 ? (
              overview.revenueProblems.map((problem) => (
                <div key={problem.title} className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)]">
                  <div className="flex items-center gap-2">
                    <Badge tone={problem.severity === 'High' ? 'rose' : problem.severity === 'Medium' ? 'amber' : 'emerald'}>{problem.severity}</Badge>
                    <h3 className="font-semibold text-slate-900">{problem.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{problem.description}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{problem.impact}</p>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 xl:col-span-3">
                <EmptyState
                  title="No active problems"
                  description="Your store is healthy for now. New issues will appear here as they are detected."
                  icon={BadgeAlert}
                />
              </div>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">Recent orders</h2>
            <p className="mt-1 text-sm text-slate-500">Latest orders across your stores.</p>
            <div className="mt-6">
              <ActivityTimeline items={recentActivity} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">AI recommendation</h2>
              <p className="mt-1 text-sm text-slate-500">Suggested next steps based on your data.</p>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-900">{overview.recommendation.title}</p>
                <p className="mt-1 text-sm text-slate-600">{overview.recommendation.description}</p>
                <p className="mt-2 text-sm font-semibold text-violet-700">{overview.recommendation.impact}</p>
              </div>
            </div>
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