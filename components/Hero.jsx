import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, ShieldCheck, Sparkles, Clock, Heart } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Hero() {
  const { setIsQuizOpen, setIsTimerOpen } = useCart();

  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-8 pb-12 lg:pt-14 lg:pb-20 border-b border-rose-100/60">
      
      {/* Background glowing blurred circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-brand-300/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Playful Pink Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-brand-300 text-brand-800 text-xs font-extrabold shadow-pink-soft">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />
              <span>💖 100% Рожевий Вайб • Клініка Bright Dentistry (м. Вінниця)</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.12] tracking-tight">
              Сяй яскраво! <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-rosebrand-500 to-pink-600">
                Твій оригінальний догляд
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Зубні пасти, ультрам’які щітки та гелі ремінералізації (BioRepair, Curaprox, Tooth Mousse, TePe). Підібрано із любов’ю та підтверджено стоматологами нашої клініки!
            </p>

            {/* Main Interactive CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-brand-600 to-rosebrand-600 hover:from-brand-700 hover:to-rosebrand-700 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
              >
                <span>Перейти в каталог</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-rose-100 hover:bg-rose-200 text-brand-800 border border-rose-300 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Пройти рожевий квіз 💖</span>
              </button>
            </div>

            {/* Secondary Fun Feature Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <button
                onClick={() => setIsTimerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-rose-200 text-slate-700 text-xs font-bold hover:bg-rose-50 transition-colors shadow-2xs"
              >
                <Clock className="w-3.5 h-3.5 text-brand-500" />
                <span>🪥 2-хвилинний таймер чищення</span>
              </button>

              <a
                href="https://www.instagram.com/bright_dentistry.ua/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-pink-200 text-pink-700 text-xs font-bold hover:bg-pink-50 transition-colors shadow-2xs"
              >
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
                <span>Instagram @bright_dentistry.ua</span>
              </a>
            </div>

            {/* Feature Badges */}
            <div className="pt-6 border-t border-rose-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-brand-600">80+</div>
                <div className="text-[11px] text-slate-500 font-semibold">Оригінальних товарів</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-brand-600">100%</div>
                <div className="text-[11px] text-slate-500 font-semibold">Сертифіковано</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-brand-600">Вінниця</div>
                <div className="text-[11px] text-slate-500 font-semibold">вул. Івана Богуна, 2</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none bg-white p-5 rounded-3xl border-2 border-rose-200 shadow-pink-glow">
              
              {/* Top Fun Sticker */}
              <div className="absolute -top-4 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-[11px] px-3.5 py-1 rounded-full shadow-md transform rotate-3 sticker-badge z-20">
                ✨ Сяй як діамант!
              </div>

              {/* Product preview */}
              <div className="bg-gradient-to-b from-rose-50/90 to-white rounded-2xl p-5 border border-rose-100 relative text-center">
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src="/images/logo.webp"
                    alt="Bright Dentistry Store"
                    className="max-h-32 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-2 pt-3 border-t border-rose-100 flex items-center justify-between text-left">
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Tooth Mousse & BioRepair</div>
                    <div className="text-[11px] text-slate-500">Захист емалі та лікування чутливості</div>
                  </div>
                  <span className="font-extrabold text-brand-600 text-sm shrink-0">від 180 грн</span>
                </div>
              </div>

              {/* Bottom Quick Doctor Note */}
              <div className="mt-3 p-3 bg-rose-50/80 rounded-xl border border-rose-200 flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-brand-500 to-pink-500 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900">Потрібен підбір догляду?</div>
                  <div className="text-slate-500 text-[11px]">Наші стоматологи у Вінниці завжди на зв’язку!</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

