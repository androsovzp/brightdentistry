import React, { useState, useEffect, useRef } from 'react';
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
  Loader2,
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';

export default function ProductEditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = Boolean(id);
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    code: '',
    title: '',
    category: 'Дитячі пасти',
    price: '',
    description: '',
    image: '',
    images: [],
    inStock: true,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, text: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isDragging, setIsDragging] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');

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
      console.log(`🔍 [Product Editor] Loading product data for ID/code: "${id}"...`);
      fetch('/api/admin/products')
        .then((res) => res.json())
        .then((products) => {
          if (Array.isArray(products)) {
            const found = products.find((p) => p.id === id || p.code === String(id));
            if (found) {
              console.group('🛍️ [Product Editor] Product Loaded');
              console.log('ID:', found.id);
              console.log('Code:', found.code);
              console.log('Title:', found.title);
              console.log('Price:', found.price);
              console.log('Category:', found.category);
              console.log('Image:', found.image);
              console.log('Images:', found.images);
              console.log('In Stock:', found.inStock);
              console.groupEnd();

              // Normalize initial images
              const initialImages = Array.isArray(found.images) && found.images.length > 0
                ? found.images.filter(Boolean)
                : found.image
                ? [found.image]
                : [];

              setFormData({
                id: found.id,
                code: found.code,
                title: found.title,
                category: found.category,
                price: found.price,
                description: found.description || '',
                image: found.image || initialImages[0] || '',
                images: initialImages,
                inStock: found.inStock !== undefined ? found.inStock : true,
              });
            } else {
              console.warn(`⚠️ [Product Editor] Product with ID/code "${id}" not found.`);
            }
          }
        })
        .catch((e) => console.error('❌ [Product Editor] Error fetching product:', e));
    }
  }, [id]);

  const compressImageFile = (file, maxDimension = 900, quality = 0.85) => {
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

          // Convert to compact webp
          const dataUrl = canvas.toDataURL('image/webp', quality);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const processAndUploadFiles = async (filesList) => {
    const validFiles = Array.from(filesList).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    setUploading(true);
    setMessage({ type: '', text: '' });
    const total = validFiles.length;
    const cleanCode = formData.code || Date.now().toString();

    try {
      const compressedBatch = [];
      for (let i = 0; i < total; i++) {
        const file = validFiles[i];
        setUploadProgress({
          current: i + 1,
          total,
          text: `Оптимізація фото ${i + 1} з ${total} (${file.name})...`,
        });

        const base64 = await compressImageFile(file, 900, 0.85);
        compressedBatch.push({
          fileBase64: base64,
          filename: file.name,
          suffix: `${Date.now()}_${i}`,
        });
      }

      setUploadProgress({
        current: total,
        total,
        text: `Завантаження та збереження ${total} фото на сервер...`,
      });

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: cleanCode,
          files: compressedBatch,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.urls) && data.urls.length > 0) {
        setFormData((prev) => {
          const updatedImages = [...prev.images, ...data.urls];
          return {
            ...prev,
            images: updatedImages,
            image: updatedImages[0] || '',
          };
        });

        setMessage({
          type: 'success',
          text: `🎉 Успішно завантажено ${data.urls.length} фото! Не забудьте натиснути "Зберегти товар".`,
        });
      } else {
        throw new Error(data.message || 'Сервер повернув помилку завантаження');
      }
    } catch (err) {
      console.error('❌ [Multi-Photo Upload] Exception:', err);
      setMessage({
        type: 'error',
        text: `Помилка завантаження: ${err.message || 'Не вдалося зберегти фото'}`,
      });
    } finally {
      setUploading(false);
      setUploadProgress({ current: 0, total: 0, text: '' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processAndUploadFiles(e.target.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processAndUploadFiles(e.dataTransfer.files);
    }
  };

  const handleSetPrimary = (index) => {
    if (index === 0) return;
    setFormData((prev) => {
      const newImages = [...prev.images];
      const [selected] = newImages.splice(index, 1);
      newImages.unshift(selected);
      return {
        ...prev,
        images: newImages,
        image: newImages[0] || '',
      };
    });
  };

  const handleMovePhoto = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= formData.images.length) return;

    setFormData((prev) => {
      const newImages = [...prev.images];
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      return {
        ...prev,
        images: newImages,
        image: newImages[0] || '',
      };
    });
  };

  const handleRemovePhoto = (index) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: newImages,
        image: newImages[0] || '',
      };
    });
  };

  const handleAddCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    const url = customUrlInput.trim();
    setFormData((prev) => {
      const newImages = [...prev.images, url];
      return {
        ...prev,
        images: newImages,
        image: newImages[0] || '',
      };
    });
    setCustomUrlInput('');
    setMessage({ type: 'success', text: 'Фото додано за посиланням!' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.category) {
      setMessage({ type: 'error', text: 'Будь ласка, заповніть обов’язкові поля (Код, Назва, Категорія)' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      image: formData.images[0] || formData.image || '',
    };

    console.group(`💾 [Product Save] Submitting ${method} /api/admin/products`);
    console.log('Code:', payload.code);
    console.log('Title:', payload.title);
    console.log('Price:', payload.price);
    console.log('Category:', payload.category);
    console.log('Primary Image:', payload.image);
    console.log('Total Images Count:', payload.images.length);
    console.log('Images List:', payload.images);
    console.groupEnd();

    try {
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.group('📥 [Product Save Response]');
      console.log('HTTP Status:', res.status, res.statusText);
      console.log('Saved Product Data:', data.product);
      if (data.debug) {
        console.log('GitHub Commit Status:', data.debug.github);
      }
      console.groupEnd();

      if (res.ok && data.success) {
        console.log('🎉 [Product Save] Product saved and committed successfully!');
        setMessage({ type: 'success', text: 'Товар успішно збережено!' });
        setTimeout(() => {
          router.push('/admin/products');
        }, 1200);
      } else {
        console.error('❌ [Product Save] Save failed:', data);
        setMessage({ type: 'error', text: data.message || 'Помилка збереження товару' });
      }
    } catch (err) {
      console.error('❌ [Product Save] Network exception:', err);
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
        <div className="bg-white rounded-3xl border border-rose-100 p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          {/* Full Card Loading Overlay */}
          {(uploading || saving) && (
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
              <div className="bg-white border border-rose-100 shadow-xl rounded-3xl p-8 max-w-sm w-full flex flex-col items-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-brand-600 shadow-inner">
                  <Loader2 className="w-7 h-7 animate-spin text-brand-600" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-sm">
                    {uploading ? 'Обробка та завантаження фото...' : 'Збереження товару...'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {uploading
                      ? uploadProgress.text || 'Оптимізуємо зображення у WebP та синхронізуємо...'
                      : 'Оновлюємо каталог товарів та фіксуємо зміни...'}
                  </p>
                </div>
                {uploading && uploadProgress.total > 0 && (
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Прогрес:</span>
                      <span>
                        {uploadProgress.current} / {uploadProgress.total}
                      </span>
                    </div>
                    <div className="w-full bg-rose-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-brand-500 to-rosebrand-500 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round((uploadProgress.current / uploadProgress.total) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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
                  onChange={(e) => {
                    setFormData({ ...formData, code: e.target.value });
                    console.log('🔢 [Field: Code]:', e.target.value);
                  }}
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
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                    console.log('🏷️ [Field: Category]:', e.target.value);
                  }}
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
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    console.log('✏️ [Field: Title]:', e.target.value);
                  }}
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
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    console.log('💰 [Field: Price]:', e.target.value);
                  }}
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
                    onChange={(e) => {
                      setFormData({ ...formData, inStock: e.target.checked });
                      console.log('📦 [Field: InStock]:', e.target.checked);
                    }}
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
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    console.log('📝 [Field: Description]:', `${e.target.value.slice(0, 40)}...`);
                  }}
                  className="w-full px-4 py-3 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 leading-relaxed"
                />
              </div>

              {/* Multi-Photo Gallery Section */}
              <div className="md:col-span-2 space-y-4 pt-4 border-t border-rose-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-brand-500" />
                      <span>Галерея фотографій товару</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Можна завантажити більше 5 фотографій без обмежень. Перше фото — головне для каталогу.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-brand-800 text-xs font-bold">
                      📸 Фото: {formData.images.length}
                    </span>
                    {formData.images.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Видалити всі завантажені фотографії товару?')) {
                            setFormData((prev) => ({ ...prev, images: [], image: '' }));
                          }
                        }}
                        className="text-[11px] text-rose-500 hover:text-rose-700 font-semibold"
                      >
                        Очистити всі
                      </button>
                    )}
                  </div>
                </div>

                {/* Drag and Drop Upload Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-brand-500 bg-rose-100/70 scale-[1.01]'
                      : 'border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-brand-300'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                    disabled={uploading || saving}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-rose-100 shadow-sm flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800">
                        {uploading
                          ? '⏳ Завантаження та оптимізація...'
                          : 'Натисніть або перетягніть сюди фото (можна вибрати кілька одразу)'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Підтримуються JPG, PNG, WebP. Автоматично конвертуються у швидкий WebP для сайту.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-xs font-bold shadow-pink-soft">
                      <Plus className="w-4 h-4" /> Вибрати файли з комп’ютера
                    </div>
                  </div>
                </div>

                {/* Uploaded Photos Grid */}
                {formData.images.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-700">Завантажені фото:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.images.map((imgUrl, index) => {
                        const isPrimary = index === 0;
                        return (
                          <div
                            key={`${imgUrl}-${index}`}
                            className={`group relative bg-white rounded-2xl border ${
                              isPrimary
                                ? 'border-brand-400 ring-2 ring-brand-300 shadow-md'
                                : 'border-rose-100 hover:border-rose-300'
                            } p-2 flex flex-col justify-between overflow-hidden transition-all`}
                          >
                            {/* Photo Thumbnail */}
                            <div className="relative w-full h-28 sm:h-32 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-1.5 mb-2">
                              <img
                                src={imgUrl}
                                alt={`Фото ${index + 1}`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.src = '/images/products/placeholder.webp';
                                }}
                              />

                              {/* Index & Primary Badge */}
                              <div className="absolute top-1.5 left-1.5">
                                {isPrimary ? (
                                  <span className="px-2 py-0.5 bg-brand-600 text-white text-[10px] font-extrabold rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="w-3 h-3 fill-current" /> Головне
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 bg-slate-900/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
                                    #{index + 1}
                                  </span>
                                )}
                              </div>

                              {/* Delete Single Photo Button */}
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(index)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90 opacity-90 hover:opacity-100"
                                title="Видалити це фото"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Card Actions */}
                            <div className="flex items-center justify-between gap-1 pt-1 border-t border-rose-50">
                              {/* Move Left */}
                              <button
                                type="button"
                                onClick={() => handleMovePhoto(index, -1)}
                                disabled={index === 0}
                                className="p-1 rounded-lg hover:bg-rose-50 text-slate-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:bg-transparent"
                                title="Перемістити лівіше"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>

                              {/* Make Primary Button */}
                              {!isPrimary ? (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimary(index)}
                                  className="text-[10px] font-bold text-brand-600 hover:text-brand-700 px-2 py-0.5 rounded-md hover:bg-rose-50"
                                >
                                  Головне
                                </button>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-600">Головне</span>
                              )}

                              {/* Move Right */}
                              <button
                                type="button"
                                onClick={() => handleMovePhoto(index, 1)}
                                disabled={index === formData.images.length - 1}
                                className="p-1 rounded-lg hover:bg-rose-50 text-slate-500 hover:text-brand-600 disabled:opacity-30 disabled:hover:bg-transparent"
                                title="Перемістити правіше"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Optional Manual URL Input */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Або додайте пряме посилання на фото:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="/images/products/prod_122.webp або https://..."
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomUrl();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-400"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomUrl}
                      disabled={!customUrlInput.trim()}
                      className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      <LinkIcon className="w-3.5 h-3.5" /> Додати
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-rose-100">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                disabled={saving || uploading}
                className="px-5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-bold text-xs shadow-pink-soft transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{uploading ? '⏳ Завантаження фото...' : saving ? '💾 Збереження...' : 'Зберегти товар'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
