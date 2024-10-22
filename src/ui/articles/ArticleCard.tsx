import { Prisma } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleActions from '@/ui/articles/ArticleActions';

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

      <ArticleActions slug={article.slug} likes={article.likes} tags={article.tags} />
    </Flex>
  );
};

export default ArticleCard;
