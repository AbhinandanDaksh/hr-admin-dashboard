"use client";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center py-2">
        <div className="w-11 h-11 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-100">
          <FiAlertTriangle className="text-xl" />
        </div>
        <h3 className="text-base font-bold text-zinc-900 mb-1">{title}</h3>
        <p className="text-xs text-zinc-500 mb-6 px-2">{description}</p>

        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 text-xs font-semibold border-zinc-200"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-xs font-semibold text-white shadow-xs ${
              variant === "danger"
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {loading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
