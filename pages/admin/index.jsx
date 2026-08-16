import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import {
  Package,
  CheckCircle2,
  XCircle,
  FolderTree,
  PlusCircle,
  Edit,
  ArrowRight,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      const prodData = await resProd.json();
      const catData = await resCat.json();
      setProducts(Array.isArray(prodData) ? prodData : []);
      setCategories(Array.isArray(catData) ? catData : []);
    } catch (e) {
      console.error('Error fetching admin dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const totalCategories = categories.length;

  return (
    <AdminLayout title="📊 Головна панель (Дашборд)">
      <Head>
        <title>Дашборд — Bright Dentistry Admin</title>
      </Head>

      <div className="space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Products */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Всього товарів
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{totalProducts}</div>
              <div className="text-[11px] text-brand-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Усі категорії
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-brand-500 flex items-center justify-center">
              <Package className="w-7 h-7" />
            </div>
          </div>

          {/* Card 2: In Stock */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                В наявності
              </div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">{inStockCount}</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">Доступні для замовлення</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>

          {/* Card 3: Out of Stock */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Немає в наявності
              </div>
              <div className="text-3xl font-extrabold text-rose-600 mt-1">{outOfStockCount}</div>
              <div className="text-[11px] text-rose-500 font-semibold mt-1">Потребують поповнення</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <XCircle className="w-7 h-7" />
            </div>
          </div>

          {/* Card 4: Categories */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Категорії
              </div>
              <div className="text-3xl font-extrabold text-slate-900 mt-1">{totalCategories}</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-1">Активних розділів</div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <FolderTree className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Quick Action Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/products/editor"
            className="group bg-gradient-to-br from-brand-500 to-rosebrand-500 rounded-3xl p-6 text-white shadow-pink-soft hover:shadow-pink-glow transition-all flex flex-col justify-between h-44"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Додати новий товар</h3>
              <p className="text-xs text-white/80 mt-1">
                Створити картку товару, завантажити фото та встановити ціну
              </p>
            </div>
          </Link>

          <Link
            href="/admin/products"
            className="group bg-white rounded-3xl p-6 border border-rose-100 hover:border-brand-300 shadow-sm transition-all flex flex-col justify-between h-44"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-brand-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Управління каталогом</h3>
              <p className="text-xs text-slate-500 mt-1">
                Редагувати наявність, ціни та описи товарів
              </p>
            </div>
          </Link>

          <Link
            href="/admin/categories"
            className="group bg-white rounded-3xl p-6 border border-rose-100 hover:border-brand-300 shadow-sm transition-all flex flex-col justify-between h-44"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <FolderTree className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Категорії товарів</h3>
              <p className="text-xs text-slate-500 mt-1">
                Налаштувати списки та іконки категорій
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Products Table Preview */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900">
                Останні додані товари
              </h2>
              <p className="text-xs text-slate-500">Свіжі позиції у каталозі клініки</p>
            </div>
            <button
              onClick={fetchData}
              className="p-2 text-slate-400 hover:text-brand-600 rounded-xl hover:bg-rose-50 transition-colors"
              title="Оновити дані"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-xs text-slate-400">Завантаження...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-rose-100 text-slate-400 uppercase font-bold text-[10px]">
                    <th className="py-3 px-2">Товар</th>
                    <th className="py-3 px-2">Код</th>
                    <th className="py-3 px-2">Категорія</th>
                    <th className="py-3 px-2">Ціна</th>
                    <th className="py-3 px-2">Наявність</th>
                    <th className="py-3 px-2 text-right">Дії</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {products.slice(0, 8).map((p) => (
                    <tr key={p.id} className="hover:bg-rose-50/50 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image || '/images/products/placeholder.webp'}
                            alt={p.title}
                            className="w-10 h-10 object-contain bg-white rounded-xl border border-rose-100 p-1"
                            onError={(e) => {
                              e.target.src = '/images/products/placeholder.webp';
                            }}
                          />
                          <div className="font-bold text-slate-800 line-clamp-1 max-w-xs">
                            {p.title}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 font-mono font-bold text-brand-700">{p.code}</td>
                      <td className="py-3 px-2 text-slate-600">{p.category}</td>
                      <td className="py-3 px-2 font-bold text-slate-900">{p.priceFormatted}</td>
                      <td className="py-3 px-2">
                        {p.inStock ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            В наявності
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                            Немає
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Link
                          href={`/admin/products/editor?id=${p.id}`}
                          className="p-1.5 text-slate-500 hover:text-brand-600 rounded-lg hover:bg-rose-100 inline-block transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
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
