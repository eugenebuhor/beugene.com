import { Suspense } from 'react';
import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import Skeleton from '@/ui/common/Skeleton';
import { getArticles } from '@/lib/articles';
import styles from '@/ui/articles/[slug]/RelatedArticles.module.css';

type RelatedArticlesProps = {
  limit?: number;
  slug?: string;
};

const RelatedArticlesAsync = async ({ slug, limit = 3 }: RelatedArticlesProps) => {
  let articles: Prisma.ArticleGetPayload<{
    include: { tags: true };
  }>[] = [];

  try {
    const { data } = await getArticles({
      limit: limit,
      offset: 0,
      orderBy: 'likes',
      order: 'desc',
      exclude: slug ? [slug] : [],
      select: {
        slug: true,
        title: true,
        summary: true,
      },
    });

    articles = data;
  } catch (error) {}

  if (!articles.length) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      {articles.map((article) => (
        <Link key={article.slug} href={`/articles/${article.slug}`}>
          <div className={styles.article}>
            <Typography variant="h4" component="h4" fontFamily="title" trim={2}>
              {article.title}
            </Typography>

            <Typography variant="body1" component="p" fontFamily="text" trim={3}>
              {article.summary}
            </Typography>
          </div>
        </Link>
      ))}
    </nav>
  );
};

const RelatedArticles = ({ slug, limit = 3 }: RelatedArticlesProps) => {
  return (
    <div className={styles.container}>
      <Typography
        variant="h1"
        component="h1"
        fontStyle="italic"
        weight="regular"
        textAlign="center"
      >
        What to read next?
      </Typography>

      <Suspense fallback={<RelatedArticlesSkeleton />}>
        <RelatedArticlesAsync slug={slug} limit={limit} />
      </Suspense>
    </div>
  );
};

export const RelatedArticlesSkeleton = () => {
  return (
    <nav className={styles.skeleton}>
      <Skeleton width="100%" height="7rem" />
      <Skeleton width="100%" height="7rem" />
      <Skeleton width="100%" height="7rem" />
    </nav>
  );
};

export default RelatedArticles;
