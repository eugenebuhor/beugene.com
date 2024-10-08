import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { handleError } from '@/lib/apiErrorHandler';

const FALLBACK_OFFSET = 0;
const FALLBACK_LIMIT = 10;
const MAX_LIMIT = 100;
const MAX_QUERY_LENGTH = 100;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const offsetParam = searchParams.get('offset');

  const q = searchParams.get('q');
  const limit = limitParam ? parseInt(limitParam) : FALLBACK_LIMIT;
  const offset = offsetParam ? parseInt(offsetParam) : FALLBACK_OFFSET;

  if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0 || limit > MAX_LIMIT) {
    return NextResponse.json({ error: 'Invalid limit or offset' }, { status: 400 });
  }

  const searchQuery = q ? q.trim() : null;

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: 'Query parameter too long' }, { status: 400 });
  }

  try {
    let whereClause: Prisma.ArticleWhereInput = {
      status: 'PUBLISHED' as const,
    };

    if (searchQuery) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            summary: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            categories: {
              some: {
                name: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
      };
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      skip: offset,
      take: limit,
      include: {
        categories: true,
        tags: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    return handleError(error);
  }
}
