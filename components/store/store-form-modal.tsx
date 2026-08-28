"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/store-data";
import type { Store } from "@/lib/store-data";

type StoreFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Store, "id" | "createdAt" | "ownerId">) => void;
  store?: Store | null;
};

const emptyForm = {
  name: "",
  description: "",
  logo: "",
  slug: "",
  heroTitle: "",
  heroDescription: "",
};

export function StoreFormModal({ open, onClose, onSubmit, store }: StoreFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (store) {
      setForm({
        name: store.name,
        description: store.description,
        logo: store.logo,
        slug: store.slug,
        heroTitle: store.heroTitle,
        heroDescription: store.heroDescription,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [store, open]);

  function handleNameChange(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugify(value),
    }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Store name is required";
    if (!form.slug.trim()) next.slug = "Store slug is required";
    else if (!/^[a-z0-9-]+$/.test(form.slug)) next.slug = "Use lowercase letters, numbers, and dashes";
    if (!form.heroTitle.trim()) next.heroTitle = "Hero title is required";
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
    <Modal open={open} onClose={handleClose} title={store ? "Edit Store" : "Create Store"}>
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <Input
          label="Store Name"
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. Fatima Fashion"
          error={errors.name}
          autoFocus
        />

        <div>
          <label className="block text-sm font-medium text-slate-700">Store Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe your store..."
            rows={3}
            className="mt-2 block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <Input
          label="Store Logo / Image URL"
          value={form.logo}
          onChange={(e) => setForm({ ...form, logo: e.target.value })}
          placeholder="https://example.com/logo.png"
        />

        <Input
          label="Store Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
          placeholder="fatima-fashion"
          error={errors.slug}
        />

        <Input
          label="Hero Title"
          value={form.heroTitle}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          placeholder="Welcome to Fatima Fashion"
          error={errors.heroTitle}
        />

        <Input
          label="Hero Description"
          value={form.heroDescription}
          onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
          placeholder="Discover our latest collection."
        />

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {store ? "Save Changes" : "Create Store"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}