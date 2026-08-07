import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-slate-50 border-b border-rose-100/60 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
          Професійний догляд <br />
          <span className="text-brand-600">для вашої усмішки</span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Оригінальні зубні пасти BioRepair, ультрам’які щітки Curaprox та засоби ремінералізації емалі Tooth Mousse з доставкою по Україні.
        </p>

        <div className="pt-2 flex justify-center">
          <Link
            href="/catalog"
            className="px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95"
          >
            <span>Переглянути каталог</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
