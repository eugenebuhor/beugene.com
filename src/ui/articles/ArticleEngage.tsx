import { Suspense } from 'react';
import type { Article } from '@prisma/client';
import styles from '@/ui/articles/ArticleEngage.module.css';
import ArticleLikes from '@/ui/articles/ArticleLikes';
import { getUserLikes, getUserUUID } from '@/lib/users';
import { getArticleLikes } from '@/lib/articles';
import Skeleton from '@/ui/common/Skeleton';

type ArticleEngageProps = {
  articleId: Article['id'];
  slug: Article['slug'];
};

const ArticleEngageAsync = async ({ articleId, slug }: ArticleEngageProps) => {
  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!);
  const { total: articleLikes } = await getArticleLikes(articleId);
  const isLiked = userLikes.some((like) => articleId === like.articleId);

  return (
    <div className={styles.container}>
      <ArticleLikes slug={slug} likes={articleLikes} isLiked={isLiked} />
    </div>
  );
};

const ArticleEngage = ({ articleId, slug }: ArticleEngageProps) => {
  return (
    <Suspense fallback={<ArticleEngageSkeleton />}>
      <ArticleEngageAsync articleId={articleId} slug={slug} />
    </Suspense>
  );
};

export const ArticleEngageSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton width="3rem" height="1.5rem" />
    </div>
  );
};

export default ArticleEngage;
