"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProductStatCard } from "@/components/products/product-stat-card";
import { CategoryCard } from "@/components/products/category-card";
import { ProductAnalyticsChart } from "@/components/products/product-analytics-chart";
import { ProductTable } from "@/components/products/product-table";
import { ProductDetailsDrawer } from "@/components/products/product-details-drawer";
import { BestSellerCard } from "@/components/products/best-seller-card";
import { ProductAlertCard } from "@/components/products/product-alert-card";
import { ProductAIInsightCard } from "@/components/products/ai-insight-card";
import { ActivityTimeline } from "@/components/orders/activity-timeline";
import { CustomerInsightCard } from "@/components/orders/customer-insight-card";
import { LoadingSkeleton } from "@/components/orders/loading-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import {
  productStats,
  productCategories,
  productRows,
  bestSellers,
  productAlerts,
  productAIInsight,
  recentProductActivity,
  inventoryInsights,
  productDetails,
} from "@/lib/products-data";
import {
  ArrowDownToLine,
  BadgeCheck,
  Box,
  RefreshCw,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const resolvedProduct = activeProduct ? productDetails[activeProduct] ?? productDetails["#PROD-1084"] : null;

  return (
    <DashboardShell>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Product intelligence</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Products</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Monitor product performance, identify revenue opportunities, and optimize your product catalog.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">
                <Wallet className="h-4 w-4" />
                Last 30 days
              </Button>
              <Button variant="secondary">
                <ArrowDownToLine className="h-4 w-4" />
                Export products
              </Button>
              <Button variant="primary">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {productStats.map((stat) => (
            <ProductStatCard key={stat.title} {...stat} />
          ))}
        </section>

        <section>
          <SectionHeader
            eyebrow="Segments"
            title="Product categories"
            description="Revenue and conversion performance by category."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {productCategories.map((category) => (
              <CategoryCard key={category.label} {...category} />
            ))}
          </div>
        </section>

        <section>
          <ProductAnalyticsChart range="Monthly" />
        </section>

        <section>
          <SectionHeader eyebrow="Attention" title="Products needing attention" description="Products showing issues that risk revenue." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {productAlerts.slice(0, 4).map((alert) => (
              <ProductAlertCard key={alert.title} {...alert} />
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
          <ProductAIInsightCard {...productAIInsight} />
        </section>

        <section>
          <SectionHeader eyebrow="Top sellers" title="Best selling products" description="Your highest-performing products by revenue and demand." />
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {bestSellers.map((product) => (
              <BestSellerCard key={product.id} product={product} onView={() => setActiveProduct(product.id)} />
            ))}
          </div>
        </section>

        <section>
          <ProductTable rows={productRows} onViewProduct={(row) => setActiveProduct(row.id)} />
          <ProductDetailsDrawer
            open={activeProduct !== null}
            product={resolvedProduct}
            onClose={() => setActiveProduct(null)}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ActivityTimeline items={recentProductActivity} />
          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">Inventory overview</h2>
              <p className="mt-1 text-sm text-slate-500">Current stock levels and inventory value.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                {inventoryInsights.map((insight) => (
                  <CustomerInsightCard key={insight.label} {...insight} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <EmptyState
                title="No out-of-stock alerts"
                description="All tracked products are fully stocked. New inventory issues will appear here."
                icon={BadgeCheck}
              />
              <EmptyState
                title="No AI insights"
                description="AI-generated product recommendations will appear here when new opportunities or risks are detected."
                icon={Sparkles}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <EmptyState
            title="No discontinued products"
            description="No products are marked for discontinuation in the selected period."
            icon={Box}
          />
          <EmptyState
            title="No activity to replay"
            description="Once products are connected, historical events will render here."
            icon={Users}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </section>
      </div>
    </DashboardShell>
  );
}
