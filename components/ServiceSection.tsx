'use client';

import React, { useState } from 'react';
import { ServiceBooking, BusinessSettings } from '@/types';
import { Wrench, ShieldCheck, Clock, CheckCircle2, AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ServiceSectionProps {
  settings: BusinessSettings;
  onAddBooking: (booking: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => ServiceBooking;
}

const repairServicesList = [
  { title: 'AC Installation & Gas Refill', icon: Wrench, desc: 'Professional copper piping, vacuum testing, and gas top-up.' },
  { title: 'Refrigerator Repair', icon: ShieldCheck, desc: 'Cooling issues, compressor replacement, and thermostat calibration.' },
  { title: 'Inverter & Battery Service', icon: Wrench, desc: 'Load testing, water topping, and inverter PCB troubleshooting.' },
  { title: 'Ceiling & Pedestal Fan Repair', icon: Wrench, desc: 'Bearing replacement, winding check, and regulator installation.' },
  { title: 'Air Cooler Maintenance', icon: Wrench, desc: 'Honeycomb pad replacement, pump repair, and tank cleaning.' },
  { title: 'Emergency Electrical Troubleshooting', icon: AlertTriangle, desc: '24/7 rapid response for short circuits and appliance faults.' },
];

export default function ServiceSection({ settings, onAddBooking }: ServiceSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Telangana');
  const [pinCode, setPinCode] = useState('');
  const [applianceType, setApplianceType] = useState('Air Conditioner');
  const [brand, setBrand] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [requestType, setRequestType] = useState<'Normal' | 'Emergency'>('Normal');

  const [submittedBooking, setSubmittedBooking] = useState<ServiceBooking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName || !mobile || !address || !district || !pinCode || !problemDescription) {
      setErrorMsg('Please fill in all required customer details and problem description.');
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const newBooking = onAddBooking({
      customerName,
      mobile,
      address,
      district,
      state,
      pinCode,
      applianceType,
      brand: brand || 'Generic / Other',
      problemDescription,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime,
      requestType,
    });

    setSubmittedBooking(newBooking);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  const whatsappServiceUrl = submittedBooking
    ? `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
        `*SERVICE BOOKING REQUEST - ${settings.storeName}*\n\nBooking ID: ${submittedBooking.id}\nName: ${customerName}\nMobile: ${mobile}\nAppliance: ${applianceType} (${brand})\nIssue: ${problemDescription}\nUrgency: ${requestType}\nAddress: ${address}, ${district} - ${pinCode}\n\nPlease assign a technician.`
      )}`
    : '';

  return (
    <section id="services" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5" /> 24/7 Rapid Response Repair Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Expert Appliance Repair & Maintenance
          </h2>
          <p className="text-slate-400 mt-2">
            Certified technicians available round the clock for doorstep diagnostics, prompt repairs, and preventative maintenance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {repairServicesList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center text-white mb-4 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{srv.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Booking Form Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-white">Book a Service Request</h3>
            <p className="text-xs text-slate-400 mt-1">Fill out the form below to schedule a technician visit or request emergency support.</p>
          </div>

          {submittedBooking ? (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold text-white">Service Booking Registered Successfully!</h4>
              <p className="text-sm text-slate-300">
                Booking Reference ID: <strong className="text-orange-400 font-mono">{submittedBooking.id}</strong>
              </p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Our service desk has received your request. A certified technician will contact you on <strong className="text-white">{submittedBooking.mobile}</strong> shortly.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <a
                  href={whatsappServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" /> Follow up on WhatsApp
                </a>
                <button
                  onClick={() => setSubmittedBooking(null)}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="space-y-6">
              {errorMsg && (
                <div className="bg-rose-950/80 border border-rose-800 text-rose-300 text-xs p-3 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (10 digits) *</label>
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

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Address *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House number, street, landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                  <input
                    type="text"
                    required
                    placeholder="Hyderabad"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="500001"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Appliance Type *</label>
                  <select
                    value={applianceType}
                    onChange={(e) => setApplianceType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Air Conditioner">Air Conditioner</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Fan">Fan</option>
                    <option value="Electric Kitchen Appliance">Kitchen Appliance</option>
                    <option value="Air Cooler">Air Cooler</option>
                    <option value="Battery / Inverter">Battery / Inverter</option>
                    <option value="Other Electrical">Other Electrical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. AuraTech, Samsung, LG"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Request Priority *</label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none font-bold text-orange-400"
                  >
                    <option value="Normal">Normal (Within 24 Hours)</option>
                    <option value="Emergency">🚨 Emergency (Within 2 Hours)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Slot</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the issue you are facing with your appliance..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2 transition"
              >
                <Wrench className="w-5 h-5" />
                <span>Submit Service Booking Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
