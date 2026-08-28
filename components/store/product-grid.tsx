import { ProductCard } from "@/components/store/product-card";
import type { StoreProduct } from "@/lib/store-data";

type ProductGridProps = {
  products: StoreProduct[];
  storeSlug: string;
};

export function ProductGrid({ products, storeSlug }: ProductGridProps) {
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">
          Our products
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Featured Products
        </h2>
        <p className="text-base leading-7 text-slate-600">
          Explore our latest collection.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-950">No products yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Products will appear here once they are added.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
          ))}
        </div>
      )}
    </section>
  );
}