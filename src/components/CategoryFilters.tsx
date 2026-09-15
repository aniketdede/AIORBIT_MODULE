'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, List, ArrowUpDown, Check, ChevronDown } from 'lucide-react';
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

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'upvotes', label: 'Most Upvoted' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
] as const;

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  categoryCounts,
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortLabel = SORT_OPTIONS.find((s) => s.value === sortBy)?.label || 'Most Popular';

  return (
    <div className="border-b border-white/10 bg-[#09090b]/95 sticky top-[57px] z-40 py-3 shadow-md backdrop-blur-md">
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
                  className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-white via-zinc-100 to-zinc-200 text-black shadow-md font-bold'
                      : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span>{category}</span>
                  {category !== 'All' && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-zinc-300 text-black font-semibold' : 'bg-zinc-800 text-zinc-400'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Custom Sleek Dark Sort Popover & View Mode Switcher */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            
            {/* Custom Sleek Dark Sort Dropdown Popover */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 bg-zinc-900 border border-white/10 hover:border-zinc-700 rounded-xl px-3.5 py-1.5 text-xs text-zinc-300 hover:text-white transition-all shadow-sm font-sans"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-zinc-500 font-medium">Sort:</span>
                <span className="font-semibold text-white">{currentSortLabel}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Custom Dark Popover Menu (Eliminates Native Windows Blue Highlight) */}
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-zinc-900/95 p-1.5 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-1 border-b border-white/5 mb-1">
                    Sort Directory By
                  </div>
                  {SORT_OPTIONS.map((option) => {
                    const isSelected = sortBy === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-zinc-800 text-white font-semibold'
                            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                        }`}
                      >
                        <span>{option.label}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Grid vs List View Toggle Switcher */}
            <div className="flex items-center bg-zinc-900 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg text-xs transition-all ${
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
                className={`p-1.5 rounded-lg text-xs transition-all ${
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
