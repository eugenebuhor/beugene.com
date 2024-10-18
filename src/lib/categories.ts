import type { Category } from '@prisma/client';
import prisma from '@/lib/prisma';
// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { ValidationError, InternalError, NotFoundError } from '@/lib/errors';

const MAX_QUERY_LENGTH = 100;

/* Get Categories */

/**
 * Internal function to fetch categories from the database with caching.
 *
 * cache key: get-categories
 * cache options: revalidate every 300 seconds (5 minutes)
 *
 * @param q - Validated search query.
 * @returns Promise<Category[]> - An array of categories or null if a database error occurs.
 */
const _getCategories = unstable_cache(
  async (q?: string): Promise<Category[] | null> => {
    try {
      const categories = await prisma.category.findMany({
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

      return categories;
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  ['get-categories'],
  { revalidate: 300 },
);

/**
 * Public function to get categories array.
 *
 * @param q - Optional search query to filter categories.
 * @returns Promise<Category[]> - An array of categories.
 * @throws ValidationError if query validation fails.
 * @throws NotFoundError if no categories found.
 * @throws InternalError if database query fails.
 */
export async function getCategories(q?: string): Promise<Category[]> {
  const searchQuery = q ? q.trim() : undefined;

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError('Query parameter too long');
  }

  const categories = await _getCategories(searchQuery);

  if (categories === null) {
    throw new InternalError('Internal server error');
  } else if (categories.length === 0) {
    throw new NotFoundError('No categories found');
  }

  return categories;
}
