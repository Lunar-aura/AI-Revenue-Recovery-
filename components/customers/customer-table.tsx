import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/orders/status-badge";
import type { CustomerRow, CustomerStatus } from "@/lib/customers-data";
import { Filter, SortDesc } from "lucide-react";

const avatarTones: ("violet" | "sky" | "slate")[] = ["violet", "sky", "slate"];

type CustomerTableProps = {
  rows: CustomerRow[];
  onViewCustomer?: (row: CustomerRow) => void;
};

export function CustomerTable({ rows, onViewCustomer }: CustomerTableProps) {
  const statusOrder: CustomerStatus[] = ["VIP", "Active", "New", "At Risk", "Inactive"];
  const sortedRows = [...rows].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
  );

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Customers</h2>
          <p className="mt-1 text-sm text-slate-500">A live view of your customer base and activity.</p>
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
              <th className="px-4 py-3 text-left font-medium text-slate-500">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Email</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Orders</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Total Spend</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Last Purchase</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {sortedRows.map((row, index) => (
              <tr key={row.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} tone={avatarTones[index % avatarTones.length]} />
                    <div>
                      <p className="font-medium text-slate-900">{row.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{row.email}</td>
                <td className="px-4 py-3 text-slate-600">{row.orders}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{row.totalSpend}</td>
                <td className="px-4 py-3 text-slate-600">{row.lastPurchase}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" onClick={() => onViewCustomer?.(row)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Showing 1-7 of 18,940 customers</p>
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
