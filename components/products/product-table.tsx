"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from "@/components/ui/badge";
import { Package, Pencil, Trash2 } from "lucide-react";
import type { StoreProduct } from "@/lib/store-data";

type ProductTableProps = {
  products: StoreProduct[];
  onEdit: (product: StoreProduct) => void;
  onDelete: (product: StoreProduct) => void;
};

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Products</h2>
          <Badge tone="neutral">{products.length} products</Badge>
        </div>
        <SearchInput />
      </div>

      <div className="mt-6 overflow-hidden rounded-[18px] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="sticky top-0 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Price</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Stock</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filtered.map((product) => (
              <tr key={product.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-slate-100">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full w-full rounded-[12px] object-cover" />
                      ) : (
                        <Package className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">${product.price}</td>
                <td className="px-4 py-3 text-slate-600">{product.stock}</td>
                <td className="px-4 py-3">
                  <Badge tone={product.active ? "emerald" : "amber"}>
                    {product.active ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(product)}>
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(product)} className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-slate-500">
                  No products found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}