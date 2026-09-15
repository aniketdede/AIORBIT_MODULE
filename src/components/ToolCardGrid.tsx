'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bookmark, ThumbsUp, Star, ShieldCheck, Cpu } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { getFaviconUrl, formatNumber } from '@/lib/utils';

interface ToolCardGridProps {
  tools: ToolItem[];
  bookmarkedIds: string[];
  upvotedIds: string[];
  onToggleBookmark: (id: string) => void;
  onUpvote: (id: string) => void;
}

export const ToolCardGrid: React.FC<ToolCardGridProps> = ({
  tools,
  bookmarkedIds,
  upvotedIds,
  onToggleBookmark,
  onUpvote,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
      {tools.map((tool) => {
        const isBookmarked = bookmarkedIds.includes(tool.id);
        const isUpvoted = upvotedIds.includes(tool.id);
        const favicon = getFaviconUrl(tool.domain);

        return (
          <div
            key={tool.id}
            className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-5 hover:border-zinc-700 hover:bg-zinc-900/90 transition-all duration-200 shadow-sm"
          >
            {/* Top Row: Favicon, Name, Pricing Badge & Bookmark */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3 group/link">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-white/10 overflow-hidden shadow-inner">
                    {/* Fallback Icon / Favicon */}
                    <img
                      src={favicon}
                      alt={`${tool.name} logo`}
                      className="h-6 w-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <Cpu className="h-5 w-5 text-zinc-400 absolute inset-auto -z-10" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base group-hover/link:text-zinc-200 transition-colors flex items-center gap-1.5">
                      {tool.name}
                      {tool.hasApi && (
                        <span title="API Available" className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">
                          API
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-zinc-400">{tool.developer}</p>
                  </div>
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onToggleBookmark(tool.id)}
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Tool'}
                    className={`p-1.5 rounded-lg border text-xs transition-colors ${
                      isBookmarked
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                        : 'border-white/10 bg-zinc-800/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                {tool.description}
              </p>
            </div>

            {/* Bottom Row: Category, Pricing, Rating & Upvote Button */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
              
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-zinc-800/80 px-2 py-1 text-[10px] font-medium text-zinc-300 border border-white/10">
                  {tool.category}
                </span>

                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-medium border ${
                    tool.pricing === 'Free'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : tool.pricing === 'Freemium'
                      ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {tool.pricing}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Rating */}
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{tool.rating}</span>
                </div>

                {/* Upvote Button */}
                <button
                  onClick={() => onUpvote(tool.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition-all ${
                    isUpvoted
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-sm'
                      : 'border-white/10 bg-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`h-3 w-3 ${isUpvoted ? 'fill-current' : ''}`} />
                  <span>{formatNumber(tool.upvotes)}</span>
                </button>
              </div>

            </div>

            {/* Direct Detail Hover Shortcut */}
            <Link
              href={`/tools/${tool.slug}`}
              className="absolute inset-0 z-0 rounded-xl focus:outline-none"
              aria-label={`View details for ${tool.name}`}
            />
          </div>
        );
      })}
    </div>
  );
};
