import { Prisma } from '@prisma/client';
import PaginationControls from '@/ui/common/PaginationControls';
import ArticleCard from './ArticleCard';
import styles from './ArticleCardsList.module.css';

type ArticleCardsListProps = {
  articles: Prisma.ArticleGetPayload<{ include: { tags: true } }>[];
  withPagination?: boolean;
  totalPages?: number;
  currentPage?: number;
};

export default function ArticleCardsList({
  articles,
  withPagination = false,
  totalPages = 1,
  currentPage = 1,
}: ArticleCardsListProps) {
  return (
    <ul className={styles.articlesList}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}

      {withPagination && totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </ul>
  );
}
