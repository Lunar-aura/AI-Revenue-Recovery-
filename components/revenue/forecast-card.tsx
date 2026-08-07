type ForecastCardProps = {
  expectedRevenue: string;
  growth: string;
  confidence: string;
};

export function ForecastCard({ expectedRevenue, growth, confidence }: ForecastCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">Revenue forecast</h2>
        <p className="mt-1 text-sm text-slate-500">Projected outlook based on current momentum.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-[16px] bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Expected revenue</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{expectedRevenue}</p>
        </div>
        <div className="rounded-[16px] bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Projected growth</p>
          <p className="mt-2 text-lg font-semibold text-emerald-600">{growth}</p>
        </div>
        <div className="rounded-[16px] bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Confidence</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{confidence}</p>
        </div>
      </div>

      <div className="mt-6 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex h-28 items-end gap-2">
          {[36, 52, 46, 67, 78, 73, 84].map((height, index) => (
            <div key={index} className="flex-1 rounded-t-[999px] bg-gradient-to-t from-violet-500 to-sky-400" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
