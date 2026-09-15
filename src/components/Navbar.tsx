'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Plus, Menu, X } from 'lucide-react';
import { AiOrbitLogo } from '@/components/AiOrbitLogo';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Tools', href: '/tools', active: pathname.startsWith('/tools') },
    { name: 'Agents', href: '#', active: false },
    { name: 'Tasks', href: '#', active: false },
    { name: 'Companies', href: '#', active: false },
    { name: 'Leaderboard', href: '#', active: false },
    { name: 'Business', href: '#', active: false },
    { name: 'Learn', href: '#', active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo: Unified Single-Source Component */}
        <div className="flex items-center gap-6">
          <AiOrbitLogo size="md" showVersion={true} showSubtitle={true} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  link.active
                    ? 'bg-zinc-800 text-white border border-white/10 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Search trigger & Submit Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-400 hover:border-zinc-700 hover:text-white transition-all"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400" />
            <span>Search ecosystem...</span>
            <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://aiorbit.club"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Submit Tool
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-white/10"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#09090b] px-4 py-4 space-y-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  link.active
                    ? 'bg-zinc-800 text-white border border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
