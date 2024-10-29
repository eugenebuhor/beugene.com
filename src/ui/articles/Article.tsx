import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleTags from '@/ui/articles/ArticleTags';
import ArticleEngage from '@/ui/articles/ArticleEngage';
import ArticleSummary from '@/ui/articles/ArticleSummary';
import ArticlesPreview from '@/ui/articles/ArticlesPreview';
import MarkdownRenderer from '@/ui/common/MarkdownRenderer';
import Typography from '@/ui/common/Typography';
import styles from '@/ui/articles/Article.module.css';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
  previews?: Prisma.ArticleGetPayload<{ include: { tags: true } }>[];
  isLiked: boolean;
  asCard?: boolean;
  searchParams?: string;
};

const Article = ({ article, isLiked, asCard = false, searchParams = '' }: ArticleCardProps) => {
  const articleLink = searchParams
    ? `/articles/${article.slug}?${searchParams}`
    : `/articles/${article.slug}`;
  const backToArticlesLink = searchParams ? `/articles/?${searchParams}` : `/articles`;

  return (
    <article className={styles.container}>
      {!asCard && (
        <Link href={backToArticlesLink} className={styles.backLink}>
          <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
        </Link>
      )}

      <ArticleMeta
        title={article.title}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
        articleLink={articleLink}
      />

      {asCard ? (
        <ArticleSummary summary={article.summary} articleLink={articleLink} />
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
