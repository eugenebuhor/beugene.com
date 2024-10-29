import Article from '@/ui/articles/Article';
import { getArticleBySlug } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import type { SearchParams as ArticlesPageSearchParams } from '@/app/articles/page';

type Params = {
  slug: string;
};

type SearchParams = ArticlesPageSearchParams;

type ArticlePageProps = {
  params: Params;
  searchParams: SearchParams;
};

const ArticlePage = async ({ params, searchParams }: ArticlePageProps) => {
  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const article = await getArticleBySlug(params.slug);
  const isLiked = userLikes.some((like) => article.id === like.articleId);

  return (
    <Article
      article={article}
      isLiked={isLiked}
      searchParams={stringifyQueryString(parseSearchParams(searchParams))}
    />
  );
};

export default ArticlePage;
