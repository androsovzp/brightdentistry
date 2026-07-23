import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  // Curtain Opening Animation on Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center border-b border-rose-900/30 select-none">
      
      {/* Soft Ambient Background Spotlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/60 via-slate-950 to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Valance (Чистий ламбрекен без банерного тексту) */}
      <div className="absolute top-0 inset-x-0 z-40 flex justify-between pointer-events-none overflow-hidden h-10 sm:h-12">
        <div className="w-full h-full bg-gradient-to-r from-brand-800 via-rosebrand-600 to-brand-800 border-b border-rose-400/40 shadow-xl rounded-b-[40px]" />
      </div>

      {/* Left Velvet Curtain */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-r from-brand-900 via-brand-700 to-rosebrand-600 border-r-4 border-rose-400/40 shadow-2xl transition-transform duration-[1300ms] ease-in-out pointer-events-none ${
          isOpen ? '-translate-x-[94%]' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_25px,rgba(0,0,0,0.2)_25px,rgba(0,0,0,0.2)_50px)]" />
      </div>

      {/* Right Velvet Curtain */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-l from-brand-900 via-brand-700 to-rosebrand-600 border-l-4 border-rose-400/40 shadow-2xl transition-transform duration-[1300ms] ease-in-out pointer-events-none ${
          isOpen ? 'translate-x-[94%]' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_25px,rgba(0,0,0,0.2)_25px,rgba(0,0,0,0.2)_50px)]" />
      </div>

      {/* Clean Stage Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16 sm:py-24 space-y-6 animate-in fade-in duration-700">
        
        {/* Human Headline */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
          Професійний догляд <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-brand-300">
            для твоєї посмішки 💖
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
          Оригінальні зубні пасти BioRepair, ультрам’які щітки Curaprox та гелі ремінералізації Tooth Mousse від стоматологів у Вінниці.
        </p>

        {/* Single Clean Primary Action Button */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/catalog"
            className="px-9 py-4 bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600 text-white rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-pink-glow transition-all active:scale-95"
          >
            <span>Перейти до каталогу</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>

    </section>
  );
}





