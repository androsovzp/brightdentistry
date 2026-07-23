import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Wand2, Sparkle } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Hero() {
  const { setIsQuizOpen } = useCart();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white min-h-[460px] sm:min-h-[500px] flex items-center justify-center border-b border-rose-900/40 select-none">
      
      {/* Stage Background with Soft Pink Spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/60 via-slate-900 to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Valance (Ламбрекен Штор) */}
      <div className="absolute top-0 inset-x-0 z-30 flex justify-between pointer-events-none overflow-hidden h-14 sm:h-16">
        <div className="w-full h-full bg-gradient-to-r from-brand-700 via-rosebrand-600 to-brand-700 border-b-2 border-yellow-300/80 shadow-2xl rounded-b-[40px] flex items-center justify-center px-4">
          <div className="text-yellow-200 text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-2">
            <span>✨ Bright Dentistry Theatre ✨</span>
          </div>
        </div>
      </div>

      {/* Left Curtain */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1/2 z-20 bg-gradient-to-r from-brand-800 via-brand-600 to-rosebrand-600 border-r-4 border-yellow-300/60 shadow-2xl transition-transform duration-1000 ease-in-out flex items-center justify-end pr-4 pointer-events-none ${
          isOpen ? '-translate-x-[85%]' : 'translate-x-0'
        }`}
      >
        {/* Vertical Curtain Folds texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,0,0,0.15)_20px,rgba(0,0,0,0.15)_40px)]" />
        <div className="relative z-10 text-yellow-300 text-2xl animate-pulse pr-2">🎗️</div>
      </div>

      {/* Right Curtain */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 z-20 bg-gradient-to-l from-brand-800 via-brand-600 to-rosebrand-600 border-l-4 border-yellow-300/60 shadow-2xl transition-transform duration-1000 ease-in-out flex items-center justify-start pl-4 pointer-events-none ${
          isOpen ? 'translate-x-[85%]' : 'translate-x-0'
        }`}
      >
        {/* Vertical Curtain Folds texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(0,0,0,0.15)_20px,rgba(0,0,0,0.15)_40px)]" />
        <div className="relative z-10 text-yellow-300 text-2xl animate-pulse pl-2">🎗️</div>
      </div>

      {/* Main Stage Content Revealed */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16 sm:py-20 space-y-6">
        
        {/* Stage Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-300 text-xs font-bold shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
          <span>Театр Сліпучої Усмішки • Вінниця</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
          Шоу твоєї усмішки <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-brand-300">
            відкриває завісу 🎭✨
          </span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
          Оригінальні зубні пасти BioRepair, ультрам’які щітки Curaprox та гелі Tooth Mousse. Підібрано стоматологами Bright Dentistry!
        </p>

        {/* Stage Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-pink-glow transition-all active:scale-95"
          >
            <span>Відкрити весь каталог</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md transition-all active:scale-95"
          >
            <span>{isOpen ? '🎭 Закрити завісу' : '🎭 Відкрити завісу'}</span>
          </button>
        </div>

        {/* Quick Quiz Link */}
        <div className="pt-2">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="text-xs font-semibold text-brand-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Пройти рожевий квіз підбору догляду</span>
          </button>
        </div>

      </div>

    </section>
  );
}



