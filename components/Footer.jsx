import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, Instagram, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-2 border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/images/logo.svg"
                alt="BRIGHT dentistry"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Стоматологічна клініка та інтернет-магазин професійних засобів для догляду за ротовою порожниною у Вінниці.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Категорії товарів
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/catalog/Дитячі%20пасти" className="hover:text-brand-400 transition-colors">
                  Дитячі зубні пасти
                </Link>
              </li>
              <li>
                <Link href="/catalog/Дорослі%20пасти" className="hover:text-brand-400 transition-colors">
                  Дорослі зубні пасти
                </Link>
              </li>
              <li>
                <Link href="/catalog/Щітки" className="hover:text-brand-400 transition-colors">
                  Зубні щітки та йоржики
                </Link>
              </li>
              <li>
                <Link href="/catalog/Ополіскувачі" className="hover:text-brand-400 transition-colors">
                  Ополіскувачі для рота
                </Link>
              </li>
              <li>
                <Link href="/catalog/Мінералізація" className="hover:text-brand-400 transition-colors">
                  Засоби ремінералізації
                </Link>
              </li>
              <li>
                <Link href="/catalog/Додаткові%20засоби" className="hover:text-brand-400 transition-colors">
                  Додаткові засоби
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
              Інформація
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/catalog" className="hover:text-brand-400 transition-colors">
                  Каталог товарів
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
                <Link href="/checkout" className="hover:text-brand-400 transition-colors">
                  Оформлення замовлення
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Location */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-3">
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
                  className="hover:text-white font-semibold text-brand-300"
                >
                  @bright_dentistry.ua
                </a>
              </li>
            </ul>

            <div className="mt-5 pt-3 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-brand-400" />
                Способи оплати:
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="bg-slate-800 px-2 py-1 rounded text-slate-300 font-medium border border-slate-700">
                  Оплата при отриманні
                </span>
                <span className="bg-slate-800 px-2 py-1 rounded text-slate-400 font-medium border border-slate-700">
                  monobank
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} BRIGHT dentistry. Всі права захищено.
        </div>

      </div>
    </footer>
  );
}
