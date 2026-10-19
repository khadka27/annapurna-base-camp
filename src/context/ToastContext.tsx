"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X, Trash2, HelpCircle } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: "danger" | "warning" | "info" | "success";
  resolve?: (value: boolean) => void;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (message: string, title?: string, duration?: number) => void;
    error: (message: string, title?: string, duration?: number) => void;
    warning: (message: string, title?: string, duration?: number) => void;
    info: (message: string, title?: string, duration?: number) => void;
  };
  confirmModal: (options: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info" | "success";
  }) => Promise<boolean>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: "Confirm Action",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "info",
  });

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", title?: string, duration: number = 4000) => {
      const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7);
      const newToast: ToastItem = { id, type, title, message, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toast = {
    success: useCallback(
      (message: string, title?: string, duration?: number) =>
        addToast(message, "success", title, duration),
      [addToast]
    ),
    error: useCallback(
      (message: string, title?: string, duration?: number) =>
        addToast(message, "error", title, duration),
      [addToast]
    ),
    warning: useCallback(
      (message: string, title?: string, duration?: number) =>
        addToast(message, "warning", title, duration),
      [addToast]
    ),
    info: useCallback(
      (message: string, title?: string, duration?: number) =>
        addToast(message, "info", title, duration),
      [addToast]
    ),
  };

  const confirmModal = useCallback(
    (options: {
      title?: string;
      message: string;
      confirmText?: string;
      cancelText?: string;
      type?: "danger" | "warning" | "info" | "success";
    }): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfirmDialog({
          isOpen: true,
          title: options.title || "Confirmation Required",
          message: options.message,
          confirmText: options.confirmText || "Confirm",
          cancelText: options.cancelText || "Cancel",
          type: options.type || "info",
          resolve,
        });
      });
    },
    []
  );

  const handleConfirmAction = (confirmed: boolean) => {
    if (confirmDialog.resolve) {
      confirmDialog.resolve(confirmed);
    }
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  };

  // Safe client-side interceptor for standard window.alert to automatically use custom toasts
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalAlert = window.alert;
    window.alert = (message?: any) => {
      const msg = String(message ?? "");
      const lower = msg.toLowerCase();
      if (lower.includes("error") || lower.includes("failed") || lower.includes("invalid")) {
        toast.error(msg, "System Notice");
      } else if (lower.includes("success") || lower.includes("updated") || lower.includes("saved") || lower.includes("published") || lower.includes("added")) {
        toast.success(msg, "Action Completed");
      } else if (lower.includes("warning") || lower.includes("must") || lower.includes("please enter")) {
        toast.warning(msg, "Attention Needed");
      } else {
        toast.info(msg, "Notice");
      }
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [toast]);

  // Handle Escape key for confirm dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && confirmDialog.isOpen) {
        handleConfirmAction(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmDialog.isOpen]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast, confirmModal }}>
      {children}

      {/* Floating Custom Toast Stack */}
      <div
        id="custom-toast-container"
        className="fixed top-5 right-5 z-[999999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((item) => {
          const isSuccess = item.type === "success";
          const isError = item.type === "error";
          const isWarning = item.type === "warning";
          const isInfo = item.type === "info";

          const bgStyle = isSuccess
            ? "bg-[#091E16]/95 border-emerald-500/50 shadow-emerald-950/60"
            : isError
            ? "bg-[#250D14]/95 border-rose-500/50 shadow-rose-950/60"
            : isWarning
            ? "bg-[#261807]/95 border-amber-500/50 shadow-amber-950/60"
            : "bg-[#0F1E33]/95 border-[#4F9CF9]/50 shadow-sky-950/60";

          const iconContainer = isSuccess
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : isError
            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
            : isWarning
            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            : "bg-[#4F9CF9]/20 text-[#4F9CF9] border border-[#4F9CF9]/30";

          const badgeText = isSuccess
            ? "SUCCESS"
            : isError
            ? "ERROR"
            : isWarning
            ? "WARNING"
            : "UPDATE";

          const badgeColor = isSuccess
            ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
            : isError
            ? "text-rose-400 border-rose-500/30 bg-rose-500/10"
            : isWarning
            ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
            : "text-[#4F9CF9] border-[#4F9CF9]/30 bg-[#4F9CF9]/10";

          const barColor = isSuccess
            ? "bg-gradient-to-r from-emerald-500 to-teal-400"
            : isError
            ? "bg-gradient-to-r from-rose-500 to-red-500"
            : isWarning
            ? "bg-gradient-to-r from-amber-500 to-orange-400"
            : "bg-gradient-to-r from-[#4F9CF9] to-cyan-400";

          return (
            <div
              key={item.id}
              className={`pointer-events-auto rounded-2xl border backdrop-blur-2xl shadow-2xl p-4 text-white relative overflow-hidden transition-all duration-300 animate-[toastSlideIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards] ${bgStyle}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconContainer}`}>
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                  {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                  {isInfo && <Info className="w-5 h-5 text-[#4F9CF9]" />}
                </div>

                <div className="flex-grow min-w-0 pr-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeColor}`}>
                      {badgeText}
                    </span>
                    {item.title && (
                      <span className="text-xs font-bold text-white tracking-wide truncate">
                        {item.title}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed break-words">
                    {item.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeToast(item.id)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center shrink-0 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Countdown progress bar */}
              {item.duration && item.duration > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                  <div
                    className={`h-full ${barColor}`}
                    style={{
                      animation: `shrinkWidth ${item.duration}ms linear forwards`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom Confirmation Popup Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-md bg-[#1B293D]/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden animate-[modalScaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            role="dialog"
            aria-modal="true"
          >
            {/* Mountain Ambient Glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#4F9CF9]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#F97316]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  confirmDialog.type === "danger"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : confirmDialog.type === "warning"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : confirmDialog.type === "success"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-[#4F9CF9]/20 text-[#4F9CF9] border border-[#4F9CF9]/30"
                }`}
              >
                {confirmDialog.type === "danger" ? (
                  <Trash2 className="w-6 h-6 text-rose-400" />
                ) : confirmDialog.type === "warning" ? (
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                ) : confirmDialog.type === "success" ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : (
                  <HelpCircle className="w-6 h-6 text-[#4F9CF9]" />
                )}
              </div>

              <div className="space-y-1.5 flex-grow min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                  ANNAPURNA CMS VERIFICATION
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => handleConfirmAction(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                {confirmDialog.cancelText}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => handleConfirmAction(true)}
                className={`px-5 py-2.5 rounded-xl text-white text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all cursor-pointer ${
                  confirmDialog.type === "danger"
                    ? "bg-rose-600 hover:bg-rose-500 shadow-rose-900/50"
                    : confirmDialog.type === "warning"
                    ? "bg-amber-600 hover:bg-amber-500 shadow-amber-900/50"
                    : confirmDialog.type === "success"
                    ? "bg-[#16A34A] hover:bg-[#138a3e] shadow-[#16A34A]/40"
                    : "bg-[#4F9CF9] hover:bg-[#3d8be6] text-[#0F172A] shadow-[#4F9CF9]/40"
                }`}
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
