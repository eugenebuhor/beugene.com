import type { Tag } from '@prisma/client';
import prisma from '@/lib/prisma';
// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { ValidationError, InternalError } from '@/lib/errors';
import { CacheKeys, CacheTags } from '@/constants';
import { ArticleStatus } from '@prisma/client';
import { normalizeSearchText } from '@/utils/search';

const MAX_QUERY_LENGTH = 100;
const GET_TOP_TAGS_REVALIDATE_TIMEOUT = 3600; // 1 hour

/* Get Tags */

export const getTags = async (q?: string): Promise<Tag[]> => {
  const searchQuery = normalizeSearchText(q);

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError('Query parameter too long');
  }

  const tags = await _getTags(searchQuery);

  if (tags === null) {
    throw new InternalError('Internal server error');
  }

  return tags;
};

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

export const getTopTags = async (limit = 5) => {
  return _getTopTags(limit);
};

const _getTopTags = unstable_cache(
  async (limit: number) => {
    try {
      // Get tags with the most articles
      const tags = await prisma.tag.findMany({
        where: {
          articles: {
            some: {
              status: ArticleStatus.PUBLISHED,
            },
          },
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              articles: {
                where: {
                  status: ArticleStatus.PUBLISHED,
                },
              },
            },
          },
        },
        orderBy: {
          articles: {
            _count: 'desc',
          },
        },
        take: limit,
      });

      return tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        count: tag._count.articles,
      }));
    } catch (error) {
      console.error('Error fetching top tags:', error);
      return [];
    }
  },
  [CacheKeys.GET_TOP_TAGS],
  {
    revalidate: GET_TOP_TAGS_REVALIDATE_TIMEOUT,
    tags: [CacheTags.TAGS],
  },
);
