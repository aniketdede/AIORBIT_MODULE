'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Globe } from 'lucide-react';
import { AiOrbitLogo } from '@/components/AiOrbitLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#09090b] text-zinc-400 text-xs py-10 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Single Source Logo Component */}
        <AiOrbitLogo size="sm" showSubtitle={true} />

        {/* Navigation Footer Links */}
        <div className="flex items-center gap-6 text-zinc-400 font-medium">
          <Link href="/tools" className="hover:text-white transition-colors">Tools Directory</Link>
          <a href="https://aiorbit.club" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">AI Orbit Main</a>
          <a href="https://www.theaisignal.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">The AI Signal</a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:text-white transition-colors">
            <Twitter className="h-3.5 w-3.5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:text-white transition-colors">
            <Github className="h-3.5 w-3.5" />
          </a>
          <a href="https://aiorbit.club" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:text-white transition-colors">
            <Globe className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
