import React, { useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Check, Sparkles, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function ProductModal() {
  const { activeModalProduct, setActiveModalProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!activeModalProduct) return null;

  const handleAddToCart = () => {
    addToCart(activeModalProduct, quantity);
    setActiveModalProduct(null);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Box */}
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-rose-100 relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setActiveModalProduct(null);
            setQuantity(1);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-rose-50 hover:bg-rose-100 text-slate-600 hover:text-brand-600 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          
          {/* Product Image */}
          <div className="bg-gradient-to-b from-rose-50/50 to-white rounded-2xl p-4 border border-rose-100/60 flex items-center justify-center min-h-[260px] relative">
            <img
              src={activeModalProduct.image || '/images/products/placeholder.webp'}
              alt={activeModalProduct.title}
              className="max-h-64 object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/300x300/fce7f3/db2777?text=Bright+Dentistry';
              }}
            />
            <div className="absolute top-3 left-3 bg-brand-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
              {activeModalProduct.category}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-400">
                  Код товару: <strong className="text-brand-600">{activeModalProduct.code}</strong>
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium border border-emerald-100 flex items-center gap-1">
                  <Check className="w-3 h-3" /> В наявності
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg text-slate-900 leading-snug">
                {activeModalProduct.title}
              </h2>
            </div>

            {/* Price */}
            <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Ціна:</span>
                <div className="font-heading font-extrabold text-2xl text-brand-600">
                  {activeModalProduct.priceFormatted}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                Клініка Bright Dentistry<br />
                <span className="text-brand-600 font-semibold">100% Оригінал</span>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-600 max-h-44 overflow-y-auto pr-2 space-y-2 leading-relaxed">
              <h4 className="font-bold text-slate-800 text-xs">Опис та особливості:</h4>
              <p className="whitespace-pre-line">
                {activeModalProduct.description || 'Якісний стоматологічний засіб для щоденного догляду за ротовою порожниною.'}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="pt-3 border-t border-rose-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Кількість:</span>
                <div className="flex items-center border border-rose-200 rounded-full bg-rose-50/50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-white text-slate-700 hover:text-brand-600 flex items-center justify-center shadow-xs transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white text-slate-700 hover:text-brand-600 flex items-center justify-center shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Додати в кошик ({activeModalProduct.price * quantity} грн)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
