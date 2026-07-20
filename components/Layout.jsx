import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ProductModal from './ProductModal';
import Toast from './Toast';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand-200 selection:text-brand-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <ProductModal />
      <Toast />
    </div>
  );
}
