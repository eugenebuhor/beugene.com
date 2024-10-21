import { format } from 'date-fns/format';
import { Article } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';
import NavLink from '@/ui/common/NavLink';
import { DATE_FORMAT } from '@/constants';

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Flex flexDirection="column" component="article">
      <Typography variant="h4" weight="bold" fontFamily="title">
        <NavLink href={`/${article.slug}`} color="text-primary">
          {article.title}
        </NavLink>
      </Typography>

      <Flex flexDirection="row">
        {article.publishedAt ? (
          <Typography variant="body2" weight="light" color="text-secondary" fontFamily="subtitle">
            {format(article.publishedAt, DATE_FORMAT)}
          </Typography>
        ) : null}
      </Flex>

      <Typography variant="h6" weight="light" component="p" lineHeight="1.5" fontFamily="text">
        {article.content}
      </Typography>
    </Flex>
  );
};

export default ArticleCard;
