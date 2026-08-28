import Link from "next/link";
import { Store as StoreIcon } from "lucide-react";
import type { Store } from "@/lib/store-data";

type StoreFooterProps = {
  store: Store;
};

export function StoreFooter({ store }: StoreFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          {store.logo ? (
            <img
              src={store.logo}
              alt={store.name}
              className="h-8 w-8 rounded-[10px] object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white">
              <StoreIcon className="h-4 w-4" />
            </div>
          )}
          <div>
            <p className="font-semibold tracking-tight text-slate-950">{store.name}</p>
            <p className="text-sm text-slate-500">{store.description}</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href={`/store/${store.slug}`}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Home
          </Link>
          <Link
            href={`/store/${store.slug}#products`}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Products
          </Link>
          <Link
            href={`/store/${store.slug}/cart`}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Cart
          </Link>
        </nav>

        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} {store.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}