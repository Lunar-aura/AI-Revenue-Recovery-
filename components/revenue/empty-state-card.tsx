import { Sparkles } from "lucide-react";

type EmptyStateCardProps = {
  title: string;
  description: string;
};

export function EmptyStateCard({ title, description }: EmptyStateCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 px-8 py-12 text-center">
      <div className="rounded-full bg-white p-3 shadow-sm shadow-slate-200">
        <Sparkles className="h-6 w-6 text-violet-600" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
