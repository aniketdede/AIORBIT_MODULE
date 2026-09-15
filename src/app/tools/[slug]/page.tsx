'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ToolDetailHero } from '@/components/ToolDetailHero';
import { ToolSpecsGrid } from '@/components/ToolSpecsGrid';
import { RelatedTools } from '@/components/RelatedTools';
import { ToolItem } from '@/types/tool';
import { ArrowLeft, Cpu, AlertCircle } from 'lucide-react';

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [tool, setTool] = useState<ToolItem | null>(null);
  const [relatedTools, setRelatedTools] = useState<ToolItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('ai_orbit_bookmarks');
      if (savedBookmarks) setBookmarkedIds(JSON.parse(savedBookmarks));

      const savedUpvotes = localStorage.getItem('ai_orbit_upvotes');
      if (savedUpvotes) setUpvotedIds(JSON.parse(savedUpvotes));
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);

    fetch(`/api/tools/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Tool not found');
        return res.json();
      })
      .then((data) => {
        setTool(data.tool);
        setRelatedTools(data.relatedTools || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Detail fetch error:', err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  const handleToggleBookmark = () => {
    if (!tool) return;
    const updated = bookmarkedIds.includes(tool.id)
      ? bookmarkedIds.filter((id) => id !== tool.id)
      : [...bookmarkedIds, tool.id];

    setBookmarkedIds(updated);
    try {
      localStorage.setItem('ai_orbit_bookmarks', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleUpvote = async () => {
    if (!tool || upvotedIds.includes(tool.id)) return;

    const updatedUpvoted = [...upvotedIds, tool.id];
    setUpvotedIds(updatedUpvoted);
    try {
      localStorage.setItem('ai_orbit_upvotes', JSON.stringify(updatedUpvoted));
    } catch (e) {}

    setTool((prev) => (prev ? { ...prev, upvotes: prev.upvotes + 1 } : null));

    try {
      await fetch(`/api/tools/${tool.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote' }),
      });
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center py-20 text-zinc-400">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 animate-bounce mb-4">
          <Cpu className="h-6 w-6 text-white" />
        </div>
        <p className="text-sm font-medium">Loading AI tool details...</p>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-zinc-900/60 p-8 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Tool Not Found</h2>
          <p className="text-xs text-zinc-400">
            The AI tool slug "<span className="text-zinc-200">{slug}</span>" could not be located in the AI Orbit index.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to AI Tools Directory
          </Link>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(tool.id);
  const isUpvoted = upvotedIds.includes(tool.id);

  return (
    <div className="min-h-screen bg-[#09090b]">
      
      {/* Detail Page Hero Banner */}
      <ToolDetailHero
        tool={tool}
        isBookmarked={isBookmarked}
        isUpvoted={isUpvoted}
        onToggleBookmark={handleToggleBookmark}
        onUpvote={handleUpvote}
      />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Specifications & Features */}
        <ToolSpecsGrid tool={tool} />

        {/* Similar Tools Recommendation Carousel/Grid */}
        <RelatedTools relatedTools={relatedTools} currentToolName={tool.name} />

      </div>

    </div>
  );
}
