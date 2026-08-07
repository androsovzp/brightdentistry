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

        {/* 3. Clinic Consultation & Location Banner (Clean, Minimal & High-Contrast) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-md border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 bg-slate-800 text-brand-400 px-3.5 py-1 rounded-full text-xs font-semibold border border-slate-700">
                  <Stethoscope className="w-4 h-4" />
                  <span>Стоматологія BRIGHT dentistry (м. Вінниця)</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-snug">
                  Потрібен підбір догляду чи консультація?
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                  Наші стоматологи допоможуть обрати зубну пасту, щітку чи ремінералізуючий гель відповідно до індивідуальних потреб емалі та віку пацієнта.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>м. Вінниця, вул. Івана Богуна, 2</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                    <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>Пн-Пт: 09:00–19:00 | Сб-Нд: 09:00–16:00</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="tel:+380732762627"
                  className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Зателефонувати: 073 27 626 27</span>
                </a>
                <Link
                  href="/catalog"
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
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
