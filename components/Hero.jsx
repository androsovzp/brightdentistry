import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Wand2 } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Hero() {
  const { setIsQuizOpen } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Preloader Curtain Opening Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[calc(100vh-80px)] lg:min-h-screen flex items-center justify-center border-b border-rose-900/40 select-none">
      
      {/* Stage Background Spotlight Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/70 via-slate-950 to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-pink-500/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Top Theater Valance (Ламбрекен Штор) */}
      <div className="absolute top-0 inset-x-0 z-40 flex justify-between pointer-events-none overflow-hidden h-16 sm:h-20">
        <div className="w-full h-full bg-gradient-to-r from-brand-800 via-rosebrand-600 to-brand-800 border-b-4 border-yellow-400/90 shadow-2xl rounded-b-[50px] flex items-center justify-center px-4">
          <div className="text-yellow-200 text-xs sm:text-sm font-extrabold tracking-widest uppercase flex items-center gap-2">
            <span>✨ BRIGHT DENTISTRY THEATRE • М. ВІННИЦЯ ✨</span>
          </div>
        </div>
      </div>

      {/* Left Full-Screen Velvet Curtain */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-r from-brand-900 via-brand-700 to-rosebrand-600 border-r-8 border-yellow-400/80 shadow-2xl transition-transform duration-[1400ms] ease-in-out flex items-center justify-end pr-6 pointer-events-none ${
          isOpen ? '-translate-x-[92%]' : 'translate-x-0'
        }`}
      >
        {/* Vertical Velvet Folds texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_25px,rgba(0,0,0,0.2)_25px,rgba(0,0,0,0.2)_50px)]" />
        <div className="relative z-10 text-yellow-300 text-3xl animate-bounce pr-2">🎗️</div>
      </div>

      {/* Right Full-Screen Velvet Curtain */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-l from-brand-900 via-brand-700 to-rosebrand-600 border-l-8 border-yellow-400/80 shadow-2xl transition-transform duration-[1400ms] ease-in-out flex items-center justify-start pl-6 pointer-events-none ${
          isOpen ? 'translate-x-[92%]' : 'translate-x-0'
        }`}
      >
        {/* Vertical Velvet Folds texture */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_25px,rgba(0,0,0,0.2)_25px,rgba(0,0,0,0.2)_50px)]" />
        <div className="relative z-10 text-yellow-300 text-3xl animate-bounce pl-2">🎗️</div>
      </div>

      {/* Revealed Grand Stage Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-20 sm:py-28 space-y-8 animate-in fade-in duration-700">
        
        {/* Stage Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-brand-300 text-xs sm:text-sm font-extrabold shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
          <span>Театр Сліпучої Усмішки Bright Dentistry</span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.12] tracking-tight">
          Шоу твоєї усмішки <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-brand-300">
            відкриває завісу 🎭✨
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Професійні зубні пасти BioRepair, ультрам’які щітки Curaprox та гелі ремінералізації Tooth Mousse. Підібрано стоматологами клініки у Вінниці!
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600 text-white rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-pink-glow transition-all active:scale-95"
          >
            <span>Відкрити каталог товарів</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-md transition-all active:scale-95"
          >
            <span>{isOpen ? '🎭 Закрити завісу' : '🎭 Відкрити завісу'}</span>
          </button>
        </div>

        {/* Interactive Quiz Link */}
        <div className="pt-2">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="text-xs sm:text-sm font-extrabold text-brand-300 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-yellow-300" />
            <span>Пройти рожевий квіз підбору догляду ✨</span>
          </button>
        </div>

      </div>

    </section>
  );
}




