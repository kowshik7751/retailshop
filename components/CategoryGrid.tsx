'use client';

import React from 'react';
import { Category } from '@/types';
import { Wind, Snowflake, Fan as FanIcon, Utensils, Droplets, BatteryCharging, Zap } from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}

const categoriesData: { name: Category; icon: any; image: string; description: string }[] = [
  {
    name: 'Air Conditioners',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1615873968403-89e067629265?auto=format&fit=crop&q=80&w=600',
    description: 'Split, Window & Inverter ACs',
  },
  {
    name: 'Refrigerators',
    icon: Snowflake,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf82bd1e?auto=format&fit=crop&q=80&w=600',
    description: 'Single, Double & Side-by-Side',
  },
  {
    name: 'Fans',
    icon: FanIcon,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c0c27254?auto=format&fit=crop&q=80&w=600',
    description: 'Ceiling, BLDC & Pedestal Fans',
  },
  {
    name: 'Electric Kitchen Appliances',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1570222094114-d02fcf4c6ac8?auto=format&fit=crop&q=80&w=600',
    description: 'Mixer Grinders, Kettles & Cooktops',
  },
  {
    name: 'Air Coolers',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=600',
    description: 'Desert, Personal & Tower Coolers',
  },
  {
    name: 'Batteries',
    icon: BatteryCharging,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
    description: 'Tall Tubular & Inverter Batteries',
  },
  {
    name: 'Inverters',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600',
    description: 'Sine Wave & Solar Inverters',
  },
];

export default function CategoryGrid({ selectedCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-slate-400 mt-1">Explore our comprehensive range of high-efficiency home appliances.</p>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className={`mt-4 md:mt-0 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoriesData.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 transform hover:-translate-y-1 shadow-lg ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/50 bg-slate-800'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {/* Category Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-orange-400 border border-slate-700">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 relative">
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-blue-400 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">{cat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
