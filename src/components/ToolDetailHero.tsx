'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ThumbsUp, Bookmark, Star, ShieldCheck, Cpu, Share2 } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { getFaviconUrl, formatNumber } from '@/lib/utils';

interface ToolDetailHeroProps {
  tool: ToolItem;
  isBookmarked: boolean;
  isUpvoted: boolean;
  onToggleBookmark: () => void;
  onUpvote: () => void;
}

export const ToolDetailHero: React.FC<ToolDetailHeroProps> = ({
  tool,
  isBookmarked,
  isUpvoted,
  onToggleBookmark,
  onUpvote,
}) => {
  const favicon = getFaviconUrl(tool.domain);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="relative border-b border-white/10 bg-gradient-to-b from-zinc-950 via-[#09090b] to-[#09090b] pt-8 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors mb-6 group font-mono"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to AI Tools Directory</span>
        </Link>

        {/* Hero Banner Grid */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          
          <div className="flex items-start gap-4 sm:gap-6 max-w-3xl">
            {/* Favicon Icon Box */}
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden shadow-xl">
              <img
                src={favicon}
                alt={tool.name}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Cpu className="h-8 w-8 text-zinc-400" />
            </div>

            {/* Title & Senior Tagline */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {tool.name}
                </h1>
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-400">
                  <ShieldCheck className="h-3 w-3" />
                  Verified Tech Module
                </span>
              </div>

              <p className="text-xs text-zinc-400 mb-3">
                Engineered by <span className="text-zinc-200 font-semibold">{tool.developer}</span> • Released {tool.releasedDate}
              </p>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                {tool.description}
              </p>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-200 border border-white/10 font-mono">
                  {tool.category}
                </span>
                <span
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium border font-mono ${
                    tool.pricing === 'Free'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : tool.pricing === 'Freemium'
                      ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {tool.pricing}
                </span>
                <div className="flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-white/10 px-2.5 py-1 text-xs text-zinc-300">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-white">{tool.rating}</span>
                  <span className="text-zinc-500">({formatNumber(tool.reviewsCount)} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0 lg:w-64">
            
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition-all shadow-lg text-center"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={onUpvote}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-medium border transition-all ${
                  isUpvoted
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-sm'
                    : 'border-white/10 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700'
                }`}
              >
                <ThumbsUp className={`h-4 w-4 ${isUpvoted ? 'fill-current' : ''}`} />
                <span>{formatNumber(tool.upvotes)} Upvotes</span>
              </button>

              <button
                onClick={onToggleBookmark}
                title="Save to Favorites"
                className={`p-2.5 rounded-xl border text-xs transition-colors ${
                  isBookmarked
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : 'border-white/10 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Bookmark className="h-4 w-4 fill-current" />
              </button>

              <button
                onClick={handleShare}
                title="Share Tool Link"
                className="p-2.5 rounded-xl border border-white/10 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
