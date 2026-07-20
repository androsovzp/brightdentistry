import React, { useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CategoryCatalog, { CategoryPillsStrip } from '@/components/CategoryCatalog';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/data';
import { ArrowRight, MapPin, Clock, Phone, Stethoscope } from 'lucide-react';

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

export default function Home({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState('Всі');

  // Filter products by active category tab
  const displayedProducts = React.useMemo(() => {
    if (activeCategory === 'Всі') {
      return products.slice(0, 8);
    }
    return products.filter((p) => p.category === activeCategory).slice(0, 8);
  }, [products, activeCategory]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Category Navigation Bar (Pills strip for Mobile & Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-rose-100/90 shadow-2xs">
          <div className="text-xs font-semibold text-slate-400 mb-2 px-1">
            Швидка навігація по каталогу:
          </div>
          <CategoryPillsStrip />
        </div>
      </section>

      {/* 3. Catalog of Categories Section */}
      <CategoryCatalog />

      {/* 4. Products Showcase with Interactive Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                Популярні товари
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Оригінальні доглядові засоби, які найчастіше обирають пацієнти клініки
              </p>
            </div>

            <Link
              href="/catalog"
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-xs font-bold transition-all shadow-pink-soft"
            >
              Переглянути всі ({products.length})
            </Link>
          </div>

          {/* Category Tabs for direct homepage filtering */}
          <div className="mb-8">
            <CategoryPillsStrip
              selectedCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {displayedProducts.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              У цій категорії поки немає товарів для відображення.
            </div>
          )}
        </div>
      </section>

      {/* 5. Clinic Consultation & Location Banner */}
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
                href="/catalog/Мінералізація"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold text-xs text-center transition-colors"
              >
                Гелі ремінералізації Tooth Mousse
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
