import Link from 'next/link';
import { format } from 'date-fns/format';
import { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import Flex from '@/ui/common/Flex';
import { DATE_FORMAT } from '@/constants';
import styles from '@/ui/articles/ArticleCard.module.css';

type ArticleMetaProps = {
  publishedAt: Article['publishedAt'];
  timeToRead: Article['timeToRead'];
  slug: Article['slug'];
  title: Article['title'];
};

const ArticleMeta = ({ slug, title, publishedAt, timeToRead }: ArticleMetaProps) => {
  return (
    <Flex flexDirection="column" gap={8}>
      <Typography className={styles.title} variant="h4" weight="bold" fontFamily="title">
        <Link href={`/articles/${slug}`}>{title}</Link>
      </Typography>
      <Typography variant="body2" weight="light" color="text-secondary" fontFamily="subtitle">
        {publishedAt ? (
          <time dateTime={new Date(publishedAt).toISOString()}>
            {format(publishedAt, DATE_FORMAT)}
          </time>
        ) : null}
        &nbsp;·&nbsp;
        {timeToRead} min read
      </Typography>
    </Flex>
  );
};

export default ArticleMeta;
