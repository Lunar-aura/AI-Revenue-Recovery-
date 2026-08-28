"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StoreProduct } from "@/lib/store-data";

type ProductFormData = Omit<StoreProduct, "id" | "storeId">;

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: StoreProduct | null;
  storeId?: string;
};

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: "",
  image: "",
  stock: 0,
  active: true,
};

export function ProductFormModal({ open, onClose, onSubmit, product }: ProductFormModalProps) {
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        active: product.active,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [product, open]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Product name is required";
    if (!form.price.trim()) next.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) < 0) next.price = "Enter a valid price";
    if (form.stock < 0) next.stock = "Stock cannot be negative";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
    setForm(emptyForm);
    setErrors({});
  }

  function handleClose() {
    setForm(emptyForm);
    setErrors({});
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title={product ? "Edit Product" : "Add Product"}>
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Enter product name"
          error={errors.name}
          autoFocus
        />

        <div>
          <label htmlFor="product-description" className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            id="product-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your product..."
            rows={3}
            className="mt-2 block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="0.00"
            error={errors.price}
          />

          <div>
            <label htmlFor="product-stock" className="block text-sm font-medium text-slate-700">Stock</label>
            <input
              id="product-stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              className="mt-2 block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
            />
            {errors.stock ? <p className="mt-1.5 text-xs text-rose-600">{errors.stock}</p> : null}
          </div>
        </div>

        <Input
          label="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://example.com/image.png"
        />

        <div>
          <label htmlFor="product-active" className="block text-sm font-medium text-slate-700">Status</label>
          <select
            id="product-active"
            value={form.active ? "active" : "inactive"}
            onChange={(e) => setForm({ ...form, active: e.target.value === "active" })}
            className="mt-2 block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}