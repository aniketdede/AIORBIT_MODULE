'use client';

import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CategoryType } from '@/types/tool';

interface CategoryFiltersProps {
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortBy: 'popular' | 'newest' | 'rating' | 'upvotes';
  setSortBy: (sort: 'popular' | 'newest' | 'rating' | 'upvotes') => void;
  categoryCounts: Record<string, number>;
}

export const CATEGORIES: CategoryType[] = [
  'All',
  'Coding',
  'Chatbots',
  'Image Generation',
  'Video Generation',
  'Audio',
  'Productivity',
  'Marketing',
  'Business',
  'Education',
  'Agents',
  'Workflow Automation'
];

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  categoryCounts,
}) => {
  return (
    <div className="border-b border-white/10 bg-[#09090b] sticky top-[57px] z-40 py-3 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Horizontal Scrollable Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 pr-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count = categoryCounts[category] || 0;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-100 text-black shadow-sm'
                      : 'bg-zinc-900/60 text-zinc-400 border border-white/10 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>{category}</span>
                  {category !== 'All' && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-zinc-300 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: View Switcher & Sorting */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-zinc-400">
              <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500" />
              <span className="hidden sm:inline text-zinc-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer font-medium"
              >
                <option value="popular" className="bg-zinc-900 text-white">Most Popular</option>
                <option value="upvotes" className="bg-zinc-900 text-white">Most Upvoted</option>
                <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
                <option value="newest" className="bg-zinc-900 text-white">Newest First</option>
              </select>
            </div>

            {/* Grid vs List View Toggle Switcher */}
            <div className="flex items-center bg-zinc-900 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-800 text-white border border-white/10 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Table / List View"
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'list'
                    ? 'bg-zinc-800 text-white border border-white/10 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
