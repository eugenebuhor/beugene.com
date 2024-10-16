import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleError } from '@/lib/apiErrorHandler';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      select: {
        id: true,
        likes: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const response = NextResponse.json({ views: article.likes });
    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    return handleError(error);
  }
}

const LIKED_ARTICLES_COOKIE = 'liked_articles';

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const response = NextResponse.json({ message: 'Like recorded' });

    const likedArticlesCookie = request.cookies.get(LIKED_ARTICLES_COOKIE);
    let likedArticles: string[] = [];

    if (likedArticlesCookie) {
      try {
        likedArticles = JSON.parse(likedArticlesCookie.value) as string[];
      } catch {
        likedArticles = [];
      }
    }

    if (!likedArticles.includes(slug)) {
      await prisma.article.update({
        where: { slug },
        data: {
          likes: { increment: 1 },
        },
      });

      likedArticles.push(slug);
      response.cookies.set(LIKED_ARTICLES_COOKIE, JSON.stringify(likedArticles), {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
        secure: true,
      });
    } else {
      return NextResponse.json({ error: 'Article already liked' }, { status: 400 });
    }

    response.headers.set('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    return handleError(error);
  }
}
