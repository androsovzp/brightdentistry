import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin');
      } else {
        setError(data.message || 'Невірний пароль');
      }
    } catch (err) {
      setError('Помилка з’єднання з сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Вхід у Панель Адміністратора — Bright Dentistry</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-rose-100 shadow-xl space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-rose-100 text-brand-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">
              Bright Dentistry Admin
            </h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Введіть секретний пароль адміністратора для доступу до керування каталогом товарів.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Пароль адміністратора:
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-10 py-3 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
                />
                <ShieldCheck className="w-5 h-5 text-brand-400 absolute right-3 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl border border-rose-200 text-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-2xl font-bold text-sm shadow-pink-soft hover:shadow-pink-glow transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Вхід...</span>
              ) : (
                <>
                  <span>Увійти в систему</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-rose-50">
            Bright Dentistry Store © 2026. Захищена сесія.
          </div>
        </div>
      </div>
    </>
  );
}
