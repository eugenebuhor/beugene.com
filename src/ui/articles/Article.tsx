import type { Prisma } from '@prisma/client';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleTags from '@/ui/articles/ArticleTags';
import ArticleEngage from '@/ui/articles/ArticleEngage';
import ArticleSummary from '@/ui/articles/ArticleSummary';
import ArticlesPreview from '@/ui/articles/ArticlesPreview';
import MarkdownRenderer from '@/ui/common/MarkdownRenderer';
import styles from '@/ui/articles/Article.module.css';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
  previews?: Prisma.ArticleGetPayload<{ include: { tags: true } }>[];
  isLiked: boolean;
  asCard?: boolean;
};

const Article = async ({ asCard = false, article, isLiked }: ArticleCardProps) => {
  return (
    <article className={styles.container}>
      <ArticleMeta
        title={article.title}
        slug={article.slug}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
        titleAsLink={asCard}
      />

      {asCard ? (
        <ArticleSummary summary={article.summary} slug={article.slug} />
      ) : (
        <MarkdownRenderer content={article.content} />
      )}

      <ArticleTags tags={article.tags} />

      <ArticleEngage slug={article.slug} likes={article.likes} isLiked={isLiked} />

      {!asCard && <ArticlesPreview articleId={article.id} />}
    </article>
  );
};

export default Article;
