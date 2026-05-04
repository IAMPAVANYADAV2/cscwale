"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastMessage {
  id: number;
  type: "success" | "error";
  message: string;
}

let toastId = 0;
const listeners: Set<(toast: ToastMessage) => void> = new Set();

type ToastType = ToastMessage["type"];

export function showToast(type: ToastType, message: string): void;
export function showToast(message: string, type: ToastType): void;
export function showToast(first: ToastType | string, second: ToastType | string) {
  const type: ToastType =
    first === "success" || first === "error" ? first : (second as ToastType);
  const message =
    first === "success" || first === "error" ? second : first;
  const toast: ToastMessage = { id: ++toastId, type, message };
  listeners.forEach((fn) => fn(toast));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (toast: ToastMessage) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg text-sm animate-[fadeInUp_0.2s_ease-out] ${
            toast.type === "success"
              ? "bg-green-900/90 border-green-600/50 text-green-200"
              : "bg-red-900/90 border-red-600/50 text-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button onClick={() => dismiss(toast.id)} className="p-0.5 hover:opacity-70">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
