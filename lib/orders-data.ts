import type { LucideIcon } from "lucide-react";
import {
  Ban,
  Clock3,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

export type OrderStat = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  comparison: string;
  trend: number[];
};

export type OrderStatusItem = {
  label: string;
  count: string;
  tone: "violet" | "sky" | "emerald" | "amber" | "rose" | "slate";
};

export type OrderRow = {
  id: string;
  customer: string;
  products: string;
  amount: string;
  payment: "Paid" | "Failed" | "Pending" | "Refunded";
  fulfillment: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
};

export type OrderAlert = {
  title: string;
  description: string;
  impact: string;
  priority: "High" | "Medium" | "Low";
};

export type AIInsight = {
  title: string;
  description: string;
  impact: string;
  actions: string[];
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
};

export type CustomerInsight = {
  label: string;
  value: string;
  description: string;
};

export type OrderTimelineEvent = {
  event: string;
  time: string;
};

export type OrderNote = {
  author: string;
  text: string;
  time: string;
};

export type OrderDetail = {
  id: string;
  customer: string;
  email: string;
  products: string[];
  shipping: string;
  payment: string;
  timeline: OrderTimelineEvent[];
  status: string;
  notes: OrderNote[];
};

export const orderStats: OrderStat[] = [
  {
    title: "Total Orders",
    value: "2,841",
    change: "+8.1%",
    changeType: "positive",
    icon: ShoppingCart,
    comparison: "vs previous period",
    trend: [32, 48, 42, 56, 52, 70, 66],
  },
  {
    title: "Completed Orders",
    value: "1,942",
    change: "+11.3%",
    changeType: "positive",
    icon: PackageCheck,
    comparison: "vs previous period",
    trend: [40, 38, 52, 46, 62, 68, 74],
  },
  {
    title: "Pending Orders",
    value: "287",
    change: "-3.2%",
    changeType: "negative",
    icon: Clock3,
    comparison: "vs previous period",
    trend: [58, 52, 46, 40, 44, 48, 36],
  },
  {
    title: "Cancelled Orders",
    value: "156",
    change: "-6.4%",
    changeType: "negative",
    icon: Ban,
    comparison: "vs previous period",
    trend: [60, 52, 44, 46, 42, 38, 32],
  },
];

export const orderStatuses: OrderStatusItem[] = [
  { label: "Pending", count: "287", tone: "amber" },
  { label: "Processing", count: "415", tone: "sky" },
  { label: "Shipped", count: "1,632", tone: "violet" },
  { label: "Delivered", count: "1,942", tone: "emerald" },
  { label: "Cancelled", count: "156", tone: "rose" },
  { label: "Refunded", count: "88", tone: "slate" },
];

export const orderRows: OrderRow[] = [
  {
    id: "#ORD-1048",
    customer: "Mina Patel",
    products: "3 items",
    amount: "$248.90",
    payment: "Paid",
    fulfillment: "Shipped",
    date: "Aug 1, 2025",
    status: "shipped",
  },
  {
    id: "#ORD-1047",
    customer: "Marcus Chen",
    products: "1 item",
    amount: "$72.00",
    payment: "Failed",
    fulfillment: "Pending",
    date: "Aug 2, 2025",
    status: "pending",
  },
  {
    id: "#ORD-1046",
    customer: "Sofia Rossi",
    products: "2 items",
    amount: "$156.40",
    payment: "Paid",
    fulfillment: "Delivered",
    date: "Jul 30, 2025",
    status: "delivered",
  },
  {
    id: "#ORD-1045",
    customer: "David Kim",
    products: "4 items",
    amount: "$389.20",
    payment: "Pending",
    fulfillment: "Processing",
    date: "Aug 2, 2025",
    status: "processing",
  },
  {
    id: "#ORD-1044",
    customer: "Elena Volkov",
    products: "1 item",
    amount: "$48.50",
    payment: "Paid",
    fulfillment: "Cancelled",
    date: "Jul 28, 2025",
    status: "cancelled",
  },
  {
    id: "#ORD-1043",
    customer: "James Okafor",
    products: "2 items",
    amount: "$192.70",
    payment: "Refunded",
    fulfillment: "Refunded",
    date: "Jul 29, 2025",
    status: "refunded",
  },
];

export const orderAlerts: OrderAlert[] = [
  {
    title: "High-value order payment failed",
    description: "A $389.20 order from David Kim failed payment processing and is awaiting resolution.",
    impact: "$389.20 at risk",
    priority: "High",
  },
  {
    title: "Shipping delayed",
    description: "Order #ORD-1041 is delayed in transit and the customer is expecting an update.",
    impact: "$128.40 at risk",
    priority: "Medium",
  },
  {
    title: "Refund requested",
    description: "Elena Volkov has requested a refund for order #ORD-1044 within the return window.",
    impact: "$48.50 at risk",
    priority: "Medium",
  },
  {
    title: "Customer waiting on hold",
    description: "Marcus Chen has an open support thread awaiting a payment retry response.",
    impact: "$72.00 at risk",
    priority: "High",
  },
  {
    title: "Inventory unavailable",
    description: "One product in order #ORD-1039 is now out of stock and needs fulfillment handling.",
    impact: "$214.60 at risk",
    priority: "High",
  },
];

