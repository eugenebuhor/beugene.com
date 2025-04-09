import type { ArticlesSearchParams } from '@/app/articles/page';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import type { StringifiableRecord } from 'query-string';

const FALLBACK_PAGE = 1;
const FALLBACK_LIMIT = 5;
const MAX_LIMIT = 100;
const MAX_PAGE = 100;
const MAX_QUERY_LENGTH = 50;
const MAX_TAGS = 5;

export const parseArticlesSearchParams = (
  searchParams: StringifiableRecord,
): ArticlesSearchParams => {
  return parseSearchParams<ArticlesSearchParams>(searchParams, {
    page: 'number',
    limit: 'number',
    q: 'string',
    tags: 'string[]',
  });
};

export const stringifyArticlesSearchParams = (searchParams: ArticlesSearchParams): string => {
  return stringifyQueryString(searchParams);
};

export const normalizeSearchText = (text: string | undefined): string => {
  if (!text) return '';
  return text.trim().toLowerCase();
};

export const normalizeSearchParams = (params: ArticlesSearchParams): ArticlesSearchParams => {
  const parsedSearchParams = parseArticlesSearchParams(params);
  const page = parseInt((parsedSearchParams.page as string) || `${FALLBACK_PAGE}`, 10);
  const limit = parseInt((parsedSearchParams.limit as string) || `${FALLBACK_LIMIT}`, 10);

  parsedSearchParams.page = `${page}`;
  parsedSearchParams.limit = `${limit}`;
  parsedSearchParams.q = normalizeSearchText(parsedSearchParams.q);
  parsedSearchParams.tags = parsedSearchParams.tags || [];

  const { q, tags } = parsedSearchParams;

  if (q && q.length > MAX_QUERY_LENGTH) {
    parsedSearchParams.q = q.slice(0, MAX_QUERY_LENGTH);
  }

  if (tags && tags?.length > MAX_TAGS) {
    parsedSearchParams.tags = tags.slice(0, MAX_TAGS);
  }

  if (limit !== undefined && (isNaN(limit) || limit < 1)) {
    parsedSearchParams.limit = `${FALLBACK_LIMIT}`;
  }

  if (limit > MAX_LIMIT) {
    parsedSearchParams.limit = `${FALLBACK_LIMIT}`;
  }

  if (page !== undefined && (isNaN(page) || page < 1)) {
    parsedSearchParams.page = `${FALLBACK_PAGE}`;
  }

  if (page > MAX_PAGE) {
    parsedSearchParams.page = `${FALLBACK_PAGE}`;
  }

  return parsedSearchParams;
};
