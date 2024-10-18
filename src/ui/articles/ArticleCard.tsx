import { Article } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Flex flexDirection="column" component="article">
      <Typography variant="h4">{article.title}</Typography>
      <p>{article.content}</p>
    </Flex>
  );
};

export default ArticleCard;
