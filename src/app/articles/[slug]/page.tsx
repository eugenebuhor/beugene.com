import { notFound, redirect } from 'next/navigation';
import Article from '@/ui/articles/Article';
import { getArticleBySlug } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import { NotFoundError } from '@/lib/errors';
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
  let article = null;
  let isLiked = false;

  try {
    const userUUID = await getUserUUID();
    const userLikes = await getUserLikes(userUUID!);
    article = await getArticleBySlug(params.slug);
    isLiked = userLikes.some((like) => article!.id === like.articleId);
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      redirect('/articles');
    }
  }

  return (
    <Article
      article={article}
      isLiked={isLiked}
      searchParams={stringifyQueryString(parseSearchParams(searchParams))}
    />
  );
};

export default ArticlePage;
