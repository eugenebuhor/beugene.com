import type { Tag } from '@prisma/client';
import prisma from '@/lib/prisma';
// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { ValidationError, InternalError, NotFoundError } from '@/lib/errors';
import { CacheKeys, CacheTags } from '@/constants';

const MAX_QUERY_LENGTH = 100;

/* Get Tags */

export async function getTags(q?: string): Promise<Tag[]> {
  const searchQuery = q ? q.trim() : undefined;

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError('Query parameter too long');
  }

  const tags = await _getTags(searchQuery);

  if (tags === null) {
    throw new InternalError('Internal server error');
  } else if (tags.length === 0) {
    throw new NotFoundError('No tags found');
  }

  return tags;
}

const _getTags = unstable_cache(
  async (q?: string): Promise<Tag[] | null> => {
    try {
      return await prisma.tag.findMany({
        where: q
          ? {
              name: {
                contains: q,
                mode: 'insensitive',
              },
            }
          : undefined,
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  [CacheKeys.GET_TAGS],
  {
    revalidate: 300,
    tags: [CacheTags.TAGS],
  },
);
