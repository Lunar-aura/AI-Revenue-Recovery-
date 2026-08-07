type OrderStatusCardProps = {
  label: string;
  count: string;
  tone: "violet" | "sky" | "emerald" | "amber" | "rose" | "slate";
};

export function OrderStatusCard({ label, count, tone }: OrderStatusCardProps) {
  const tones = {
    violet: "bg-violet-50 text-violet-700",
    sky: "bg-sky-50 text-sky-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700",
  } as const;

  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.16)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{count}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${tones[tone]}`} style={{ width: "70%" }} />
      </div>
    </div>
  );
}
