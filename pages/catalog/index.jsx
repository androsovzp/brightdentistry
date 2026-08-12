import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, searchProducts } from '@/lib/data';
import { Search, Filter, ArrowUpDown, Sparkles, X } from 'lucide-react';

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

export default function CatalogPage({ products, categories }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Sync search query from router and reset category to 'Всі' for global searches
  useEffect(() => {
    if (router.query.search) {
      setSearchQuery(router.query.search);
      setSelectedCategory('Всі');
    }
  }, [router.query.search]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const searched = searchProducts(searchQuery);
      if (selectedCategory !== 'Всі') {
        const catMatches = searched.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        // If results match in selected category, show them; otherwise search across all categories
        result = catMatches.length > 0 ? catMatches : searched;
      } else {
        result = searched;
      }
    } else if (selectedCategory !== 'Всі') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <Head>
        <title>Каталог товарів — Bright Dentistry</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Title Banner */}
        <div className="bg-gradient-to-r from-rose-100/70 via-rose-50 to-white rounded-3xl p-6 sm:p-8 border border-rose-100">
          <div className="max-w-2xl">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
              Каталог гігієнічних засобів
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Оригінальні дитячі та дорослі зубні пасти, щітки, йоржики, гелі ремінералізації та засоби гігієни з клініки Bright Dentistry.
            </p>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-rose-100 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Пошук за назвою або кодом (0010)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-full text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <ArrowUpDown className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="text-xs font-bold text-slate-600 shrink-0">Сортувати:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-rose-50/60 border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
              >
                <option value="default">За замовчуванням</option>
                <option value="price-asc">Ціна: від найдешевшої</option>
                <option value="price-desc">Ціна: від найдорожчої</option>
                <option value="name">Назва: від А до Я</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('Всі')}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'Всі'
                  ? 'bg-brand-500 text-white shadow-pink-soft'
                  : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
              }`}
            >
              Всі товари ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-brand-500 text-white shadow-pink-soft'
                    : 'bg-rose-50 text-slate-700 hover:bg-rose-100'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <span>Знайдено товарів: <strong className="text-brand-600">{filteredProducts.length}</strong></span>
          {selectedCategory !== 'Всі' && (
            <span className="bg-rose-100 text-brand-700 px-3 py-1 rounded-full text-[11px]">
              Категорія: {selectedCategory}
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-rose-100 space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-brand-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              🔍
            </div>
            <h3 className="font-heading font-bold text-slate-800 text-lg">
              Товарів не знайдено
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Спробуйте змінити пошуковий запит або обрати іншу категорію.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Всі');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-brand-500 text-white rounded-full font-bold text-xs shadow-pink-soft"
            >
              Скинути всі фільтри
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
