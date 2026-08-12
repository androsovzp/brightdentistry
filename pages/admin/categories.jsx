import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/AdminLayout';
import { FolderTree, Plus, Save, Check, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (index, field, value) => {
    setCategories((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleAddCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        name: 'Нова Категорія',
        slug: 'new-category',
        description: 'Опис нової категорії',
        count: 0,
        image: '/images/categories/extra.webp',
      },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categories),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Категорії успішно збережено!' });
      } else {
        setMessage({ type: 'error', text: 'Помилка збереження категорій' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Помилка зв’язку з сервером' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="📁 Керування Категоріями">
      <Head>
        <title>Категорії — Bright Dentistry Admin</title>
      </Head>

      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900">
                Список категорій товарів
              </h2>
              <p className="text-xs text-slate-500">
                Редагуйте назви, описи та іконки для відображення в каталозі
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-rose-100 text-brand-800 rounded-2xl text-xs font-bold hover:bg-rose-200 transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Додати категорію
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold shadow-pink-soft transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> {saving ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </div>

          {message.text && (
            <div
              className={`p-3.5 rounded-2xl text-xs font-semibold border flex items-center gap-2 ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {message.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-xs text-slate-400">Завантаження...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="bg-rose-50/40 rounded-3xl p-5 border border-rose-100 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cat.image || '/images/categories/extra.webp'}
                      alt={cat.name}
                      className="w-12 h-12 object-contain bg-white rounded-2xl p-1 border border-rose-100 shrink-0"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => handleCategoryChange(idx, 'name', e.target.value)}
                        className="w-full font-bold text-slate-900 bg-white border border-rose-200 rounded-xl px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-brand-400"
                      />
                      <div className="text-[10px] text-slate-400 mt-1">
                        Кількість товарів: {cat.count || 0}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      Опис категорії:
                    </label>
                    <input
                      type="text"
                      value={cat.description || ''}
                      onChange={(e) => handleCategoryChange(idx, 'description', e.target.value)}
                      className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      Шлях до зображення:
                    </label>
                    <input
                      type="text"
                      value={cat.image || ''}
                      onChange={(e) => handleCategoryChange(idx, 'image', e.target.value)}
                      className="w-full bg-white border border-rose-200 rounded-xl px-3 py-1 text-[11px] font-mono text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
