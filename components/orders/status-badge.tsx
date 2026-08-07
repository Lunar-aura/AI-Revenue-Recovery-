import { Badge } from "@/components/ui/badge";

type StatusTone = "neutral" | "violet" | "blue" | "amber" | "rose" | "emerald";

type StatusBadgeProps = {
  status: string;
};

const statusTones: Record<string, StatusTone> = {
  Pending: "amber",
  Processing: "blue",
  Shipped: "blue",
  Delivered: "emerald",
  Cancelled: "rose",
  Refunded: "neutral",
  Paid: "emerald",
  Failed: "rose",
  Partial: "violet",
  Active: "emerald",
  VIP: "violet",
  Inactive: "neutral",
  New: "blue",
  "At Risk": "rose",
  Churned: "rose",
  "In Stock": "emerald",
  "Low Stock": "amber",
  "Out of Stock": "rose",
  "Best Seller": "violet",
  Trending: "blue",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone: StatusTone = statusTones[status] ?? "neutral";
  return <Badge tone={tone}>{status}</Badge>;
}
