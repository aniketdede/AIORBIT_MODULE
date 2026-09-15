'use client';

import React, { useEffect, useRef } from 'react';
import { Search, X, Flame, TrendingUp, Sparkles, Gift, Star } from 'lucide-react';
import { QuickTag } from '@/types/tool';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: QuickTag | null;
  setSelectedTag: (tag: QuickTag | null) => void;
  totalToolsCount: number;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  totalToolsCount,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const quickTags: { label: QuickTag; icon: React.ReactNode }[] = [
    { label: 'Trending', icon: <Flame className="h-3 w-3 text-amber-400" /> },
    { label: 'Popular', icon: <TrendingUp className="h-3 w-3 text-blue-400" /> },
    { label: 'New', icon: <Sparkles className="h-3 w-3 text-emerald-400" /> },
    { label: 'Free', icon: <Gift className="h-3 w-3 text-purple-400" /> },
    { label: 'Top Rated', icon: <Star className="h-3 w-3 text-yellow-400" /> },
  ];

  return (
    <div className="relative pt-10 pb-8 border-b border-white/10 bg-gradient-to-b from-zinc-950 via-[#09090b] to-[#09090b] overflow-hidden">
      
      {/* Ambient Premium Dark Gradient Backdrop Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[600px] sm:w-[800px] rounded-full bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-purple-500/10 blur-3xl opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Status Badge with Vector Orbital Icon & Subtle Gradient Border */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/90 px-3.5 py-1 text-xs text-zinc-300 mb-5 shadow-inner hover:border-emerald-500/30 transition-colors">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-400"
          >
            <ellipse
              cx="12"
              cy="12"
              rx="9"
              ry="4.5"
              transform="rotate(-30 12 12)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="12" r="2.5" className="fill-emerald-400" />
          </svg>
          <span className="font-mono text-[11px] text-zinc-300">
            ENGINEERING INDEX • <span className="text-white font-bold">{totalToolsCount}</span> VERIFIED PRODUCTIVE MODULES
          </span>
        </div>

        {/* Hero Headline with Premium Gradient Text Accent */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
          The Developer Hub for Everything{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-emerald-400">
            AI
          </span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Benchmark, filter, and integrate high-throughput AI models, developer tools, and autonomous agents engineered for modern software stack workflows.
        </p>

        {/* Search Input Bar with Focus Glow */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-white transition-colors">
            <Search className="h-4 w-4" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack by name, API status, task, or technology (e.g. 'claude', 'coding', 'api')..."
            className="w-full rounded-xl border border-white/10 bg-zinc-900/90 pl-11 pr-24 py-3.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-lg focus:shadow-[0_0_20px_rgba(16,185,129,0.12)]"
          />

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 bg-zinc-800 px-2 py-1 text-[11px] font-mono text-zinc-400 shadow-inner">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Quick Tag Pills with Gradient Selection Highlights */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {quickTags.map((tag) => {
            const isSelected = selectedTag === tag.label;
            return (
              <button
                key={tag.label}
                onClick={() => setSelectedTag(isSelected ? null : tag.label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-white via-zinc-100 to-zinc-200 text-black shadow-md scale-105 font-bold'
                    : 'bg-zinc-900/80 text-zinc-400 border border-white/10 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {tag.icon}
                <span>{tag.label}</span>
              </button>
            );
          })}

          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs text-zinc-500 hover:text-zinc-300 underline ml-2 transition-colors font-mono"
            >
              Reset Tag
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
