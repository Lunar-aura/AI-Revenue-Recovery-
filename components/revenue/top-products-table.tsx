type ProductRow = {
  name: string;
  revenue: string;
  units: string;
  conversion: string;
  growth: string;
  action: string;
};

type TopProductsTableProps = {
  products: ProductRow[];
};

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Top performing products</h2>
          <p className="mt-1 text-sm text-slate-500">Best-selling products by revenue contribution.</p>
        </div>
        <button className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
          Export
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-[18px] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Units</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Revenue</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Conversion</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Growth</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {products.map((product) => (
              <tr key={product.name} className="transition hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-[12px] bg-gradient-to-br from-violet-100 to-sky-100" />
                    <div>
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">Premium SKU</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{product.units}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{product.revenue}</td>
                <td className="px-4 py-3 text-slate-600">{product.conversion}</td>
                <td className="px-4 py-3 text-emerald-600">{product.growth}</td>
                <td className="px-4 py-3">
                  <button className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                    {product.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
