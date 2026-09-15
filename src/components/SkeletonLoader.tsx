'use client';

import React from 'react';

interface SkeletonLoaderProps {
  viewMode: 'grid' | 'list';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ viewMode, count = 6 }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-2 rounded-xl border border-white/10 bg-zinc-900/40 p-4 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-10 w-full rounded bg-zinc-800/60" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 space-y-4 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-zinc-800" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-1/2 rounded bg-zinc-800" />
              <div className="h-3 w-1/4 rounded bg-zinc-800/60" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-zinc-800/80" />
            <div className="h-3 w-4/5 rounded bg-zinc-800/60" />
          </div>
          <div className="pt-3 border-t border-white/10 flex justify-between">
            <div className="h-5 w-16 rounded bg-zinc-800" />
            <div className="h-5 w-20 rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
};
