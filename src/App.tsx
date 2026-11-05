import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingActions } from './components/FloatingActions';
import { ScrollToTop } from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';

import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { DoctorPage } from './pages/DoctorPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactLocationPage } from './pages/ContactLocationPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { LegalPage } from './pages/LegalPage';
import { CheckoutPage } from './pages/CheckoutPage';

import { CartItem, Product, Order } from './types';
import { useNavigate } from 'react-router-dom';

const CART_STORAGE_KEY = 'shc_cart_items_v3';

function AppContent() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleOrderCompleted = (order: Order) => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-16 sm:pb-0">
      {/* Concise 3-Zone Header Navigation with Language Dropdown */}
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Clean HTML5 Permalinks Multi-Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenProductDetail={(p) => setSelectedProduct(p)}
              />
            }
          />
          <Route path="/treatments" element={<TreatmentsPage />} />
          <Route
            path="/medicines"
            element={
              <MedicinesPage
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onOpenProductDetail={(p) => setSelectedProduct(p)}
              />
            }
          />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactLocationPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onOrderComplete={handleOrderCompleted}
              />
            }
          />

          {/* Exact Legal Routes */}
          <Route path="/terms-of-service" element={<LegalPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/refund-policy" element={<LegalPage />} />
          <Route path="/disclaimer" element={<LegalPage />} />
        </Routes>
      </main>

      {/* 4-Column Professional Brand Footer */}
      <Footer />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Product Quick-View & Prescription Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* WhatsApp & Mobile Quick Navigation */}
      <FloatingActions
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAppointment={() => {
          navigate('/appointment');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
