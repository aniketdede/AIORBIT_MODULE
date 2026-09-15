import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_TOOLS } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const tool = INITIAL_TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  // Find related tools in the same category
  const relatedTools = INITIAL_TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 3);

  return NextResponse.json({ tool, relatedTools });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const body = await request.json();
  const { action } = body;

  const toolIndex = INITIAL_TOOLS.findIndex((t) => t.slug === slug);

  if (toolIndex === -1) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  if (action === 'upvote') {
    INITIAL_TOOLS[toolIndex].upvotes += 1;
    return NextResponse.json({
      success: true,
      upvotes: INITIAL_TOOLS[toolIndex].upvotes,
    });
  }

  return NextResponse.json({ success: true });
}
