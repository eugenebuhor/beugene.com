import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { handleError } from '@/lib/apiErrorHandler';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      select: {
        id: true,
        views: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const response = NextResponse.json({ views: article.views });
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    return handleError(error);
  }
}

const VIEWED_ARTICLES_COOKIE = 'viewed_articles';

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const response = NextResponse.json({ message: 'View counted' });

    const viewedArticlesCookie = request.cookies.get(VIEWED_ARTICLES_COOKIE);
    let viewedArticles: string[] = [];

    if (viewedArticlesCookie) {
      try {
        viewedArticles = JSON.parse(viewedArticlesCookie.value) as string[];
      } catch {
        viewedArticles = [];
      }
    }

    if (!viewedArticles.includes(slug)) {
      await prisma.article.update({
        where: { slug },
        data: {
          views: { increment: 1 },
        },
      });

      viewedArticles.push(slug);
      response.cookies.set(VIEWED_ARTICLES_COOKIE, JSON.stringify(viewedArticles), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
        secure: true,
      });
    } else {
      return NextResponse.json({ error: 'Article already viewed' }, { status: 400 });
    }

    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    return handleError(error);
  }
}
