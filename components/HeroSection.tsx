'use client';

import React from 'react';
import { ArrowRight, Wrench, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { BusinessSettings } from '@/types';

interface HeroSectionProps {
  settings: BusinessSettings;
  onExploreProducts: () => void;
  onBookService: () => void;
}

export default function HeroSection({ settings, onExploreProducts, onBookService }: HeroSectionProps) {
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hello Aura Appliances, I am interested in purchasing and servicing home appliances.')}`;

  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-orange-600/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Next-Gen Home Retail & 24/7 Support</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Upgrade Your Home with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400 bg-clip-text text-transparent">
                Smarter Appliances
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal">
              {settings.tagline} Explore premium air conditioners, refrigerators, inverters, and kitchen appliances with unbeatable prices and reliable 24/7 repair support.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExploreProducts}
                className="px-7.5 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onBookService}
                className="px-7.5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-base shadow-lg flex items-center gap-2 transition"
              >
                <Wrench className="w-5 h-5 text-orange-400" />
                <span>Book a Service</span>
              </button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Genuine Brand</h4>
                  <p className="text-xs text-slate-400">100% Certified</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-orange-600/20 text-orange-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">24/7 Support</h4>
                  <p className="text-xs text-slate-400">Fast Repair</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">WhatsApp</h4>
                  <p className="text-xs text-slate-400">Easy Ordering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 3D Visual Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing backdrop card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-orange-600/30 rounded-3xl blur-2xl transform rotate-3 scale-105" />
              
              <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">Aura 3D Showcase v2.4</span>
                </div>

                {/* Featured Product Card Image Showcase */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1615873968403-89e067629265?auto=format&fit=crop&q=80&w=800"
                    alt="Smart Inverter Split AC"
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full w-max mb-1">
                      Best Seller • 20% OFF
                    </span>
                    <h3 className="text-lg font-bold text-white">Aura 1.5 Ton 5 Star Inverter AC</h3>
                    <p className="text-sm text-blue-300 font-semibold">₹38,999 <span className="text-xs text-slate-400 line-through">₹48,999</span></p>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="mt-4 bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Emergency Repair Team</p>
                      <p className="text-sm font-bold text-white">Active 24/7 in your area</p>
                    </div>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
