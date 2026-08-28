"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { addOrder, generateOrderId } from "@/lib/store-data";
import { placeOrder } from "@/app/actions";
import type { CustomerInfo, Store } from "@/lib/store-data";

type CheckoutFormProps = {
  store: Store;
};

const emptyCustomer: CustomerInfo = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export function CheckoutForm({ store }: CheckoutFormProps) {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const shipping = 0;
  const total = subtotal + shipping;

  function validate() {
    const next: Record<string, string> = {};
    if (!customer.name.trim()) next.name = "Full name is required";
    if (!customer.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) next.email = "Enter a valid email";
    if (!customer.phone.trim()) next.phone = "Phone is required";
    if (!customer.address.trim()) next.address = "Address is required";
    if (!customer.city.trim()) next.city = "City is required";
    if (!customer.postalCode.trim()) next.postalCode = "Postal code is required";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (items.length === 0) return;

    setPlacing(true);

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    const result = await placeOrder({
      storeSlug: store.slug,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        postalCode: customer.postalCode.trim(),
      },
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal,
      shipping,
      total,
    });

    if (result.error) {
      console.error("Failed to place order:", result.error);
      setSubmitError(result.error);
      setPlacing(false);
      return;
    }

    const localOrder = {
      id: result.orderId ?? orderId,
      storeId: store.id,
      customer,
      items,
      subtotal,
      shipping,
      total,
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
    };

    addOrder(localOrder);
    clearCart();
    router.push(`/store/${store.slug}/order-success?order=${localOrder.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitError ? (
        <p role="alert" className="rounded-[10px] bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {submitError}
        </p>
      ) : null}

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Customer Information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          No account needed for this checkout.
        </p>
      </div>

      <Input
        label="Full Name"
        value={customer.name}
        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        placeholder="e.g. Jane Doe"
        error={errors.name}
        autoFocus
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          placeholder="jane@example.com"
          error={errors.email}
        />
        <Input
          label="Phone"
          type="tel"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          placeholder="+1 555 000 0000"
          error={errors.phone}
        />
      </div>

      <Input
        label="Address"
        value={customer.address}
        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        placeholder="123 Main Street"
        error={errors.address}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="City"
          value={customer.city}
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
          placeholder="New York"
          error={errors.city}
        />
        <Input
          label="Postal Code"
          value={customer.postalCode}
          onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
          placeholder="10001"
          error={errors.postalCode}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
        <Button type="submit" disabled={placing || items.length === 0}>
          {placing ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </form>
  );
}