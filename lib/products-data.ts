import type { LucideIcon } from "lucide-react";
import { BarChart3, Package2, TrendingDown, TrendingUp } from "lucide-react";

export type ProductStatus = "Active" | "Draft" | "Archived";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
  status: ProductStatus;
  createdAt?: string;
};

export type ProductFormData = {
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
  status: ProductStatus;
};

export const productStatuses: ProductStatus[] = ["Active", "Draft", "Archived"];

export const mockProducts: Product[] = [
  { id: "prod-1", name: "Wireless Headphones", description: "Noise-cancelling wireless headphones with 30-hour battery life.", price: "79.99", stock: 24, imageUrl: "", status: "Active", createdAt: "2024-01-15" },
  { id: "prod-2", name: "Running Shoes", description: "Lightweight running shoes with responsive cushioning.", price: "120.00", stock: 12, imageUrl: "", status: "Active", createdAt: "2024-02-20" },
  { id: "prod-3", name: "Classic T-Shirt", description: "Premium cotton t-shirt available in multiple colors.", price: "35.00", stock: 45, imageUrl: "", status: "Draft", createdAt: "2024-03-10" },
];

export type ProductStat = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  comparison: string;
  trend: number[];
};

export type CategoryCard = {
  label: string;
  productCount: string;
  revenue: string;
  growth: string;
  conversion: string;
  tone: "violet" | "sky" | "emerald" | "amber" | "rose" | "slate";
};

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type ProductRow = {
  id: string;
  name: string;
  category: string;
  price: string;
  unitsSold: number;
  revenue: string;
  conversion: string;
  stock: StockStatus;
  color: string;
};

export type BestSeller = {
  id: string;
  name: string;
  category: string;
  units: number;
  revenue: string;
  conversion: string;
  rating: string;
  reviews: number;
  trend: string;
  color: string;
};

export type ProductAlert = {
  title: string;
  description: string;
  loss: string;
  priority: "High" | "Medium" | "Low";
};

export type AIInsight = {
  title: string;
  description: string;
  impact: string;
  actions: string[];
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
};

export type InventoryInsight = {
  label: string;
  value: string;
  description: string;
};

export type ProductTimelineEvent = {
  event: string;
  time: string;
  amount?: string;
};

export type ProductNote = {
  author: string;
  text: string;
  time: string;
};

export type ProductDetail = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageColor: string;
  inventory: { inStock: number; reserved: number; threshold: number };
  revenue: string;
  unitsSold: number;
  conversion: string;
  rating: string;
  reviews: number;
  favoriteProducts: string[];
  timeline: ProductTimelineEvent[];
  notes: ProductNote[];
};

export const productStats: ProductStat[] = [
  {
    title: "Total Products",
    value: "342",
    change: "+4.1%",
    changeType: "positive",
    icon: Package2,
    comparison: "vs previous period",
    trend: [32, 36, 34, 42, 38, 46, 48],
  },
  {
    title: "Top Performing",
    value: "84",
    change: "+7.3%",
    changeType: "positive",
    icon: TrendingUp,
    comparison: "of catalog",
    trend: [28, 32, 30, 44, 40, 48, 52],
  },
  {
    title: "Low Performing",
    value: "26",
    change: "-5.2%",
    changeType: "negative",
    icon: TrendingDown,
    comparison: "of catalog",
    trend: [40, 38, 34, 30, 28, 26, 24],
  },
  {
    title: "Avg. Conversion",
    value: "3.4%",
    change: "+0.8%",
    changeType: "positive",
    icon: BarChart3,
    comparison: "across catalog",
    trend: [30, 32, 34, 36, 34, 38, 36],
  },
];

