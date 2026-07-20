import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, getProductsByCategory } from '@/lib/data';
import { ArrowLeft, Sparkles } from 'lucide-react';

export async function getStaticPaths() {
  const categories = getCategories();
  const paths = categories.map((cat) => ({
    params: { category: cat.name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryName = params.category;
  const products = getProductsByCategory(categoryName);
  const categories = getCategories();

  return {
    props: {
      categoryName,
      products,
      categories,
    },
  };
}

export default function CategoryPage({ categoryName, products, categories }) {
  return (
    <>
      <Head>
        <title>{categoryName} — Каталог Bright Dentistry</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Back Link */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад до всіх категорій
        </Link>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-rose-100/80 via-rose-50 to-white rounded-3xl p-6 sm:p-8 border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-rose-200">
              Категорія товарів
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
              {categoryName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Знайдено <strong className="text-brand-600">{products.length}</strong> оригінальних найменувань
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/catalog/${encodeURIComponent(cat.name)}`}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  cat.name === categoryName
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-rose-50 border border-rose-100'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </>
  );
}
