import { format } from 'date-fns/format';
import { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import { DATE_FORMAT } from '@/constants';

type ArticleMetaProps = {
  publishedAt: Article['publishedAt'];
  timeToRead: Article['timeToRead'];
};

const ArticleMeta = ({ publishedAt, timeToRead }: ArticleMetaProps) => {
  return (
    <Typography variant="body2" weight="light" color="text-secondary" fontFamily="subtitle">
      {publishedAt ? (
        <time dateTime={new Date(publishedAt).toISOString()}>
          {format(publishedAt, DATE_FORMAT)}
        </time>
      ) : null}
      &nbsp;·&nbsp;
      {timeToRead} min read
    </Typography>
  );
};

export default ArticleMeta;
