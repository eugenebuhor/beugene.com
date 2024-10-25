import { Prisma, Like } from '@prisma/client';
import PaginationControls from '@/ui/common/PaginationControls';
import Typography from '@/ui/common/Typography';
import ArticleCard from './ArticleCard';
import styles from './ArticleCardsList.module.css';

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
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard
            article={article}
            isLiked={userLikes.some((like) => article.id === like.articleId)}
          >
            <Typography
              variant="h4"
              weight="light"
              component="p"
              lineHeight="1.5"
              fontFamily="text"
              trim={5}
            >
              {article.summary}
            </Typography>
          </ArticleCard>
        </li>
      ))}

      {withPagination && totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </ul>
  );
};

export default ArticleCardsList;
