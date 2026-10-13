'use client';

import React from 'react';
import { BusinessSettings } from '@/types';
import { ShieldCheck, Award, Users, MapPin } from 'lucide-react';

interface AboutSectionProps {
  settings: BusinessSettings;
}

export default function AboutSection({ settings }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left image collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600"
                alt="Appliance showroom"
                className="rounded-2xl object-cover h-64 w-full shadow-2xl border border-slate-800"
              />
              <img
                src="https://images.unsplash.com/photo-1584568694244-14fbdf82bd1e?auto=format&fit=crop&q=80&w=600"
                alt="Refrigerator display"
                className="rounded-2xl object-cover h-64 w-full shadow-2xl border border-slate-800 mt-8"
              />
            </div>
          </div>

          {/* Right info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-orange-400" /> About {settings.storeName}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Trusted Home Appliances Retailer & Service Hub
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              We bring cutting-edge home comfort right to your doorstep. From high-efficiency 5-star inverter air conditioners and modern multi-door refrigerators to heavy-duty inverters and batteries, we guarantee 100% genuine products with manufacturer warranties.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Certified Quality</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Top global & domestic brands</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-orange-600/20 text-orange-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">15,000+ Homes</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Delivered & serviced statewide</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>{settings.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
