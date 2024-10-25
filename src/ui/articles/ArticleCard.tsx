import type { ReactNode } from 'react';
import { Prisma } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleTags from '@/ui/articles/ArticleTags';
import ArticleEngage from '@/ui/articles/ArticleEngage';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
  isLiked: boolean;
  children: ReactNode;
};

const ArticleCard = async ({ article, isLiked, children }: ArticleCardProps) => {
  return (
    <Flex flexDirection="column" component="article" gap={16}>
      <ArticleMeta
        title={article.title}
        slug={article.slug}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
      />

      {children}

      <ArticleTags tags={article.tags} />

      <ArticleEngage slug={article.slug} likes={article.likes} isLiked={isLiked} />
    </Flex>
  );
};

export default ArticleCard;
