import React, { useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/AdminLayout';
import { Settings, Save, Phone, MapPin, Clock, Instagram, Send, Check } from 'lucide-react';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState({
    phone: '+380 (73) 276-26-27',
    address: 'м. Вінниця, вул. Івана Богуна, 2 (П’ятничани)',
    workHours: 'Пн–Пт: 09:00–19:00 | Сб–Нд: 09:00–16:00',
    instagram: 'bright_dentistry.ua',
    telegramToken: '• • • • • • • • • • • • • • • •',
    telegramChatId: '• • • • • • • • •',
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout title="⚙️ Налаштування Клініки та Сповіщень">
      <Head>
        <title>Налаштування — Bright Dentistry Admin</title>
      </Head>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-rose-100 pb-4">
            <h2 className="font-heading font-bold text-lg text-slate-900">
              Контактна інформація клініки
            </h2>
            <p className="text-xs text-slate-500">
              Ці дані відображаються у шапці, підвалі та на сторінці оформлення замовлення
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {saved && (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-2xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Налаштування збережено успішно!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-brand-500" /> Телефон для зв’язку:
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" /> Адреса клініки:
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-500" /> Графік роботи:
              </label>
              <input
                type="text"
                value={formData.workHours}
                onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" /> Instagram нікнейм:
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
            </div>

            <div className="pt-4 border-t border-rose-100 space-y-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-500" /> Інтеграція Telegram Bot API
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  TELEGRAM_BOT_TOKEN:
                </label>
                <input
                  type="password"
                  value={formData.telegramToken}
                  onChange={(e) => setFormData({ ...formData, telegramToken: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-700 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Налаштовується у змінних оточення Vercel / .env.local
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  TELEGRAM_CHAT_ID:
                </label>
                <input
                  type="text"
                  value={formData.telegramChatId}
                  onChange={(e) => setFormData({ ...formData, telegramChatId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-bold text-xs shadow-pink-soft transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Зберегти налаштування
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
