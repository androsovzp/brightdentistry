import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Settings,
  LogOut,
  Store,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Панель Адміністратора' }) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth');
        const data = await res.json();
        if (data.authenticated) {
          setAuthorized(true);
        } else {
          router.replace('/admin/login');
        }
      } catch (e) {
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    if (router.pathname !== '/admin/login') {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const navItems = [
    { name: 'Дашборд', href: '/admin', icon: LayoutDashboard },
    { name: 'Усі Товари', href: '/admin/products', icon: Package },
    { name: 'Додати товар', href: '/admin/products/editor', icon: PlusCircle },
    { name: 'Категорії', href: '/admin/categories', icon: FolderTree },
    { name: 'Налаштування', href: '/admin/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50/40 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-600">Перевірка доступу...</p>
        </div>
      </div>
    );
  }

  if (!authorized && router.pathname !== '/admin/login') {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-rose-100 p-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold text-sm">
            BD
          </div>
          <span className="font-extrabold text-sm text-slate-900">Admin Panel</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-slate-600 hover:text-brand-600 rounded-lg hover:bg-rose-50"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-white border-r border-rose-100 p-5 flex flex-col justify-between transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Branding */}
          <div className="flex items-center gap-3 pb-4 border-b border-rose-100">
            <img src="/images/logo.svg" alt="Bright Dentistry" className="h-9 object-contain" />
            <span className="bg-rose-100 text-brand-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Адмін
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-pink-soft'
                      : 'text-slate-600 hover:bg-rose-50 hover:text-brand-600'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar Actions */}
        <div className="space-y-2 pt-4 border-t border-rose-100">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:text-brand-600 transition-colors"
          >
            <Store className="w-4 h-4 text-brand-500" />
            <span>Перейти до Магазину</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Вийти з системи</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-6">
        {/* Top Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              {title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Керування стоматологічним онлайн-магазином Bright Dentistry
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Магазин онлайн
            </span>
          </div>
        </div>

        {/* Children Page Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
