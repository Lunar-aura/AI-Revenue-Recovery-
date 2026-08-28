import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Store } from "@/lib/store-data";

type StoreHeroProps = {
  store: Store;
};

export function StoreHero({ store }: StoreHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-slate-950 to-slate-900" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-300">
          {store.name}
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {store.heroTitle}
        </h1>
        <p className="max-w-xl text-lg leading-7 text-slate-300">
          {store.heroDescription}
        </p>
        <Link
          href={`/store/${store.slug}#products`}
          className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] transition hover:bg-violet-700"
        >
          Shop Now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}