'use client';

import React, { useState } from 'react';
import { Product, Review } from '@/types';
import { X, ShoppingCart, Star, ShieldCheck, Truck, CheckCircle2, MessageSquare, Plus, Minus } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  reviews,
  onAddReview,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'warranty' | 'reviews'>('specs');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!product) return null;

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;
    onAddReview({
      productId: product.id,
      author: newAuthor,
      rating: newRating,
      comment: newComment,
    });
    setNewAuthor('');
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
          {/* Left Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Warranty</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{product.warranty}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 flex items-center gap-3">
                <Truck className="w-6 h-6 text-orange-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">Delivery</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{product.deliveryInfo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Info */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">
                <span>{product.brand} • {product.category}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating} ({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-black text-white">{product.name}</h2>
              <p className="text-slate-300 text-sm mt-2">{product.description}</p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-white">₹{product.sellingPrice.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>

              <div className="mt-3">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800/50">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="mt-6 border-b border-slate-800 flex gap-6">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 text-sm font-bold border-b-2 transition ${
                    activeTab === 'specs' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`pb-2 text-sm font-bold border-b-2 transition ${
                    activeTab === 'warranty' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Warranty & Delivery
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 text-sm font-bold border-b-2 transition ${
                    activeTab === 'reviews' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Reviews ({productReviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4 min-h-[140px]">
                {activeTab === 'specs' && (
                  <div className="space-y-2 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-1.5 border-b border-slate-800/60">
                        <span className="text-slate-400">{key}</span>
                        <span className="font-semibold text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'warranty' && (
                  <div className="space-y-3 text-xs text-slate-300">
                    <p><strong className="text-white">Warranty Coverage:</strong> {product.warranty}</p>
                    <p><strong className="text-white">Delivery Policy:</strong> {product.deliveryInfo}</p>
                    <p><strong className="text-white">Installation:</strong> Free standard installation & demonstration provided by certified technicians upon request.</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3 text-xs max-h-40 overflow-y-auto pr-2">
                    {productReviews.length === 0 ? (
                      <p className="text-slate-400 italic">No reviews yet. Be the first to review this product!</p>
                    ) : (
                      productReviews.map((rev) => (
                        <div key={rev.id} className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-white">{rev.author}</span>
                            <div className="flex items-center gap-1 text-amber-400">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{rev.rating}</span>
                            </div>
                          </div>
                          <p className="text-slate-300">{rev.comment}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-300 hover:text-white transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 text-slate-300 hover:text-white transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                disabled={product.stock <= 0}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition ${
                  product.stock > 0
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add {quantity} to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
