'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';
import { BusinessSettings } from '@/types';

interface FloatingButtonsProps {
  settings: BusinessSettings;
}

export default function FloatingButtons({ settings }: FloatingButtonsProps) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hello Aura Appliances, I would like assistance with home appliances.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition transform hover:scale-110 active:scale-95 group"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 text-white fill-current" />
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap border border-slate-800">
          Chat on WhatsApp
        </span>
      </a>

      {/* Back to top button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-xl flex items-center justify-center transition transform hover:scale-110 active:scale-95 border border-slate-700"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
