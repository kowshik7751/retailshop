'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Phone, MessageSquare, ShieldCheck, Menu, X, Wrench, Package, Info, Mail } from 'lucide-react';
import { BusinessSettings } from '@/types';

interface NavbarProps {
  settings: BusinessSettings;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  settings,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hello Aura Appliances, I would like to enquire about your products and services.')}`;

  const navLinks = [
    { id: 'home', label: 'Home', icon: Package },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'services', label: '24/7 Repair', icon: Wrench },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'enquiry', label: 'Enquiry', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-orange-600 text-xs py-1.5 px-4 text-center font-medium flex flex-wrap justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
            <a href={`tel:${settings.phone}`} className="hover:underline">{settings.phone}</a>
          </span>
          <span className="hidden sm:inline text-white/70">|</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Authorized Retailer & 24/7 Service Support</span>
          </span>
        </div>
        <div className="flex items-center gap-3 mx-auto sm:mx-0 mt-1 sm:mt-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 px-2.5 py-0.5 rounded-full text-white font-semibold transition shadow-sm"
          >
            <MessageSquare className="w-3 h-3" /> WhatsApp Support
          </a>
          <Link
            href="/admin/login"
            className="text-white/80 hover:text-white underline text-xs font-semibold"
          >
            Admin Login
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center shadow-lg shadow-blue-500/30 font-black text-2xl tracking-wider text-white">
              A
            </div>
            <div>
              <Link href="/" onClick={() => handleNavClick('home')} className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                {settings.storeName}
              </Link>
              <p className="text-xs text-slate-400 hidden sm:block font-medium">Smart Appliances & Expert Repairs</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Wishlist, Cart, Mobile Hamburger) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition transform active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center gap-3 text-slate-200 hover:bg-slate-800 hover:text-white transition"
              >
                <Icon className="w-5 h-5 text-orange-400" />
                {link.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-200 font-medium"
            >
              <Phone className="w-5 h-5 text-blue-400" /> Call {settings.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
