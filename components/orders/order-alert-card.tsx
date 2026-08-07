import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type OrderAlertCardProps = {
  title: string;
  description: string;
  impact: string;
  priority: "High" | "Medium" | "Low";
};

export function OrderAlertCard({ title, description, impact, priority }: OrderAlertCardProps) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone={priority === "High" ? "rose" : priority === "Medium" ? "amber" : "emerald"}>{priority}</Badge>
            <h3 className="font-semibold text-slate-900">{title}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-2 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Estimated impact: {impact}</p>
        <Button variant="secondary" size="sm">Quick action</Button>
      </div>
    </div>
  );
}
