import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export function EmptyState({ title, description, icon: Icon = Inbox }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-8 py-12 text-center">
      <div className="mb-4 rounded-full bg-white p-3 shadow-sm shadow-slate-200">
        <Icon className="h-6 w-6 text-slate-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
