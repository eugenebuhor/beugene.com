// eslint-disable-next-line camelcase
import { unstable_cache } from 'next/cache';
import { type Article, type Tag, ArticleStatus } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { InternalError, ValidationError } from '@/lib/errors';
import { CacheKeys, CacheTags } from '@/constants';

const GET_ARTICLES_REVALIDATE_TIMEOUT = 300; // 5 minutes
const GET_ARTICLE_BY_SLUG_REVALIDATE_TIMEOUT = 60; // 1 minutes

const FALLBACK_OFFSET = 0;
const FALLBACK_LIMIT = 10;
const MAX_LIMIT = 100;
const MAX_QUERY_LENGTH = 100;
const MAX_TAGS = 5;

type OrderBy = 'publishedAt' | 'likes' | 'title' | 'createdAt';
type Order = 'asc' | 'desc';

const DEFAULT_ARTICLE_SELECT: Prisma.ArticleSelect = {
  id: true,
  title: true,
  slug: true,
  summary: true,
  content: true,
  coverImageUrl: true,
  timeToRead: true,
  status: true,
  likes: true,
  metaTitle: true,
  metaDescription: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  tags: {
    select: {
      id: true,
      name: true,
    },
  },
};

export type GetArticleBySlugParams = {
  select?: Prisma.ArticleSelect;
  slug: Article['slug'];
};

export type GetArticlesParams = {
  q?: string;
  limit?: number;
  offset?: number;
  tags?: Tag['name'][];
  orderBy?: OrderBy;
  order?: Order;
  exclude?: Article['slug'][];
  select?: Prisma.ArticleSelect;
};

export type PaginatedArticles = {
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
  const searchQuery = params?.q ? params.q.trim() : '';
  const tags = params?.tags ?? [];
  const orderBy: OrderBy = params?.orderBy ?? 'publishedAt';
  const order: Order = params?.order ?? 'desc';
  const exclude = params?.exclude ?? [];
  const select = params?.select ?? DEFAULT_ARTICLE_SELECT;

  const allowedOrderBy: OrderBy[] = ['publishedAt', 'likes', 'title', 'createdAt'];
  const allowedOrder: Order[] = ['asc', 'desc'];

  if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0 || limit > MAX_LIMIT) {
    throw new ValidationError('Invalid limit or offset');
  }

  if (searchQuery && searchQuery.length > MAX_QUERY_LENGTH) {
    throw new ValidationError('Query parameter too long');
  }

  if (tags.length > MAX_TAGS) {
    throw new ValidationError(`Too many tags provided, maximum allowed is ${MAX_TAGS}`);
  }

  if (!allowedOrderBy.includes(orderBy)) {
    throw new ValidationError(`Invalid sort key. Allowed values are: ${allowedOrderBy.join(', ')}`);
  }

  if (!allowedOrder.includes(order)) {
    throw new ValidationError('Invalid sort direction. Allowed values are "asc" and "desc"');
  }

  const result = await _getArticles({
    limit,
    offset,
    q: searchQuery,
    tags,
    orderBy,
    order,
    exclude,
    select,
  });

  if (result === null) {
    throw new InternalError('Internal server error');
  }

  return result;
};

const _getArticles = unstable_cache(
  async (params: Required<GetArticlesParams>): Promise<PaginatedArticles | null> => {
    const { limit, offset, q: searchQuery, tags, orderBy, order, exclude, select } = params;

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

    if (exclude.length > 0) {
      whereConditions.push({
        slug: {
          notIn: exclude,
        },
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
          select: select || DEFAULT_ARTICLE_SELECT,
          orderBy: {
            [orderBy]: order,
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
  params: GetArticleBySlugParams,
): Promise<Prisma.ArticleGetPayload<{
  include: { tags: true };
}> | null> => {
  if (!params.slug) {
    throw new ValidationError('Slug is required');
  }

  return await _getArticleBySlug(params);
};

const _getArticleBySlug = unstable_cache(
  async (
    params: GetArticleBySlugParams,
  ): Promise<Prisma.ArticleGetPayload<{
    include: { tags: true };
  }> | null> => {
    const { slug, select } = params;

    if (!slug) return null;

    try {
      return await prisma.article.findFirst({
        where: {
          slug,
          status: ArticleStatus.PUBLISHED,
        },
        select: select || DEFAULT_ARTICLE_SELECT,
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

/* Get Article Likes */

export const getArticleLikes = async (id: number): Promise<{ total: number }> => {
  const likesCount = await prisma.like.count({
    where: {
      articleId: id,
    },
  });

  return {
    total: likesCount,
  };
};
