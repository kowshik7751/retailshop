'use client';

import React, { useState } from 'react';
import { CartItem, BusinessSettings } from '@/types';
import { X, Trash2, Plus, Minus, ShoppingCart, MessageSquare, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  settings: BusinessSettings;
  onSubmitOrder: (orderData: any) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings,
  onSubmitOrder,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'preview'>('cart');

  // Checkout form state
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Telangana');
  const [pinCode, setPinCode] = useState('');
  const [email, setEmail] = useState('');
  const [instructions, setInstructions] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.sellingPrice * item.quantity, 0);
  const totalDiscount = cart.reduce((acc, item) => {
    if (item.product.originalPrice) {
      return acc + (item.product.originalPrice - item.product.sellingPrice) * item.quantity;
    }
    return acc;
  }, 0);
  const deliveryCharges = subtotal > 10000 ? 0 : settings.deliveryCharges;
  const grandTotal = subtotal + deliveryCharges;

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setStep('checkout');
  };

  const handleValidateAndPreview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!fullName.trim() || !mobile.trim() || !address.trim() || !district.trim() || !pinCode.trim()) {
      setErrorMsg('Please fill in all required address and contact fields.');
      return;
    }

    // Indian mobile number validation (10 digits starting with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.replace(/\D/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    // PIN code validation (6 digits)
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(pinCode)) {
      setErrorMsg('Please enter a valid 6-digit PIN code.');
      return;
    }

    const orderPayload = {
      customerName: fullName,
      mobile,
      address,
      district,
      state,
      pinCode,
      email,
      instructions,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.sellingPrice,
        quantity: item.quantity,
      })),
      subtotal,
      discount: totalDiscount,
      deliveryCharges,
      total: grandTotal,
    };

    setConfirmedOrder(orderPayload);
    setStep('preview');
  };

  const handleFinalWhatsAppSubmit = () => {
    // Save to backend / store
    const saved = onSubmitOrder(confirmedOrder);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Format WhatsApp message
    const itemsList = cart.map(item => `- ${item.product.name} × ${item.quantity} (₹${item.product.sellingPrice * item.quantity})`).join('\n');
    
    const whatsappMessage = `*NEW CUSTOMER ORDER - ${settings.storeName}*

*Customer Details:*
• Name: ${fullName}
• Mobile: ${mobile}
• Address: ${address}, ${district}, ${state} - ${pinCode}
${email ? `• Email: ${email}` : ''}
${instructions ? `• Instructions: ${instructions}` : ''}

*Order Summary:*
${itemsList}

• Subtotal: ₹${subtotal.toLocaleString('en-IN')}
• Total Savings: ₹${totalDiscount.toLocaleString('en-IN')}
• Delivery Charges: ${deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
*Estimated Total: ₹${grandTotal.toLocaleString('en-IN')}*

Please confirm product availability, final pricing, and delivery schedule. Thank you!`;

    const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col text-white shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <p className="text-xs text-slate-400">{cart.reduce((a, c) => a + c.quantity, 0)} items selected</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content based on step */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
                  <p className="text-sm text-slate-400 mt-1">Explore our catalogue and add appliances to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-slate-800/60 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl bg-slate-950 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-white truncate">{item.product.name}</h4>
                        <p className="text-xs text-blue-400 font-semibold mt-0.5">₹{item.product.sellingPrice.toLocaleString('en-IN')} each</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 text-slate-300 hover:text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 text-slate-300 hover:text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-rose-400 hover:text-rose-300 p-1 rounded transition"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form onSubmit={handleValidateAndPreview} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-white">Customer Delivery Details</h3>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  ← Back to Cart
                </button>
              </div>

              {errorMsg && (
                <div className="bg-rose-950/80 border border-rose-800 text-rose-300 text-xs p-3 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number (10 digits) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., 9876543210"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">House No, Street, Landmark *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Enter house number and street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">PIN Code (6 digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="500001"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Order Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Call before delivery, urgent installation"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-4 transition"
              >
                <span>Review Order Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'preview' && confirmedOrder && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">Order Confirmation Preview</h3>
                <button
                  onClick={() => setStep('checkout')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Edit Details
                </button>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <p><strong className="text-white">Customer:</strong> {confirmedOrder.customerName} ({confirmedOrder.mobile})</p>
                <p><strong className="text-white">Delivery Address:</strong> {confirmedOrder.address}, {confirmedOrder.district}, {confirmedOrder.state} - {confirmedOrder.pinCode}</p>
                {confirmedOrder.instructions && <p><strong className="text-white">Instructions:</strong> {confirmedOrder.instructions}</p>}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</h4>
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <p className="font-bold text-white">{item.product.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity} × ₹{item.product.sellingPrice.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="font-bold text-blue-400">₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Total Discount Saved</span>
                    <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Charges</span>
                  <span>{deliveryCharges === 0 ? 'FREE' : `₹{deliveryCharges}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="text-orange-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-[11px] text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">WhatsApp Order Dispatch</p>
                  <p className="mt-0.5 text-emerald-300/80">Clicking below will open WhatsApp with your pre-formatted order to business number <strong className="text-white">7780447630</strong>. You must press Send in WhatsApp to complete order submission.</p>
                </div>
              </div>

              <button
                onClick={handleFinalWhatsAppSubmit}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Submit Order via WhatsApp (7780447630)</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step === 'cart' && cart.length > 0 && (
          <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery</span>
                <span>{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-orange-400">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
