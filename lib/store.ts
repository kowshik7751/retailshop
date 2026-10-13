'use client';

/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from 'react';
import { Product, CartItem, Order, ServiceBooking, CustomerEnquiry, BusinessSettings, Review } from '@/types';
import { initialProducts, initialBusinessSettings, initialOrders, initialServiceBookings, initialEnquiries, initialReviews } from '@/lib/initial-data';

export function useStore() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>(initialServiceBookings);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>(initialEnquiries);
  const [settings, setSettings] = useState<BusinessSettings>(initialBusinessSettings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('aura_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCart = localStorage.getItem('aura_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('aura_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('aura_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedBookings = localStorage.getItem('aura_bookings');
      if (savedBookings) setServiceBookings(JSON.parse(savedBookings));

      const savedEnquiries = localStorage.getItem('aura_enquiries');
      if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));

      const savedSettings = localStorage.getItem('aura_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedReviews = localStorage.getItem('aura_reviews');
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const adminAuth = localStorage.getItem('aura_admin_auth');
      if (adminAuth === 'true') setIsAdminLoggedIn(true);
    } catch (e) {
      console.error('Error loading localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('aura_products', JSON.stringify(newProducts));
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('aura_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('aura_wishlist', JSON.stringify(newWishlist));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('aura_orders', JSON.stringify(newOrders));
  };

  const saveBookings = (newBookings: ServiceBooking[]) => {
    setServiceBookings(newBookings);
    localStorage.setItem('aura_bookings', JSON.stringify(newBookings));
  };

  const saveEnquiries = (newEnquiries: CustomerEnquiry[]) => {
    setEnquiries(newEnquiries);
    localStorage.setItem('aura_enquiries', JSON.stringify(newEnquiries));
  };

  const saveSettings = (newSettings: BusinessSettings) => {
    setSettings(newSettings);
    localStorage.setItem('aura_settings', JSON.stringify(newSettings));
  };

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('aura_reviews', JSON.stringify(newReviews));
  };

  const loginAdmin = (status: boolean) => {
    setIsAdminLoggedIn(status);
    localStorage.setItem('aura_admin_auth', status ? 'true' : 'false');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let newCart: CartItem[];
    if (existingIndex > -1) {
      newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart = [...cart, { product, quantity }];
    }
    saveCart(newCart);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      saveCart(cart.filter(item => item.product.id !== productId));
    } else {
      saveCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist action
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      saveWishlist(wishlist.filter(id => id !== productId));
    } else {
      saveWishlist([...wishlist, productId]);
    }
  };

  // Add Order
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    saveOrders([newOrder, ...orders]);
    return newOrder;
  };

  // Add Service Booking
  const addServiceBooking = (bookingData: Omit<ServiceBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: ServiceBooking = {
      ...bookingData,
      id: `SRV-${Math.floor(500 + Math.random() * 500)}`,
      status: 'Received',
      createdAt: new Date().toISOString(),
    };
    saveBookings([newBooking, ...serviceBookings]);
    return newBooking;
  };

  // Add Enquiry
  const addEnquiry = (enquiryData: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: CustomerEnquiry = {
      enquiryData,
      id: `ENQ-${Math.floor(200 + Math.random() * 800)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
    } as any;
    saveEnquiries([newEnquiry, ...enquiries]);
    return newEnquiry;
  };

  return {
    products,
    setProducts: saveProducts,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    orders,
    setOrders: saveOrders,
    addOrder,
    serviceBookings,
    setServiceBookings: saveBookings,
    addServiceBooking,
    enquiries,
    setEnquiries: saveEnquiries,
    addEnquiry,
    settings,
    setSettings: saveSettings,
    reviews,
    setReviews: saveReviews,
    isAdminLoggedIn,
    loginAdmin,
    isLoaded,
  };
}
