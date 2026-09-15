'use client';

import React from 'react';
import Link from 'next/link';

interface AiOrbitLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showVersion?: boolean;
  showSubtitle?: boolean;
  href?: string;
  className?: string;
}

export const AiOrbitLogo: React.FC<AiOrbitLogoProps> = ({
  size = 'md',
  showText = true,
  showVersion = false,
  showSubtitle = true,
  href = '/tools',
  className = '',
}) => {
  const sizeMap = {
    sm: {
      box: 'h-8 w-8 rounded-lg',
      svgSize: 18,
      textSize: 'text-sm',
      orbitSize: 'text-xs',
    },
    md: {
      box: 'h-9 w-9 rounded-xl',
      svgSize: 22,
      textSize: 'text-base',
      orbitSize: 'text-sm',
    },
    lg: {
      box: 'h-12 w-12 rounded-2xl',
      svgSize: 28,
      textSize: 'text-xl',
      orbitSize: 'text-base',
    },
  };

  const currentSize = sizeMap[size];

  const logoContent = (
    <div className={`group inline-flex items-center gap-2.5 cursor-pointer ${className}`}>
      
      {/* SVG Icon Box with subtle gradient glow border */}
      <div
        className={`relative flex items-center justify-center bg-zinc-900/90 border border-white/10 group-hover:border-emerald-500/40 transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] ${currentSize.box}`}
      >
        <svg
          width={currentSize.svgSize}
          height={currentSize.svgSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:rotate-45 duration-500 shrink-0"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Primary Orbital Ellipse Ring */}
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4.5"
            transform="rotate(-30 12 12)"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-zinc-300 group-hover:text-white transition-colors duration-300"
          />
          {/* Secondary Dotted Cross Orbit Ring */}
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4.5"
            transform="rotate(30 12 12)"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 2"
            className="text-zinc-600 group-hover:text-emerald-400/70 transition-colors duration-300"
          />
          {/* Central AI Core Quantum Dot */}
          <circle
            cx="12"
            cy="12"
            r="2.5"
            className="fill-white group-hover:fill-[url(#logoGradient)] transition-all duration-300"
          />
          {/* Core Outer Halo */}
          <circle
            cx="12"
            cy="12"
            r="5"
            className="stroke-white/20 group-hover:stroke-emerald-400/30 transition-colors"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`${currentSize.textSize} font-extrabold tracking-tight text-white font-sans flex items-center`}
            >
              AI
              <span
                className={`text-zinc-400 font-light tracking-widest uppercase ml-0.5 group-hover:text-zinc-200 transition-colors ${currentSize.orbitSize}`}
              >
                ORBIT
              </span>
            </span>
            {showVersion && (
              <span className="rounded bg-zinc-800/80 px-1.5 py-0.2 text-[9px] font-mono font-medium text-zinc-300 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                v1.0
              </span>
            )}
          </div>
          {showSubtitle && (
            <span className="text-[10px] text-zinc-500 font-mono -mt-0.5">
              by The AI Signal
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
};
