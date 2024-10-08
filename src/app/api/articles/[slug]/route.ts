import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ArticleStatus } from '@prisma/client';
import prisma from '@/lib/prisma';
import { handleError } from '@/lib/apiErrorHandler';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
        status: ArticleStatus.PUBLISHED,
      },
      include: {
        categories: true,
        tags: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Increment views
    await prisma.article.update({
      where: { id: article.id },
      data: {
        views: { increment: 1 },
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    return handleError(error);
  }
}
