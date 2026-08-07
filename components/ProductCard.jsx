import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function ProductCard({ product }) {
  const { addToCart, setActiveModalProduct } = useCart();

  return (
    <div className="group bg-white rounded-3xl p-4 border border-rose-100/90 hover:border-brand-300 shadow-xs hover:shadow-md hover-lift flex flex-col justify-between relative transition-all duration-300">
      
      {/* Optional meaningful badge only if explicitly set on a specific product */}
      {product.badge && (
        <div className="absolute -top-2 -right-2 bg-brand-600 text-white font-bold text-[10px] uppercase tracking-wide px-2.5 py-0.5 rounded-full shadow-sm z-20">
          {product.badge}
        </div>
      )}

      {/* Category Badge & Code */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="bg-rose-50 text-brand-700 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-rose-100">
          {product.category}
        </span>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
          Код: {product.code}
        </span>
      </div>

      {/* Image Container with Eye Hover action */}
      <div className="relative w-full h-48 bg-gradient-to-b from-rose-50/40 to-white rounded-2xl overflow-hidden mb-3 p-3 flex items-center justify-center">
        <img
          src={product.image || '/images/products/placeholder.webp'}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x300/fce7f3/db2777?text=Bright+Dentistry';
          }}
        />

        {/* Quick View Eye Button */}
        <button
          onClick={() => setActiveModalProduct(product)}
          className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-semibold text-xs"
        >
          <span className="bg-white text-slate-800 hover:text-brand-600 px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 font-bold">
            <Eye className="w-4 h-4 text-brand-500" /> Швидкий перегляд
          </span>
        </button>
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => setActiveModalProduct(product)}
            className="font-heading font-bold text-sm text-slate-800 group-hover:text-brand-600 line-clamp-2 cursor-pointer transition-colors leading-snug mb-2"
          >
            {product.title}
          </h3>

          {product.description && (
            <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-rose-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Ціна:</div>
            <div className="font-heading font-extrabold text-lg text-brand-600 tracking-tight">
              {product.priceFormatted}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>В кошик</span>
          </button>
        </div>
      </div>
    </div>
  );
}
