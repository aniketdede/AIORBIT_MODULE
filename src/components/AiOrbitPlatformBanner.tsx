'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Terminal, Cpu, Database } from 'lucide-react';
import { AiOrbitLogo } from '@/components/AiOrbitLogo';

export const AiOrbitPlatformBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#09090b] via-zinc-950 to-black border-t border-b border-white/10 py-16 px-4">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Banner Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 p-8 sm:p-12 shadow-2xl">
          
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Clean Vector Brand Identity & Messaging */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-800/80 px-3.5 py-1 text-xs text-zinc-300 font-mono">
                <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                <span>AI ORBIT ECOSYSTEM INDEX</span>
              </div>

              {/* Title with Unified Branding */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex flex-wrap items-center justify-center lg:justify-start gap-2">
                Discover & Benchmark Production-Ready
                <span className="inline-flex items-center gap-2 text-white">
                  AI<span className="text-zinc-400 font-light tracking-widest uppercase text-2xl">ORBIT</span>
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Join thousands of software engineers, architects, and technical leaders exploring verified AI models, autonomous agents, and developer tooling in real time.
              </p>

              {/* Specs Grid Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Verified Models</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Cpu className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>Sub-10ms Filter</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Database className="h-4 w-4 text-purple-400 shrink-0" />
                  <span>API Specs Indexed</span>
                </div>
              </div>

            </div>

            {/* Right: Unified Brand Logo Display & CTAs */}
            <div className="flex flex-col items-center gap-5 shrink-0">
              
              {/* Single Source Logo Component Display */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl flex items-center justify-center">
                <AiOrbitLogo size="lg" showSubtitle={true} />
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <a
                  href="https://aiorbit.club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-zinc-200 transition-colors shadow-md"
                >
                  <span>Visit Main AI Orbit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>

                <Link
                  href="/tools"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 border border-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors"
                >
                  <span>Explore Directory</span>
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
