import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse, Award, Smile } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-rose-100">
      
      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-brand-200 text-brand-700 text-xs font-bold shadow-xs backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-brand-500 animate-spin-slow" />
              <span>Професійні засоби догляду від стоматології</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15] tracking-tight">
              Сяюча усмішка разом з <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-rosebrand-500 to-brand-500">
                Bright Dentistry
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Оригінальні італійські, швейцарські та німецькі дитячі й дорослі зубні пасти (BioRepair, Curaprox, Teeth Mousse), міжзубні щітки та комплексний догляд. Рекомендовано нашими лікарями.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
              >
                <span>Переглянути весь каталог</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/catalog/Дитячі%20пасти"
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-rose-50/80 text-brand-700 border border-brand-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                👶 Дитячий догляд (0-6 років)
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="pt-6 border-t border-rose-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="font-heading font-extrabold text-xl text-brand-600">80+</div>
                <div className="text-[11px] text-slate-500 font-semibold">Товарів в наявності</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl text-brand-600">100%</div>
                <div className="text-[11px] text-slate-500 font-semibold">Оригінальні бренди</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl text-brand-600">Швидка</div>
                <div className="text-[11px] text-slate-500 font-semibold">Доставка в ТГ бот</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Glass Frame */}
            <div className="relative mx-auto max-w-sm lg:max-w-none bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white shadow-2xl shadow-rose-200/50">
              
              {/* Product preview card */}
              <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 border border-rose-100 relative">
                
                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-brand-500 text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-300" /> Топ продажів
                </div>

                <div className="w-full h-52 flex items-center justify-center">
                  <img
                    src="/images/logo.webp"
                    alt="Bright Dentistry"
                    className="max-h-36 object-contain"
                  />
                </div>

                <div className="mt-4 pt-4 border-t border-rose-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Tooth Mousse & BioRepair</div>
                    <div className="text-[11px] text-slate-400">Професійна ремінералізація</div>
                  </div>
                  <span className="font-extrabold text-brand-600 text-base">від 180 грн</span>
                </div>
              </div>

              {/* Bottom Mini Banner */}
              <div className="mt-4 p-3.5 bg-rose-50/90 rounded-xl border border-rose-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold shrink-0">
                  <Smile className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Потрібна допомога у виборі?</div>
                  <div className="text-slate-500 text-[11px]">Наші лікарі готові проконсультувати!</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
