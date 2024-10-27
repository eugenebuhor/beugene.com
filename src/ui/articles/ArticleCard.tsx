import { Prisma } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleTags from '@/ui/articles/ArticleTags';
import ArticleEngage from '@/ui/articles/ArticleEngage';
import MarkdownRenderer from '@/ui/common/MarkdownRenderer';
import ArticleSummary from '@/ui/articles/ArticleSummary';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
  isLiked: boolean;
  withMarkdown?: boolean;
  titleAsLink?: boolean;
};

const ArticleCard = async ({
  titleAsLink = true,
  withMarkdown = false,
  article,
  isLiked,
}: ArticleCardProps) => {
  return (
    <Flex flexDirection="column" component="article" gap={24}>
      <ArticleMeta
        title={article.title}
        slug={article.slug}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
        titleAsLink={titleAsLink}
      />

      {withMarkdown ? (
        <MarkdownRenderer content={article.content} />
      ) : (
        <ArticleSummary summary={article.summary} slug={article.slug} />
      )}

      <ArticleTags tags={article.tags} />

      <ArticleEngage slug={article.slug} likes={article.likes} isLiked={isLiked} />
    </Flex>
  );
};

export default ArticleCard;
