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
  ArrowDownToLine,
  BadgeAlert,
  BrainCircuit,
  Inbox,
  RefreshCw,
  Users,
  Wallet,
  XCircle,
  ShoppingCart,
  PackageCheck,
  Clock3,
  Ban,
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
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const supabase = createClient();

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

      setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User");
      setUserEmail(user.email ?? "");

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

      if (storeIds.length === 0) {
        setOrders([]);
        return;
      }

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

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'delivered' || o.payment_status === 'paid').length;
  const pendingOrders = orders.filter((o) => o.payment_status === 'pending' || o.status === 'pending').length;
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled' || o.status === 'refunded').length;

  const orderStats = [
    { title: 'Total Orders', value: totalOrders.toLocaleString(), change: totalOrders > 0 ? 'Live count' : 'No orders yet', changeType: 'positive' as const, icon: ShoppingCart, comparison: 'vs previous period', trend: [40, 38, 52, 46, 62, 68, 74] },
    { title: 'Completed Orders', value: completedOrders.toLocaleString(), change: completedOrders > 0 ? 'On track' : 'No completed orders', changeType: 'positive' as const, icon: PackageCheck, comparison: 'fulfilled', trend: [30, 42, 38, 50, 55, 60, 65] },
    { title: 'Pending Orders', value: pendingOrders.toLocaleString(), change: pendingOrders > 0 ? 'Needs attention' : 'No pending orders', changeType: pendingOrders > 0 ? ('negative' as const) : ('positive' as const), icon: Clock3, comparison: 'awaiting action', trend: [20, 25, 30, 28, 22, 18, 15] },
    { title: 'Cancelled Orders', value: cancelledOrders.toLocaleString(), change: cancelledOrders > 0 ? 'Review needed' : 'No cancellations', changeType: cancelledOrders > 0 ? ('negative' as const) : ('positive' as const), icon: Ban, comparison: 'refunded/cancelled', trend: [10, 12, 8, 15, 10, 8, 6] },
  ];

  const statusCounts = new Map<string, number>();
  for (const o of orders) {
    statusCounts.set(o.status, (statusCounts.get(o.status) || 0) + 1);
  }
  const orderStatuses = [
    { label: 'Pending', count: String(statusCounts.get('pending') || 0), tone: 'amber' as const },
    { label: 'Processing', count: String(statusCounts.get('processing') || 0), tone: 'sky' as const },
    { label: 'Shipped', count: String(statusCounts.get('shipped') || 0), tone: 'violet' as const },
    { label: 'Delivered', count: String(statusCounts.get('delivered') || 0), tone: 'emerald' as const },
    { label: 'Cancelled', count: String(statusCounts.get('cancelled') || 0), tone: 'rose' as const },
    { label: 'Refunded', count: String(statusCounts.get('refunded') || 0), tone: 'slate' as const },
  ];

  const failedHighValue = orders.filter((o) => o.payment_status === 'failed' && Number(o.total || 0) > 100);
  const delayedOrders = orders.filter((o) => o.status === 'shipped' && Date.now() - new Date(o.created_at).getTime() > 7 * 24 * 60 * 60 * 1000);
  const refundRequests = orders.filter((o) => o.status === 'refunded' || o.payment_status === 'refunded');

  const orderAlerts = [];
  if (failedHighValue.length > 0) {
    const impact = failedHighValue.reduce((sum, o) => sum + Number(o.total || 0), 0);
    orderAlerts.push({
      title: 'High-value order payment failed',
      description: `${failedHighValue.length} order${failedHighValue.length === 1 ? '' : 's'} with a failed payment and high value. Reach out to these customers to capture the sale.`,
      impact: `$${impact.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} at risk`,
      priority: 'High' as const,
    });
  }
  if (delayedOrders.length > 0) {
    const impact = delayedOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    orderAlerts.push({
      title: 'Shipping delayed',
      description: `${delayedOrders.length} order${delayedOrders.length === 1 ? '' : 's'} in transit for over 7 days. Customer may need an update.`,
      impact: `$${impact.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} at risk`,
      priority: 'Medium' as const,
    });
  }
  if (refundRequests.length > 0) {
    const impact = refundRequests.reduce((sum, o) => sum + Number(o.total || 0), 0);
    orderAlerts.push({
      title: 'Refund requested',
      description: `${refundRequests.length} order${refundRequests.length === 1 ? '' : 's'} have been refunded recently.`,
      impact: `$${impact.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} at risk`,
      priority: 'Medium' as const,
    });
  }

  const aiInsight = {
    title: failedHighValue.length > 0 ? 'Failed payments detected on high-value orders' : 'Orders are processing normally',
    description: failedHighValue.length > 0
      ? `${failedHighValue.length} high-value order${failedHighValue.length === 1 ? '' : 's'} failed payment processing. Recovering these could significantly boost revenue.`
      : 'All monitored orders are healthy. New issues will appear here as they are detected.',
    impact: failedHighValue.length > 0 ? `$${failedHighValue.reduce((sum, o) => sum + Number(o.total || 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0',
    actions: failedHighValue.length > 0
      ? ['Retry failed payments automatically', 'Notify affected customers with a recovery link', 'Review payment gateway configuration', 'Surface a simplified payment flow']
      : ['Continue monitoring order status', 'Review fulfillment metrics weekly', 'Keep customer communication active'],
  };

  const recentOrderActivity = orders.slice(0, 6).map((o) => {
    const customerName = o.customer?.name || 'Unknown customer';
    const flags =
      o.payment_status === 'failed'
        ? ' (payment failed)'
        : o.payment_status === 'pending'
          ? ' (payment pending)'
          : '';
    return {
      title: `Order ${o.id.slice(0, 8)}`,
      detail: `${customerName} · ${formatPrice(Number(o.total || 0))} · ${capitalize(o.status)}${flags}`,
      time: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const uniqueCustomers = new Set(orders.map((o) => (o.customer as unknown as { customer_id?: string } | null)?.customer_id).filter(Boolean));
  const returningCount = orders.filter((o) => {
    const cid = (o.customer as unknown as { customer_id?: string } | null)?.customer_id;
    if (!cid) return false;
    return orders.filter((co) => (co.customer as unknown as { customer_id?: string } | null)?.customer_id === cid).length > 1;
  }).length;

  const customerInsights = [
    { label: 'Total Customers', value: String(uniqueCustomers.size), description: 'unique customers across all stores' },
    { label: 'Returning Buyers', value: `${uniqueCustomers.size > 0 ? Math.round((returningCount / uniqueCustomers.size) * 100) : 0}%`, description: 'of this period\'s orders came from returning buyers.' },
    { label: 'Average Order Value', value: `$${orders.length > 0 ? (orders.reduce((sum, o) => sum + Number(o.total || 0), 0) / orders.length).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}`, description: 'across all orders.' },
    { label: 'Repeat Purchase Rate', value: `${orders.length > 0 ? Math.round((returningCount / orders.length) * 100) : 0}%`, description: 'of customers placed more than one order.' },
  ];

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
          {orderAlerts.length > 0 ? (
            orderAlerts.slice(0, 3).map((alert, idx) => (
              <div key={idx} className={idx === 2 ? 'xl:col-span-2' : ''}>
                <OrderAlertCard
                  title={alert.title}
                  description={alert.description}
                  impact={alert.impact}
                  priority={alert.priority}
                />
              </div>
            ))
          ) : (
            <div className="sm:col-span-2 xl:col-span-4">
              <EmptyState
                title="No order problems"
                description="All monitored orders are healthy. New issues will appear here as they are detected."
                icon={BadgeAlert}
              />
            </div>
          )}
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
