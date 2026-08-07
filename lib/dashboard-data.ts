import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BrainCircuit,
  Clock3,
  LayoutGrid,
  Package2,
  Settings,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type StatCardData = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
};

export type RevenueProblem = {
  title: string;
  description: string;
  impact: string;
  severity: "High" | "Medium" | "Low";
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Products", href: "/dashboard/products", icon: Package2 },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Problems", href: "/dashboard/problems", icon: AlertTriangle },
  { label: "AI Insights", href: "/dashboard/insights", icon: BrainCircuit },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const stats: StatCardData[] = [
  {
    title: "Revenue",
    value: "$184.2K",
    change: "+12.4%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    title: "Orders",
    value: "2,841",
    change: "+8.1%",
    changeType: "positive",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    value: "18,940",
    change: "+3.2%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.84%",
    change: "-0.6%",
    changeType: "negative",
    icon: Sparkles,
  },
];

export const revenueProblems: RevenueProblem[] = [
  {
    title: "Mobile checkout friction",
    description: "Cart abandonment increased after the latest checkout update.",
    impact: "$24.8K at risk",
    severity: "High",
  },
  {
    title: "Product page trust gap",
    description: "Customers hesitate on high-value items due to weak social proof.",
    impact: "$11.6K at risk",
    severity: "Medium",
  },
  {
    title: "Email recovery drop-off",
    description: "Abandoned cart emails are underperforming on mobile devices.",
    impact: "$8.2K at risk",
    severity: "Low",
  },
];

export const recommendation = {
  title: "Improve mobile checkout experience",
  description:
    "Reduce form friction and clarify payment steps to recover conversion on smaller screens.",
  impact: "Potential uplift: 2.1% conversion",
};

export const recentActivity: ActivityItem[] = [
  {
    title: "Store synced",
    detail: "Inventory and order data refreshed 6 minutes ago.",
    time: "6m ago",
  },
  {
    title: "New problem detected",
    detail: "Checkout friction signal is now trending above baseline.",
    time: "22m ago",
  },
  {
    title: "Recommendation generated",
    detail: "AI surfaced a mobile checkout recovery playbook.",
    time: "1h ago",
  },
  {
    title: "Campaign created",
    detail: "A follow-up retention campaign is ready for review.",
    time: "2h ago",
  },
];

export const emptyActivity: ActivityItem[] = [];

export const activityIcon = Clock3;
