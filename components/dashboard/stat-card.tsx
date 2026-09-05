import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  comparison?: string;
};

export function StatCard({ title, value, change, changeType, icon: Icon, comparison = "vs last month" }: StatCardProps) {
  return (
    <div className="group rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-violet-50 p-3 text-violet-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 font-medium ${
            changeType === "positive"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {change}
        </span>
        <span className="text-slate-500">{comparison}</span>
      </div>
    </div>
  );
}
