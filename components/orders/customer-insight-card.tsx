type CustomerInsightCardProps = {
  label: string;
  value: string;
  description: string;
};

export function CustomerInsightCard({ label, value, description }: CustomerInsightCardProps) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)]">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
