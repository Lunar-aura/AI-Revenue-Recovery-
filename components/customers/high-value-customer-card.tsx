import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import type { HighValueCustomer } from "@/lib/customers-data";

const avatarTones: Record<HighValueCustomer["tone"], "violet" | "sky" | "slate"> = {
  violet: "violet",
  sky: "sky",
  slate: "slate",
};

export function HighValueCustomerCard({ customer, onView }: { customer: HighValueCustomer; onView?: () => void }) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.26)]">
      <div className="flex items-center gap-4">
        <Avatar name={customer.name} tone={avatarTones[customer.tone]} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900">{customer.name}</p>
            <Badge tone="amber">
              <Crown className="h-3 w-3" />
              {customer.tier}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-slate-500">{customer.email}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-slate-900">{customer.totalSpend}</p>
          <p className="text-xs text-slate-500">lifetime value {customer.clv}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs text-slate-500">Orders</p>
          <p className="font-medium text-slate-900">{customer.orders}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Last purchase</p>
          <p className="font-medium text-slate-900">{customer.lastPurchase}</p>
        </div>
      </div>
      <div className="mt-5">
        <Button variant="ghost" size="sm" className="w-full" onClick={onView}>
          Quick view
        </Button>
      </div>
    </div>
  );
}
