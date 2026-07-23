import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ShoppingBag, Search, Phone, Menu, X, ChevronRight, Sparkles, Instagram, Clock, Wand2, HelpCircle } from 'lucide-react';
import { useCart } from '@/lib/store';
import { searchProducts } from '@/lib/data';

export default function Header() {
  const router = RouterHook();
  const {
    totalCount,
    setIsCartOpen,
    setActiveModalProduct,
    isSparkleMode,
    toggleSparkleMode,
    setIsQuizOpen,
    setIsTimerOpen,
  } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  function RouterHook() {
    try {
      return useRouter();
    } catch {
      return { pathname: '/' };
    }
  }

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = searchProducts(searchQuery).slice(0, 6);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const marqueeItems = [
    '💖 BRIGHT DENTISTRY • Стоматологічний магазин у Вінниці',
    '✨ Твоя усмішка заслуговує на яскравий рожевий догляд!',
    '🚀 Безкоштовна доставка замовлень від 1500 грн по Україні',
    '📸 Instagram: @bright_dentistry.ua',
    '🪥 Оригінальні щітки Curaprox, пасти BioRepair та гелі Tooth Mousse',
    '💅 100% Сертифікована продукція від офіційних дистриб’юторів',
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white/95 backdrop-blur-md border-b border-rose-100">
      
      {/* Top Neon-Pink Marquee Ticker */}
      <div className="bg-gradient-to-r from-brand-600 via-rosebrand-500 to-pink-600 text-white text-[11px] font-semibold py-1.5 overflow-hidden shadow-inner flex items-center select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-8">
          {[...marqueeItems, ...marqueeItems].map((text, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span>{text}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-36 sm:w-44 h-12 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/images/logo.webp"
                alt="Bright Dentistry Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2 font-bold text-xl text-brand-600">
                <span className="bg-brand-500 text-white w-8 h-8 rounded-full flex items-center justify-center">B</span>
                Bright Dentistry
              </div>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Пошук зубної пасти, щітки чи коду товару (напр. 0010)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setIsSearchOpen(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-rose-50/50 hover:bg-rose-50 focus:bg-white border border-rose-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-brand-400 absolute left-3.5 top-3" />
            </form>

            {/* Instant Search Suggestions Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-rose-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 border-b border-rose-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">
                  Знайдено товарів ({searchResults.length})
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-rose-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setActiveModalProduct(product);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-rose-50/80 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-rose-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-800 truncate">
                          {product.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="bg-rose-100 text-brand-700 px-1.5 py-0.2 rounded text-[10px] font-bold">
                            Код: {product.code}
                          </span>
                          <span>{product.category}</span>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-brand-600 shrink-0">
                        {product.priceFormatted}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSearchSubmit}
                  className="w-full text-center py-2.5 bg-rose-50 hover:bg-rose-100 text-brand-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  Показати всі результати <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Contact Info & Interactive Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Pink Sparkle Mode Toggle */}
            <button
              onClick={toggleSparkleMode}
              className={`p-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
                isSparkleMode
                  ? 'bg-rose-100 text-brand-700 border-brand-300 hover:bg-rose-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
              title="Перемикач Pink Sparkle Mode"
            >
              <Wand2 className={`w-4 h-4 ${isSparkleMode ? 'text-brand-600 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden xl:inline-block">Sparkle Mode</span>
            </button>

            {/* Quick Quiz Trigger Button */}
            <button
              onClick={() => setIsQuizOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-brand-700 font-bold text-xs border border-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Рожевий квіз</span>
            </button>

            {/* Tooth Timer Trigger Button */}
            <button
              onClick={() => setIsTimerOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-brand-700 font-bold text-xs border border-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              <span>2-хв таймер</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 bg-gradient-to-r from-brand-500 to-rosebrand-500 hover:from-brand-600 hover:to-rosebrand-600 text-white rounded-full font-semibold text-xs flex items-center gap-2 shadow-pink-soft hover:shadow-pink-glow transition-all active:scale-95 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline-block">Кошик</span>
              {totalCount > 0 && (
                <span className="bg-white text-brand-600 font-extrabold text-[11px] px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-brand-600 rounded-lg hover:bg-rose-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-1.5 border-t border-rose-100/60 py-2 text-xs font-semibold text-slate-600">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              router.pathname === '/'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'hover:text-brand-600 hover:bg-rose-50'
            }`}
          >
            Головна
          </Link>
          <Link
            href="/catalog"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              router.pathname === '/catalog'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'hover:text-brand-600 hover:bg-rose-50'
            }`}
          >
            Каталог товарів
          </Link>
          <Link
            href="/catalog/Дитячі%20пасти"
            className="px-3 py-1.5 rounded-full hover:text-brand-600 hover:bg-rose-50 transition-colors"
          >
            👶 Дитячі пасти
          </Link>
          <Link
            href="/catalog/Дорослі%20пасти"
            className="px-3 py-1.5 rounded-full hover:text-brand-600 hover:bg-rose-50 transition-colors"
          >
            ✨ Дорослі пасти
          </Link>
          <Link
            href="/catalog/Щітки"
            className="px-3 py-1.5 rounded-full hover:text-brand-600 hover:bg-rose-50 transition-colors"
          >
            🪥 Зубні щітки
          </Link>
          <Link
            href="/catalog/Мінералізація"
            className="px-3 py-1.5 rounded-full hover:text-brand-600 hover:bg-rose-50 transition-colors"
          >
            💎 Мінералізація
          </Link>
          <a
            href="https://www.instagram.com/bright_dentistry.ua/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full text-pink-600 hover:bg-pink-50 transition-colors flex items-center gap-1 font-bold"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>@bright_dentistry.ua</span>
          </a>
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 p-4 space-y-3 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Пошук товарів..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-rose-50 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <Search className="w-4 h-4 text-brand-400 absolute left-3 top-2.5" />
          </form>

          {/* Quick Mobile Interactive Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsQuizOpen(true);
              }}
              className="flex-1 p-2 bg-rose-100 text-brand-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Рожевий квіз</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsTimerOpen(true);
              }}
              className="flex-1 p-2 bg-rose-100 text-brand-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
            >
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>2-хв таймер</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-rose-50 text-brand-700 rounded-xl text-center"
            >
              Головна
            </Link>
            <Link
              href="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2.5 bg-rose-50 text-brand-700 rounded-xl text-center"
            >
              Весь Каталог
            </Link>
            <Link
              href="/catalog/Дитячі%20пасти"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded-lg text-slate-700 hover:bg-rose-50"
            >
              👶 Дитячі пасти
            </Link>
            <Link
              href="/catalog/Дорослі%20пасти"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded-lg text-slate-700 hover:bg-rose-50"
            >
              ✨ Дорослі пасти
            </Link>
            <Link
              href="/catalog/Щітки"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded-lg text-slate-700 hover:bg-rose-50"
            >
              🪥 Щітки
            </Link>
            <Link
              href="/catalog/Мінералізація"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-slate-50 rounded-lg text-slate-700 hover:bg-rose-50"
            >
              💎 Мінералізація
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

