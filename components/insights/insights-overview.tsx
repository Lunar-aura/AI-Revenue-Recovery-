"use client";

import { DollarSign, Package, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type OverviewData = {
  totalRevenue: number;
  totalOrders: number;
  atRiskCustomers: number;
  recoverableRevenue: number;
  storesCount: number;
  recentOrders: Array<{
    id: string;
    total: number;
    status: string;
    payment_status: string;
    created_at: string;
  }>;
  topProducts: Array<{
    productId: string;
    quantity: number;
    revenue: number;
  }>;
};

type InsightsOverviewProps = {
  data?: OverviewData | null;
  loading?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function InsightsOverview({ data, loading }: InsightsOverviewProps) {
  if (loading) {
    return (
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-8 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-3 w-16 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </section>
    );
  }

  if (!data) {
    return (
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2 xl:col-span-4">
          <div className="rounded-[20px] border border-slate-200 bg-white p-12 text-center">
            <p className="text-base font-semibold text-slate-950">No data available</p>
            <p className="mt-2 text-sm text-slate-500">Create a store and add some orders to see AI insights.</p>
          </div>
        </div>
      </section>
    );
  }

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      change: data.totalOrders > 0 ? `${data.totalOrders} orders` : "No orders yet",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: data.totalOrders.toLocaleString(),
      change: `${data.storesCount} store${data.storesCount === 1 ? "" : "s"}`,
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "At-Risk Customers",
      value: data.atRiskCustomers.toLocaleString(),
      change: data.atRiskCustomers > 0 ? "Needs attention" : "Healthy",
      changeType: data.atRiskCustomers > 0 ? ("negative" as const) : ("positive" as const),
      icon: Users,
    },
    {
      title: "Recoverable Revenue",
      value: formatCurrency(data.recoverableRevenue),
      change: data.recoverableRevenue > 0 ? "Failed/Cancelled" : "No issues",
      changeType: data.recoverableRevenue > 0 ? ("negative" as const) : ("positive" as const),
      icon: TrendingUp,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{card.title}</p>
              <div className="rounded-full bg-violet-50 p-2 text-violet-600">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{card.value}</p>
            <div className="mt-2">
              <Badge tone={card.changeType === "positive" ? "emerald" : "rose"} className="text-[10px]">
                {card.change}
              </Badge>
            </div>
          </div>
        );
      })}
    </section>
  );
}
