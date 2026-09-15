'use client';

import React from 'react';
import Link from 'next/link';
import { ThumbsUp, Bookmark, ExternalLink, Check, X, Cpu } from 'lucide-react';
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
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/40">
      <table className="w-full text-left text-xs">
        
        {/* Table Header */}
        <thead className="bg-zinc-900/90 text-zinc-400 font-semibold border-b border-white/10 uppercase tracking-wider text-[10px]">
          <tr>
            <th className="px-4 py-3.5">TOOL</th>
            <th className="px-4 py-3.5">DESCRIPTION</th>
            <th className="px-4 py-3.5">TASK / CATEGORY</th>
            <th className="px-4 py-3.5">PRICING</th>
            <th className="px-4 py-3.5">API</th>
            <th className="px-4 py-3.5">OPEN-SOURCE</th>
            <th className="px-4 py-3.5">RELEASED</th>
            <th className="px-4 py-3.5 text-right">ACTIONS</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y border-white/10 divide-white/10 text-zinc-300">
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
                <td className="px-4 py-3.5 font-medium text-white whitespace-nowrap">
                  <Link href={`/tools/${tool.slug}`} className="flex items-center gap-2.5 hover:text-zinc-200">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-800 border border-white/10 overflow-hidden">
                      <img
                        src={favicon}
                        alt={tool.name}
                        className="h-4 w-4 object-contain"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <Cpu className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <span className="font-semibold text-white">{tool.name}</span>
                  </Link>
                </td>

                {/* Description */}
                <td className="px-4 py-3.5 max-w-xs text-zinc-400 truncate">
                  {tool.description}
                </td>

                {/* Task / Category */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="rounded bg-zinc-800/80 px-2 py-0.5 text-[10px] text-zinc-300 border border-white/10">
                    {tool.category}
                  </span>
                </td>

                {/* Pricing */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-medium border ${
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
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {tool.hasApi ? (
                    <span className="inline-flex items-center text-emerald-400 font-semibold gap-1">
                      <Check className="h-3.5 w-3.5" /> YES
                    </span>
                  ) : (
                    <span className="text-zinc-500">NO</span>
                  )}
                </td>

                {/* Open Source Status */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  {tool.isOpenSource ? (
                    <span className="inline-flex items-center text-emerald-400 font-semibold gap-1">
                      <Check className="h-3.5 w-3.5" /> YES
                    </span>
                  ) : (
                    <span className="text-zinc-500">NO</span>
                  )}
                </td>

                {/* Released Date */}
                <td className="px-4 py-3.5 whitespace-nowrap text-zinc-400 text-[11px]">
                  {tool.releasedDate}
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onUpvote(tool.id)}
                      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs border transition-colors ${
                        isUpvoted
                          ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                          : 'border-white/10 bg-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{formatNumber(tool.upvotes)}</span>
                    </button>

                    <button
                      onClick={() => onToggleBookmark(tool.id)}
                      className={`p-1 rounded-md border text-xs ${
                        isBookmarked
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                          : 'border-white/10 bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5 fill-current" />
                    </button>

                    <Link
                      href={`/tools/${tool.slug}`}
                      className="p-1 rounded-md border border-white/10 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
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
