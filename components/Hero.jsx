import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Wand2 } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Hero() {
  const { setIsQuizOpen } = useCart();
  const [activeMagicTab, setActiveMagicTab] = useState('shine');

  const MAGIC_TABS = {
    shine: {
      title: '💅 Рожевий Сяючий Догляд',
      desc: 'BioRepair & Curaprox для білосніжної усмішки',
      price: 'від 180 грн',
      badge: 'Відбілювання',
    },
    kids: {
      title: '🍓 Ніжний Дитячий Догляд',
      desc: 'Безпечні пасти без цукру від 0 років',
      price: 'від 165 грн',
      badge: 'Для малюків',
    },
    mineral: {
      title: '💎 Ремінералізація Емалі',
      desc: 'Гелі Tooth Mousse для зміцнення емалі',
      price: 'від 650 грн',
      badge: 'Відновлення',
    },
  };

  const currentTab = MAGIC_TABS[activeMagicTab];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-slate-50 pt-8 pb-12 lg:pt-14 lg:pb-16 border-b border-rose-100/60">
      
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Clean Minimalist Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Soft Clinic Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200 text-brand-700 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Стоматологічна клініка Bright Dentistry (м. Вінниця)</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15] tracking-tight">
              Сяй яскраво! <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-rosebrand-500 to-pink-500">
                Твій ідеальний догляд
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Професійні зубні пасти, м’які щітки та гелі ремінералізації. Підібрано із любов’ю та підтверджено стоматологами клініки.
            </p>

            {/* Clean Single Primary Action & Quiz Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-rosebrand-600 hover:from-brand-700 hover:to-rosebrand-700 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
              >
                <span>Перейти в каталог</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-800 transition-colors p-2"
              >
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span>Пройти рожевий квіз догляду ✨</span>
              </button>
            </div>

            {/* Trust Pill */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold border-t border-rose-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>100% Сертифіковано</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Вінниця • вул. Богуна, 2</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Pink Magic Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none bg-white p-6 rounded-3xl border border-rose-200 shadow-xl space-y-4">
              
              {/* Top Magic Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-extrabold text-brand-700">
                  <Wand2 className="w-4 h-4 text-brand-500 animate-bounce" />
                  <span>Interactive Tooth Magic 💖</span>
                </div>
                <span className="text-[10px] font-bold bg-rose-100 text-brand-700 px-2.5 py-0.5 rounded-full">
                  {currentTab.badge}
                </span>
              </div>

              {/* Interactive Tooth Mascot */}
              <div className="bg-gradient-to-b from-rose-50/80 to-white p-6 rounded-2xl border border-rose-100 text-center relative overflow-hidden group">
                <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">
                  🦷✨
                </div>

                <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-1">
                  {currentTab.title}
                </h3>
                <p className="text-xs text-slate-500 mb-3 font-medium">
                  {currentTab.desc}
                </p>
                <div className="font-extrabold text-brand-600 text-sm">
                  {currentTab.price}
                </div>
              </div>

              {/* Minimalist 3 Magic Pills Selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveMagicTab('shine')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all border ${
                    activeMagicTab === 'shine'
                      ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                      : 'bg-rose-50 text-slate-700 border-rose-100 hover:bg-rose-100'
                  }`}
                >
                  💅 Сяйво
                </button>
                <button
                  onClick={() => setActiveMagicTab('kids')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all border ${
                    activeMagicTab === 'kids'
                      ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                      : 'bg-rose-50 text-slate-700 border-rose-100 hover:bg-rose-100'
                  }`}
                >
                  🍓 Малюкам
                </button>
                <button
                  onClick={() => setActiveMagicTab('mineral')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all border ${
                    activeMagicTab === 'mineral'
                      ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                      : 'bg-rose-50 text-slate-700 border-rose-100 hover:bg-rose-100'
                  }`}
                >
                  💎 Захист
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


