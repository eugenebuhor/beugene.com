import type { Article, Tag } from '@prisma/client';
import ArticleMeta, { ArticleMetaSkeleton } from '@/ui/articles/ArticleMeta';
import ArticleSummary, { ArticleSummarySkeleton } from '@/ui/articles/ArticleSummary';
import ArticleTags, { ArticleTagsSkeleton } from '@/ui/articles/ArticleTags';
import ArticleEngage, { ArticleEngageSkeleton } from '@/ui/articles/ArticleEngage';
import styles from '@/ui/articles/ArticleCard.module.css';

type ArticleCardProps = {
  title: Article['title'];
  summary: Article['summary'];
  timeToRead: Article['timeToRead'];
  publishedAt: Article['publishedAt'];
  slug: Article['slug'];
  id: Article['id'];
  tags: Tag[];
  articleLink: string;
};

const ArticleCard = ({
  id,
  slug,
  title,
  summary,
  timeToRead,
  publishedAt,
  tags,
  articleLink,
}: ArticleCardProps) => {
  return (
    <article className={styles.container}>
      <ArticleMeta
        title={title}
        timeToRead={timeToRead}
        publishedAt={publishedAt}
        articleLink={articleLink}
      />
      <ArticleSummary summary={summary} articleLink={articleLink} />
      <ArticleTags tags={tags} />
      <ArticleEngage slug={slug} articleId={id} />
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
