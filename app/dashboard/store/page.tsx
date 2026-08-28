"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { StoreFormModal } from "@/components/store/store-form-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Pencil, Plus, Store as StoreIcon } from "lucide-react";
import { getStores, saveStores, type Store } from "@/lib/store-data";
import { createClient } from "@/lib/supabase";
import { createStore, updateStore } from "@/app/actions";

export default function StorePage() {
  const [mounted, setMounted] = useState(false);
  const [ownerId, setOwnerId] = useState<string>("");
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");
  const [stores, setStores] = useState<Store[]>([]);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      // stores.owner_id references auth.users(id), so always use
      // the auth user id (never the email) when filtering.
      const userId = user?.id ?? "";
      setOwnerId(userId);
      setUserName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User");
      setUserEmail(user?.email ?? "");
      loadStores(userId);
    });
  }, []);

  async function loadStores(ownerUserId: string) {
    if (!ownerUserId) return;
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", ownerUserId);

      if (error) {
        console.error("Failed to fetch stores from Supabase:", error);
        setStores(getStores().filter((s) => s.ownerId === ownerUserId));
        return;
      }

      if (data && data.length > 0) {
        const mapped: Store[] = data.map((row: Record<string, unknown>) => ({
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
        setStores(mapped);
        saveStores([...getStores(), ...mapped]);
      } else {
        setStores(getStores().filter((s) => s.ownerId === ownerUserId));
      }
    } catch (err) {
      console.error("Error loading stores:", err);
      setStores(getStores().filter((s) => s.ownerId === ownerUserId));
    }
  }

  async function handleAdd(data: Omit<Store, "id" | "createdAt" | "ownerId">) {
    if (!ownerId) return;

    const result = await createStore({
      name: data.name,
      slug: data.slug,
      description: data.description,
      logo: data.logo,
      heroTitle: data.heroTitle,
      heroDescription: data.heroDescription,
    });

    if (result.error) {
      console.error("Failed to create store:", result.error);
    }

    const newStore: Store = {
      id: result.data?.id || `store-${Date.now()}`,
      ownerId,
      ...data,
      createdAt: result.data?.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
    };

    const next = [newStore, ...getStores()];
    saveStores(next);
    setStores((prev) => [newStore, ...prev]);
    setFormModalOpen(false);
  }

  async function handleEdit(data: Omit<Store, "id" | "createdAt" | "ownerId">) {
    if (!editingStore) return;

    const result = await updateStore(editingStore.id, {
      name: data.name,
      slug: data.slug,
      description: data.description,
      logo: data.logo,
      heroTitle: data.heroTitle,
      heroDescription: data.heroDescription,
    });

    if (result.error) {
      console.error("Failed to update store:", result.error);
    }

    const updated: Store = {
      ...editingStore,
      ...data,
    };

    const next = getStores().map((s) =>
      s.id === editingStore.id ? updated : s,
    );
    saveStores(next);
    setStores((prev) => prev.map((s) => (s.id === editingStore.id ? updated : s)));
    setEditingStore(null);
    setFormModalOpen(false);
  }

  function openAddModal() {
    setEditingStore(null);
    setFormModalOpen(true);
  }

  function openEditModal(storeItem: Store) {
    setEditingStore(storeItem);
    setFormModalOpen(true);
  }

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
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">
                Storefront
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Store
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Create and manage your public storefronts. You can create multiple stores.
              </p>
            </div>
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              Create Store
            </Button>
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">Your Stores</h2>
              <Badge tone="neutral">{stores.length} {stores.length === 1 ? "store" : "stores"}</Badge>
            </div>
          </div>

          {!mounted ? (
            <div className="mt-6 rounded-[20px] border border-slate-200 p-12 text-center">
              <p className="text-sm text-slate-500">Loading stores...</p>
            </div>
          ) : stores.length === 0 ? (
            <div className="mt-6 rounded-[20px] border border-dashed border-slate-300 p-12 text-center">
              <p className="text-lg font-semibold text-slate-950">No stores yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Create your first store to get a public storefront.
              </p>
              <Button className="mt-6" onClick={openAddModal}>
                <Plus className="h-4 w-4" />
                Create Store
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stores.map((storeItem) => (
                <div
                  key={storeItem.id}
                  className="flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {storeItem.logo ? (
                        <img
                          src={storeItem.logo}
                          alt={storeItem.name}
                          className="h-11 w-11 rounded-[14px] object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-violet-600 text-white">
                          <StoreIcon className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-slate-950">{storeItem.name}</p>
                        <p className="text-xs text-slate-500">/{storeItem.slug}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(storeItem)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                    {storeItem.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-500">
                      {storeItem.heroTitle}
                    </p>
                    <Link
                      href={`/store/${storeItem.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition hover:text-violet-700"
                    >
                      View store
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <StoreFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={editingStore ? handleEdit : handleAdd}
        store={editingStore}
      />
    </DashboardShell>
  );
}