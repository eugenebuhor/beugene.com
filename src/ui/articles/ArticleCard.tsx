import { Article } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';
import NavLink from '@/ui/common/NavLink';
import ArticleMeta from '@/ui/articles/ArticleMeta';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Flex flexDirection="column" component="article" gap={16}>
      <Flex flexDirection="column" gap={8}>
        <Typography variant="h4" weight="bold" fontFamily="title">
          <NavLink href={`/${article.slug}`} color="text-primary">
            {article.title}
          </NavLink>
        </Typography>

        <ArticleMeta timeToRead={article.timeToRead} publishedAt={article.publishedAt} />
      </Flex>

      <Typography variant="h6" weight="light" component="p" lineHeight="1.5" fontFamily="text">
        {article.content}
      </Typography>
    </Flex>
  );
};

export default ArticleCard;
