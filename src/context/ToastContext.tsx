"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Trash2,
  HelpCircle,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";

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

      {/* Floating Glassmorphic Toast Stack */}
      <div
        id="custom-toast-container"
        className="fixed top-5 right-5 z-[999999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((item) => {
          const isSuccess = item.type === "success";
          const isError = item.type === "error";
          const isWarning = item.type === "warning";
          const isInfo = item.type === "info";

          const auraGlow = isSuccess
            ? "from-emerald-500/25 via-teal-500/20 to-cyan-500/25"
            : isError
            ? "from-rose-500/30 via-red-500/25 to-amber-500/30"
            : isWarning
            ? "from-amber-500/30 via-orange-500/25 to-yellow-500/30"
            : "from-cyan-500/25 via-indigo-500/20 to-purple-500/25";

          const iconContainer = isSuccess
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            : isError
            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            : isWarning
            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]";

          const badgeColor = isSuccess
            ? "text-emerald-300 border-emerald-500/30 bg-emerald-500/15"
            : isError
            ? "text-rose-300 border-rose-500/30 bg-rose-500/15"
            : isWarning
            ? "text-amber-300 border-amber-500/30 bg-amber-500/15"
            : "text-cyan-300 border-cyan-500/30 bg-cyan-500/15";

          const barColor = isSuccess
            ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
            : isError
            ? "bg-gradient-to-r from-rose-500 via-red-500 to-amber-500"
            : isWarning
            ? "bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400"
            : "bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500";

          return (
            <div key={item.id} className="relative group pointer-events-auto">
              {/* Prismatic Backlight glow */}
              <div className={`absolute -inset-1 rounded-2xl blur-lg opacity-75 bg-gradient-to-r ${auraGlow} -z-10`} />

              {/* Frosted Glass Toast Dock */}
              <div className="rounded-2xl border border-white/20 bg-[#0c1222]/80 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] p-4 text-white relative overflow-hidden transition-all duration-300 animate-[toastSlideIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                {/* Twinkling ambient night particles */}
                <div className="absolute top-2 right-12 w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px] shadow-[0_0_6px_rgba(255,255,255,0.8)] pointer-events-none" />
                <div className="absolute bottom-2 left-10 w-1 h-1 rounded-full bg-cyan-300/80 blur-[0.5px] pointer-events-none" />

                <div className="flex items-start gap-3 relative z-10">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-xl ${iconContainer}`}>
                    {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                    {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                    {isInfo && <Info className="w-5 h-5 text-cyan-400" />}
                  </div>

                  <div className="flex-grow min-w-0 pr-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-sm ${badgeColor}`}>
                        {isSuccess ? "CONFIRMED" : isError ? "ERROR" : isWarning ? "ATTENTION" : "SANCTUARY NOTICE"}
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
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center shrink-0 transition-colors border border-white/10 cursor-pointer"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Glassmorphic progress countdown bar */}
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
            </div>
          );
        })}
      </div>

      {/* Custom High-Altitude Ultra-Glassmorphism Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in">
          {/* Prismatic AI Backlight Glow (Matching the Hero Bar screenshot) */}
          <div className="relative w-full max-w-lg">
            <div
              className={`absolute -inset-2 rounded-[36px] blur-2xl opacity-80 -z-10 pointer-events-none transition-all duration-500 ${
                confirmDialog.type === "danger"
                  ? "bg-gradient-to-r from-rose-500/35 via-red-500/25 to-amber-500/35"
                  : confirmDialog.type === "warning"
                  ? "bg-gradient-to-r from-amber-500/35 via-orange-500/25 to-yellow-500/35"
                  : confirmDialog.type === "success"
                  ? "bg-gradient-to-r from-emerald-500/35 via-cyan-500/25 to-teal-500/35"
                  : "bg-gradient-to-r from-cyan-500/35 via-indigo-500/25 to-purple-500/35"
              }`}
            />

            {/* Frosted Glass Floating Dock Container */}
            <div
              className="relative w-full bg-[#0c1222]/80 backdrop-blur-3xl rounded-[32px] border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] p-6 sm:p-8 space-y-6 overflow-hidden animate-[modalScaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              role="dialog"
              aria-modal="true"
            >
              {/* Alpine Night Sky Twinkling Ambient Particles (Matching the stars in the screenshot) */}
              <div className="absolute top-5 left-10 w-1.5 h-1.5 rounded-full bg-white/80 blur-[0.5px] shadow-[0_0_8px_rgba(255,255,255,0.95)] animate-pulse pointer-events-none" />
              <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-cyan-300/90 blur-[0.5px] shadow-[0_0_8px_rgba(6,182,212,0.95)] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-16 left-6 w-1 h-1 rounded-full bg-purple-300/80 blur-[0.5px] shadow-[0_0_6px_rgba(168,85,247,0.8)] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header Bar with Alpine Telemetry */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-300 bg-cyan-500/15 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    SANCTUARY CMS PROTOCOL • 4,130M
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleConfirmAction(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                  aria-label="Dismiss Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Icon & Message Body */}
              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xl border backdrop-blur-xl ${
                    confirmDialog.type === "danger"
                      ? "bg-rose-500/20 text-rose-400 border-rose-500/30 shadow-rose-950/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                      : confirmDialog.type === "warning"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-amber-950/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                      : confirmDialog.type === "success"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-emerald-950/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-cyan-950/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {confirmDialog.type === "danger" ? (
                    <Trash2 className="w-7 h-7 text-rose-400 animate-pulse" />
                  ) : confirmDialog.type === "warning" ? (
                    <AlertTriangle className="w-7 h-7 text-amber-400" />
                  ) : confirmDialog.type === "success" ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  ) : (
                    <HelpCircle className="w-7 h-7 text-cyan-400" />
                  )}
                </div>

                <div className="space-y-1.5 flex-grow min-w-0">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {confirmDialog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words font-medium">
                    {confirmDialog.message}
                  </p>
                </div>
              </div>

              {/* Glassmorphic Action Buttons Dock (Pill CTA matching the screenshot's 'Search Availability' button) */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleConfirmAction(false)}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider border border-white/15 hover:border-white/30 backdrop-blur-xl shadow-lg transition-all cursor-pointer text-center"
                >
                  {confirmDialog.cancelText}
                </button>
                <button
                  type="button"
                  autoFocus
                  onClick={() => handleConfirmAction(true)}
                  className={`px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group ${
                    confirmDialog.type === "danger"
                      ? "bg-gradient-to-r from-rose-600 via-red-500 to-amber-500 hover:from-rose-500 hover:via-red-400 hover:to-amber-400 shadow-rose-600/40 hover:shadow-rose-500/60"
                      : confirmDialog.type === "warning"
                      ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-400 hover:via-orange-400 hover:to-yellow-400 shadow-amber-500/40 hover:shadow-amber-400/60"
                      : confirmDialog.type === "success"
                      ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 shadow-emerald-500/40 hover:shadow-emerald-400/60"
                      : "bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/35 hover:shadow-cyan-500/50"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white/80 group-hover:rotate-12 transition-transform duration-200" />
                  <span>{confirmDialog.confirmText}</span>
                </button>
              </div>

              {/* Bottom Telemetry Status Line (Matching the bottom trust badges in the user's screenshot) */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] font-mono text-slate-300 pt-3 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
                  Real-Time Sanctuary Sync
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-indigo-300">
                  <Zap className="w-3 h-3 text-indigo-400" />
                  Instant Executive Execution
                </span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Direct PostgreSQL Verified
                </span>
              </div>
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
