import { Prisma, ArticleStatus } from '@prisma/client';
import type { Article } from '@prisma/client';
// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';
import { InternalError, NotFoundError, ValidationError } from '@/lib/errors';

const GET_ARTICLES_CACHE_KEY = 'get-articles';
const GET_ARTICLE_BY_SLUG_CACHE_KEY = 'get-article-by-slug';
const GET_ARTICLES_CACHE_REVALIDATE = 300; // 5 minutes
const GET_ARTICLE_BY_SLUG_CACHE_REVALIDATE = 300; // 5 minutes

const FALLBACK_OFFSET = 0;
const FALLBACK_LIMIT = 10;
const MAX_LIMIT = 100;
const MAX_QUERY_LENGTH = 100;

type GetArticlesParams = {
  q?: string;
  limit?: number;
  offset?: number;
};

type PaginatedArticles = {
  data: Prisma.ArticleGetPayload<{
    include: { tags: true };
  }>[];
  total: number;
  limit: number;
  offset: number;
};

/* Get Articles */

/**
 * Public function to get articles array.
 *
 * @param params - Optional parameters for querying articles.
 * @returns An array of articles.
 * @throws ValidationError if params validation fails.
 * @throws NotFoundError if no article found.
 * @throws InternalError if database query fails.
 */
export async function getArticles(params?: {
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<PaginatedArticles> {
  const limit = params?.limit !== undefined ? params.limit : FALLBACK_LIMIT;
  const offset = params?.offset !== undefined ? params.offset : FALLBACK_OFFSET;
  const q = params?.q;

  if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0 || limit > MAX_LIMIT) {
    throw new ValidationError('Invalid limit or offset');
  }
  const searchQuery = q ? q.trim() : '';

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError('Query parameter too long');
  }

  const result = await _getArticles({ limit, offset, q: searchQuery });

  if (result === null) {
    throw new InternalError('Internal server error');
  } else if (result.total === 0) {
    throw new NotFoundError('No articles found');
  }

  return result;
}

/**
 * Internal function to fetch articles from the database with caching.
 *
 * cache key: get-articles
 * cache options: revalidate every 300 seconds (5 minutes)
 *
 * @param params - Validated parameters for querying articles.
 * @returns Promise<Article[] | null> a promise of an array of articles or null if a database error occurs.
 */
const _getArticles = unstable_cache(
  async (params: Required<GetArticlesParams>): Promise<PaginatedArticles | null> => {
    const { limit, offset, q: searchQuery } = params;

    let whereClause: Prisma.ArticleWhereInput = {
      status: ArticleStatus.PUBLISHED,
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

    try {
      const [data, total] = await prisma.$transaction([
        prisma.article.findMany({
          where: whereClause,
          skip: offset,
          take: limit,
          include: {
            tags: true,
          },
          orderBy: {
            publishedAt: 'desc',
          },
        }),
        prisma.article.count({
          where: whereClause,
        }),
      ]);

      return {
        data,
        total,
        limit,
        offset,
      };
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  [GET_ARTICLES_CACHE_KEY],
  { revalidate: GET_ARTICLES_CACHE_REVALIDATE }, // Cache for 5 minutes
);

/* Get Article by Slug*/

/**
 * Public function to get an article.
 *
 * @param slug - The slug of the article to  fetch.
 * @returns Promise<Article> The article object.
 * @throws NotFoundError if article is not found.
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
  if (!slug) {
    throw new ValidationError('Slug is required');
  }

  const article = await _getArticleBySlug(slug);

  if (!article) {
    throw new NotFoundError('Article not found');
  }

  return article;
}

/**
 * Internal function to fetch an article by slug from the database with caching.
 *
 * cache key: get-article-by-slug
 * cache options: revalidate every 300 seconds (5 minutes)
 *
 * @param slug - The slug of the article to fetch.
 * @returns Promise<Article | null> a promise of an article or null if a database error occurs.
 */
const _getArticleBySlug = unstable_cache(
  async (slug: string): Promise<Article | null> => {
    if (!slug) {
      return null;
    }

    try {
      const article = await prisma.article.findFirst({
        where: {
          slug,
          status: ArticleStatus.PUBLISHED,
        },
        include: {
          tags: true,
        },
      });

      return article;
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  [GET_ARTICLE_BY_SLUG_CACHE_KEY],
  { revalidate: GET_ARTICLE_BY_SLUG_CACHE_REVALIDATE },
);
