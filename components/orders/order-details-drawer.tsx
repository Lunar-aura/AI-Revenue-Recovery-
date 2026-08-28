import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Package, CreditCard, MapPin, User, FileText } from "lucide-react";
import type { OrderDetail } from "@/lib/orders-data";

type OrderDetailsDrawerProps = {
  open: boolean;
  order: OrderDetail | null;
  onClose: () => void;
};

export function OrderDetailsDrawer({ open, order, onClose }: OrderDetailsDrawerProps) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 p-4" onClick={onClose}>
      <div className="flex h-full w-full max-w-xl flex-col overflow-y-auto rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Order details</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">{order.id}</h2>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Badge tone="violet">{order.status}</Badge>
        </div>

        <div className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
              <User className="mt-0.5 h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Customer</p>
                <p className="mt-2 text-sm text-slate-600">{order.customer}</p>
                <p className="mt-1 text-sm text-slate-500">{order.email}</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
              <CreditCard className="mt-0.5 h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Payment</p>
                <p className="mt-2 text-sm text-slate-600">{order.payment}</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4 md:col-span-2">
              <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Shipping address</p>
                <p className="mt-2 text-sm text-slate-600">{order.shipping}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-900">Purchased products</p>
            </div>
            <div className="mt-4 space-y-2.5">
              {order.products.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-[14px] bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-900">Timeline</p>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {order.timeline.map((step) => (
                <div key={step.event} className="flex justify-between">
                  <span className="text-slate-600">{step.event}</span>
                  <span className="font-medium text-slate-900">{step.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" />
              <p className="text-sm font-semibold text-slate-900">Order notes</p>
            </div>
            <div className="mt-4 space-y-3">
              {order.notes.map((note) => (
                <div key={note.time} className="rounded-[14px] bg-slate-50 px-3 py-2.5">
                  <p className="text-sm text-slate-600">{note.text}</p>
                  <p className="mt-1 text-xs text-slate-500">— {note.author}, {note.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
            <Button variant="primary">
              <span>Notify customer</span>
            </Button>
            <Button variant="secondary">
              <span>Issue refund</span>
            </Button>
            <Button variant="secondary">
              <span>Retry payment</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
