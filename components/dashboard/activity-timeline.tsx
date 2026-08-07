import type { ActivityItem } from "@/lib/dashboard-data";
import { Circle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

type ActivityTimelineProps = {
  items: ActivityItem[];
};

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <SectionHeader
        eyebrow="Live signals"
        title="Recent activity"
        description="A calm feed of the latest actions and discoveries."
      />

      <div className="mt-6 space-y-5">
        {items.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center text-sm text-slate-600">
            No recent activity yet.
          </div>
        ) : (
          items.map((item, index) => (
            <div key={item.title + item.time} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full border border-violet-200 bg-violet-50 p-1.5 text-violet-600">
                  <Circle className="h-2.5 w-2.5 fill-current" />
                </div>
                {index < items.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <span className="text-sm text-slate-400">{item.time}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
