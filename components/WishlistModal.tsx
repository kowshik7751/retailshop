'use client';

import React from 'react';
import { Product } from '@/types';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
}: WishlistModalProps) {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl text-white p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-rose-600/20 text-rose-400">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-bold">My Wishlist</h2>
            <p className="text-xs text-slate-400">{wishlistedProducts.length} saved items</p>
          </div>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">Your wishlist is empty</h3>
            <p className="text-xs text-slate-400 mt-1">Click the heart icon on any product to save it for later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-slate-900 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-blue-400 uppercase">{product.brand}</span>
                  <h4 className="font-bold text-sm text-white truncate">{product.name}</h4>
                  <p className="text-sm font-black text-white mt-1">₹{product.sellingPrice.toLocaleString('en-IN')}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onToggleWishlist(product.id);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
                  >
                    <ShoppingCart className="w-4 h-4" /> Move to Cart
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
