import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type LeakItem = {
  title: string;
  description: string;
  loss: string;
  severity: "High" | "Medium" | "Low";
};

type RevenueLeaksCardProps = {
  items: LeakItem[];
};

export function RevenueLeaksCard({ items }: RevenueLeaksCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Revenue leaks</h2>
          <p className="mt-1 text-sm text-slate-500">Opportunities to recover revenue quickly.</p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-2 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge tone={item.severity === "High" ? "rose" : item.severity === "Medium" ? "amber" : "emerald"}>{item.severity}</Badge>
                  <span className="text-sm font-semibold text-slate-900">{item.title}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Estimated loss</p>
                <p className="mt-1 font-semibold text-slate-900">{item.loss}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="h-2.5 w-20 rounded-full bg-slate-200">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500" style={{ width: item.severity === "High" ? "90%" : item.severity === "Medium" ? "70%" : "40%" }} />
              </div>
              <Button variant="secondary" size="sm">Investigate</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
