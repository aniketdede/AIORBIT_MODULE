'use client';

import React from 'react';
import Link from 'next/link';
import { ThumbsUp, Bookmark, ExternalLink, Check, Cpu } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { getFaviconUrl, formatNumber } from '@/lib/utils';

interface ToolCardListProps {
  tools: ToolItem[];
  bookmarkedIds: string[];
  upvotedIds: string[];
  onToggleBookmark: (id: string) => void;
  onUpvote: (id: string) => void;
}

export const ToolCardList: React.FC<ToolCardListProps> = ({
  tools,
  bookmarkedIds,
  upvotedIds,
  onToggleBookmark,
  onUpvote,
}) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/40 shadow-xl">
      <table className="w-full text-left text-xs">
        
        {/* Table Header */}
        <thead className="bg-zinc-900/90 text-zinc-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
          <tr>
            <th className="px-6 py-4">TOOL</th>
            <th className="px-6 py-4">DESCRIPTION</th>
            <th className="px-6 py-4">TASK / CATEGORY</th>
            <th className="px-6 py-4">PRICING</th>
            <th className="px-6 py-4">API</th>
            <th className="px-6 py-4">OPEN-SOURCE</th>
            <th className="px-6 py-4">RELEASED</th>
            <th className="px-6 py-4 text-right">ACTIONS</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-white/10 text-zinc-300">
          {tools.map((tool) => {
            const isBookmarked = bookmarkedIds.includes(tool.id);
            const isUpvoted = upvotedIds.includes(tool.id);
            const favicon = getFaviconUrl(tool.domain);

            return (
              <tr
                key={tool.id}
                className="hover:bg-zinc-900/80 transition-colors group"
              >
                {/* Tool Name & Favicon */}
                <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                  <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-white/10 overflow-hidden">
                      <img
                        src={favicon}
                        alt={tool.name}
                        className="h-4 w-4 object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <Cpu className="h-4 w-4 text-zinc-400" />
                    </div>
                    <span className="font-bold text-white text-sm">{tool.name}</span>
                  </Link>
                </td>

                {/* Description */}
                <td className="px-6 py-4 max-w-xs text-zinc-400 truncate font-normal leading-relaxed">
                  {tool.description}
                </td>

                {/* Task / Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-[10px] text-zinc-300 border border-white/10 font-mono">
                    {tool.category}
                  </span>
                </td>

                {/* Pricing */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`rounded-md px-2.5 py-1 text-[10px] font-medium border font-mono ${
                      tool.pricing === 'Free'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : tool.pricing === 'Freemium'
                        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                        : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {tool.pricing}
                  </span>
                </td>

                {/* API Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {tool.hasApi ? (
                    <span className="inline-flex items-center text-emerald-400 font-semibold gap-1 font-mono">
                      <Check className="h-3.5 w-3.5" /> YES
                    </span>
                  ) : (
                    <span className="text-zinc-500 font-mono">NO</span>
                  )}
                </td>

                {/* Open Source Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {tool.isOpenSource ? (
                    <span className="inline-flex items-center text-emerald-400 font-semibold gap-1 font-mono">
                      <Check className="h-3.5 w-3.5" /> YES
                    </span>
                  ) : (
                    <span className="text-zinc-500 font-mono">NO</span>
                  )}
                </td>

                {/* Released Date */}
                <td className="px-6 py-4 whitespace-nowrap text-zinc-400 text-xs font-mono">
                  {tool.releasedDate}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onUpvote(tool.id)}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs border font-semibold transition-colors ${
                        isUpvoted
                          ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                          : 'border-white/10 bg-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600'
                      }`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{formatNumber(tool.upvotes)}</span>
                    </button>

                    <button
                      onClick={() => onToggleBookmark(tool.id)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isBookmarked
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                          : 'border-white/10 bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5 fill-current" />
                    </button>

                    <Link
                      href={`/tools/${tool.slug}`}
                      className="p-1.5 rounded-lg border border-white/10 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="View Detail Page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};
