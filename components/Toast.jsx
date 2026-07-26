import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Toast() {
  const { toast, setToast } = useCart();

  // Auto-dismiss timer after 3.2 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      if (setToast) setToast(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md animate-in slide-in-from-bottom-5 fade-in duration-300 px-2 pointer-events-auto">
      <div className="bg-slate-900/95 text-white backdrop-blur-md border border-brand-400/40 px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
          )}
          <div className="text-xs font-semibold text-slate-100 leading-snug line-clamp-2">
            {toast.message}
          </div>
        </div>

        <button
          onClick={() => setToast && setToast(null)}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          title="Закрити"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

