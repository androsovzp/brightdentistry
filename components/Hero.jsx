import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, ShieldCheck, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-8 pb-12 lg:pt-14 lg:pb-20 border-b border-rose-100/60">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Clean Clinic Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-brand-200 text-brand-800 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              <span>Стоматологічна клініка Bright Dentistry (м. Вінниця)</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15] tracking-tight">
              Професійний догляд <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-rosebrand-600 to-brand-500">
                для всієї родини
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Зубні пасти, мануальні й міжзубні щітки та гелі ремінералізації (BioRepair, Curaprox, Tooth Mousse, TePe). Підібрано та підтверджено нашими лікарями.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
              >
                <span>Перейти в каталог</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:+380732762627"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-rose-50/80 text-slate-800 border border-rose-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                <span>Консультація: 073 276 2627</span>
              </a>
            </div>

            {/* Feature Badges */}
            <div className="pt-6 border-t border-rose-200/50 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">80+</div>
                <div className="text-[11px] text-slate-500 font-medium">Оригінальних товарів</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">100%</div>
                <div className="text-[11px] text-slate-500 font-medium">Сертифіковано</div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg sm:text-xl text-slate-900">Вінниця</div>
                <div className="text-[11px] text-slate-500 font-medium">вул. Івана Богуна, 2</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none bg-white p-5 rounded-3xl border border-rose-100 shadow-xl">
              
              {/* Product preview */}
              <div className="bg-gradient-to-b from-rose-50/80 to-white rounded-2xl p-5 border border-rose-100 relative text-center">
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src="/images/logo.webp"
                    alt="Bright Dentistry Store"
                    className="max-h-32 object-contain"
                  />
                </div>

                <div className="mt-2 pt-3 border-t border-rose-100 flex items-center justify-between text-left">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Tooth Mousse & BioRepair</div>
                    <div className="text-[11px] text-slate-500">Захист емалі та лікування чутливості</div>
                  </div>
                  <span className="font-extrabold text-brand-600 text-sm shrink-0">від 180 грн</span>
                </div>
              </div>

              {/* Bottom Quick Doctor Note */}
              <div className="mt-3 p-3 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Потрібен індивідуальний підбір?</div>
                  <div className="text-slate-500 text-[11px]">Стоматолог підбере засіб під ваші потреби</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
