"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<ConfirmOptions>({ title: "", message: "" });
  const resolveRef = useRef<((v: boolean) => void) | null>(null);

  const confirm: ConfirmFn = useCallback((options) => {
    return new Promise((resolve) => {
      setOpts(options);
      setOpen(true);
      resolveRef.current = resolve;
    });
  }, []);

  const close = (result: boolean) => {
    setOpen(false);
    resolveRef.current?.(result);
    resolveRef.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => close(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                transition={{ type: "spring", damping: 22, stiffness: 280 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-sm pointer-events-auto"
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-7">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${opts.danger ? "bg-rose-50" : "bg-amber-50"}`}>
                      {opts.danger
                        ? <Trash2 size={20} className="text-rose-500" />
                        : <AlertTriangle size={20} className="text-amber-500" />}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-black text-[#1e293b] text-base leading-tight">{opts.title}</h3>
                      <p className="text-sm text-gray-500 font-medium mt-2 leading-relaxed">{opts.message}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => close(false)}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#1e293b] hover:border-slate-300 transition-all cursor-pointer"
                    >
                      {opts.cancelText ?? "Batal"}
                    </button>
                    <button
                      onClick={() => close(true)}
                      className={`flex-[2] py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-all cursor-pointer ${opts.danger ? "bg-rose-500 hover:bg-rose-600" : "bg-[#1e293b] hover:bg-[#0f172a]"}`}
                    >
                      {opts.confirmText ?? "Ya, Lanjutkan"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be inside ConfirmProvider");
  return ctx;
}
