"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { CustomerStatCard } from "@/components/customers/customer-stat-card";
import { CustomerSegmentCard } from "@/components/customers/customer-segment-card";
import { CustomerAnalyticsChart } from "@/components/customers/customer-analytics-chart";
import { CustomerTable } from "@/components/customers/customer-table";
import { CustomerProfileDrawer } from "@/components/customers/customer-profile-drawer";
import { HighValueCustomerCard } from "@/components/customers/high-value-customer-card";
import { RiskCustomerCard } from "@/components/customers/risk-customer-card";
import { CustomerAIInsightCard } from "@/components/customers/ai-insight-card";
import { ActivityTimeline } from "@/components/orders/activity-timeline";
import { CustomerInsightCard } from "@/components/orders/customer-insight-card";
import { LoadingSkeleton } from "@/components/orders/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { createClient } from "@/lib/supabase";
import { getCustomersPageData } from "@/app/actions";
import type { CustomerRow } from "@/lib/customers-data";
import {
  ArrowDownToLine,
  BadgeCheck,
  BrainCircuit,
  RefreshCw,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

export default function CustomersPage() {
  const [activeCustomer, setActiveCustomer] = useState<string | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<typeof getCustomersPageData>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");

  useState(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User");
      setUserEmail(user?.email ?? "");
    });
  });

  useState(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user || cancelled) return;
      setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User");
      setUserEmail(user.email ?? "");

      try {
        const { data: storesData } = await supabase
          .from("stores")
          .select("id")
          .eq("owner_id", user.id);

        const storeIds = (storesData ?? []).map((s: Record<string, unknown>) => s.id as string);
        const result = await getCustomersPageData(storeIds);
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load customers");
          setLoading(false);
        }
      }
    });
    return () => {
      cancelled = true;
    };
  });

  const resolvedCustomer = activeCustomer && data ? data.rows.find((r) => r.id === activeCustomer) ?? data.rows[0] : null;

  if (loading) {
    return (
      <DashboardShell>
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
          <div className="h-64 w-full animate-pulse rounded-[24px] bg-slate-200" />
        </div>
      </DashboardShell>
    );
  }

  if (error || !data) {
    return (
      <DashboardShell
        user={{
          name: userName,
          email: userEmail,
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Customer intelligence</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Customers</h1>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Understand customer behavior, identify valuable customers, and discover opportunities to increase customer lifetime value.
                </p>
              </div>
            </div>
          </section>
          <EmptyState
            title="Could not load customers"
            description={error || "Please try again later."}
            icon={BadgeCheck}
          />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      user={{
        name: userName,
        email: userEmail,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Customer intelligence</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Customers</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Understand customer behavior, identify valuable customers, and discover opportunities to increase customer lifetime value.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">
                <Wallet className="h-4 w-4" />
                Last 30 days
              </Button>
              <Button variant="secondary">
                <ArrowDownToLine className="h-4 w-4" />
                Export customers
              </Button>
              <Button variant="primary">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {data.stats.map((stat) => (
            <CustomerStatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section>
          <SectionHeader
            eyebrow="Segments"
            title="Customer segmentation"
            description="How your customer base is grouped by value and behavior."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.segments.map((segment) => (
              <CustomerSegmentCard key={segment.label} {...segment} />
            ))}
          </div>
        </section>

        <section>
          <CustomerAnalyticsChart range="Monthly" />
        </section>

        <section>
          <SectionHeader
            eyebrow="Attention"
            title="Customers at risk"
            description="Valuable customers showing disengagement signals that need immediate outreach."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.riskCustomers.length > 0 ? (
              data.riskCustomers.map((customer) => (
                <RiskCustomerCard key={customer.email} customer={customer} />
              ))
            ) : (
              <div className="sm:col-span-2 xl:col-span-3">
                <EmptyState
                  title="No at-risk customers"
                  description="All monitored customers look healthy. Risk signals will appear here when thresholds are crossed."
                  icon={BadgeCheck}
                />
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
          <CustomerAIInsightCard {...data.aiInsight} />
        </section>

        <section>
          <SectionHeader eyebrow="Revenue" title="High value customers" description="Your top spenders and most loyal buyers." />
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {data.highValueCustomers.length > 0 ? (
              data.highValueCustomers.map((customer) => (
                <HighValueCustomerCard
                  key={customer.email}
                  customer={customer}
                  onView={() => setActiveCustomer(customer.id)}
                />
              ))
            ) : (
              <div className="xl:col-span-2">
                <EmptyState
                  title="No high-value customers yet"
                  description="High-value customers will appear here as your store grows."
                  icon={Users}
                />
              </div>
            )}
          </div>
        </section>

        <section>
          <CustomerTable rows={data.rows as CustomerRow[]} onViewCustomer={(row) => setActiveCustomer(row.id)} />
          <CustomerProfileDrawer
            open={activeCustomer !== null}
            customer={resolvedCustomer as any}
            onClose={() => setActiveCustomer(null)}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ActivityTimeline items={data.activity} />
          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">Customer loyalty</h2>
              <p className="mt-1 text-sm text-slate-500">Retention, segments, and lifetime value signals.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {data.loyaltyInsights.map((insight) => (
                  <CustomerInsightCard key={insight.label} {...insight} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <EmptyState
                title="No at-risk signals"
                description="All monitored customers look healthy. New risk signals will appear here as they are detected."
                icon={BadgeCheck}
              />
              <EmptyState
                title="No AI insights"
                description="AI-generated customer recommendations will appear here when new opportunities or risks are detected."
                icon={BrainCircuit}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <EmptyState
            title="No churned customers"
            description="No customers have churned in the selected period."
            icon={Truck}
          />
          <EmptyState
            title="No activity to replay"
            description="Once customers are connected, historical events will render here."
            icon={Users}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </section>
      </div>
    </DashboardShell>
  );
}
