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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
      {tools.map((tool) => {
        const isBookmarked = bookmarkedIds.includes(tool.id);
        const isUpvoted = upvotedIds.includes(tool.id);
        const favicon = getFaviconUrl(tool.domain);

        return (
          <div
            key={tool.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/50 p-6 sm:p-7 hover:border-zinc-700/80 hover:bg-zinc-900/90 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Top Section: Header, Favicon, Title, Description */}
            <div className="space-y-4">
              
              {/* Header Row */}
              <div className="flex items-start justify-between gap-3">
                <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3.5 group/link">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800/90 border border-white/10 overflow-hidden shadow-inner group-hover/link:border-emerald-500/40 transition-colors">
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
                    <h3 className="font-bold text-white text-base sm:text-lg group-hover/link:text-emerald-400 transition-colors flex items-center gap-2">
                      {tool.name}
                      {tool.hasApi && (
                        <span title="API Available" className="text-[9px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-white/10 font-mono tracking-wider">
                          API
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium">{tool.developer}</p>
                  </div>
                </Link>

                {/* Bookmark Button */}
                <button
                  onClick={() => onToggleBookmark(tool.id)}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Tool'}
                  className={`p-2 rounded-xl border text-xs transition-all ${
                    isBookmarked
                      ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 shadow-sm'
                      : 'border-white/10 bg-zinc-800/60 text-zinc-400 hover:text-white hover:border-zinc-600'
                  }`}
                >
                  <Bookmark className="h-4 w-4 fill-current" />
                </button>
              </div>

              {/* Description with Generous Line Height */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2 pt-1 font-normal">
                {tool.description}
              </p>
            </div>

            {/* Bottom Footer Row: Badges, Rating & Upvote Button */}
            <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
              
              {/* Category & Pricing Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-zinc-800/90 px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-white/10 font-mono">
                  {tool.category}
                </span>

                <span
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium border font-mono ${
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

              {/* Upvote & Rating Group */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{tool.rating}</span>
                </div>

                <button
                  onClick={() => onUpvote(tool.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                    isUpvoted
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-sm'
                      : 'border-white/10 bg-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
                  <span>{formatNumber(tool.upvotes)}</span>
                </button>
              </div>

            </div>

            {/* Accessible Link Overlay */}
            <Link
              href={`/tools/${tool.slug}`}
              className="absolute inset-0 z-0 rounded-2xl focus:outline-none"
              aria-label={`View details for ${tool.name}`}
            />
          </div>
        );
      })}
    </div>
  );
};
