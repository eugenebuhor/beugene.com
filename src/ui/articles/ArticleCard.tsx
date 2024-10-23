import { Prisma } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';
import ArticleMeta from '@/ui/articles/ArticleMeta';
import ArticleTags from '@/ui/articles/ArticleTags';
import ArticleEngage from '@/ui/articles/ArticleEngage';
import { getLikedArticles } from '@/app/actions/articles';

type ArticleCardProps = {
  article: Prisma.ArticleGetPayload<{ include: { tags: true } }>;
};

const ArticleCard = async ({ article }: ArticleCardProps) => {
  const likedArticles = await getLikedArticles();

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
        <ArticleEngage
          slug={article.slug}
          likes={article.likes}
          isLiked={likedArticles.includes(article.slug)}
        />
      </Flex>
    </Flex>
  );
};

export default ArticleCard;
