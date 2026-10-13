'use client';

import React, { useState, useMemo } from 'react';
import { Product, Category } from '@/types';
import { Search, Filter, Heart, ShoppingCart, Eye, Star, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProductCatalogueProps {
  products: Product[];
  selectedCategory: Category | 'All';
  onSelectCategory: (cat: Category | 'All') => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export default function ProductCatalogue({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
}: ProductCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number>(100000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: (Category | 'All')[] = [
    'All',
    'Air Conditioners',
    'Refrigerators',
    'Fans',
    'Electric Kitchen Appliances',
    'Air Coolers',
    'Batteries',
    'Inverters',
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.sellingPrice <= priceRange;
      const matchesStock = inStockOnly ? p.stock > 0 : true;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.sellingPrice - b.sellingPrice;
      if (sortBy === 'price-high') return b.sellingPrice - a.sellingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy]);

  return (
    <section id="products" className="py-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Complete Product Catalogue
          </h2>
          <p className="text-slate-400 mt-2">
            Browse certified appliances with transparent pricing, comprehensive warranty, and swift doorstep delivery.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, brand, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value as Category | 'All')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* In-Stock Toggle */}
            <div className="md:col-span-2 flex items-center justify-center md:justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results count & active filters */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
          <p>Showing <span className="font-bold text-white">{filteredProducts.length}</span> appliances</p>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => onSelectCategory('All')}
              className="text-blue-400 hover:underline text-xs"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No products found</h3>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search criteria or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-slate-700 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      {/* Discount badge */}
                      {product.discountPercentage && product.discountPercentage > 0 && (
                        <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow">
                          {product.discountPercentage}% OFF
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition shadow ${
                          isWishlisted
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-900/80 text-slate-300 hover:text-white'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>

                      {/* Stock indicator */}
                      <div className="absolute bottom-3 left-3">
                        {product.stock > 0 ? (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                            <CheckCircle2 className="w-3 h-3" /> In Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-800/50">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-xs text-blue-400 mb-1 font-semibold uppercase tracking-wider">
                        <span>{product.brand}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.rating} ({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-base text-white line-clamp-1 group-hover:text-blue-300 transition">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{product.description}</p>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-lg font-black text-white">₹{product.sellingPrice.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <Eye className="w-4 h-4" /> View Details
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={product.stock <= 0}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        product.stock > 0
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