export const productCategories: CategoryCard[] = [
  { label: "Electronics", productCount: "68", revenue: "$184.2K", growth: "+8.2%", conversion: "2.6%", tone: "violet" },
  { label: "Fashion", productCount: "124", revenue: "$92.8K", growth: "+5.3%", conversion: "3.1%", tone: "sky" },
  { label: "Home", productCount: "46", revenue: "$68.4K", growth: "+3.7%", conversion: "4.2%", tone: "emerald" },
  { label: "Accessories", productCount: "72", revenue: "$42.1K", growth: "+6.8%", conversion: "2.9%", tone: "amber" },
  { label: "Beauty", productCount: "34", revenue: "$28.6K", growth: "+2.1%", conversion: "3.8%", tone: "rose" },
];

export const productRows: ProductRow[] = [
  { id: "#PROD-1084", name: "Aurora Jacket", category: "Fashion", price: "$149.99", unitsSold: 184, revenue: "$27.6K", conversion: "3.8%", stock: "In Stock", color: "bg-violet-200" },
  { id: "#PROD-1041", name: "Lumen Backpack", category: "Accessories", price: "$89.50", unitsSold: 156, revenue: "$14.0K", conversion: "4.1%", stock: "Low Stock", color: "bg-sky-200" },
  { id: "#PROD-1022", name: "North Bottle", category: "Home", price: "$42.00", unitsSold: 312, revenue: "$13.1K", conversion: "2.2%", stock: "In Stock", color: "bg-emerald-200" },
  { id: "#PROD-0998", name: "Cable Kit Pro", category: "Electronics", price: "$34.90", unitsSold: 88, revenue: "$3.1K", conversion: "1.4%", stock: "Out of Stock", color: "bg-rose-200" },
  { id: " #PROD-0977", name: "Apex Headphones", category: "Electronics", price: "$249.00", unitsSold: 64, revenue: "$16.0K", conversion: "2.9%", stock: "In Stock", color: "bg-amber-200" },
  { id: "#PROD-0961", name: "Cashmere Scarf", category: "Fashion", price: "$79.99", unitsSold: 42, revenue: "$3.4K", conversion: "1.1%", stock: "In Stock", color: "bg-slate-200" },
  { id: "#PROD-0943", name: "Minimalist Lamp", category: "Home", price: "$129.00", unitsSold: 28, revenue: "$3.6K", conversion: "3.6%", stock: "Low Stock", color: "bg-violet-200" },
];

export const bestSellers: BestSeller[] = [
  { id: "#PROD-1084", name: "Aurora Jacket", category: "Fashion", units: 184, revenue: "$27.6K", conversion: "3.8%", rating: "4.8", reviews: 128, trend: "+18%", color: "bg-violet-200" },
  { id: "#PROD-1041", name: "Lumen Backpack", category: "Accessories", units: 156, revenue: "$14.0K", conversion: "4.1%", rating: "4.6", reviews: 96, trend: "+12%", color: "bg-sky-200" },
  { id: "#PROD-1022", name: "North Bottle", category: "Home", units: 312, revenue: "$13.1K", conversion: "2.2%", rating: "4.9", reviews: 256, trend: "+5%", color: "bg-emerald-200" },
  { id: "#PROD-0977", name: "Apex Headphones", category: "Electronics", units: 64, revenue: "$16.0K", conversion: "2.9%", rating: "4.5", reviews: 54, trend: "+24%", color: "bg-amber-200" },
];

export const productAlerts: ProductAlert[] = [
  { title: "Low conversion rate", description: "Aurora Jacket has high traffic but a 3.8% conversion rate, below category average for premium Fashion.", loss: "$5,800", priority: "High" },
  { title: "Low sales volume", description: "Cable Kit Pro units sold dropped 32% month-over-month despite steady views.", loss: "$4,200", priority: "High" },
  { title: "Out of stock", description: "Cable Kit Pro is out of stock, missing an estimated 42 daily orders.", loss: "$12,600", priority: "High" },
  { title: "High refund rate", description: "Cashmere Scarf has a 9% refund rate, well above the 2% category baseline.", loss: "$2,400", priority: "Medium" },
  { title: "Low customer rating", description: "Cable Kit Pro's rating dropped to 2.1 stars after shipping complaints.", loss: "$1,800", priority: "Medium" },
];

