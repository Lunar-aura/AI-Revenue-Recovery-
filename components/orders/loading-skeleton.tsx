export function LoadingSkeleton() {
  return (
    <div className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="h-4 w-36 animate-pulse rounded-full bg-slate-200" />
      <div className="h-3 w-56 animate-pulse rounded-full bg-slate-100" />
      <div className="mt-6 space-y-3">
        <div className="h-24 animate-pulse rounded-[18px] bg-slate-100" />
        <div className="h-24 animate-pulse rounded-[18px] bg-slate-100" />
      </div>
    </div>
  );
}
