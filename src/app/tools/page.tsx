'use client';

import React, { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { CategoryFilters } from '@/components/CategoryFilters';
import { ToolCardGrid } from '@/components/ToolCardGrid';
import { ToolCardList } from '@/components/ToolCardList';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { AiOrbitPlatformBanner } from '@/components/AiOrbitPlatformBanner';
import { ToolItem, CategoryType, QuickTag } from '@/types/tool';
import { SearchX, RotateCcw } from 'lucide-react';

export default function ToolsPage() {
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [selectedTag, setSelectedTag] = useState<QuickTag | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating' | 'upvotes'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // LocalStorage state for bookmarks & upvotes
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  // Load user UI memory preferences on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('ai_orbit_bookmarks');
      if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));

      const savedUpvotes = localStorage.getItem('ai_orbit_upvotes');
      if (savedUpvotes) setUpvotedIds(JSON.parse(savedUpvotes));

      const savedView = localStorage.getItem('ai_orbit_view');
      if (savedView === 'list' || savedView === 'grid') setViewMode(savedView);
    } catch (e) {
      console.error('LocalStorage load error', e);
    }
  }, []);

  // Sync view preference
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    try {
      localStorage.setItem('ai_orbit_view', mode);
    } catch (e) {}
  };

  // Toggle bookmark action
  const handleToggleBookmark = (id: string) => {
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter((item) => item !== id)
      : [...bookmarkedIds, id];

    setBookmarkedIds(updated);
    try {
      localStorage.setItem('ai_orbit_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  // Upvote action with optimistic UI update and API call
  const handleUpvote = async (id: string) => {
    if (upvotedIds.includes(id)) return; // prevent multi-click

    // Optimistic UI update
    const updatedUpvoted = [...upvotedIds, id];
    setUpvotedIds(updatedUpvoted);
    try {
      localStorage.setItem('ai_orbit_upvotes', JSON.stringify(updatedUpvoted));
    } catch (e) {}

    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t))
    );

    const tool = tools.find((t) => t.id === id);
    if (tool) {
      try {
        await fetch(`/api/tools/${tool.slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'upvote' }),
        });
      } catch (e) {
        console.error('Upvote API error', e);
      }
    }
  };

  // Fetch filtered tools from API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    if (sortBy) params.set('sort', sortBy);

    fetch(`/api/tools?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setTools(data.tools || []);
          setTotalCount(data.total || 0);
          if (data.categoryCounts) setCategoryCounts(data.categoryCounts);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Fetch tools error:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag(null);
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-[#09090b]">
      
      {/* Hero Search Header */}
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        totalToolsCount={totalCount}
      />

      {/* Category Pills & Layout Switcher */}
      <CategoryFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        viewMode={viewMode}
        setViewMode={handleViewModeChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Results Header Summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
          <p>
            Showing <span className="font-bold text-white">{tools.length}</span> {tools.length === 1 ? 'AI tool' : 'AI tools'}
            {selectedCategory !== 'All' && <span> in <span className="text-zinc-200">{selectedCategory}</span></span>}
            {selectedTag && <span> tagged with <span className="text-zinc-200">{selectedTag}</span></span>}
            {searchQuery && <span> matching "<span className="text-zinc-200">{searchQuery}</span>"</span>}
          </p>

          {(searchQuery || selectedCategory !== 'All' || selectedTag) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors font-mono"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <SkeletonLoader viewMode={viewMode} count={6} />
        ) : tools.length === 0 ? (
          /* Empty Search State */
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-12 text-center my-8 max-w-lg mx-auto space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 border border-white/10 text-zinc-400">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No tools match your filters</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Try searching for different keywords or clear your current category and tag selections.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <ToolCardGrid
            tools={tools}
            bookmarkedIds={bookmarkedIds}
            upvotedIds={upvotedIds}
            onToggleBookmark={handleToggleBookmark}
            onUpvote={handleUpvote}
          />
        ) : (
          /* List / Table View */
          <ToolCardList
            tools={tools}
            bookmarkedIds={bookmarkedIds}
            upvotedIds={upvotedIds}
            onToggleBookmark={handleToggleBookmark}
            onUpvote={handleUpvote}
          />
        )}

      </div>

      {/* AI ORBIT Ecosystem Platform Banner */}
      <div className="mt-16">
        <AiOrbitPlatformBanner />
      </div>

    </div>
  );
}
