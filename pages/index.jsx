import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/data';
import { ArrowRight, Sparkles, ShieldCheck, HeartPulse, Stethoscope, Star, MapPin, Clock } from 'lucide-react';

export async function getStaticProps() {
  const products = getProducts();
  const categories = getCategories();
  
  // Pick featured items: Tooth Mousse, BioRepair kids, Curaprox, TePe Angle, etc.
  const featuredProducts = products.slice(0, 8);

  return {
    props: {
      products,
      categories,
      featuredProducts,
    },
  };
}

export default function Home({ categories, featuredProducts }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-100 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Каталог товарів
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
              Обирайте категорію догляду
            </h2>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>Дивитися всі товари</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30 rounded-3xl p-6 sm:p-10 border border-rose-100">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rosebrand-600 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-rose-200 mb-2 shadow-2xs">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Хити продажів
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
                Рекомендовано стоматологами
              </h2>
            </div>

            <Link
              href="/catalog"
              className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-xs font-bold transition-all shadow-pink-soft"
            >
              Перейти в каталог
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Clinic & Dental Care Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand-500/30 text-brand-300 px-3.5 py-1 rounded-full text-xs font-bold border border-brand-500/30">
                <Stethoscope className="w-4 h-4" /> Стоматологічна клініка Bright Dentistry (м. Вінниця)
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl leading-snug">
                Потрібна консультація чи запис на прийом?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Завітайте до нашої клініки за адресою <strong>вул. Івана Богуна, 2 (П'ятничани)</strong> або отримайте підбір доглядових засобів за номером <strong>073 276 2627</strong>.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                  <span>м. Вінниця, вул. Івана Богуна, 2</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  <span>Пн-Пт: 09:00-19:00 | Сб-Нд: 09:00-16:00</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <a
                href="tel:+380732762627"
                className="px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-extrabold text-xs text-center transition-all shadow-pink-glow"
              >
                📞 073 276 2627 (Зателефонувати)
              </a>
              <Link
                href="/catalog/Мінералізація"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs text-center transition-colors"
              >
                💎 Гелі ремінералізації (Tooth Mousse)
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
