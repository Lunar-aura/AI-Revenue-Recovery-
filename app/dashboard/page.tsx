import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { RevenueProblemsCard } from "@/components/dashboard/revenue-problems-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { recentActivity, recommendation, revenueProblems, stats } from "@/lib/dashboard-data";
import { ArrowRight, BadgeAlert, CircleOff, Sparkles } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
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
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
                <Sparkles className="h-4 w-4" />
                AI Revenue Recovery
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Here's what's happening in your business today. Focus on the issues putting revenue at risk and the best next steps to recover it.
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700">
              Review priorities
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <RevenueProblemsCard problems={revenueProblems} />
          <RecommendationCard {...recommendation} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ActivityTimeline items={recentActivity} />
          <div className="space-y-6">
            <EmptyState
              title="No Problems"
              description="Your store is healthy for now. New issues will appear here as they are detected."
              icon={BadgeAlert}
            />
            <EmptyState
              title="No Recommendations"
              description="AI suggestions will appear here when a meaningful opportunity is identified."
              icon={Sparkles}
            />
            <EmptyState
              title="No Activity"
              description="Activity will be tracked here as your store is monitored over time."
              icon={CircleOff}
            />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}