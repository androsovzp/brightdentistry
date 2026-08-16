import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Package,
  Trash2,
} from 'lucide-react';

export default function ProductEditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    code: '',
    title: '',
    category: 'Дитячі пасти',
    price: '',
    description: '',
    image: '',
    inStock: true,
  });

  const [previewImage, setPreviewImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Load categories
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (id) {
      fetch('/api/admin/products')
        .then((res) => res.json())
        .then((products) => {
          if (Array.isArray(products)) {
            const found = products.find((p) => p.id === id || p.code === String(id));
            if (found) {
              setFormData({
                id: found.id,
                code: found.code,
                title: found.title,
                category: found.category,
                price: found.price,
                description: found.description || '',
                image: found.image || '',
                inStock: found.inStock !== undefined ? found.inStock : true,
              });
              setPreviewImage(found.image);
            }
          }
        })
        .catch((e) => console.error(e));
    }
  }, [id]);

  const compressImageFile = (file, maxDimension = 1200, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to webp or jpeg
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/webp';
          const dataUrl = canvas.toDataURL(mimeType, quality);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage({ type: '', text: '' });

    try {
      // Compress image client-side to fit within body limits
      const base64 = await compressImageFile(file, 1200, 0.85);

      // Instant preview for immediate visual confirmation
      setPreviewImage(base64);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.code || Date.now().toString(),
          fileBase64: base64,
          filename: file.name,
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setPreviewImage(data.url);
        setMessage({ type: 'success', text: 'Зображення завантажено успішно!' });
      } else {
        setMessage({ type: 'error', text: data.message || `Помилка завантаження (код ${res.status})` });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setMessage({ type: 'error', text: 'Помилка обробки або завантаження зображення' });
    } finally {
      setUploadingImage(false);
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.category) {
      setMessage({ type: 'error', text: 'Будь ласка, заповніть обов’язкові поля (Код, Назва, Категорія)' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Товар успішно збережено!' });
        setTimeout(() => {
          router.push('/admin/products');
        }, 1200);
      } else {
        setMessage({ type: 'error', text: data.message || 'Помилка збереження товару' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Помилка зв’язку з сервером' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={isEditing ? '✏️ Редагування Товару' : '➕ Додавання Нового Товару'}>
      <Head>
        <title>{isEditing ? 'Редагувати товар' : 'Додати товар'} — Bright Dentistry Admin</title>
      </Head>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <button
          onClick={() => router.push('/admin/products')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Повернутися до списку товарів
        </button>

        {/* Editor Form Card */}
        <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message.text && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold border flex items-center gap-2 ${
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Код товару (Артикул) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Наприклад: 51 або 125"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Унікальний номер для пошуку та генерації фото
                </span>
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Категорія <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Повна назва товару <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Дитяча зубна паста 0-3 роки Brush-Baby..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </div>

              {/* Price Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ціна (грн) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  placeholder="300"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  min="0"
                  className="w-full px-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
                />
              </div>

              {/* In Stock Checkbox */}
              <div className="flex items-center pt-6">
                <label className="relative flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-5 h-5 text-brand-600 rounded-lg border-rose-300 focus:ring-brand-400 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-800">Товар є в наявності</span>
                </label>
              </div>

              {/* Description Input */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Опис товару:</label>
                <textarea
                  rows="5"
                  placeholder="Детальний опис, склад, вікові обмеження та спосіб застосування..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 leading-relaxed"
                />
              </div>

              {/* Image Upload Block */}
              <div className="md:col-span-2 space-y-3 pt-2 border-t border-rose-100">
                <label className="block text-xs font-bold text-slate-700">
                  Зображення товару (.webp / .jpg / .png):
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Image Preview Box */}
                  <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 flex items-center justify-center p-2 shrink-0 relative group">
                    {previewImage ? (
                      <>
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-xl"
                          onError={(e) => {
                            e.target.src = '/images/products/placeholder.webp';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, image: '' }));
                            setPreviewImage('');
                          }}
                          className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white p-1 rounded-full shadow-sm transition-colors"
                          title="Видалити зображення"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center text-slate-400 space-y-1">
                        <ImageIcon className="w-8 h-8 mx-auto" />
                        <span className="text-[10px]">Немає фото</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-100 hover:bg-rose-200 text-brand-800 rounded-2xl text-xs font-bold cursor-pointer transition-colors shadow-sm">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingImage ? 'Завантаження...' : 'Завантажити фото з комп’ютера'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Автоматично оптимізує та оновить фото у каталозі без проблем із кешуванням
                    </p>

                    {/* Manual Image Path Input */}
                    <input
                      type="text"
                      placeholder="/images/products/prod_51.webp"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setPreviewImage(e.target.value);
                      }}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-rose-50 transition-colors"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-bold text-xs shadow-pink-soft transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Збереження...' : 'Зберегти товар'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
