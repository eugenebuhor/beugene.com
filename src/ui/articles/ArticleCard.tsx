import type { Prisma } from '@prisma/client';
import ArticleMeta, { ArticleMetaSkeleton } from '@/ui/articles/ArticleMeta';
import ArticleSummary, { ArticleSummarySkeleton } from '@/ui/articles/ArticleSummary';
import ArticleTags, { ArticleTagsSkeleton } from '@/ui/articles/ArticleTags';
import ArticleEngage, { ArticleEngageSkeleton } from '@/ui/articles/ArticleEngage';
import styles from '@/ui/articles/ArticleCard.module.css';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
  articleLink: string;
};

const ArticleCard = ({ article, articleLink }: ArticleCardProps) => {
  return (
    <article className={styles.container}>
      <ArticleMeta
        title={article.title}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
        articleLink={articleLink}
      />
      <ArticleSummary summary={article.summary} articleLink={articleLink} />
      <ArticleTags tags={article.tags} />
      <ArticleEngage slug={article.slug} articleId={article.id} />
    </article>
  );
};

export const ArticleCardSkeleton = () => {
  return (
    <article className={styles.skeleton}>
      <ArticleMetaSkeleton />
      <ArticleSummarySkeleton />
      <ArticleTagsSkeleton />
      <ArticleEngageSkeleton />
    </article>
  );
};

export default ArticleCard;