export const aiInsight: AIInsight = {
  title: "Failed payments are spiking from mobile checkout",
  description:
    "AI detected a 24% increase in failed payments from mobile users over the last 14 days, with most failures occurring at the payment review step. Recovering these at-risk checkouts could recapture significant revenue.",
  impact: "$1,240",
  actions: [
    "Review payment gateway configuration for mobile",
    "Retry failed payments automatically",
    "Notify affected customers with a recovery link",
    "Surface a simplified mobile payment flow",
  ],
};

export const recentOrderActivity: ActivityItem[] = [
  {
    title: "New order received",
    detail: "Order #ORD-1048 for $248.90 was placed by Mina Patel.",
    time: "2h ago",
  },
  {
    title: "Order shipped",
    detail: "Tracking number assigned for #ORD-1046, estimated delivery in 2 days.",
    time: "5h ago",
  },
  {
    title: "Refund processed",
    detail: "A refund of $48.50 was issued for #ORD-1044.",
    time: "1d ago",
  },
  {
    title: "Payment failed",
    detail: "Payment for #ORD-1047 could not be captured. Customer notified.",
    time: "1d ago",
  },
  {
    title: "Customer cancelled order",
    detail: "Order #ORD-1045 was cancelled by the customer before processing.",
    time: "2d ago",
  },
];

export const customerInsights: CustomerInsight[] = [
  {
    label: "Returning Customers",
    value: "42%",
    description: "of this period's orders came from returning buyers.",
  },
  {
    label: "First-time Buyers",
    value: "58%",
    description: "of this period's orders were from new customers.",
  },
  {
    label: "Average Order Value",
    value: "$134.20",
    description: "across all completed orders.",
  },
  {
    label: "Repeat Purchase Rate",
    value: "31%",
    description: "of customers placed a second order within 30 days.",
  },
];

export const orderChartRanges: OrderAnalyticsRange[] = ["Daily", "Weekly", "Monthly"];

export type OrderAnalyticsRange = "Daily" | "Weekly" | "Monthly";

export const orderDetail: OrderDetail = {
  id: "#ORD-1048",
  customer: "Mina Patel",
  email: "mina@northstudio.com",
  products: ["Aurora Jacket", "North Bottle"],
  shipping: "48 Mercer Street, New York, NY 10013",
  payment: "Paid via Visa ending in 4242",
  status: "Shipped",
  timeline: [
    { event: "Order placed", time: "09:14 AM" },
    { event: "Payment confirmed", time: "09:18 AM" },
    { event: "Order fulfilled", time: "11:32 AM" },
    { event: "Shipped", time: "02:00 PM" },
    { event: "In transit", time: "04:45 PM" },
  ],
  notes: [
    { author: "Alicia Lane", text: "Customer requested gift wrapping.", time: "10:05 AM" },
    { author: "System", text: "Tracking number assigned: 1Z999AA10123456784.", time: "02:10 PM" },
  ],
};

export const orderDetails: Record<string, OrderDetail> = {
  "#ORD-1048": orderDetail,
  "#ORD-1047": {
    id: "#ORD-1047",
    customer: "Marcus Chen",
    email: "marcus.chen@icloud.com",
    products: ["Lumen Backpack"],
    shipping: "1424 Maple Avenue, Austin, TX 78704",
    payment: "Failed — Visa ending in 2846",
    status: "Pending",
    timeline: [
      { event: "Order placed", time: "11:02 AM" },
      { event: "Payment failed", time: "11:05 AM" },
      { event: "Retry scheduled", time: "12:30 PM" },
    ],
    notes: [
      { author: "System", text: "Payment gateway returned a decline. A retry will be attempted in 24 hours.", time: "11:05 AM" },
      { author: "Alicia Lane", text: "Reached out to customer via email to confirm payment method.", time: "01:40 PM" },
    ],
  },
  "#ORD-1045": {
    id: "#ORD-1045",
    customer: "David Kim",
    email: "david.kim@protonmail.com",
    products: ["North Bottle", "Cable Kit", "Aurora Jacket", "Lumen Backpack"],
    shipping: "7700 Sunset Blvd, Los Angeles, CA 90046",
    payment: "Pending authorization",
    status: "Processing",
    timeline: [
      { event: "Order placed", time: "08:46 AM" },
      { event: "Authorization hold", time: "08:50 AM" },
      { event: "Fulfillment queued", time: "09:15 AM" },
    ],
    notes: [
      { author: "System", text: "Payment is awaiting final capture before fulfillment.", time: "08:50 AM" },
    ],
  },
};

export const activityIcon = Clock3;
