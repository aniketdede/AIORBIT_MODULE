'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Star } from 'lucide-react';
import { ToolItem } from '@/types/tool';
import { getFaviconUrl } from '@/lib/utils';

interface RelatedToolsProps {
  relatedTools: ToolItem[];
  currentToolName: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ relatedTools, currentToolName }) => {
  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Similar AI Alternatives</h2>
          <p className="text-xs text-zinc-400">Explore other tools related to {currentToolName}</p>
        </div>
        <Link href="/tools" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
          <span>View All</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedTools.map((tool) => {
          const favicon = getFaviconUrl(tool.domain);

          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4 hover:border-zinc-700 hover:bg-zinc-900/90 transition-all duration-200"
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-white/10">
                    <img
                      src={favicon}
                      alt={tool.name}
                      className="h-5 w-5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <Cpu className="h-4 w-4 text-zinc-400" />
                  </div>
                  <h3 className="font-semibold text-white text-sm truncate">{tool.name}</h3>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-zinc-400">
                <span className="font-medium text-zinc-300">{tool.pricing}</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{tool.rating}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
