import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CATEGORY_ICONS = {
  'Дитячі пасти': '👶',
  'Дорослі пасти': '✨',
  'Щітки': '🪥',
  'Ополіскувачі': '💧',
  'Мінералізація': '💎',
  'Додаткові засоби': '🧼',
};

const CATEGORY_DESCS = {
  'Дитячі пасти': 'Безпечні зубні пасти від 0 років зі смаками персика, суниці та винограду',
  'Дорослі пасти': 'Відновлення емалі, зняття чутливості та професійне відбілювання',
  'Щітки': 'Мануальні щітки Curaprox та міжзубні йоржики TePe і Interprox',
  'Ополіскувачі': 'Антибактеріальний захист та тривала свіжість ротової порожнини',
  'Мінералізація': 'Легендарні Tooth Mousse гелі для зміцнення емалі та лікування плям',
  'Додаткові засоби': 'Дентальні серветки для немовлят, нитки Супер флос та ксилітолові гумки',
};

export default function CategoryCard({ category }) {
  const icon = CATEGORY_ICONS[category.name] || '🦷';
  const desc = CATEGORY_DESCS[category.name] || 'Професійні засоби для догляду';

  return (
    <Link
      href={`/catalog/${encodeURIComponent(category.name)}`}
      className="group bg-white rounded-3xl p-6 border border-rose-100/90 hover:border-brand-300 shadow-sm hover:shadow-xl hover-lift flex flex-col justify-between relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/50 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

      <div>
        {/* Icon & Count Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="bg-rose-100/80 text-brand-700 font-extrabold text-xs px-3 py-1 rounded-full">
            {category.count} товарів
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-lg text-slate-800 group-hover:text-brand-600 transition-colors mb-2">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {desc}
        </p>
      </div>

      {/* Action link */}
      <div className="pt-3 border-t border-rose-50 flex items-center justify-between font-bold text-xs text-brand-600 group-hover:text-brand-700">
        <span>Перейти в категорію</span>
        <div className="w-7 h-7 rounded-full bg-rose-50 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
