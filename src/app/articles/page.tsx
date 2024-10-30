import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import { getArticles } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';
import Article from '@/ui/articles/Article';
import Divider from '@/ui/common/Divider';
import PaginationControls from '@/ui/common/PaginationControls';
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

  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const { data: articles, total } = await getArticles({ limit, offset, q, tags });

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
