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
    let tags;

    if (searchQuery) {
      tags = await prisma.tag.findMany({
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
      tags = await prisma.tag.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    }

    return NextResponse.json(tags);
  } catch (error) {
    return handleError(error);
  }
}
