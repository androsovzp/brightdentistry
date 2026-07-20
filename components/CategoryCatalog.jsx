import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CATEGORIES_DATA = [
  {
    name: 'Дитячі пасти',
    icon: '👶',
    count: 16,
    desc: 'Безпечні зубні пасти від 0 років зі смаками персика, суниці та винограду',
    brands: ['BioRepair Kids', 'Curaprox Kids'],
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    cardGradient: 'from-pink-50/60 to-rose-50/30 hover:border-pink-300',
  },
  {
    name: 'Дорослі пасти',
    icon: '✨',
    count: 20,
    desc: 'Відновлення емалі, зняття чутливості та дбайливе відбілювання',
    brands: ['BioRepair', 'Curaprox'],
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',
    cardGradient: 'from-sky-50/60 to-blue-50/30 hover:border-sky-300',
  },
  {
    name: 'Щітки',
    icon: '🪥',
    count: 18,
    desc: 'Мануальні щітки Curaprox та міжзубні йоржики TePe і Interprox',
    brands: ['Curaprox 5460', 'TePe Angle'],
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cardGradient: 'from-emerald-50/60 to-teal-50/30 hover:border-emerald-300',
  },
  {
    name: 'Ополіскувачі',
    icon: '💧',
    count: 8,
    desc: 'Антибактеріальний захист та тривала свіжість ротової порожнини',
    brands: ['BioRepair', 'Curasept'],
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    cardGradient: 'from-cyan-50/60 to-sky-50/30 hover:border-cyan-300',
  },
  {
    name: 'Мінералізація',
    icon: '💎',
    count: 3,
    desc: 'Ремінералізуючі гелі Tooth Mousse для лікування плям та зміцнення емалі',
    brands: ['Tooth Mousse', 'MI Paste'],
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    cardGradient: 'from-purple-50/60 to-fuchsia-50/30 hover:border-purple-300',
  },
  {
    name: 'Додаткові засоби',
    icon: '🧼',
    count: 17,
    desc: 'Супер флос нитки, дентальні серветки для малюків та ксилітолові гумки',
    brands: ['Oral-B SuperFloss', 'Miradent'],
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    cardGradient: 'from-amber-50/60 to-orange-50/30 hover:border-amber-300',
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
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-100/90'
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
            className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 bg-white text-slate-700 hover:bg-brand-50 hover:text-brand-700 border border-rose-100/90 transition-all"
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
 * Main Visual Category Grid Section
 */
export default function CategoryCatalog() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Каталог категорій
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Обирайте необхідний напрямок догляду за ротовою порожниною
          </p>
        </div>

        <Link
          href="/catalog"
          className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group transition-colors"
        >
          <span>Весь каталог товарів</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <Link
            key={cat.name}
            href={`/catalog/${encodeURIComponent(cat.name)}`}
            className={`group bg-gradient-to-br ${cat.cardGradient} bg-white rounded-3xl p-6 border border-rose-100/80 shadow-xs hover:shadow-xl hover-lift flex flex-col justify-between transition-all duration-300 relative overflow-hidden`}
          >
            <div>
              {/* Top row: Icon & Count Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${cat.badgeColor}`}>
                  {cat.count} найменувань
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-brand-600 transition-colors mb-1.5">
                {cat.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {cat.desc}
              </p>

              {/* Popular Brand Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cat.brands.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-slate-100"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Link Bar */}
            <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between font-bold text-xs text-brand-600 group-hover:text-brand-700">
              <span>Перейти в категорію</span>
              <div className="w-7 h-7 rounded-full bg-white group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
