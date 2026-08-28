"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { formatPrice } from "@/lib/store-data";
import type { OrderRow, OrderDetail } from "@/lib/orders-data";
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
  orderAlerts,
  aiInsight,
  recentOrderActivity,
  customerInsights,
} from "@/lib/orders-data";
import {
  ArrowDownToLine,
  BadgeAlert,
  BrainCircuit,
  Inbox,
  RefreshCw,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

// Raw row shape returned by the joined Supabase query in loadOrders().
type SupabaseOrder = {
  id: string;
  status: string;
  payment_status: string;
  subtotal: number | string;
  shipping: number | string;
  total: number | string;
  created_at: string;
  customer: {
    name: string;
    email: string;
    address: string | null;
    city: string | null;
    postal_code: string | null;
  } | null;
  items: {
    id: string;
    quantity: number;
    unit_price: number | string;
    total: number | string;
    product: { name: string } | null;
  }[] | null;
};

function mapPaymentStatus(value: string): OrderRow["payment"] {
  switch ((value ?? "").toLowerCase()) {
    case "paid":
      return "Paid";
    case "failed":
      return "Failed";
    case "refunded":
      return "Refunded";
    default:
      return "Pending";
  }
}

function mapFulfillmentStatus(value: string): OrderRow["fulfillment"] {
  switch ((value ?? "").toLowerCase()) {
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    case "refunded":
      return "Refunded";
    default:
      return "Pending";
  }
}

export default function OrdersPage() {
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const supabase = createClient();

      // Resolve the authenticated user. stores.owner_id references
      // auth.users(id), so ownership must always be checked against
      // the auth user id (never the email).
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Failed to resolve authenticated user:", authError);
        setOrders([]);
        setLoadError("You must be signed in to view orders.");
        return;
      }

      // Fetch every store owned by this user (uuid match on owner_id).
      const { data: storesData, error: storesError } = await supabase
        .from("stores")
        .select("id")
        .eq("owner_id", user.id);

      if (storesError) {
        console.error("Failed to fetch stores from Supabase:", storesError);
        setOrders([]);
        setLoadError("Could not load your stores. Please try again.");
        return;
      }

      const storeIds = (storesData ?? []).map((s: Record<string, unknown>) => s.id as string);

      // No stores yet -> there can be no orders either. Show empty state.
      if (storeIds.length === 0) {
        setOrders([]);
        return;
      }

      // RLS (orders_select_owner) additionally scopes these rows to the
      // authenticated owner, so only their own stores' orders are returned.
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          `id,
           status,
           payment_status,
           subtotal,
           shipping,
           total,
           created_at,
           customer:customers(name, email, address, city, postal_code),
           items:order_items(id, quantity, unit_price, total, product:products(name))`,
        )
        .in("store_id", storeIds)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Failed to fetch orders from Supabase:", ordersError);
        setOrders([]);
        setLoadError("Could not load orders. Please try again.");
        return;
      }

      setOrders((ordersData ?? []) as unknown as SupabaseOrder[]);
    } catch (err) {
      console.error("Error loading orders:", err);
      setOrders([]);
      setLoadError("Something went wrong while loading orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const tableRows: OrderRow[] = orders.map((row) => ({
    id: row.id,
    customer: row.customer?.name ?? "Unknown customer",
    products: `${row.items?.length ?? 0} item${(row.items?.length ?? 0) === 1 ? "" : "s"}`,
    amount: formatPrice(row.total ?? 0),
    payment: mapPaymentStatus(row.payment_status ?? "pending"),
    fulfillment: mapFulfillmentStatus(row.status ?? "pending"),
    date: new Date(row.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: ((row.status ?? "pending").toLowerCase()) as OrderRow["status"],
  }));

  function getOrderDetail(orderId: string): OrderDetail | null {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return null;

    const addressParts = [
      order.customer?.address,
      order.customer?.city,
      order.customer?.postal_code,
    ].filter(Boolean);

    return {
      id: order.id,
      customer: order.customer?.name ?? "Unknown customer",
      email: order.customer?.email ?? "—",
      products: (order.items ?? []).map(
        (item) => `${item.product?.name ?? "Product"} × ${item.quantity}`,
      ),
      shipping:
        addressParts.length > 0 ? addressParts.join(", ") : "No shipping address on file",
      payment: `${(order.payment_status ?? "pending").charAt(0).toUpperCase()}${(order.payment_status ?? "pending").slice(1)} — ${formatPrice(order.total ?? 0)}`,
      timeline: [
        {
          event: "Order placed",
          time: new Date(order.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ],
      status: `${(order.status ?? "pending").charAt(0).toUpperCase()}${(order.status ?? "pending").slice(1)}`,
      notes: [],
    };
  }

  const resolvedDetail = activeOrderId ? getOrderDetail(activeOrderId) : null;

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
              <Button variant="primary" onClick={() => loadOrders()} disabled={loading}>
                <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
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
          {loading ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          ) : loadError ? (
            <EmptyState
              title="Could not load orders"
              description={loadError}
              icon={BadgeAlert}
            />
          ) : tableRows.length === 0 ? (
            <EmptyState
              title="No orders yet"
              description="You have no orders across any of your stores yet. New customer orders will appear here automatically."
              icon={Inbox}
            />
          ) : (
            <OrderTable
              rows={tableRows}
              totalCount={tableRows.length}
              onViewOrder={(row) => setActiveOrderId(row.id)}
            />
          )}
        </section>

        <OrderDetailsDrawer
          open={activeOrderId !== null}
          order={resolvedDetail}
          onClose={() => setActiveOrderId(null)}
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
            description="Once orders are connected, historical events will appear here."
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
