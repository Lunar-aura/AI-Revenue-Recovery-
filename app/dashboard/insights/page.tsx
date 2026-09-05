import { DashboardShell } from "@/components/layout/dashboard-shell";
import { InsightsOverview } from "@/components/insights/insights-overview";
import { AIChat } from "@/components/insights/ai-chat";
import { getInsightsOverview } from "@/app/actions";
import { createServerClient } from "@/lib/supabase/server";
import { BrainCircuit, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function InsightsPage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const overview = await getInsightsOverview();

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
                <BrainCircuit className="h-4 w-4" />
                AI Revenue Insights
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                AI Insights
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Understand revenue trends, customer risk, and recovery opportunities powered by your actual store data.
              </p>
            </div>
            <Button variant="secondary">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </section>

        <InsightsOverview data={overview} />

        <AIChat />
      </div>
    </DashboardShell>
  );
}
