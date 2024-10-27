import { Prisma, Like } from '@prisma/client';
import PaginationControls from '@/ui/common/PaginationControls';
import ArticleCard from './ArticleCard';
import styles from './ArticleCardsList.module.css';
import Divider from '@/ui/common/Divider';

type ArticleCardsListProps = {
  articles: Prisma.ArticleGetPayload<{ include: { tags: true } }>[];
  withPagination?: boolean;
  totalPages?: number;
  currentPage?: number;
  userLikes: Like[];
};

const ArticleCardsList = ({
  articles,
  withPagination = false,
  totalPages = 1,
  currentPage = 1,
  userLikes = [],
}: ArticleCardsListProps) => {
  return (
    <ul className={styles.articlesList}>
      {articles.map((article, index) => (
        <>
          <li key={article.id}>
            <ArticleCard
              article={article}
              isLiked={userLikes.some((like) => article.id === like.articleId)}
            />
            {index === articles.length - 1 ? null : <Divider role="separator" margin={'32px 0'} />}
          </li>
        </>
      ))}

      {withPagination && totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </ul>
  );
};

export default ArticleCardsList;
