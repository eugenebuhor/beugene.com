import type { Prisma, Like } from '@prisma/client';
import PaginationControls from '@/ui/common/PaginationControls';
import Article from '@/ui/articles/Article';
import Divider from '@/ui/common/Divider';
import styles from './ArticleCardsList.module.css';

type ArticleCardsListProps = {
  articles: Prisma.ArticleGetPayload<{ include: { tags: true } }>[];
  userLikes: Like[];
  searchParams?: string;
  withPagination?: boolean;
  totalPages?: number;
  currentPage?: number;
};

const ArticleCardsList = ({
  articles,
  withPagination = false,
  totalPages = 1,
  currentPage = 1,
  userLikes = [],
  searchParams = '',
}: ArticleCardsListProps) => {
  return (
    <ul className={styles.container}>
      {articles.map((article, index) => (
        <li key={article.id}>
          <Article
            asCard
            article={article}
            isLiked={userLikes.some((like) => article.id === like.articleId)}
            searchParams={searchParams}
          />
          {index === articles.length - 1 ? null : <Divider role="separator" margin={'32px 0'} />}
        </li>
      ))}

      {withPagination && totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </ul>
  );
};

export default ArticleCardsList;
