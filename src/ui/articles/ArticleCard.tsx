import { Prisma } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleTags from '@/ui/articles/ArticleTags';
import ArticleEngage from '@/ui/articles/ArticleEngage';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Flex flexDirection="column" component="article" gap={16}>
      <ArticleMeta
        title={article.title}
        slug={article.slug}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
      />

      <Typography variant="h6" weight="light" component="p" lineHeight="1.5" fontFamily="text">
        {article.content}
      </Typography>

      <Flex flexDirection="column" gap={12}>
        <ArticleTags tags={article.tags} />
        <ArticleEngage slug={article.slug} likes={article.likes} />
      </Flex>
    </Flex>
  );
};

export default ArticleCard;
