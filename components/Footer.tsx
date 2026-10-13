'use client';

import React from 'react';
import Link from 'next/link';
import { BusinessSettings } from '@/types';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  settings: BusinessSettings;
}

export default function Footer({ settings }: FooterProps) {
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hello Aura Appliances, I would like to know more about your products and services.')}`;

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center font-black text-xl text-white">
                A
              </div>
              <span className="font-extrabold text-lg text-white">{settings.storeName}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {settings.tagline} Certified home appliances retailer offering split ACs, refrigerators, inverters, and 24/7 expert repair services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition shadow"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Support
              </a>
              <Link
                href="/admin/login"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold transition"
              >
                Admin Login
              </Link>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#products" className="hover:text-white transition">Air Conditioners</a></li>
              <li><a href="#products" className="hover:text-white transition">Refrigerators</a></li>
              <li><a href="#products" className="hover:text-white transition">BLDC & Ceiling Fans</a></li>
              <li><a href="#products" className="hover:text-white transition">Kitchen Appliances</a></li>
              <li><a href="#products" className="hover:text-white transition">Inverters & Batteries</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Repair & Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition">24/7 Emergency Repairs</a></li>
              <li><a href="#services" className="hover:text-white transition">AC Installation & Gas Refill</a></li>
              <li><a href="#services" className="hover:text-white transition">Refrigerator Maintenance</a></li>
              <li><a href="#services" className="hover:text-white transition">Inverter Battery Service</a></li>
              <li><a href="#services" className="hover:text-white transition">Book a Technician</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {settings.storeName}. All rights reserved. Authorized Retailer.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-400 cursor-pointer">Warranty Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
