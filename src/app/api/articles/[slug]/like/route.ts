import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ArticleStatus } from '@prisma/client';
import { handleError } from '@/lib/apiErrorHandler';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
        status: ArticleStatus.PUBLISHED,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found or not published' }, { status: 404 });
    }

    // Increment likes
    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return handleError(error);
  }
}
