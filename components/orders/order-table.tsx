import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/orders/status-badge";
import type { OrderRow } from "@/lib/orders-data";
import { Filter, SortDesc } from "lucide-react";

const avatarTones: ("violet" | "sky" | "slate")[] = ["violet", "sky", "slate"];

type OrderTableProps = {
  rows: OrderRow[];
  totalCount?: number;
  onViewOrder?: (row: OrderRow) => void;
};

export function OrderTable({ rows, totalCount, onViewOrder }: OrderTableProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Orders</h2>
          <p className="mt-1 text-sm text-slate-500">A live view of purchase activity and fulfillment state.</p>
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
              <th className="px-4 py-3 text-left font-medium text-slate-500">Order ID</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Products</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Payment</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Fulfillment</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Date</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, index) => (
              <tr key={row.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">{row.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.customer} tone={avatarTones[index % avatarTones.length]} />
                    <div>
                      <p className="font-medium text-slate-900">{row.customer}</p>
                      <p className="text-xs text-slate-500">VIP</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.products}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{row.amount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.payment} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.fulfillment} />
                </td>
                <td className="px-4 py-3 text-slate-600">{row.date}</td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" onClick={() => onViewOrder?.(row)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Showing {rows.length} of {totalCount ?? rows.length} {((totalCount ?? rows.length) === 1 ? "order" : "orders")}
        </p>
      </div>
    </div>
  );
}