export const productAIInsight: AIInsight = {
  title: "Apex Headphones have high traffic but low conversion",
  description:
    "AI detected that Apex Headphones receive 3.2x more views than comparable electronics but convert at only 1.1%, with cart abandonment spiking at the shipping cost step. Optimizing the product page and bundling options could recapture significant demand.",
  impact: "$5,800",
  actions: [
    "Improve product images and video",
    "Optimize pricing and shipping costs",
    "Update product description with specs",
    "Offer bundle discounts with accessories",
  ],
};

export const recentProductActivity: ActivityItem[] = [
  { title: "Best seller identified", detail: "Aurora Jacket became the top-selling product of the month.", time: "4h ago" },
  { title: "Inventory running low", detail: "Lumen Backpack stock fell below the 10-unit threshold.", time: "12h ago" },
  { title: "Product price updated", detail: "North Bottle price adjusted by +5% for peak season.", time: "1d ago" },
  { title: "New product added", detail: "Apex Headphones added to the Electronics catalog.", time: "2d ago" },
  { title: "Refund rate increased", detail: "Cashmere Scarf refund rate rose above the alert threshold.", time: "2d ago" },
];

export const inventoryInsights: InventoryInsight[] = [
  { label: "In Stock", value: "286", description: "products available for purchase." },
  { label: "Low Stock", value: "34", description: "products nearing reorder threshold." },
  { label: "Out of Stock", value: "22", description: "products unavailable to customers." },
  { label: "Inventory Value", value: "$184.2K", description: "total on-hand product value." },
  { label: "Top Category", value: "Fashion", description: "highest revenue per catalog share." },
];

export const productDetails: Record<string, ProductDetail> = {
  "#PROD-1084": {
    id: "#PROD-1084",
    name: "Aurora Jacket",
    category: "Fashion",
    price: "$149.99",
    description:
      "A premium insulated jacket with recycled down fill, storm flap, and adjustable hood. Available in 6 colors.",
    imageColor: "bg-violet-200",
    inventory: { inStock: 42, reserved: 8, threshold: 12 },
    revenue: "$27.6K",
    unitsSold: 184,
    conversion: "3.8%",
    rating: "4.8",
    reviews: 128,
    favoriteProducts: ["Aurora Jacket", "North Bottle", "Lumen Backpack"],
    timeline: [
      { event: "New product added", time: "Feb 12, 2024", amount: "$149.99" },
      { event: "Price updated", time: "Mar 3, 2024", amount: "+$10.00" },
      { event: "Stock restocked", time: "Aug 1, 2025", amount: "+50 units" },
    ],
    notes: [
      { author: "Alicia Lane", text: "Consider featuring in the next seasonal campaign.", time: "Aug 1, 2025" },
      { author: "System", text: "Conversion improved 18% after image refresh.", time: "Jul 20, 2025" },
    ],
  },
  "#PROD-0998": {
    id: "#PROD-0998",
    name: "Cable Kit Pro",
    category: "Electronics",
    price: "$34.90",
    description: "A complete cable management kit with 24 connectors, sleeves, and organizers for home and office.",
    imageColor: "bg-rose-200",
    inventory: { inStock: 0, reserved: 0, threshold: 20 },
    revenue: "$3.1K",
    unitsSold: 88,
    conversion: "1.4%",
    rating: "2.1",
    reviews: 34,
    favoriteProducts: ["Cable Kit Pro", "Apex Headphones"],
    timeline: [
      { event: "New product added", time: "Nov 8, 2023", amount: "$34.90" },
      { event: "Stock depleted", time: "Aug 1, 2025", amount: "0 units" },
      { event: "Refund spike", time: "Jul 29, 2025", amount: "+42%" },
    ],
    notes: [
      { author: "Alicia Lane", text: "Investigate shipping damage complaints.", time: "Jul 15, 2025" },
      { author: "System", text: "Out of stock — 42 daily orders missed.", time: "Aug 1, 2025" },
    ],
  },
};

export const productDetail: ProductDetail = productDetails["#PROD-1084"];
