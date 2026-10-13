'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Category, Product, Review, ServiceBooking } from '@/types';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCatalogue from '@/components/ProductCatalogue';
import ProductDetailModal from '@/components/ProductDetailModal';
import CartDrawer from '@/components/CartDrawer';
import WishlistModal from '@/components/WishlistModal';
import ServiceSection from '@/components/ServiceSection';
import AboutSection from '@/components/AboutSection';
import EnquirySection from '@/components/EnquirySection';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function HomePage() {
  const {
    products,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    addOrder,
    serviceBookings,
    addServiceBooking,
    enquiries,
    addEnquiry,
    settings,
    reviews,
    setReviews,
    isLoaded,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-400">Loading Aura Home Appliances...</p>
        </div>
      </div>
    );
  }

  const handleAddReview = (newRev: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([review, ...reviews]);
  };

  const handleScrollToProducts = () => {
    setSelectedCategory('All');
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToService = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white">
      {/* Announcement Banner */}
      <AnnouncementBanner message={settings.announcementBanner} active={settings.bannerActive} />

      {/* Navbar */}
      <Navbar
        settings={settings}
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Section */}
      <HeroSection
        settings={settings}
        onExploreProducts={handleScrollToProducts}
        onBookService={handleScrollToService}
      />

      {/* Category Grid */}
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Catalogue */}
      <ProductCatalogue
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={(p) => addToCart(p, 1)}
        onQuickView={(p) => setSelectedProductForModal(p)}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />

      {/* 24/7 Service Section */}
      <ServiceSection
        settings={settings}
        onAddBooking={addServiceBooking}
      />

      {/* About Section */}
      <AboutSection settings={settings} />

      {/* Customer Enquiry Section */}
      <EnquirySection
        settings={settings}
        onAddEnquiry={addEnquiry}
      />

      {/* Footer */}
      <Footer settings={settings} />

      {/* Floating Buttons */}
      <FloatingButtons settings={settings} />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        settings={settings}
        onSubmitOrder={addOrder}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onToggleWishlist={toggleWishlist}
        onAddToCart={(p) => {
          addToCart(p, 1);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />

      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={(p, qty) => {
          addToCart(p, qty);
          setIsCartOpen(true);
        }}
        reviews={reviews}
        onAddReview={handleAddReview}
      />
    </div>
  );
}
