import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalCount, isGiftWrapped, setIsGiftWrapped } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 bg-gradient-to-r from-brand-50 to-rose-50 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-slate-800 text-base">Ваш кошик</h2>
                <p className="text-[11px] text-slate-500">{totalCount} {totalCount === 1 ? 'товар' : 'товарів'}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-brand-600 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-rose-50">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-brand-300">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-slate-700 text-base">Ваш кошик порожній</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Перегляньте наш каталог та оберіть необхідні засоби для догляду за зубами.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 bg-brand-500 text-white rounded-full font-bold text-xs shadow-md hover:bg-brand-600 transition-colors"
                >
                  Перейти до каталогу
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex items-center gap-3">
                  <img
                    src={product.image || '/images/products/placeholder.webp'}
                    alt={product.title}
                    className="w-16 h-16 object-contain bg-rose-50/50 p-1.5 rounded-xl border border-rose-100 shrink-0"
                    onError={(e) => {
                      e.target.src = '/images/products/placeholder.webp';
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-slate-800 line-clamp-2 leading-tight">
                      {product.title}
                    </h4>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Код: <span className="font-bold text-brand-600">{product.code}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-rose-200 rounded-lg bg-rose-50/40 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-5 h-5 rounded hover:bg-white text-slate-600 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-5 h-5 rounded hover:bg-white text-slate-600 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-bold text-sm text-brand-600">
                        {product.price * quantity} грн
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Видалити"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-rose-100 space-y-4">
              
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Всього товарів:</span>
                  <span className="font-semibold">{totalCount} шт</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span className="text-emerald-600 font-semibold">За тарифами Нової Пошти</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-extrabold text-slate-900">
                  <span>До сплати:</span>
                  <span className="text-brand-600">{totalPrice} грн</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
              >
                <span>Оформити замовлення</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
