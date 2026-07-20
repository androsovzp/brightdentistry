import React from 'react';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-slate-900/90 text-white backdrop-blur-md border border-brand-500/30 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md">
        {toast.type === 'info' ? (
          <Info className="w-5 h-5 text-sky-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
        )}
        <div className="text-xs font-medium text-slate-100">{toast.message}</div>
      </div>
    </div>
  );
}
