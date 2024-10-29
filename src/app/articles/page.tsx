import ArticleCardsList from '@/ui/articles/ArticleCardsList';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import { getArticles } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';

export type SearchParams = {
  page?: string;
  limit?: string;
  q?: string;
  tags?: string[];
};

type ArticlesPageProps = {
  searchParams: SearchParams;
};

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const parsedParams = parseSearchParams<{
    page?: string;
    limit?: string;
    q?: string;
    tags?: string[];
  }>(searchParams);
  const page = parseInt(parsedParams.page || '1', 10);
  const limit = parseInt(parsedParams.limit || '5', 10);
  const q = parsedParams.q || '';
  const tags = parsedParams.tags || [];

  const offset = (page - 1) * limit;

  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const { data: articles, total } = await getArticles({ limit, offset, q, tags });

  return (
    <ArticleCardsList
      articles={articles}
      withPagination
      totalPages={Math.ceil(total / limit)}
      currentPage={page}
      userLikes={userLikes}
      searchParams={stringifyQueryString(parsedParams)}
    />
  );
};

export default ArticlesPage;
