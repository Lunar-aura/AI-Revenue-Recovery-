import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ShoppingBag, Calendar, MapPin, CreditCard, Package, FileText } from "lucide-react";
import type { CustomerDetail } from "@/lib/customers-data";

type CustomerProfileDrawerProps = {
  open: boolean;
  customer: CustomerDetail | null;
  onClose: () => void;
};

export function CustomerProfileDrawer({ open, customer, onClose }: CustomerProfileDrawerProps) {
  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 p-4" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Avatar name={customer.name} tone="violet" />
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Customer profile</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">{customer.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{customer.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="violet">{customer.status}</Badge>
          <Badge tone="amber">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-current" />
              {customer.loyalty}
            </span>
          </Badge>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <Calendar className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Member since</p>
              <p className="mt-2 text-sm text-slate-600">{customer.joinDate}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Location</p>
              <p className="mt-2 text-sm text-slate-600">{customer.location}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <CreditCard className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Lifetime value</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{customer.lifetimeValue}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <ShoppingBag className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Orders placed</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{customer.orders}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900">Favorite products</p>
          </div>
          <div className="mt-4 space-y-2">
            {customer.favoriteProducts.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-[14px] bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <span>{item}</span>
                <span className="font-semibold text-slate-900">x3</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900">Order timeline</p>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {customer.timeline.map((step) => (
              <div key={step.event + step.time} className="flex justify-between">
                <div>
                  <span className="text-slate-600">{step.event}</span>
                  {step.amount ? <span className="ml-2 text-slate-500">({step.amount})</span> : null}
                </div>
                <span className="font-medium text-slate-900">{step.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900">Customer notes</p>
          </div>
          <div className="mt-4 space-y-3">
            {customer.notes.map((note) => (
              <div key={note.time} className="rounded-[14px] bg-slate-50 px-3 py-2.5">
                <p className="text-sm text-slate-600">{note.text}</p>
                <p className="mt-1 text-xs text-slate-500">— {note.author}, {note.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          <Button variant="primary">Send message</Button>
          <Button variant="secondary">Offer discount</Button>
          <Button variant="secondary">Add note</Button>
        </div>
      </div>
    </div>
  );
}
