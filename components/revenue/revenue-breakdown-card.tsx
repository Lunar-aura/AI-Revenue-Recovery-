type BreakdownItem = {
  label: string;
  value: string;
  percent: string;
  growth: string;
};

type RevenueBreakdownCardProps = {
  title: string;
  subtitle: string;
  items: BreakdownItem[];
};

export function RevenueBreakdownCard({ title, subtitle, items }: RevenueBreakdownCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-[16px] border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1 text-sm text-slate-500">{item.percent} of total revenue</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{item.value}</p>
                <p className="mt-1 text-sm text-emerald-600">{item.growth}</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-sky-400" style={{ width: item.percent }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
