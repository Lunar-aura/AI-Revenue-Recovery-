type TimelineEntry = {
  title: string;
  detail: string;
  time: string;
};

type TimelineCardProps = {
  items: TimelineEntry[];
};

export function TimelineCard({ items }: TimelineCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">Recent revenue activity</h2>
        <p className="mt-1 text-sm text-slate-500">The latest developments shaping revenue performance.</p>
      </div>

      <div className="mt-6 space-y-5">
        {items.map((item, index) => (
          <div key={item.title + item.time} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="rounded-full border border-violet-200 bg-violet-50 p-1.5 text-violet-600">
                <div className="h-2.5 w-2.5 rounded-full bg-current" />
              </div>
              {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
            </div>
            <div className="flex-1 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{item.title}</p>
                <span className="text-sm text-slate-400">{item.time}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
