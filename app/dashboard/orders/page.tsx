"use client";

import { useState } from "react";
import { OrderStatCard } from "@/components/orders/order-stat-card";
import { OrderStatusCard } from "@/components/orders/order-status-card";
import { OrderTable } from "@/components/orders/order-table";
import { OrderDetailsDrawer } from "@/components/orders/order-details-drawer";
import { OrderAnalyticsChart } from "@/components/orders/order-analytics-chart";
import { OrderAlertCard } from "@/components/orders/order-alert-card";
import { AIInsightCard } from "@/components/orders/ai-insight-card";
import { ActivityTimeline } from "@/components/orders/activity-timeline";
import { CustomerInsightCard } from "@/components/orders/customer-insight-card";
import { LoadingSkeleton } from "@/components/orders/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import {
  orderStats,
  orderStatuses,
  orderRows,
  orderAlerts,
  aiInsight,
  recentOrderActivity,
  customerInsights,
  orderDetails,
  orderDetail,
} from "@/lib/orders-data";
import {
  ArrowDownToLine,
  BadgeAlert,
  BrainCircuit,
  RefreshCw,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

export default function OrdersPage() {
  const [activeOrder, setActiveOrder] = useState<string | null>(null);

  const resolvedDetail = activeOrder ? orderDetails[activeOrder] ?? orderDetail : null;

  return (
    <DashboardShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Order intelligence</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Orders</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Monitor customer orders, fulfillment progress, and identify issues before they affect revenue.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">
                <Wallet className="h-4 w-4" />
                Last 30 days
              </Button>
              <Button variant="secondary">
                <ArrowDownToLine className="h-4 w-4" />
                Export orders
              </Button>
              <Button variant="primary">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {orderStats.map((stat) => (
            <OrderStatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {orderStatuses.map((status) => (
            <OrderStatusCard key={status.label} {...status} />
          ))}
        </section>

        <section>
          <OrderAnalyticsChart range="Monthly" />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="sm:col-span-2 xl:col-span-2">
            <OrderAlertCard
              title={orderAlerts[0].title}
              description={orderAlerts[0].description}
              impact={orderAlerts[0].impact}
              priority={orderAlerts[0].priority}
            />
          </div>
          <div className="sm:col-span-2 xl:col-span-2">
            <OrderAlertCard
              title={orderAlerts[1].title}
              description={orderAlerts[1].description}
              impact={orderAlerts[1].impact}
              priority={orderAlerts[1].priority}
            />
          </div>
          <div className="xl:col-span-2">
            <OrderAlertCard
              title={orderAlerts[2].title}
              description={orderAlerts[2].description}
              impact={orderAlerts[2].impact}
              priority={orderAlerts[2].priority}
            />
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
          <AIInsightCard
            title={aiInsight.title}
            description={aiInsight.description}
            impact={aiInsight.impact}
            actions={aiInsight.actions}
          />
        </section>

        <section>
          <OrderTable rows={orderRows} onViewOrder={(row) => setActiveOrder(row.id)} />
        </section>

        <OrderDetailsDrawer
          open={activeOrder !== null}
          order={resolvedDetail}
          onClose={() => setActiveOrder(null)}
        />

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ActivityTimeline items={recentOrderActivity} />
          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">Customer insights</h2>
              <p className="mt-1 text-sm text-slate-500">Who is buying and how often they return.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {customerInsights.map((insight) => (
                  <CustomerInsightCard key={insight.label} {...insight} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <EmptyState
                title="No order problems"
                description="All monitored orders are healthy. New issues will appear here as they are detected."
                icon={BadgeAlert}
              />
              <EmptyState
                title="No AI insights"
                description="AI-generated order recommendations will appear here when new opportunities or risks are detected."
                icon={BrainCircuit}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <EmptyState
            title="No cancelled orders"
            description="No orders have been cancelled in the selected period."
            icon={XCircle}
          />
          <EmptyState
            title="No activity to replay"
            description="Once orders are connected, historical events will render here."
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
