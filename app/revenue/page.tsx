import { DashboardShell } from "@/components/layout/dashboard-shell";
import { RevenueCard } from "@/components/revenue/revenue-card";
import { RevenueTrendChart } from "@/components/revenue/revenue-trend-chart";
import { RevenueBreakdownCard } from "@/components/revenue/revenue-breakdown-card";
import { TopProductsTable } from "@/components/revenue/top-products-table";
import { RevenueLeaksCard } from "@/components/revenue/revenue-leaks-card";
import { AIRecommendationCard } from "@/components/revenue/ai-recommendation-card";
import { ForecastCard } from "@/components/revenue/forecast-card";
import { TimelineCard } from "@/components/revenue/timeline-card";
import { EmptyStateCard } from "@/components/revenue/empty-state-card";
import { LoadingSkeleton } from "@/components/revenue/loading-skeleton";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowDownToLine, ArrowUpRight, CircleDollarSign, RefreshCw, TrendingUp, ShoppingBag, Users, Zap } from "lucide-react";

const cards = [
  {
    title: "Total Revenue",
    value: "$284.2K",
    change: "+18.4%",
    changeType: "positive" as const,
    icon: CircleDollarSign,
    comparison: "vs previous period",
  },
  {
    title: "Net Revenue",
    value: "$241.8K",
    change: "+12.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
    comparison: "+6.2% margin",
  },
  {
    title: "Average Order Value",
    value: "$128.40",
    change: "+4.8%",
    changeType: "positive" as const,
    icon: ShoppingBag,
    comparison: "per order",
  },
  {
    title: "Revenue Growth",
    value: "14.2%",
    change: "-1.3%",
    changeType: "negative" as const,
    icon: Zap,
    comparison: "quarterly pace",
  },
];

const breakdownItems = [
  { label: "Organic Search", value: "$92.1K", percent: "32%", growth: "+8.2%" },
  { label: "Paid Social", value: "$68.4K", percent: "24%", growth: "+3.9%" },
  { label: "Email", value: "$54.2K", percent: "19%", growth: "+5.6%" },
  { label: "Direct", value: "$41.5K", percent: "15%", growth: "+2.4%" },
];

const productRows = [
  { name: "Aurora Jacket", units: "184", revenue: "$24.2K", conversion: "4.8%", growth: "+12%", action: "Boost" },
  { name: "Lumen Backpack", units: "156", revenue: "$18.6K", conversion: "3.9%", growth: "+9%", action: "Promote" },
  { name: "North Bottle", units: "132", revenue: "$9.4K", conversion: "2.7%", growth: "+6%", action: "Review" },
];

const leakItems = [
  { title: "Checkout abandonment", description: "Abandonment remains high on mobile checkout flows.", loss: "$3,240/mo", severity: "High" as const },
  { title: "Refund loss", description: "A small set of products is generating unnecessary refund activity.", loss: "$1,860/mo", severity: "Medium" as const },
  { title: "Discount overuse", description: "Discount depth is reducing effective revenue on repeat purchases.", loss: "$1,120/mo", severity: "Low" as const },
];

const timelineItems = [
  { title: "Revenue increased after campaign", detail: "The launch campaign lifted order value for high-intent users.", time: "3h ago" },
  { title: "Refund spike detected", detail: "A few SKUs are showing elevated return rates after shipping delays.", time: "8h ago" },
  { title: "High-value customer purchase", detail: "A return customer placed a premium bundle order this afternoon.", time: "1d ago" },
];

export default function RevenuePage() {
  return (
    <DashboardShell>
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
          <RevenueTrendChart activeRange="Monthly" />
          <ForecastCard expectedRevenue="$322K" growth="+11.4%" confidence="82%" />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <RevenueBreakdownCard title="Sales channel" subtitle="Where revenue is currently arriving from." items={breakdownItems} />
          <RevenueBreakdownCard title="Products" subtitle="Top categories contributing to growth." items={[{ label: "Apparel", value: "$91.3K", percent: "44%", growth: "+9.1%" }, { label: "Accessories", value: "$61.2K", percent: "26%", growth: "+5.3%" }, { label: "Home", value: "$37.6K", percent: "16%", growth: "+3.4%" }]} />
          <RevenueBreakdownCard title="Countries" subtitle="Geographic revenue mix." items={[{ label: "United States", value: "$132K", percent: "48%", growth: "+7.6%" }, { label: "United Kingdom", value: "$58K", percent: "21%", growth: "+4.2%" }, { label: "Canada", value: "$41K", percent: "15%", growth: "+3.1%" }]} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <TopProductsTable products={productRows} />
          <RevenueLeaksCard items={leakItems} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <AIRecommendationCard title="Mobile checkout friction is costing revenue" description="AI detected that mobile checkout abandonment increased by 24% during the last 14 days. The issue appears most severe on the payment review step and is likely reducing conversion during late-stage purchase behavior." estimatedLoss="$3,240/month" action="Improve mobile checkout flow" />
          <TimelineCard items={timelineItems} />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <EmptyStateCard title="No revenue data" description="Once your store is connected, this space will surface live revenue signals and trends." />
          <EmptyStateCard title="No AI insights" description="AI-generated recommendations will appear here when new opportunities or risks are detected." />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </section>
      </div>
    </DashboardShell>
  );
}
