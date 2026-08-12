import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');
  const [stockFilter, setStockFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [resP, resC] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      const pData = await resP.json();
      const cData = await resC.json();
      setProducts(Array.isArray(pData) ? pData : []);
      setCategories(Array.isArray(cData) ? cData : []);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleStock = async (product) => {
    setUpdatingId(product.id);
    const newStockState = !product.inStock;

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, inStock: newStockState }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: newStockState } : p))
        );
      }
    } catch (e) {
      console.error('Toggle stock error:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Ви дійсно бажаєте видалити цей товар з каталогу?')) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error('Delete product error:', e);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'Всі') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Stock filter
    if (stockFilter === 'inStock') {
      result = result.filter((p) => p.inStock);
    } else if (stockFilter === 'outOfStock') {
      result = result.filter((p) => !p.inStock);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const qClean = q.replace(/^0+/, '');
      result = result.filter((p) => {
        const title = p.title.toLowerCase();
        const code = p.code.toLowerCase();
        const category = p.category.toLowerCase();
        const desc = (p.description || '').toLowerCase();
        return (
          title.includes(q) ||
          code.includes(q) ||
          (qClean && code.includes(qClean)) ||
          category.includes(q) ||
          desc.includes(q)
        );
      });
    }

    return result;
  }, [products, selectedCategory, stockFilter, searchQuery]);

  return (
    <AdminLayout title="🛍️ Управління Товарами">
      <Head>
        <title>Товари — Bright Dentistry Admin</title>
      </Head>

      <div className="space-y-6">
        {/* Top Actions & Filters Toolbar */}
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Пошук за назвою або кодом (0010)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-full text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-3" />
            </div>

            {/* Category & Stock Selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-rose-50/60 border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="Всі">Всі Категорії</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="bg-rose-50/60 border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">Будь-яка наявність</option>
                <option value="inStock">Тільки В Наявності</option>
                <option value="outOfStock">Тільки Немає</option>
              </select>

              <Link
                href="/admin/products/editor"
                className="px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold shadow-pink-soft transition-all flex items-center gap-1.5 shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Додати товар</span>
              </Link>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-2 border-t border-rose-50">
            <span>
              Знайдено товарів: <strong className="text-brand-600">{filteredProducts.length}</strong> із {products.length}
            </span>
            <button
              onClick={fetchProducts}
              className="text-xs text-slate-400 hover:text-brand-600 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Оновити список
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm">
          {loading ? (
            <div className="text-center py-12 text-xs text-slate-400">
              Завантаження каталогу товарів...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-brand-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                🔍
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Товарів за вказаними фільтрами не знайдено
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-rose-100 text-slate-400 uppercase font-bold text-[10px]">
                    <th className="py-3 px-2">Фото & Назва</th>
                    <th className="py-3 px-2">Код (Артикул)</th>
                    <th className="py-3 px-2">Категорія</th>
                    <th className="py-3 px-2">Ціна</th>
                    <th className="py-3 px-2">Статус наявності</th>
                    <th className="py-3 px-2 text-right">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-rose-50/40 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-12 object-contain bg-white rounded-xl border border-rose-100 p-1 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-800 max-w-sm">{p.title}</div>
                            {p.description && (
                              <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                                {p.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono font-bold text-brand-700">{p.code}</td>
                      <td className="py-3 px-2 text-slate-600">{p.category}</td>
                      <td className="py-3 px-2 font-bold text-slate-900">{p.priceFormatted}</td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => handleToggleStock(p)}
                          disabled={updatingId === p.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                          }`}
                        >
                          {p.inStock ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>В наявності</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Немає</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/products/editor?id=${p.id}`}
                            className="p-2 text-slate-600 hover:text-brand-600 hover:bg-rose-100 rounded-xl transition-colors"
                            title="Редагувати"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-100 rounded-xl transition-colors"
                            title="Видалити"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
