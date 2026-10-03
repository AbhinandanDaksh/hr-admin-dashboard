"use client";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-lg",
  className,
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={cn(
          "relative w-full bg-white rounded-2xl shadow-2xl border border-zinc-100 max-h-[90vh] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden",
          maxWidth,
          className
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-zinc-100">
            <div className="space-y-1 pr-6">
              {title && (
                <h3 className="text-base font-bold text-zinc-900 leading-none">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-zinc-500 font-normal">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Close"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
