import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ProductModal from './ProductModal';
import Toast from './Toast';
import PinkQuizModal from './PinkQuizModal';
import ToothTimerModal from './ToothTimerModal';
import { useCart } from '@/lib/store';

export default function Layout({ children }) {
  const { isSparkleMode } = useCart();

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900 relative ${isSparkleMode ? 'pink-sparkle-glow' : ''}`}>
      
      {/* Floating Sparkle Particles if Sparkle Mode is ON */}
      {isSparkleMode && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          <div className="absolute top-20 left-6 text-pink-400/80 text-xl animate-float-sparkle">✨</div>
          <div className="absolute top-44 right-8 text-brand-400/80 text-2xl animate-float-sparkle delay-300">💖</div>
          <div className="absolute bottom-32 left-10 text-pink-300/80 text-lg animate-float-sparkle delay-700">✨</div>
          <div className="absolute bottom-40 right-12 text-rose-400/80 text-xl animate-float-sparkle delay-1000">💖</div>
        </div>
      )}

      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <ProductModal />
      <PinkQuizModal />
      <ToothTimerModal />
      <Toast />
    </div>
  );
}

