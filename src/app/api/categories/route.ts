import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { handleError } from '@/lib/apiErrorHandler';

const MAX_QUERY_LENGTH = 100;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const searchQuery = q ? q.trim() : null;

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: 'Query parameter too long' }, { status: 400 });
  }

  try {
    let categories;

    if (searchQuery) {
      categories = await prisma.category.findMany({
        where: {
          name: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      });
    } else {
      categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    }

    const response = NextResponse.json(categories);
    response.headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes

    return response;
  } catch (error) {
    return handleError(error);
  }
}
