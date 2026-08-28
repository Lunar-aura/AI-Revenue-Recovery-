"use client";

import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";

type DeleteProductModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
};

export function DeleteProductModal({ open, onClose, onConfirm, productName }: DeleteProductModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Product">
      <div className="mt-2">
        <p className="text-sm text-slate-600">
          Are you sure you want to delete <span className="font-semibold text-slate-900">"{productName}"</span>? This action cannot be undone.
        </p>
      </div>
      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} className="bg-rose-600 shadow-[0_10px_30px_-16px_rgba(225,29,72,0.65)] hover:bg-rose-700">
          Delete
        </Button>
      </div>
    </Modal>
  );
}
