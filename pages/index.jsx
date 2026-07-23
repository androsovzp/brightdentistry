import React from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import CategoryCatalog from '@/components/CategoryCatalog';
import { getProducts, getCategories } from '@/lib/data';
import { MapPin, Clock, Phone, Stethoscope, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function getStaticProps() {
  const products = getProducts();
  const categories = getCategories();

  return {
    props: {
      products,
      categories,
    },
  };
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Bright Dentistry — Головна | Стоматологічна клініка та онлайн-магазин (м. Вінниця)</title>
      </Head>

      <div className="space-y-12 pb-16">

      
      {/* 1. Sleek Minimalist Hero */}
      <Hero />

      {/* 2. Visual Category Tiles Catalog */}
      <CategoryCatalog />

      {/* 3. Clinic Consultation & Location Banner */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 text-brand-300 px-3.5 py-1 rounded-full text-xs font-semibold border border-white/10">
                <Stethoscope className="w-4 h-4 text-brand-400" />
                <span>Стоматологія Bright Dentistry (м. Вінниця)</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl leading-snug">
                Потрібен підбір догляду чи консультація?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Наші стоматологи допоможуть обрати зубну пасту, щітку чи ремінералізуючий гель відповідно до індивідуальних потреб емалі та віку пацієнта.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>м. Вінниця, вул. Івана Богуна, 2 (П'ятничани)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Пн-Пт: 09:00–19:00 | Сб-Нд: 09:00–16:00</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="tel:+380732762627"
                className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-extrabold text-xs text-center transition-all shadow-pink-glow flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Зателефонувати: 073 276 2627</span>
              </a>
              <Link
                href="/catalog"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Переглянути весь каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}



