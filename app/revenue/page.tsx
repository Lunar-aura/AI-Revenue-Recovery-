import { DashboardShell } from "@/components/layout/dashboard-shell";
import { createServerClient } from "@/lib/supabase/server";
import { getRevenuePageData } from "@/app/actions";
import { RevenueCard } from "@/components/revenue/revenue-card";
import { RevenueTrendChart } from "@/components/revenue/revenue-trend-chart";
import { RevenueBreakdownCard } from "@/components/revenue/revenue-breakdown-card";
import { TopProductsTable } from "@/components/revenue/top-products-table";
import { RevenueLeaksCard } from "@/components/revenue/revenue-leaks-card";
import { AIRecommendationCard } from "@/components/revenue/ai-recommendation-card";
import { ForecastCard } from "@/components/revenue/forecast-card";
import { TimelineCard } from "@/components/revenue/timeline-card";
import { EmptyStateCard } from "@/components/revenue/empty-state-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowDownToLine, RefreshCw, CircleDollarSign, TrendingUp, ShoppingBag, Zap } from "lucide-react";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export default async function RevenuePage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: stores } = await supabase
    .from('stores')
    .select('id')
    .eq('owner_id', user?.id ?? '');

  const storeIds = (stores ?? []).map((s) => s.id);
  const data = await getRevenuePageData(storeIds);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const cards = [
    {
      title: "Total Revenue",
      value: `$${data.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: data.revenueGrowth !== null ? `${data.revenueGrowth >= 0 ? '+' : ''}${data.revenueGrowth}%` : 'No prior period',
      changeType: (data.revenueGrowth ?? 0) >= 0 ? 'positive' as const : 'negative' as const,
      icon: CircleDollarSign,
      comparison: "vs previous 30 days",
    },
    {
      title: "Net Revenue",
      value: `$${data.netRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: data.totalRevenue > 0 ? `${Math.round((data.netRevenue / data.totalRevenue) * 100)}% margin` : 'No revenue',
      changeType: 'positive' as const,
      icon: TrendingUp,
      comparison: "after refunds",
    },
    {
      title: "Average Order Value",
      value: `$${data.averageOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: data.averageOrderValue > 0 ? 'Per order' : 'No orders',
      changeType: 'positive' as const,
      icon: ShoppingBag,
      comparison: "per order",
    },
    {
      title: "Revenue Growth",
      value: data.revenueGrowth !== null ? `${data.revenueGrowth >= 0 ? '+' : ''}${data.revenueGrowth}%` : '0%',
      change: data.revenueGrowth !== null && data.revenueGrowth < 0 ? 'Declining' : 'Growing',
      changeType: (data.revenueGrowth ?? 0) >= 0 ? 'positive' as const : 'negative' as const,
      icon: Zap,
      comparison: "30-day pace",
    },
  ];

  const breakdownItems = data.topProducts.slice(0, 3).map((p) => ({
    label: p.name,
    value: `$${p.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    percent: data.totalRevenue > 0 ? `${Math.round((p.revenue / data.totalRevenue) * 100)}%` : '0%',
    growth: '+0%',
  }));

  const productRows = data.topProducts.map((p) => ({
    name: p.name,
    units: String(p.units),
    revenue: `$${p.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    conversion: '0%',
    growth: '+0%',
    action: 'Review',
  }));

  const aiRecommendation = data.leaks.length > 0
    ? {
        title: 'Revenue leaks detected',
        description: data.leaks.map((l) => l.description).join(' '),
        estimatedLoss: data.leaks.reduce((sum, l) => sum + parseFloat(l.loss.replace(/[^0-9.]/g, '')), 0) > 0 ? `$${data.leaks.reduce((sum, l) => sum + parseFloat(l.loss.replace(/[^0-9.]/g, '')), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo` : '$0',
        action: 'Investigate and resolve at-risk orders',
      }
    : {
        title: 'Revenue is stable',
        description: 'No failed payments, refunds, or stale pending orders detected right now. Keep monitoring to protect this momentum.',
        estimatedLoss: '$0',
        action: 'Continue monitoring',
      };

  const expectedRevenue = data.trend.length >= 2 ? `$${Math.round(data.trend[data.trend.length - 1] * 1.05 * 100) / 100}` : '$0';
  const forecastGrowth = data.trend.length >= 2 ? '+5%' : '0%';
  const forecastConfidence = data.trend.length >= 2 ? '75%' : 'Low';

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
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Revenue intelligence</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Revenue Overview</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Monitor revenue performance, identify growth opportunities, and recover lost sales with clarity.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Last 30 days</Button>
              <Button variant="secondary">
                <ArrowDownToLine className="h-4 w-4" />
                Export report
              </Button>
              <Button variant="primary">
                <RefreshCw className="h-4 w-4" />
                Refresh data
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <RevenueCard key={card.title} {...card} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <RevenueTrendChart activeRange="Monthly" points={data.trend} />
          <ForecastCard expectedRevenue={expectedRevenue} growth={forecastGrowth} confidence={forecastConfidence} />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <EmptyStateCard title="No sales channel data" description="Sales channel attribution is not available yet. Connect channel tracking to see this breakdown." />
          <RevenueBreakdownCard title="Products" subtitle="Top categories contributing to growth." items={breakdownItems} />
          <EmptyStateCard title="No country data" description="Geographic breakdown is not available yet. Add shipping regions to see this breakdown." />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <TopProductsTable products={productRows} />
          <RevenueLeaksCard items={data.leaks} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <AIRecommendationCard title={aiRecommendation.title} description={aiRecommendation.description} estimatedLoss={aiRecommendation.estimatedLoss} action={aiRecommendation.action} />
          <TimelineCard items={data.timeline} />
        </section>

        {data.totalRevenue === 0 && (
          <section className="grid gap-6 lg:grid-cols-2">
            <EmptyStateCard title="No revenue data" description="Once your store is connected and orders are placed, this space will surface live revenue signals and trends." />
            <EmptyStateCard title="No AI insights" description="AI-generated recommendations will appear here when new opportunities or risks are detected." />
          </section>
        )}

        {data.totalRevenue > 0 && (
          <section className="grid gap-6 lg:grid-cols-2">
            <EmptyStateCard title="No additional insights" description="More revenue insights will appear as your store data grows." />
            <EmptyStateCard title="No AI insights" description="AI-generated recommendations will appear here when new opportunities or risks are detected." />
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
