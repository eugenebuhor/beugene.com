// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { ArticleStatus } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { InternalError, NotFoundError, ValidationError } from '@/lib/errors';
import { CacheKeys, CacheTags } from '@/constants';

const GET_ARTICLES_REVALIDATE_TIMEOUT = 300; // 5 minutes
const GET_ARTICLE_BY_SLUG_REVALIDATE_TIMEOUT = 300; // 5 minutes

const FALLBACK_OFFSET = 0;
const FALLBACK_LIMIT = 10;
const MAX_LIMIT = 100;
const MAX_QUERY_LENGTH = 100;
const MAX_TAGS = 5;

export type GetArticlesParams = {
  q?: string;
  limit?: number;
  offset?: number;
  tags?: string[];
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

export const getArticles = async (params?: GetArticlesParams): Promise<PaginatedArticles> => {
  const limit = params?.limit !== undefined ? params.limit : FALLBACK_LIMIT;
  const offset = params?.offset !== undefined ? params.offset : FALLBACK_OFFSET;
  const searchQuery = params?.q ? params?.q.trim() : '';
  const tags = params?.tags ?? [];

  if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0 || limit > MAX_LIMIT) {
    throw new ValidationError('Invalid limit or offset');
  }

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError('Query parameter too long');
  }

  if (tags.length > MAX_TAGS) {
    throw new ValidationError(`Too many tags provided, maximum allowed is ${MAX_TAGS}`);
  }

  const result = await _getArticles({ limit, offset, q: searchQuery, tags });

  if (result === null) {
    throw new InternalError('Internal server error');
  } else if (result.total === 0) {
    throw new NotFoundError('No articles found');
  }

  return result;
};

const _getArticles = unstable_cache(
  async (params: Required<GetArticlesParams>): Promise<PaginatedArticles | null> => {
    const { limit, offset, q: searchQuery, tags } = params;

    const whereConditions: Prisma.ArticleWhereInput[] = [{ status: ArticleStatus.PUBLISHED }];

    if (tags.length > 0) {
      whereConditions.push({
        tags: {
          some: {
            name: {
              in: tags,
            },
          },
        },
      });
    }

    if (searchQuery) {
      whereConditions.push({
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
      });
    }

    const whereClause: Prisma.ArticleWhereInput = {
      AND: whereConditions,
    };

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
  [CacheKeys.GET_ARTICLES],
  {
    revalidate: GET_ARTICLES_REVALIDATE_TIMEOUT,
    tags: [CacheTags.ARTICLES],
  },
);

/* Get Article by Slug*/

export const getArticleBySlug = async (
  slug: string,
): Promise<
  Prisma.ArticleGetPayload<{
    include: { tags: true };
  }>
> => {
  if (!slug) {
    throw new ValidationError('Slug is required');
  }

  const article = await _getArticleBySlug(slug);

  if (!article) {
    throw new NotFoundError('Article not found');
  }

  return article;
};

const _getArticleBySlug = unstable_cache(
  async (
    slug: string,
  ): Promise<Prisma.ArticleGetPayload<{
    include: { tags: true };
  }> | null> => {
    if (!slug) {
      return null;
    }

    try {
      return await prisma.article.findFirst({
        where: {
          slug,
          status: ArticleStatus.PUBLISHED,
        },
        include: {
          tags: true,
        },
      });
    } catch (error) {
      console.error('Database Error:', error);
      return null;
    }
  },
  [CacheKeys.GET_ARTICLE_BY_SLUG],
  {
    revalidate: GET_ARTICLE_BY_SLUG_REVALIDATE_TIMEOUT,
    tags: [CacheTags.ARTICLE],
  },
);
