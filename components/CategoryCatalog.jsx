import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CATEGORIES_DATA = [
  {
    name: 'Дитячі пасти',
    icon: '👶🦷',
    mascot: '🦷✨',
    badge: 'Малюки & Підлітки',
    count: 16,
    desc: 'Ніжні та безпечні зубні пасти від 0 років зі смаками персика, полуниці та винограду',
    brands: ['BioRepair Kids', 'Curaprox Kids'],
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    cardGradient: 'from-pink-100/80 via-rose-50 to-white hover:border-pink-300 shadow-pink-soft',
    decorEmoji: '🍓',
  },
  {
    name: 'Дорослі пасти',
    icon: '✨🦷',
    mascot: '🦷💎',
    badge: 'Шик & Білосніжність',
    count: 20,
    desc: 'Відновлення емалі, лікування чутливості та дбайливе відбілювання для ідеальної усмішки',
    brands: ['BioRepair', 'Curaprox'],
    badgeColor: 'bg-rose-100 text-brand-700 border-rose-200',
    cardGradient: 'from-rose-100/80 via-pink-50 to-white hover:border-rose-300 shadow-pink-soft',
    decorEmoji: '💅',
  },
  {
    name: 'Щітки',
    icon: '🪥🦷',
    mascot: '🦷⚡',
    badge: '5460 щетинок!',
    count: 18,
    desc: 'Ультрам’які мануальні щітки Curaprox та анатомічні міжзубні йоржики TePe',
    brands: ['Curaprox 5460', 'TePe Angle'],
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cardGradient: 'from-emerald-100/80 via-teal-50 to-white hover:border-emerald-300 shadow-sm',
    decorEmoji: '✨',
  },
  {
    name: 'Ополіскувачі',
    icon: '💧🦷',
    mascot: '🦷🫧',
    badge: 'Свіжість 24/7',
    count: 8,
    desc: 'Антибактеріальний захист, здоров’я ясен та тривалий рожевий фреш-подих',
    brands: ['BioRepair', 'Curasept'],
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    cardGradient: 'from-cyan-100/80 via-sky-50 to-white hover:border-cyan-300 shadow-sm',
    decorEmoji: '🌊',
  },
  {
    name: 'Мінералізація',
    icon: '💎🦷',
    mascot: '🦷👑',
    badge: 'Лікування емалі',
    count: 3,
    desc: 'Ремінералізуючі гелі Tooth Mousse для зміцнення емалі та лікування білих плям',
    brands: ['Tooth Mousse', 'MI Paste'],
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    cardGradient: 'from-purple-100/80 via-fuchsia-50 to-white hover:border-purple-300 shadow-pink-soft',
    decorEmoji: '👑',
  },
  {
    name: 'Додаткові засоби',
    icon: '🧼🦷',
    mascot: '🦷🎀',
    badge: 'Супер Догляд',
    count: 17,
    desc: 'Дентальні серветки для малюків, нитки Oral-B SuperFloss та ксилітолові гумки',
    brands: ['Oral-B SuperFloss', 'Miradent'],
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    cardGradient: 'from-amber-100/80 via-orange-50 to-white hover:border-amber-300 shadow-sm',
    decorEmoji: '🎀',
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-brand-700 text-xs font-bold rounded-full mb-2 border border-rose-200">
            <span>✨ Обирай категорію догляду</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
            Каталог товарів за категоріями 🦷💖
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
            Натискайте на категорію, щоб обрати спеціалізовані засоби догляду від провідних світових брендів
          </p>
        </div>

        <Link
          href="/catalog"
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full text-xs font-bold transition-all shadow-pink-soft flex items-center gap-2"
        >
          <span>Весь каталог товарів</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Large Category Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES_DATA.map((cat) => (
          <Link
            key={cat.name}
            href={`/catalog/${encodeURIComponent(cat.name)}`}
            className={`group bg-gradient-to-br ${cat.cardGradient} rounded-3xl p-7 border-2 border-rose-100/90 shadow-md hover:shadow-2xl hover-lift flex flex-col justify-between transition-all duration-300 relative overflow-hidden min-h-[260px]`}
          >
            {/* Background Decorative Tooth Character */}
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-15 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500 pointer-events-none select-none">
              {cat.mascot}
            </div>

            <div>
              {/* Top row: Tooth Character & Count Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-rose-100 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {cat.mascot}
                </div>
                <span className={`text-xs font-extrabold px-3.5 py-1 rounded-full border shadow-2xs ${cat.badgeColor}`}>
                  {cat.count} товарів
                </span>
              </div>

              {/* Title & Badge */}
              <div className="space-y-1 mb-2">
                <div className="text-[11px] font-extrabold text-brand-600 uppercase tracking-widest">
                  {cat.badge} {cat.decorEmoji}
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900 group-hover:text-brand-600 transition-colors">
                  {cat.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-medium">
                {cat.desc}
              </p>
            </div>

            {/* Popular Brands & Action Bar */}
            <div className="space-y-3 pt-4 border-t border-rose-200/50">
              <div className="flex flex-wrap gap-1.5">
                {cat.brands.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-bold text-slate-600 bg-white/90 px-2.5 py-1 rounded-lg border border-rose-100 shadow-2xs"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-extrabold text-xs text-brand-600 group-hover:text-brand-700 pt-1">
                <span>Відкрити категорію</span>
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white group-hover:bg-brand-700 flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-pink-soft">
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

