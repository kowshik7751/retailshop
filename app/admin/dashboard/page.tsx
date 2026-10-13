'use client';

/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product, Order, ServiceBooking, CustomerEnquiry, BusinessSettings, Category } from '@/types';
import { initialProducts, initialOrders, initialServiceBookings, initialEnquiries, initialBusinessSettings } from '@/lib/initial-data';
import { ShieldCheck, Package, ShoppingCart, Wrench, Mail, Settings, LogOut, Plus, Trash2, Edit, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'services' | 'enquiries' | 'settings'>('overview');

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>(initialServiceBookings);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(initialEnquiries);
  const [settings, setSettings] = useState<BusinessSettings>(initialBusinessSettings);

  const [isLoaded, setIsLoaded] = useState(false);

  // New product form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBrand, setNewBrand] = useState('AuraTech');
  const [newCategory, setNewCategory] = useState<Category>('Air Conditioners');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1615873968403-89e067629265?auto=format&fit=crop&q=80&w=800');
  const [newDescription, setNewDescription] = useState('');
  const [newSellingPrice, setNewSellingPrice] = useState(19999);
  const [newOriginalPrice, setNewOriginalPrice] = useState(24999);
  const [newStock, setNewStock] = useState(10);
  const [newWarranty, setNewWarranty] = useState('1 Year Comprehensive');

  useEffect(() => {
    const auth = localStorage.getItem('aura_admin_auth');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }

    try {
      const p = localStorage.getItem('aura_products');
      if (p) setProducts(JSON.parse(p));
      const o = localStorage.getItem('aura_orders');
      if (o) setOrders(JSON.parse(o));
      const s = localStorage.getItem('aura_bookings');
      if (s) setServiceBookings(JSON.parse(s));
      const e = localStorage.getItem('aura_enquiries');
      if (e) setEnquiries(JSON.parse(e));
      const st = localStorage.getItem('aura_settings');
      if (st) setSettings(JSON.parse(st));
    } catch (err) {
      console.error(err);
    }
    setIsLoaded(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('aura_admin_auth');
    router.push('/');
  };

  const saveProductsToStorage = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('aura_products', JSON.stringify(updated));
  };

  const saveOrdersToStorage = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('aura_orders', JSON.stringify(updated));
  };

  const saveBookingsToStorage = (updated: ServiceBooking[]) => {
    setServiceBookings(updated);
    localStorage.setItem('aura_bookings', JSON.stringify(updated));
  };

  const saveEnquiriesToStorage = (updated: CustomerEnquiry[]) => {
    setEnquiries(updated);
    localStorage.setItem('aura_enquiries', JSON.stringify(updated));
  };

  const saveSettingsToStorage = (updated: BusinessSettings) => {
    setSettings(updated);
    localStorage.setItem('aura_settings', JSON.stringify(updated));
  };

  // Add Product handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      brand: newBrand,
      category: newCategory,
      image: newImage,
      description: newDescription,
      sellingPrice: Number(newSellingPrice),
      originalPrice: Number(newOriginalPrice),
      discountPercentage: Math.round(((Number(newOriginalPrice) - Number(newSellingPrice)) / Number(newOriginalPrice)) * 100),
      stock: Number(newStock),
      warranty: newWarranty,
      specifications: { 'Capacity': 'Standard', 'Warranty': newWarranty },
      deliveryInfo: 'Free delivery within 2-3 days.',
      rating: 5.0,
      reviewsCount: 1,
    };
    saveProductsToStorage([product, ...products]);
    setShowAddModal(false);
    // Reset form
    setNewName('');
    setNewDescription('');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      saveProductsToStorage(products.filter(p => p.id !== id));
    }
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    saveProductsToStorage(
      products.map(p => p.id === id ? { ...p, sellingPrice: newPrice } : p)
    );
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    saveOrdersToStorage(
      orders.map(o => o.id === id ? { ...o, status } : o)
    );
  };

  const handleUpdateBookingStatus = (id: string, status: ServiceBooking['status']) => {
    saveBookingsToStorage(
      serviceBookings.map(b => b.id === id ? { ...b, status } : b)
    );
  };

  if (!isLoaded) return null;

  const lowStockCount = products.filter(p => p.stock < 5).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const confirmedOrdersCount = orders.filter(o => o.status === 'Confirmed').length;
  const serviceBookingsCount = serviceBookings.length;
  const enquiriesCount = enquiries.length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center font-bold text-white text-xl">
              A
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Admin Control</h3>
              <p className="text-[11px] text-slate-400">Retail & Service Manager</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: ShieldCheck },
              { id: 'products', label: 'Product Catalogue', icon: Package, badge: products.length },
              { id: 'orders', label: 'Customer Orders', icon: ShoppingCart, badge: pendingOrdersCount },
              { id: 'services', label: 'Service Bookings', icon: Wrench, badge: serviceBookingsCount },
              { id: 'enquiries', label: 'Customer Enquiries', icon: Mail, badge: enquiriesCount },
              { id: 'settings', label: 'Business Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" /> View Storefront
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold transition"
          >
            <LogOut className="w-4 h-4" /> Admin Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black capitalize">{activeTab} Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Logged in as Administrator</span>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Total Products</p>
                      <h3 className="text-3xl font-black text-white mt-1">{products.length}</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Pending Orders</p>
                      <h3 className="text-3xl font-black text-orange-400 mt-1">{pendingOrdersCount}</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-orange-600/20 text-orange-400">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Service Bookings</p>
                      <h3 className="text-3xl font-black text-emerald-400 mt-1">{serviceBookingsCount}</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400">
                      <Wrench className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Low Stock Alerts</p>
                      <h3 className="text-3xl font-black text-rose-400 mt-1">{lowStockCount}</h3>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-600/20 text-rose-400">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders table summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Recent Customer Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Mobile</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id}>
                          <td className="py-3 font-mono font-bold text-blue-400">{o.id}</td>
                          <td className="py-3 font-semibold text-white">{o.customerName}</td>
                          <td className="py-3 text-slate-300">{o.mobile}</td>
                          <td className="py-3 font-bold text-orange-400">₹{o.total.toLocaleString('en-IN')}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Manage Products & Prices</h3>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                        <th className="p-4">Product</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Selling Price (₹)</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-slate-950 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-white">{p.name}</p>
                              <p className="text-[11px] text-slate-400">{p.brand}</p>
                            </div>
                          </td>
                          <td className="p-4 text-slate-300">{p.category}</td>
                          <td className="p-4">
                            <input
                              type="number"
                              value={p.sellingPrice}
                              onChange={(e) => handleUpdatePrice(p.id, Number(e.target.value))}
                              className="w-28 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold text-xs"
                            />
                          </td>
                          <td className="p-4">
                            <span className={`font-bold ${p.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 transition"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Customer Order Management</h3>
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-800">
                      <div>
                        <span className="font-mono font-bold text-blue-400 text-sm">{o.id}</span>
                        <h4 className="font-bold text-base text-white mt-0.5">{o.customerName} ({o.mobile})</h4>
                        <p className="text-xs text-slate-400">{o.address}, {o.district} - {o.pinCode}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-orange-400 focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <p className="text-slate-400 uppercase font-bold text-[10px]">Ordered Items</p>
                        {o.items.map((item, idx) => (
                          <p key={idx} className="text-slate-200">• {item.productName} × {item.quantity} (₹{item.price * item.quantity})</p>
                        ))}
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-slate-400 uppercase font-bold text-[10px]">Order Total</p>
                        <p className="text-lg font-black text-orange-400">₹{o.total.toLocaleString('en-IN')}</p>
                        <p className="text-[11px] text-slate-500">Date: {new Date(o.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Service Booking Requests</h3>
              <div className="space-y-4">
                {serviceBookings.map((b) => (
                  <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
                      <div>
                        <span className="font-mono font-bold text-orange-400">{b.id}</span>
                        <span className={`ml-3 px-2.5 py-0.5 rounded-full font-bold ${b.requestType === 'Emergency' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300'}`}>
                          {b.requestType}
                        </span>
                      </div>
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-400 focus:outline-none"
                      >
                        <option value="Received">Received</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-bold text-white text-sm">{b.customerName} ({b.mobile})</p>
                        <p className="text-slate-400">{b.address}, {b.district} - {b.pinCode}</p>
                        <p className="text-blue-400 mt-1 font-semibold">Appliance: {b.applianceType} ({b.brand})</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-300"><strong className="text-white">Issue:</strong> {b.problemDescription}</p>
                        <p className="text-slate-400"><strong className="text-white">Preferred:</strong> {b.preferredDate} ({b.preferredTime})</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ENQUIRIES TAB */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold">Customer Enquiries</h3>
              <div className="space-y-4">
                {enquiries.map((e) => (
                  <div key={e.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-blue-400">{e.id} - {e.enquiryType}</span>
                      <span className="text-slate-500">{new Date(e.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="font-bold text-white text-sm">{e.name} ({e.mobile} | {e.email})</p>
                    {e.productName && <p className="text-orange-400 font-semibold">Product: {e.productName}</p>}
                    <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">{e.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl shadow-lg space-y-6">
              <h3 className="text-lg font-bold">Business & Store Settings</h3>
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => saveSettingsToStorage({ ...settings, storeName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number (International format)</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => saveSettingsToStorage({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Store Phone Number</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => saveSettingsToStorage({ ...settings, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Announcement Banner Message</label>
                  <input
                    type="text"
                    value={settings.announcementBanner}
                    onChange={(e) => saveSettingsToStorage({ ...settings, announcementBanner: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white"
                  />
                </div>
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-emerald-300 font-semibold">
                  Settings saved automatically to localStorage. Changes reflect instantly across the retailer website.
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aura 1.5 Ton AC"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  >
                    <option value="Air Conditioners">Air Conditioners</option>
                    <option value="Refrigerators">Refrigerators</option>
                    <option value="Fans">Fans</option>
                    <option value="Electric Kitchen Appliances">Electric Kitchen Appliances</option>
                    <option value="Air Coolers">Air Coolers</option>
                    <option value="Batteries">Batteries</option>
                    <option value="Inverters">Inverters</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newSellingPrice}
                    onChange={(e) => setNewSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Warranty Info</label>
                  <input
                    type="text"
                    value={newWarranty}
                    onChange={(e) => setNewWarranty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
