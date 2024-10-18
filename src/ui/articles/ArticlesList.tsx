import PaginationControls from '@/ui/common/PaginationControls';
import { getArticles } from '@/lib/articles';
import ArticleCard from '@/ui/articles/ArticleCard';
import styles from '@/ui/articles/ArticlesList.module.css';

type ArticlesListProps = {
  limit?: number;
  page?: number;
  q?: string;
  withPagination?: boolean;
};

export default async function ArticlesList({
  limit = 5,
  page = 1,
  q = '',
  withPagination = false,
}: ArticlesListProps) {
  const offset = (page - 1) * limit;

  const { data: articles, total } = await getArticles({ limit, offset, q });

  const totalPages = Math.ceil(total / limit);

  return (
    <ul className={styles.articlesList}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}
      {withPagination && totalPages > 1 && (
        <PaginationControls currentPage={page} totalPages={totalPages} />
      )}
    </ul>
  );
}
