import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import type { RiskCustomer } from "@/lib/customers-data";

const riskTones: Record<RiskCustomer["riskLevel"], "rose" | "amber" | "neutral"> = {
  High: "rose",
  Medium: "amber",
  Low: "neutral",
};

type RiskCustomerCardProps = {
  customer: RiskCustomer;
  onAction?: () => void;
};

export function RiskCustomerCard({ customer, onAction }: RiskCustomerCardProps) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)]">
      <div className="flex items-start gap-3">
        <Avatar name={customer.name} tone="slate" initials={customer.avatar} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge tone={riskTones[customer.riskLevel]}>{customer.riskLevel}</Badge>
              <h3 className="font-semibold text-slate-900">{customer.name}</h3>
            </div>
            <p className="text-sm font-semibold text-slate-900">{customer.revenueLoss}</p>
          </div>
          <p className="mt-1 text-xs text-slate-500">{customer.email}</p>
          <p className="mt-2 text-sm text-slate-600">{customer.recommendation}</p>
          <p className="mt-3 text-xs text-slate-500">Last purchase {customer.daysSince} days ago</p>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="secondary" size="sm" className="w-full" onClick={onAction}>
          Take action
        </Button>
      </div>
    </div>
  );
}
