import { notFound } from 'next/navigation';
import ArticleMeta, { ArticleMetaSkeleton } from '@/ui/articles/ArticleMeta';
import ArticleTags, { ArticleTagsSkeleton } from '@/ui/articles/ArticleTags';
import ArticleEngage, { ArticleEngageSkeleton } from '@/ui/articles/ArticleEngage';
import { getArticleBySlug } from '@/lib/articles';
import styles from '@/ui/articles/[slug]/Article.module.css';
import ArticleMarkdown, { ArticleMarkdownSkeleton } from '@/ui/articles/[slug]/ArticleMarkdown';

type ArticleProps = {
  slug: string;
};

const Article = async ({ slug }: ArticleProps) => {
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <ArticleMeta
        title={article.title}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
      />
      <ArticleMarkdown markdown={article.content} />
      <ArticleTags tags={article.tags} />
      <ArticleEngage slug={slug} articleId={article.id} />
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
