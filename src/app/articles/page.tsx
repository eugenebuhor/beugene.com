import { notFound, redirect } from 'next/navigation';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import { getArticles } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';
import Article from '@/ui/articles/Article';
import Divider from '@/ui/common/Divider';
import PaginationControls from '@/ui/common/PaginationControls';
import { NotFoundError } from '@/lib/errors';
import styles from '@/app/articles/page.module.css';

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
  let articles = [];
  let total = 0;
  let userLikes = [];

  try {
    const userUUID = await getUserUUID();
    userLikes = await getUserLikes(userUUID!);
    const res = await getArticles({ limit, offset, q, tags });
    articles = res.data;
    total = res.total;
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      redirect('/articles');
    }
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <ul className={styles.container}>
      {articles.map((article, index) => (
        <li key={article.id} id={article.slug}>
          <Article
            asCard
            article={article}
            isLiked={userLikes.some((like) => article.id === like.articleId)}
            searchParams={stringifyQueryString(parsedParams) || '\u0020'}
          />
          {index === articles.length - 1 ? null : <Divider role="separator" margin="32px 0" />}
        </li>
      ))}

      {totalPages > 1 && (
        <PaginationControls
          className={styles.paginationControls}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </ul>
  );
};

export default ArticlesPage;
