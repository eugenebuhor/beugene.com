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
  titleAsLink?: boolean;
};

const ArticleMeta = ({
  slug,
  title,
  publishedAt,
  timeToRead,
  titleAsLink = true,
}: ArticleMetaProps) => {
  return (
    <Flex flexDirection="column" gap={8}>
      <Typography className={styles.title} variant="h1" weight="bold" fontFamily="title" trim={4}>
        {titleAsLink ? <Link href={`/articles/${slug}`}>{title}</Link> : title}
      </Typography>
      <Typography variant="body1" weight="light" color="text-tertiary" fontFamily="subtitle">
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
