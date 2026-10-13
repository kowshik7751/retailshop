'use client';

import React, { useState } from 'react';
import { CustomerEnquiry, BusinessSettings } from '@/types';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnquirySectionProps {
  settings: BusinessSettings;
  onAddEnquiry: (enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>) => CustomerEnquiry;
}

export default function EnquirySection({ settings, onAddEnquiry }: EnquirySectionProps) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState<CustomerEnquiry['enquiryType']>('Product Price');
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !mobile || !message) {
      setErrorMsg('Please fill in your name, mobile number, and message.');
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    onAddEnquiry({
      name,
      mobile,
      email: email || 'N/A',
      enquiryType,
      productName: productName || 'General Enquiry',
      message,
    });

    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `*CUSTOMER ENQUIRY - ${settings.storeName}*\n\nName: ${name}\nMobile: ${mobile}\nType: ${enquiryType}\nProduct: ${productName}\nMessage: ${message}`
  )}`;

  return (
    <section id="enquiry" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5 text-orange-400" /> Customer Support & Enquiries
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Have Questions? Get in Touch with Our Experts
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Whether you need bulk order pricing, warranty details, or specific appliance recommendations, our expert team is ready to assist you.
            </p>

            <div className="space-y-4 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">✓</span>
                <span>Instant response via WhatsApp or Phone</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold">✓</span>
                <span>Custom corporate & bulk discounts available</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Enquiry Submitted Successfully!</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. Our support team has logged your enquiry and will follow up shortly.
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition"
                  >
                    <MessageSquare className="w-4 h-4" /> Follow up on WhatsApp
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Send an Enquiry</h3>

                {errorMsg && (
                  <div className="bg-rose-950/80 border border-rose-800 text-rose-300 text-xs p-3 rounded-xl font-medium">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Enquiry Type *</label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Product Price">Product Price Enquiry</option>
                      <option value="Product Availability">Product Availability</option>
                      <option value="Bulk Orders">Bulk / Corporate Orders</option>
                      <option value="Warranty">Warranty & Support</option>
                      <option value="Repair Services">Repair Services</option>
                      <option value="Delivery">Delivery Details</option>
                      <option value="Other">Other Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Product (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Aura 1.5 Ton Split AC"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Requirements *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter your query or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
