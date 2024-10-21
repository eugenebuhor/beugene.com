import type { Tag } from '@prisma/client';
import prisma from '@/lib/prisma';
// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { ValidationError, InternalError, NotFoundError } from '@/lib/errors';

const MAX_QUERY_LENGTH = 100;

/* Get Tags */

/**
 * Internal function to fetch tags from the database with caching.
 *
 * cache key: get-tags
 * cache options: revalidate every 300 seconds (5 minutes)
 *
 * @param q - Validated search query.
 * @returns Promise<Tag[]> - an array of tags or null if a database error occurs.
 */
const _getTags = unstable_cache(
  async (q?: string): Promise<Tag[] | null> => {
    try {
      const tags = await prisma.tag.findMany({
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

      return tags;
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  ['get-tags'],
  { revalidate: 300 },
);

/**
 * Public function to get tags with proper error handling.
 *
 * @param q - Optional search query to filter tags.
 * @returns Promise<Tag[]> - An array of tags.
 * @throws ValidationError if query validation fails.
 * @throws NotFoundError if no tags found.
 * @throws InternalError if database query fails.
 */
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
