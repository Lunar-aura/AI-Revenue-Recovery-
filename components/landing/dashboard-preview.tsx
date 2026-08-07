export function DashboardPreview() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Dashboard preview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A premium command center for recovery decisions.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The product experience feels like a modern AI assistant for operators, highlighting the most urgent opportunities without overwhelming the user.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-[22px] border border-slate-200 bg-white p-4">
              <div className="rounded-[16px] border border-slate-200 bg-gradient-to-br from-violet-600 to-sky-500 p-4 text-white">
                <p className="text-sm text-violet-100">AI highlight</p>
                <p className="mt-2 text-lg font-semibold">Mobile checkout friction is costing revenue</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {['Revenue', 'Orders', 'Problems'].map((label) => (
                  <div key={label} className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">+12%</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-[18px] border border-slate-200 bg-white p-4">
                <div className="h-28 rounded-[14px] bg-gradient-to-r from-violet-50 via-white to-sky-50 p-3">
                  <div className="flex h-full items-end gap-2">
                    {[32, 48, 40, 60, 68, 74].map((height, index) => (
                      <div key={index} className="flex-1 rounded-full bg-gradient-to-t from-violet-500 to-sky-400" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
