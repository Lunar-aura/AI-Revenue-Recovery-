// ============================================================
// Store / Product / Cart / Order types and mock data
// Frontend-only MVP. No Supabase integration yet.
//
// Data model (for future Supabase):
//   user (ownerId) → one store → many products
//   storeId → customer → order → orderItems
// ============================================================

export type Store = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  heroTitle: string;
  heroDescription: string;
  createdAt?: string;
};

export type StoreProduct = {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  active: boolean;
};

export type CartItem = {
  product: StoreProduct;
  quantity: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  storeId: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

// ------------------------------------------------------------
// Mock data
// ------------------------------------------------------------

export const mockStores: Store[] = [
  {
    id: "store-1",
    ownerId: "demo@example.com",
    name: "Fatima Fashion",
    slug: "fatima-fashion",
    description: "Modern fashion essentials for every wardrobe.",
    logo: "",
    heroTitle: "Welcome to Fatima Fashion",
    heroDescription: "Discover our latest collection.",
    createdAt: "2024-01-10",
  },
  {
    id: "store-2",
    ownerId: "tech@example.com",
    name: "Tech Store",
    slug: "tech-store",
    description: "Premium electronics and accessories.",
    logo: "",
    heroTitle: "Welcome to Tech Store",
    heroDescription: "Gear up with the latest tech.",
    createdAt: "2024-02-15",
  },
];

export const mockStoreProducts: StoreProduct[] = [
  {
    id: "store-prod-1",
    storeId: "store-1",
    name: "Classic T-Shirt",
    description: "Premium cotton t-shirt available in multiple colors.",
    price: "35.00",
    image: "",
    stock: 45,
    active: true,
  },
  {
    id: "store-prod-2",
    storeId: "store-1",
    name: "Running Shoes",
    description: "Lightweight running shoes with responsive cushioning.",
    price: "120.00",
    image: "",
    stock: 12,
    active: true,
  },
  {
    id: "store-prod-3",
    storeId: "store-1",
    name: "Cozy Hoodie",
    description: "Soft fleece hoodie for everyday comfort.",
    price: "65.00",
    image: "",
    stock: 28,
    active: true,
  },
  {
    id: "store-prod-4",
    storeId: "store-2",
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 30-hour battery life.",
    price: "79.99",
    image: "",
    stock: 24,
    active: true,
  },
  {
    id: "store-prod-5",
    storeId: "store-2",
    name: "Mechanical Keyboard",
    description: "Tactile mechanical keyboard with RGB backlighting.",
    price: "129.00",
    image: "",
    stock: 18,
    active: true,
  },
  {
    id: "store-prod-6",
    storeId: "store-2",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking.",
    price: "49.99",
    image: "",
    stock: 36,
    active: true,
  },
];

// ------------------------------------------------------------
// localStorage helpers (client-only)
// ------------------------------------------------------------

const STORES_KEY = "app_stores";
const PRODUCTS_KEY = "app_products";
const ORDERS_KEY = "app_orders";

function isBrowser() {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

// Stores
export function getStores(): Store[] {
  return readJSON<Store[]>(STORES_KEY, mockStores);
}

export function saveStores(stores: Store[]) {
  writeJSON(STORES_KEY, stores);
}

export function getStoreBySlug(slug: string): Store | undefined {
  return getStores().find((s) => s.slug === slug);
}

export function getStoreById(id: string): Store | undefined {
  return getStores().find((s) => s.id === id);
}

// One store per owner (user). Returns the single store owned by this user.
export function getStoreByOwner(ownerId: string): Store | undefined {
  return getStores().find((s) => s.ownerId === ownerId);
}

// Products
export function getStoreProducts(): StoreProduct[] {
  return readJSON<StoreProduct[]>(PRODUCTS_KEY, mockStoreProducts);
}

export function saveStoreProducts(products: StoreProduct[]) {
  writeJSON(PRODUCTS_KEY, products);
}

export function getProductsForStore(storeId: string): StoreProduct[] {
  return getStoreProducts().filter(
    (p) => p.storeId === storeId && p.active,
  );
}

// All products (including inactive) for a store — used by the admin dashboard.
export function getProductsForStoreAdmin(storeId: string): StoreProduct[] {
  return getStoreProducts().filter((p) => p.storeId === storeId);
}

// Products for the store owned by this user.
export function getStoreProductsForOwner(ownerId: string): StoreProduct[] {
  const store = getStoreByOwner(ownerId);
  if (!store) return [];
  return getProductsForStoreAdmin(store.id);
}

export function getProductById(id: string): StoreProduct | undefined {
  return getStoreProducts().find((p) => p.id === id);
}

// Orders
export function getOrders(): Order[] {
  return readJSON<Order[]>(ORDERS_KEY, []);
}

export function saveOrders(orders: Order[]) {
  writeJSON(ORDERS_KEY, orders);
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function getOrdersForStore(storeId: string): Order[] {
  return getOrders().filter((o) => o.storeId === storeId);
}

// Orders for the store owned by this user.
export function getOrdersForOwner(ownerId: string): Order[] {
  const store = getStoreByOwner(ownerId);
  if (!store) return [];
  return getOrdersForStore(store.id);
}

// Helpers
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(value: string | number): string {
  const num = typeof value === "string" ? Number(value) : value;
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function generateOrderId(): string {
  return `ORD-${Date.now().toString().slice(-6)}`;
}