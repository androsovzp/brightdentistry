import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  ShieldCheck,
  Check,
  Sparkles,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';
import { useCart } from '@/lib/store';

export default function ProductModal() {
  const { activeModalProduct, setActiveModalProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productImages = useMemo(() => {
    if (!activeModalProduct) return [];
    if (Array.isArray(activeModalProduct.images) && activeModalProduct.images.length > 0) {
      return activeModalProduct.images.filter(Boolean);
    }
    if (activeModalProduct.image) {
      return [activeModalProduct.image];
    }
    return ['/images/products/placeholder.webp'];
  }, [activeModalProduct]);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [activeModalProduct]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModalProduct) return;
      if (e.key === 'Escape') {
        setActiveModalProduct(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct, productImages.length]);

  if (!activeModalProduct) return null;

  const currentImage = productImages[activeImageIndex] || '/images/products/placeholder.webp';

  const handleAddToCart = () => {
    addToCart(activeModalProduct, quantity);
    setActiveModalProduct(null);
    setQuantity(1);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Box */}
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-rose-100 relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            setActiveModalProduct(null);
            setQuantity(1);
          }}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-rose-50 hover:bg-rose-100 text-slate-600 hover:text-brand-600 rounded-full flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column: Multi-Photo Gallery */}
          <div className="space-y-3">
            {/* Main Image Container */}
            <div className="bg-gradient-to-b from-rose-50/50 to-white rounded-3xl p-4 border border-rose-100/80 flex items-center justify-center min-h-[280px] sm:min-h-[340px] relative group overflow-hidden shadow-inner">
              <img
                key={currentImage}
                src={currentImage}
                alt={activeModalProduct.title}
                className="max-h-64 sm:max-h-72 w-full object-contain transition-all duration-300 animate-in fade-in zoom-in-95"
                onError={(e) => {
                  e.target.src = '/images/products/placeholder.webp';
                }}
              />

              {/* Category Badge */}
              <div className="absolute top-3.5 left-3.5 bg-brand-500 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {activeModalProduct.category}
              </div>

              {/* Multi-Photo Counter Badge */}
              {productImages.length > 1 && (
                <div className="absolute top-3.5 right-3.5 bg-slate-900/60 backdrop-blur-md text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                  {activeImageIndex + 1} / {productImages.length}
                </div>
              )}

              {/* Navigation Arrows */}
              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-brand-600 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90"
                    title="Попереднє фото"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white text-slate-700 hover:text-brand-600 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90"
                    title="Наступне фото"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Row */}
            {productImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1 scrollbar-thin">
                {productImages.map((imgUrl, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={`${imgUrl}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border shrink-0 p-1 transition-all overflow-hidden ${
                        isActive
                          ? 'border-brand-500 ring-2 ring-brand-400 shadow-md scale-105'
                          : 'border-rose-100 hover:border-rose-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Мініатюра ${idx + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.target.src = '/images/products/placeholder.webp';
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-400">
                  Код товару: <strong className="text-brand-600">{activeModalProduct.code}</strong>
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-medium border border-emerald-100 flex items-center gap-1">
                  <Check className="w-3 h-3" /> В наявності
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                {activeModalProduct.title}
              </h2>
            </div>

            {/* Price Banner */}
            <div className="bg-rose-50/80 p-3.5 rounded-2xl border border-rose-100 flex items-center justify-between">
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
            <div className="text-xs text-slate-600 max-h-48 overflow-y-auto pr-2 space-y-2 leading-relaxed">
              <h4 className="font-bold text-slate-800 text-xs">Опис та особливості:</h4>
              <p className="whitespace-pre-line">
                {activeModalProduct.description ||
                  'Якісний стоматологічний засіб для щоденного догляду за ротовою порожниною.'}
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
