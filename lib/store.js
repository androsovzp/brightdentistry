import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  // New bright pink experience state
  const [isSparkleMode, setIsSparkleMode] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('bright_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedSparkle = localStorage.getItem('bright_sparkle');
      if (savedSparkle !== null) {
        setIsSparkleMode(JSON.parse(savedSparkle));
      }
    } catch (e) {
      console.error('Failed to load cart/sparkle from localStorage', e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('bright_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bright_sparkle', JSON.stringify(isSparkleMode));
    } catch (e) {
      console.error('Failed to save sparkle mode', e);
    }
  }, [isSparkleMode]);

  const toggleSparkleMode = () => {
    setIsSparkleMode((prev) => !prev);
    showToast(
      !isSparkleMode
        ? '✨ Pink Sparkle Mode ввімкнено!'
        : '🎀 Sparkle Mode вимкнено',
      'info'
    );
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    showToast(`"${product.title.slice(0, 30)}..." додано в кошик! ✨`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Товар видалено з кошика', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        toast,
        setToast,
        showToast,
        activeModalProduct,
        setActiveModalProduct,
        isSparkleMode,
        toggleSparkleMode,
        isQuizOpen,
        setIsQuizOpen,
        isTimerOpen,
        setIsTimerOpen,
        isGiftWrapped,
        setIsGiftWrapped,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
