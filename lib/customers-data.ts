import type { LucideIcon } from "lucide-react";
import {
  ShoppingCart,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

export type CustomerStat = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  comparison: string;
  trend: number[];
};

export type CustomerSegment = {
  label: string;
  count: string;
  revenue: string;
  avgSpend: string;
  growth: string;
  tone: "violet" | "sky" | "emerald" | "amber" | "rose" | "slate";
};

export type CustomerStatus = "Active" | "VIP" | "Inactive" | "At Risk" | "New";

export type CustomerRow = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpend: string;
  lastPurchase: string;
  status: CustomerStatus;
};

export type HighValueCustomer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpend: string;
  clv: string;
  tier: string;
  lastPurchase: string;
  tone: "violet" | "sky" | "slate";
};

export type RiskCustomer = {
  name: string;
  email: string;
  avatar: string;
  riskLevel: "High" | "Medium" | "Low";
  revenueLoss: string;
  daysSince: number;
  recommendation: string;
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

export type LoyaltyInsight = {
  label: string;
  value: string;
  description: string;
};

export type CustomerTimelineEvent = {
  event: string;
  time: string;
  amount?: string;
};

export type CustomerNote = {
  author: string;
  text: string;
  time: string;
};

export type CustomerDetail = {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  joinDate: string;
  location: string;
  orders: number;
  totalSpend: string;
  avgOrderValue: string;
  lifetimeValue: string;
  loyalty: string;
  favoriteProducts: string[];
  timeline: CustomerTimelineEvent[];
  notes: CustomerNote[];
};

export const customerStats: CustomerStat[] = [
  {
    title: "Total Customers",
    value: "18,940",
    change: "+3.2%",
    changeType: "positive",
    icon: Users,
    comparison: "vs previous period",
    trend: [30, 38, 34, 48, 42, 58, 54],
  },
  {
    title: "New Customers",
    value: "1,248",
    change: "+14.6%",
    changeType: "positive",
    icon: UserPlus,
    comparison: "vs previous period",
    trend: [20, 28, 24, 38, 34, 48, 44],
  },
  {
    title: "Returning Customers",
    value: "7,892",
    change: "+6.7%",
    changeType: "positive",
    icon: ShoppingCart,
    comparison: "vs previous period",
    trend: [44, 52, 48, 62, 58, 72, 68],
  },
  {
    title: "Customer Lifetime Value",
    value: "$482.30",
    change: "+5.9%",
    changeType: "positive",
    icon: Wallet,
    comparison: "per customer",
    trend: [36, 44, 40, 52, 48, 60, 56],
  },
];

export const customerSegments: CustomerSegment[] = [
  { label: "VIP Customers", count: "1,842", revenue: "$482K", avgSpend: "$261.70", growth: "+8.2%", tone: "violet" },
  { label: "Returning Customers", count: "7,892", revenue: "$712K", avgSpend: "$90.20", growth: "+6.7%", tone: "sky" },
  { label: "New Customers", count: "1,248", revenue: "$156K", avgSpend: "$124.80", growth: "+14.6%", tone: "emerald" },
  { label: "Inactive Customers", count: "3,468", revenue: "$0", avgSpend: "$0", growth: "-3.1%", tone: "slate" },
  { label: "High Spending Customers", count: "942", revenue: "$328K", avgSpend: "$348.10", growth: "+5.3%", tone: "amber" },
  { label: "At-Risk Customers", count: "1,820", revenue: "$146K", avgSpend: "$80.20", growth: "-2.4%", tone: "rose" },
];

export const customerRows: CustomerRow[] = [
  { id: "#CUST-0048", name: "Mina Patel", email: "mina@northstudio.com", orders: 18, totalSpend: "$3,248.90", lastPurchase: "Aug 1, 2025", status: "VIP" },
  { id: "#CUST-0047", name: "Marcus Chen", email: "marcus.chen@icloud.com", orders: 3, totalSpend: "$293.80", lastPurchase: "Jul 29, 2025", status: "Active" },
  { id: "#CUST-0046", name: "Sofia Rossi", email: "sofia.rossi@gmail.com", orders: 7, totalSpend: "$1,142.50", lastPurchase: "Jul 26, 2025", status: "Active" },
  { id: "#CUST-0045", name: "David Kim", email: "david.kim@protonmail.com", orders: 1, totalSpend: "$72.10", lastPurchase: "Jul 20, 2025", status: "New" },
  { id: "#CUST-0044", name: "Elena Volkov", email: "elena.v@outlook.com", orders: 22, totalSpend: "$4,812.30", lastPurchase: "Jul 18, 2025", status: "VIP" },
  { id: "#CUST-0043", name: "James Okafor", email: "james.okafor@hey.com", orders: 5, totalSpend: "$486.70", lastPurchase: "Jun 30, 2025", status: "At Risk" },
  { id: "#CUST-0042", name: "Aisha Rahman", email: "aisha@co.uk", orders: 0, totalSpend: "$0", lastPurchase: "—", status: "Inactive" },
];

export const highValueCustomers: HighValueCustomer[] = [
  { id: "#CUST-0048", name: "Mina Patel", email: "mina@northstudio.com", orders: 18, totalSpend: "$3,248.90", clv: "$2,841.30", tier: "Platinum", lastPurchase: "Aug 1, 2025", tone: "violet" },
  { id: "#CUST-0044", name: "Elena Volkov", email: "elena.v@outlook.com", orders: 22, totalSpend: "$4,812.30", clv: "$4,238.50", tier: "Platinum", lastPurchase: "Jul 18, 2025", tone: "sky" },
  { id: "#CUST-0046", name: "Sofia Rossi", email: "sofia.rossi@gmail.com", orders: 7, totalSpend: "$1,142.50", clv: "$1,842.20", tier: "Gold", lastPurchase: "Jul 26, 2025", tone: "slate" },
  { id: "#CUST-0047", name: "Marcus Chen", email: "marcus.chen@icloud.com", orders: 12, totalSpend: "$2,156.70", clv: "$1,902.40", tier: "Gold", lastPurchase: "Jul 29, 2025", tone: "violet" },
];

export const riskCustomers: RiskCustomer[] = [
  { name: "James Okafor", email: "james.okafor@hey.com", avatar: "JO", riskLevel: "High", revenueLoss: "$1,840", daysSince: 33, recommendation: "Send personalized win-back offer" },
  { name: "Aisha Rahman", email: "aisha@co.uk", avatar: "AR", riskLevel: "High", revenueLoss: "$2,450", daysSince: 88, recommendation: "High-value churn risk — priority outreach" },
  { name: "Luis Mendoza", email: "luis.mendoza@mx.com", avatar: "LM", riskLevel: "Medium", revenueLoss: "$720", daysSince: 47, recommendation: "Remind about abandoned checkout" },
  { name: "Priya Shah", email: "priya.s@in.com", avatar: "PS", riskLevel: "Medium", revenueLoss: "$540", daysSince: 52, recommendation: "Share best-sellers they may like" },
];

export const aiInsight: AIInsight = {
  title: "18 loyal customers have not purchased in 45 days",
  description:
    "AI identified 18 high-value customers who have gone 45+ days without a purchase, despite historically ordering 3-4x per quarter. Their combined lifetime spend is $12,840 and they are showing declining engagement signals across email and on-site activity.",
  impact: "$4,250",
  actions: [
    "Launch personalized email campaign with exclusive offers",
    "Offer loyalty discount to re-engage",
    "Recommend their best-selling products",
    "Assign account manager for top-tier VIPs",
  ],
};

export const recentCustomerActivity: ActivityItem[] = [
  { title: "New customer registered", detail: "Aisha Rahman signed up after clicking a referral link.", time: "3h ago" },
  { title: "VIP customer placed order", detail: "Mina Patel ordered a premium bundle, increasing CLV.", time: "8h ago" },
  { title: "Returning customer purchased again", detail: "Marcus Chen placed his third order in two weeks.", time: "1d ago" },
  { title: "Customer requested refund", detail: "Elena Volkov opened a return for order #ORD-1044.", time: "2d ago" },
  { title: "Customer became inactive", detail: "Noah Brooks has not logged in for 60 days.", time: "3d ago" },
];

export const loyaltyInsights: LoyaltyInsight[] = [
  { label: "Loyalty Levels", value: "4", description: "Platinum, Gold, Silver, Bronze tiers in use." },
  { label: "Repeat Purchase Rate", value: "42%", description: "of customers return within 30 days." },
  { label: "Average Lifetime Value", value: "$482.30", description: "per customer across their lifecycle." },
  { label: "Top Customer Segment", value: "VIP", description: "1,842 customers contributing $482K." },
];

export const customerDetail: CustomerDetail = {
  id: "#CUST-0048",
  name: "Mina Patel",
  email: "mina@northstudio.com",
  status: "VIP",
  joinDate: "Jan 14, 2023",
  location: "Brooklyn, NY",
  orders: 18,
  totalSpend: "$3,248.90",
  avgOrderValue: "$180.49",
  lifetimeValue: "$2,841.30",
  loyalty: "Platinum",
  favoriteProducts: ["Aurora Jacket", "North Bottle", "Lumen Backpack"],
  timeline: [
    { event: "New order placed", time: "Aug 1, 2025", amount: "$248.90" },
    { event: "Order shipped", time: "Aug 1, 2025", amount: "$248.90" },
    { event: "Returned and reordered", time: "Jul 20, 2025", amount: "$293.80" },
    { event: "VIP program joined", time: "Feb 3, 2024", amount: "$0" },
  ],
  notes: [
    { author: "Alicia Lane", text: "Prefers evening delivery windows.", time: "Aug 1, 2025" },
    { author: "System", text: "Became VIP after $2K lifetime spend.", time: "Jul 15, 2025" },
  ],
};

export const customerDetails: Record<string, CustomerDetail> = {
  "#CUST-0048": customerDetail,
  "#CUST-0044": {
    id: "#CUST-0044",
    name: "Elena Volkov",
    email: "elena.v@outlook.com",
    status: "VIP",
    joinDate: "Mar 2, 2022",
    location: "Austin, TX",
    orders: 22,
    totalSpend: "$4,812.30",
    avgOrderValue: "$218.74",
    lifetimeValue: "$4,238.50",
    loyalty: "Platinum",
    favoriteProducts: ["Aurora Jacket", "North Bottle"],
    timeline: [
      { event: "New order placed", time: "Jul 18, 2025", amount: "$389.20" },
      { event: "Return processed", time: "Jul 15, 2025", amount: "−$48.50" },
      { event: "VIP program joined", time: "Nov 19, 2023", amount: "$0" },
    ],
    notes: [
      { author: "Alicia Lane", text: "Requested size exchange for Aurora Jacket.", time: "Jul 15, 2025" },
      { author: "System", text: "Top 1% CLV segment.", time: "Jul 1, 2025" },
    ],
  },
  "#CUST-0046": {
    id: "#CUST-0046",
    name: "Sofia Rossi",
    email: "sofia.rossi@gmail.com",
    status: "Active",
    joinDate: "Oct 11, 2024",
    location: "Milan, Italy",
    orders: 7,
    totalSpend: "$1,142.50",
    avgOrderValue: "$163.21",
    lifetimeValue: "$1,842.20",
    loyalty: "Gold",
    favoriteProducts: ["Lumen Backpack", "Cable Kit"],
    timeline: [
      { event: "New order placed", time: "Jul 26, 2025", amount: "$156.40" },
      { event: "Order delivered", time: "Jul 28, 2025", amount: "$156.40" },
      { event: "Returning customer purchase", time: "Jul 12, 2025", amount: "$124.80" },
      { event: "First purchase", time: "Oct 11, 2024", amount: "$124.80" },
    ],
    notes: [
      { author: "System", text: "Engaging with email campaigns at above-average rates.", time: "Jul 20, 2025" },
    ],
  },
  "#CUST-0047": {
    id: "#CUST-0047",
    name: "Marcus Chen",
    email: "marcus.chen@icloud.com",
    status: "Active",
    joinDate: "Jun 5, 2025",
    location: "Vancouver, BC",
    orders: 12,
    totalSpend: "$2,156.70",
    avgOrderValue: "$179.72",
    lifetimeValue: "$1,902.40",
    loyalty: "Gold",
    favoriteProducts: ["North Bottle", "Cable Kit", "Lumen Backpack"],
    timeline: [
      { event: "New order placed", time: "Jul 29, 2025", amount: "$293.80" },
      { event: "Payment captured", time: "Jul 29, 2025", amount: "$293.80" },
      { event: "Returning purchase", time: "Jul 14, 2025", amount: "$184.20" },
    ],
    notes: [
      { author: "Alicia Lane", text: "Frequent buyer — consider referral program invite.", time: "Jul 29, 2025" },
    ],
  },
};
