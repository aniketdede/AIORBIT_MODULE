import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_TOOLS } from '@/lib/mockData';
import { ToolItem, QuickTag, CategoryType } from '@/types/tool';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') as CategoryType | 'All' || 'All';
  const tag = searchParams.get('tag') as QuickTag | null;
  const sort = searchParams.get('sort') || 'popular';

  let filtered: ToolItem[] = [...INITIAL_TOOLS];

  // Search Filter
  if (query) {
    filtered = filtered.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        tool.task.toLowerCase().includes(query) ||
        tool.developer.toLowerCase().includes(query)
    );
  }

  // Category Filter
  if (category && category !== 'All') {
    filtered = filtered.filter((tool) => tool.category === category);
  }

  // Quick Tag Filter
  if (tag) {
    filtered = filtered.filter((tool) => tool.tags.includes(tag));
  }

  // Sorting
  if (sort === 'popular') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (sort === 'upvotes') {
    filtered.sort((a, b) => b.upvotes - a.upvotes);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'newest') {
    filtered.sort((a, b) => new Date(b.releasedDate).getTime() - new Date(a.releasedDate).getTime());
  }

  // Calculate Category Counts
  const categoryCounts: Record<string, number> = { All: INITIAL_TOOLS.length };
  INITIAL_TOOLS.forEach((tool) => {
    categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
  });

  return NextResponse.json({
    tools: filtered,
    total: filtered.length,
    categoryCounts,
  });
}
