import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CATEGORIES_DATA = [
  {
    name: 'Дитячі пасти',
    icon: '👶',
    image: '/images/categories/kids.webp',
    count: 16,
    desc: 'Ніжні та безпечні зубні пасти від 0 років зі смаками персика, полуниці та винограду',
    brands: ['BioRepair Kids', 'Curaprox Kids'],
    badgeColor: 'bg-rose-50 text-brand-700 border-rose-200',
    cardBg: 'bg-white hover:border-brand-300',
  },
  {
    name: 'Дорослі пасти',
    icon: '✨',
    image: '/images/categories/adults.webp',
    count: 20,
    desc: 'Відновлення емалі, лікування чутливості та дбайливе відбілювання для ідеальної усмішки',
    brands: ['BioRepair', 'Curaprox'],
    badgeColor: 'bg-rose-50 text-brand-700 border-rose-200',
    cardBg: 'bg-white hover:border-brand-300',
  },
  {
    name: 'Щітки',
    icon: '🪥',
    image: '/images/categories/brushes.webp',
    count: 18,
    desc: 'Ультрам’які мануальні щітки Curaprox та анатомічні міжзубні йоржики TePe',
    brands: ['Curaprox 5460', 'TePe Angle'],
    badgeColor: 'bg-rose-50 text-brand-700 border-rose-200',
    cardBg: 'bg-white hover:border-brand-300',
  },
  {
    name: 'Ополіскувачі',
    icon: '💧',
    image: '/images/categories/mouthwash.webp',
    count: 8,
    desc: 'Антибактеріальний захист, здоров’я ясен та тривалий рожевий фреш-подих',
    brands: ['BioRepair', 'Curasept'],
    badgeColor: 'bg-rose-50 text-brand-700 border-rose-200',
    cardBg: 'bg-white hover:border-brand-300',
  },
  {
    name: 'Мінералізація',
    icon: '💎',
    image: '/images/categories/mineralization.webp',
    count: 3,
    desc: 'Ремінералізуючі гелі Tooth Mousse для зміцнення емалі та лікування білих плям',
    brands: ['Tooth Mousse', 'MI Paste'],
    badgeColor: 'bg-rose-50 text-brand-700 border-rose-200',
    cardBg: 'bg-white hover:border-brand-300',
  },
  {
    name: 'Додаткові засоби',
    icon: '🧼',
    image: '/images/categories/extra.webp',
    count: 17,
    desc: 'Дентальні серветки для малюків, нитки Oral-B SuperFloss та ксилітолові гумки',
    brands: ['Oral-B SuperFloss', 'Miradent'],
    badgeColor: 'bg-rose-50 text-brand-700 border-rose-200',
    cardBg: 'bg-white hover:border-brand-300',
  },
];

/**
 * CategoryPillsStrip Component
 * Quick navigation chips (mobile & desktop)
 */
export function CategoryPillsStrip({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
      {onSelectCategory && (
        <button
          onClick={() => onSelectCategory('Всі')}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'Всі'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200'
          }`}
        >
          Всі товари
        </button>
      )}

      {CATEGORIES_DATA.map((cat) => {
        const isSelected = selectedCategory === cat.name;

        if (onSelectCategory) {
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-pink-soft'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        }

        return (
          <Link
            key={cat.name}
            href={`/catalog/${encodeURIComponent(cat.name)}`}
            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-rose-200 transition-all"
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * CategoryCatalog Component
 * Elegant Visual Category Grid Section with Custom WEBP Illustrations
 */
export default function CategoryCatalog() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Категорії товарів
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
            Обирайте необхідний напрямок професійного догляду за усмішкою
          </p>
        </div>

        <Link
          href="/catalog"
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group transition-colors"
        >
          <span>Весь каталог ({CATEGORIES_DATA.reduce((acc, c) => acc + c.count, 0)} товарів)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Clean Elegant Category Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <Link
            key={cat.name}
            href={`/catalog/${encodeURIComponent(cat.name)}`}
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-rose-200/90 shadow-2xs hover:shadow-xl hover-lift flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
          >
            <div>
              {/* Large Illustration Box & Count Badge */}
              <div className="w-full h-44 sm:h-48 bg-gradient-to-b from-rose-50/60 to-white rounded-2xl p-4 relative flex items-center justify-center mb-5 overflow-hidden">
                <span className="absolute top-3 right-3 z-10 text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-brand-700 border border-rose-200 shadow-2xs">
                  {cat.count} товарів
                </span>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
              </div>

              {/* Category Title (Uppercase) */}
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 uppercase tracking-wide group-hover:text-brand-600 transition-colors mb-2">
                {cat.name}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                {cat.desc}
              </p>
            </div>

            {/* Popular Brands & Action Bar */}
            <div className="space-y-3 pt-4 border-t border-rose-100">
              <div className="flex flex-wrap gap-1.5">
                {cat.brands.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-bold text-xs text-brand-600 group-hover:text-brand-700 pt-1">
                <span>Переглянути товари</span>
                <div className="w-8 h-8 rounded-full bg-rose-50 group-hover:bg-brand-600 text-brand-600 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
}




