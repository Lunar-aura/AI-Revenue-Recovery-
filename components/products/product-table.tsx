import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/orders/status-badge";
import type { ProductRow, StockStatus } from "@/lib/products-data";
import { Filter, Package, SortDesc } from "lucide-react";

type ProductTableProps = {
  rows: ProductRow[];
  onViewProduct?: (row: ProductRow) => void;
};

export function ProductTable({ rows, onViewProduct }: ProductTableProps) {
  const stockOrder: StockStatus[] = ["In Stock", "Low Stock", "Out of Stock"];
  const sortedRows = [...rows].sort(
    (a, b) => stockOrder.indexOf(a.stock) - stockOrder.indexOf(b.stock),
  );

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Products</h2>
          <p className="mt-1 text-sm text-slate-500">A live view of your catalog performance and inventory.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput />
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <SortDesc className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[18px] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="sticky top-0 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Category</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Price</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Units Sold</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Revenue</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Conversion</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Stock</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {sortedRows.map((row) => (
              <tr key={row.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${row.color}`}>
                      <Package className="h-5 w-5 text-slate-600/40" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{row.name}</p>
                      <p className="text-xs text-slate-500">{row.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.category}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{row.price}</td>
                <td className="px-4 py-3 text-slate-600">{row.unitsSold}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{row.revenue}</td>
                <td className="px-4 py-3 text-slate-600">{row.conversion}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.stock} />
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" onClick={() => onViewProduct?.(row)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Showing 1-7 of 342 products</p>
        <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
          <Button variant="secondary" size="sm" className="rounded-full">Previous</Button>
          <Button variant="primary" size="sm" className="h-8 w-8 rounded-full p-0">1</Button>
          <Button variant="secondary" size="sm" className="rounded-full">2</Button>
          <Button variant="secondary" size="sm" className="rounded-full">3</Button>
          <Button variant="secondary" size="sm" className="rounded-full">Next</Button>
        </div>
      </div>
    </div>
  );
}
