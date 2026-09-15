'use client';

import React from 'react';
import { Check, X, Sparkles, CheckCircle2, XCircle, Code, Layers, Globe } from 'lucide-react';
import { ToolItem } from '@/types/tool';

interface ToolSpecsGridProps {
  tool: ToolItem;
}

export const ToolSpecsGrid: React.FC<ToolSpecsGridProps> = ({ tool }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      
      {/* Main Column: Full Description, Features, Pros & Cons */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Full Description Card */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Product Overview
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {tool.fullDescription}
          </p>
        </div>

        {/* Key Features List */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-400" />
            Key Feature Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-zinc-800/40 p-3 text-xs text-zinc-200"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Pros */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              What Users Love (Pros)
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {tool.pros.map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Considerations (Cons)
            </h3>
            <ul className="space-y-2 text-xs text-zinc-300">
              {tool.cons.map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Sidebar Column: Specifications Table */}
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-5 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-zinc-400 border-b border-white/10 pb-3">
            Technical Specifications
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-zinc-400">Primary Task</span>
              <span className="font-semibold text-white">{tool.task}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-zinc-400">Category</span>
              <span className="font-semibold text-white">{tool.category}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-zinc-400">Pricing Model</span>
              <span className="font-semibold text-white">{tool.pricing}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-zinc-400">API Availability</span>
              {tool.hasApi ? (
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> YES
                </span>
              ) : (
                <span className="font-semibold text-zinc-500">NO</span>
              )}
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-zinc-400">Open-Source</span>
              {tool.isOpenSource ? (
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> YES
                </span>
              ) : (
                <span className="font-semibold text-zinc-500">NO</span>
              )}
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-zinc-400">Release Date</span>
              <span className="font-semibold text-white">{tool.releasedDate}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-zinc-400">Developer</span>
              <span className="font-semibold text-white">{tool.developer}</span>
            </div>
          </div>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors mt-4"
          >
            <Globe className="h-3.5 w-3.5 text-zinc-400" />
            <span>Visit {tool.domain}</span>
          </a>
        </div>
      </div>

    </div>
  );
};
