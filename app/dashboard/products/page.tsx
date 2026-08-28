"use client";

import { useEffect, useState, useMemo } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProductTable } from "@/components/products/product-table";
import { ProductFormModal } from "@/components/products/product-form-modal";
import { DeleteProductModal } from "@/components/products/delete-product-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import {
  getStoreProducts,
  getStoreProductsForOwner,
  getStores,
  saveStoreProducts,
  type Store,
  type StoreProduct,
} from "@/lib/store-data";
import { createClient } from "@/lib/supabase";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions";

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [userStores, setUserStores] = useState<Store[]>([]);
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [search, setSearch] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<StoreProduct | null>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      // stores.owner_id references auth.users(id), so always use
      // the auth user id (never the email) when filtering.
      const userId = user?.id ?? "";
      setUserName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User");
      setUserEmail(user?.email ?? "");
      loadUserStores(userId);
    });
  }, []);

  async function loadUserStores(ownerUserId: string) {
    if (!ownerUserId) return;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", ownerUserId);

      if (error) {
        console.error("Failed to fetch stores:", error);
        const localStores = getStores().filter((s) => s.ownerId === ownerUserId);
        setUserStores(localStores);
        if (localStores.length > 0 && !selectedStoreId) {
          setSelectedStoreId(localStores[0].id);
        }
        return;
      }

      let mapped: Store[] = [];
      if (data && data.length > 0) {
        mapped = data.map((row: Record<string, unknown>) => ({
          id: row.id as string,
          ownerId: row.owner_id as string,
          name: row.name as string,
          slug: row.slug as string,
          description: (row.description as string) || "",
          logo: (row.logo_url as string) || "",
          heroTitle: (row.hero_title as string) || "",
          heroDescription: (row.hero_description as string) || "",
          createdAt: (row.created_at as string)?.split("T")[0],
        }));
        setUserStores(mapped);
        if (!selectedStoreId) {
          setSelectedStoreId(mapped[0].id);
        }
      } else {
        const localStores = getStores().filter((s) => s.ownerId === ownerUserId);
        setUserStores(localStores);
        if (localStores.length > 0 && !selectedStoreId) {
          setSelectedStoreId(localStores[0].id);
        }
      }
    } catch (err) {
      console.error("Error loading stores:", err);
    }
  }

  async function syncProductsFromSupabase(storeId: string) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", storeId);

      if (error) {
        console.error("Failed to fetch products from Supabase:", error);
        return;
      }

      if (data && data.length > 0) {
        const mapped: StoreProduct[] = data.map((row: Record<string, unknown>) => ({
          id: row.id as string,
          storeId: row.store_id as string,
          name: row.name as string,
          description: (row.description as string) || "",
          price: String(row.price ?? "0"),
          image: (row.image_url as string) || "",
          stock: (row.stock as number) ?? 0,
          active: (row.active as boolean) ?? true,
        }));
        setProducts(mapped);
        const allProducts = [...mapped, ...getStoreProducts().filter((p) => p.storeId !== storeId)];
        saveStoreProducts(allProducts);
      }
    } catch (err) {
      console.error("Error syncing products:", err);
    }
  }

  useEffect(() => {
    if (selectedStoreId) {
      syncProductsFromSupabase(selectedStoreId);
    }
  }, [selectedStoreId]);

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  async function handleAdd(data: Omit<StoreProduct, "id" | "storeId">) {
    if (!selectedStoreId) return;

    const result = await createProduct({
      storeId: selectedStoreId,
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      stock: data.stock,
      active: data.active,
    });

    if (result.error) {
      console.error("Failed to create product:", result.error);
      return;
    }

    const newProduct: StoreProduct = {
      id: result.data?.id || `store-prod-${Date.now()}`,
      storeId: selectedStoreId,
      ...data,
    };

    const next = [newProduct, ...products];
    setProducts(next);
    saveStoreProducts(next);
    setFormModalOpen(false);
  }

  async function handleEdit(data: Omit<StoreProduct, "id" | "storeId">) {
    if (!editingProduct) return;

    const result = await updateProduct(editingProduct.id, {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      stock: data.stock,
      active: data.active,
    });

    if (result.error) {
      console.error("Failed to update product:", result.error);
      return;
    }

    const next = products.map((p) =>
      p.id === editingProduct.id ? { ...p, ...data } : p,
    );
    setProducts(next);
    saveStoreProducts(next);
    setEditingProduct(null);
    setFormModalOpen(false);
  }

  async function handleDelete() {
    if (!deletingProduct) return;

    const result = await deleteProduct(deletingProduct.id);
    if (result.error) {
      console.error("Failed to delete product:", result.error);
      return;
    }

    const next = products.filter((p) => p.id !== deletingProduct.id);
    setProducts(next);
    saveStoreProducts(next);
    setDeletingProduct(null);
  }

  function openAddModal() {
    setEditingProduct(null);
    setFormModalOpen(true);
  }

  function openEditModal(product: StoreProduct) {
    setEditingProduct(product);
    setFormModalOpen(true);
  }

  const selectedStore = userStores.find((s) => s.id === selectedStoreId);

  return (
    <DashboardShell
      user={{
        name: userName,
        email: userEmail,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Manage your catalog</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Products</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {selectedStore
                  ? `Add, edit, and manage products for ${selectedStore.name}.`
                  : "Create your store first to start adding products."}
              </p>
            </div>
            {selectedStoreId ? (
              <Button onClick={openAddModal}>
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            ) : null}
          </div>

          {userStores.length > 1 && (
            <div className="mt-4">
              <label htmlFor="store-select" className="block text-sm font-medium text-slate-700">Select Store</label>
              <select
                id="store-select"
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="mt-2 block w-full max-w-md rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
              >
                {userStores.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.slug})</option>
                ))}
              </select>
            </div>
          )}
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">Product List</h2>
              <Badge tone="neutral">{products.length} products</Badge>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-64 rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          {!mounted ? (
            <div className="mt-6 rounded-[20px] border border-slate-200 p-12 text-center">
              <p className="text-sm text-slate-500">Loading products...</p>
            </div>
          ) : !selectedStoreId ? (
            <div className="mt-6 rounded-[20px] border border-dashed border-slate-300 p-12 text-center">
              <p className="text-lg font-semibold text-slate-950">No store selected</p>
              <p className="mt-1 text-sm text-slate-500">
                Create a store first, then add products to it.
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <ProductTable
                products={filteredProducts}
                onEdit={openEditModal}
                onDelete={(p) => setDeletingProduct(p)}
              />
            </div>
          )}
        </section>
      </div>

      <ProductFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={editingProduct ? handleEdit : handleAdd}
        product={editingProduct}
        storeId={selectedStoreId}
      />

      <DeleteProductModal
        open={deletingProduct !== null}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDelete}
        productName={deletingProduct?.name}
      />
    </DashboardShell>
  );
}
