import type { LucideIcon } from "lucide-react";

type RevenueCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  comparison: string;
};

export function RevenueCard({ title, value, change, changeType, icon: Icon, comparison }: RevenueCardProps) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.26)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-violet-50 p-3 text-violet-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-sm font-medium ${changeType === "positive" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
          {change}
        </span>
        <p className="text-sm text-slate-500">{comparison}</p>
      </div>
      <div className="mt-5 h-10 rounded-[14px] bg-gradient-to-r from-violet-50 via-sky-50 to-white p-2">
        <div className="flex h-full items-end gap-2">
          {[36, 44, 40, 56, 64, 62].map((height, index) => (
            <div
              key={index}
              className={`flex-1 rounded-full ${index % 2 === 0 ? "bg-violet-400" : "bg-sky-400"}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
