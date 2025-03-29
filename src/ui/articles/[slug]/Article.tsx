import type { Article as ArticlePrisma, Tag } from '@prisma/client';
import ArticleMeta, { ArticleMetaSkeleton } from '@/ui/articles/ArticleMeta';
import ArticleTags, { ArticleTagsSkeleton } from '@/ui/articles/ArticleTags';
import ArticleEngage, { ArticleEngageSkeleton } from '@/ui/articles/ArticleEngage';
import ArticleMarkdown, { ArticleMarkdownSkeleton } from '@/ui/articles/[slug]/ArticleMarkdown';
import ReadingProgress from '@/ui/articles/[slug]/ReadingProgress';
import styles from '@/ui/articles/[slug]/Article.module.css';

type ArticleProps = {
  slug: ArticlePrisma['slug'];
  id: ArticlePrisma['id'];
  title: ArticlePrisma['title'];
  content: ArticlePrisma['content'];
  timeToRead: ArticlePrisma['timeToRead'];
  publishedAt: ArticlePrisma['publishedAt'];
  tags: Tag[];
};

const Article = async ({
  slug,
  tags,
  timeToRead,
  title,
  publishedAt,
  content,
  id,
}: ArticleProps) => {
  return (
    <article className={styles.container}>
      <ReadingProgress />
      <ArticleMeta title={title} timeToRead={timeToRead} publishedAt={publishedAt} />
      <ArticleMarkdown markdown={content} />
      <ArticleTags tags={tags} />
      <ArticleEngage slug={slug} articleId={id} />
    </article>
  );
};

export const ArticleSkeleton = () => {
  return (
    <article className={styles.skeleton}>
      <ArticleMetaSkeleton />
      <ArticleMarkdownSkeleton />
      <ArticleTagsSkeleton />
      <ArticleEngageSkeleton />
    </article>
  );
};

export default Article;
