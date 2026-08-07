import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ShieldCheck, Truck, Sparkles, Heart, CreditCard, Clock, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-brand-500 relative overflow-hidden">
      {/* Background Decorative Pink Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rosebrand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Features Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Оригінальна продукція</h4>
              <p className="text-xs text-slate-400 mt-0.5">Працюємо виключно з сертифікованими брендами</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Швидка доставка Новою Поштою</h4>
              <p className="text-xs text-slate-400 mt-0.5">Відправляємо замовлення щодня по всій Україні</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Консультація стоматолога</h4>
              <p className="text-xs text-slate-400 mt-0.5">Допоможемо підібрати засоби саме для ваших зубів</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.webp"
                alt="BRIGHT dentistry"
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="font-heading font-extrabold text-xl text-brand-400">
                BRIGHT <span className="text-white">dentistry</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Стоматологічна клініка та інтернет-магазин професійних засобів для догляду за ротовою порожниною. Ваша усмішка — наша головна турбота.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-brand-300">
              <Heart className="w-4 h-4 text-brand-400 fill-brand-400 animate-pulse" />
              <span>З турботою про здоров'я ваших зубів</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Категорії товарів
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/catalog/Дитячі%20пасти" className="hover:text-brand-400 transition-colors">
                  👶 Дитячі зубні пасти
                </Link>
              </li>
              <li>
                <Link href="/catalog/Дорослі%20пасти" className="hover:text-brand-400 transition-colors">
                  ✨ Дорослі зубні пасти
                </Link>
              </li>
              <li>
                <Link href="/catalog/Щітки" className="hover:text-brand-400 transition-colors">
                  🪥 Мануальні та міжзубні щітки
                </Link>
              </li>
              <li>
                <Link href="/catalog/Ополіскувачі" className="hover:text-brand-400 transition-colors">
                  💧 Ополіскувачі для рота
                </Link>
              </li>
              <li>
                <Link href="/catalog/Мінералізація" className="hover:text-brand-400 transition-colors">
                  💎 Засоби ремінералізації (Tooth Mousse)
                </Link>
              </li>
              <li>
                <Link href="/catalog/Додаткові%20засоби" className="hover:text-brand-400 transition-colors">
                  🧼 Серветки, зубні нитки та ксилітол
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Інформація
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/catalog" className="hover:text-brand-400 transition-colors">
                  Повний каталог товарів
                </Link>
              </li>
              <li>
                <a
                  href="https://bright-dentistry.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors"
                >
                  Про клініку BRIGHT dentistry
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-brand-400 transition-colors">
                  Оплата та доставка
                </a>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-brand-400 transition-colors">
                  Оформлення замовлення
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Location */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Контакти клініки
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>м. Вінниця, вул. Івана Богуна, 2</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+380732762627" className="hover:text-white font-semibold">
                  073 27 626 27
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Пн – Пт: 09:00 – 19:00</div>
                  <div className="text-slate-400">Сб – Нд: 09:00 – 16:00</div>
                </div>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <Instagram className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href="https://www.instagram.com/bright_dentistry.ua/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-semibold text-brand-300 underline"
                >
                  @bright_dentistry.ua
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-brand-400" />
                Способи оплати:
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="bg-slate-800 px-2 py-1 rounded text-slate-300 font-semibold border border-slate-700">
                  Оплата при отриманні
                </span>
                <span className="bg-brand-900/60 text-brand-300 px-2 py-1 rounded font-semibold border border-brand-800/50">
                  monobank (незабаром)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Bright Dentistry. Всі права захищено.
          </div>
          <div className="flex items-center gap-6">
            <span>Офіційна продукція</span>
            <span>Консультація стоматологів</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
