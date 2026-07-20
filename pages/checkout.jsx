import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/lib/store';
import { ArrowLeft, ShoppingBag, Truck, CreditCard, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, totalCount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    warehouse: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Оплата при отриманні');
  const [deliveryMethod, setDeliveryMethod] = useState('Нова Пошта');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successOrder, setSuccessOrder] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.firstName.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.warehouse.trim()) {
      setErrorMessage("Будь ласка, заповніть усі обов'язкові поля (*)");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Ваш кошик порожній');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          items: cart,
          totalPrice,
          paymentMethod,
          deliveryMethod,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessOrder(data);
        clearCart();
      } else {
        setErrorMessage(data.error || 'Помилка при оформленні замовлення. Спробуйте ще раз.');
      }
    } catch (err) {
      console.error('Checkout submit error:', err);
      setErrorMessage('Мережева помилка. Перевірте з\'єднання та спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 bg-rose-100 text-brand-600 rounded-full flex items-center justify-center mx-auto shadow-pink-glow animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="bg-brand-500 text-white font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            Замовлення #{successOrder.orderId}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Дякуємо за ваші замовлення!
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Заявку успішно передано менеджеру у <strong>Telegram-бот Bright Dentistry</strong>. Наш адміністратор зателефонує вам найближчим часом для підтвердження.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm max-w-md mx-auto text-left text-xs space-y-2">
          <div className="font-bold text-slate-800 text-sm border-b border-rose-100 pb-2 flex justify-between">
            <span>Деталі замовлення:</span>
            <span className="text-brand-600 font-extrabold">#{successOrder.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Отримувач:</span>
            <span className="font-semibold text-slate-800">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Телефон:</span>
            <span className="font-semibold text-slate-800">{formData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Доставка:</span>
            <span className="font-semibold text-slate-800">{formData.city}, {formData.warehouse}</span>
          </div>
          <div className="flex justify-between border-t border-rose-50 pt-2 font-bold text-sm">
            <span>Сума до сплати:</span>
            <span className="text-brand-600">{totalPrice} грн</span>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/catalog"
            className="px-8 py-3.5 bg-gradient-to-r from-brand-500 to-rosebrand-500 text-white rounded-2xl font-extrabold text-sm inline-flex items-center gap-2 shadow-pink-soft"
          >
            Повернутися до магазину
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-brand-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-800">
          Ваш кошик порожній
        </h2>
        <p className="text-xs text-slate-500">
          Додайте товари з каталогу, щоб оформити замовлення.
        </p>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-brand-500 text-white rounded-full font-bold text-xs inline-block shadow-pink-soft"
        >
          Перейти до каталогу
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Оформлення замовлення — Bright Dentistry</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation back */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад до шопінгу
        </Link>

        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
          Оформлення замовлення
        </h1>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-semibold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Client Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contact info box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2 border-b border-rose-50 pb-3">
                <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-extrabold text-xs">1</span>
                Контактні дані покупця
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ім'я <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Наприклад: Олена"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Прізвище
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Наприклад: Коваленко"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Номер телефону <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+380 97 123 45 67"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </div>
            </div>

            {/* Delivery Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2 border-b border-rose-50 pb-3">
                <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-extrabold text-xs">2</span>
                Доставка (Нова Пошта)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Місто / Населений пункт <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Наприклад: Київ"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Відділення або поштомат <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="warehouse"
                    required
                    placeholder="Відділення №15 або Поштомат №3402"
                    value={formData.warehouse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Коментар до замовлення (необов'язково)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Додаткові побажання щодо часу відправки або пакування..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-rose-50/40 border border-rose-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </div>
            </div>

            {/* Payment Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2 border-b border-rose-50 pb-3">
                <span className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-extrabold text-xs">3</span>
                Спосіб оплати
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border-2 border-brand-500 bg-rose-50/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Оплата при отриманні'}
                      onChange={() => setPaymentMethod('Оплата при отриманні')}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Оплата при отриманні (накладений платіж)</div>
                      <div className="text-[11px] text-slate-500">Оплачуйте замовлення після огляду на Новій Пошті</div>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-brand-500" />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      disabled
                      className="w-4 h-4 text-slate-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-700">Оплата онлайн через monobank</div>
                      <div className="text-[11px] text-slate-400">Еквайринг буде підключено незабаром</div>
                    </div>
                  </div>
                  <span className="bg-brand-100 text-brand-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                    Незабаром
                  </span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-md space-y-6 sticky top-28">
            <h3 className="font-heading font-bold text-slate-800 text-base border-b border-rose-50 pb-3 flex items-center justify-between">
              <span>Ваше замовлення</span>
              <span className="text-xs font-normal text-slate-500">{totalCount} шт</span>
            </h3>

            <div className="max-h-64 overflow-y-auto divide-y divide-rose-50 pr-1 space-y-3">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={product.image || '/images/products/placeholder.webp'}
                    alt={product.title}
                    className="w-12 h-12 object-contain bg-rose-50 p-1 rounded-lg border border-rose-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 line-clamp-1">{product.title}</div>
                    <div className="text-[11px] text-slate-400">
                      Код: <span className="font-bold text-brand-600">{product.code}</span> | {quantity} шт
                    </div>
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 shrink-0">
                    {product.price * quantity} грн
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-600 border-t border-rose-100 pt-4">
              <div className="flex justify-between">
                <span>Вартість товарів:</span>
                <span className="font-bold text-slate-800">{totalPrice} грн</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className="text-emerald-600 font-bold">За тарифами перевізника</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-100 pt-3">
                <span>Всього до сплати:</span>
                <span className="text-brand-600">{totalPrice} грн</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Відправка в Telegram...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Підтвердити замовлення ({totalPrice} грн)</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-slate-400">
              Заявка буде миттєво передана в Telegram-чат адміна <code>-5024585789</code>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}
