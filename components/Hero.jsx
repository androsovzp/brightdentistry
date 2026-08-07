import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  // Curtain Opening Animation on Load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/80 via-white to-rose-50/40 text-slate-900 min-h-[50vh] lg:min-h-[60vh] flex items-center border-b border-rose-100 select-none">
      
      {/* Soft Light Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Light Valance */}
      <div className="absolute top-0 inset-x-0 z-40 flex justify-between pointer-events-none overflow-hidden h-8 sm:h-10">
        <div className="w-full h-full bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 border-b border-pink-300/60 shadow-sm rounded-b-[30px]" />
      </div>

      {/* Left Light Soft Curtain */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-100 border-r-2 border-pink-300/50 shadow-xl transition-transform duration-[1200ms] ease-in-out pointer-events-none ${
          isOpen ? '-translate-x-[94%]' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.4)_20px,rgba(255,255,255,0.4)_40px)]" />
      </div>

      {/* Right Light Soft Curtain */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 z-30 bg-gradient-to-l from-rose-200 via-pink-200 to-rose-100 border-l-2 border-pink-300/50 shadow-xl transition-transform duration-[1200ms] ease-in-out pointer-events-none ${
          isOpen ? 'translate-x-[94%]' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.4)_20px,rgba(255,255,255,0.4)_40px)]" />
      </div>

      {/* Clean Light Stage Content - Left Aligned */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10 py-12 sm:py-20 space-y-5 animate-in fade-in duration-700">
        
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight max-w-2xl">
          Професійний догляд <br />
          <span className="text-brand-600">для вашої усмішки</span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-medium">
          Оригінальні зубні пасти BioRepair, ультрам’які щітки Curaprox та гелі ремінералізації Tooth Mousse з доставкою по Україні та консультацією стоматологів.
        </p>

        <div className="pt-3 flex justify-start">
          <Link
            href="/catalog"
            className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
          >
            <span>Переглянути каталог</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>

    </section>
  );
}
