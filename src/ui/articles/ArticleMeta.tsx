import Link from 'next/link';
import { format } from 'date-fns/format';
import { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import { DATE_FORMAT } from '@/constants';
import styles from '@/ui/articles/ArticleMeta.module.css';

type ArticleMetaProps = {
  publishedAt: Article['publishedAt'];
  timeToRead: Article['timeToRead'];
  title: Article['title'];
  articleLink?: string;
};

const ArticleMeta = ({ title, publishedAt, timeToRead, articleLink = '' }: ArticleMetaProps) => {
  return (
    <div className={styles.container}>
      <Typography
        variant="h1"
        component="h1"
        className={styles.title}
        weight="bold"
        fontFamily="title"
        trim={4}
      >
        {articleLink ? <Link href={articleLink}>{title}</Link> : title}
      </Typography>
      <Typography variant="body1" color="text-tertiary" fontFamily="subtitle">
        {publishedAt ? (
          <time dateTime={new Date(publishedAt).toISOString()}>
            {format(publishedAt, DATE_FORMAT)}
          </time>
        ) : null}
        &nbsp;·&nbsp;
        {timeToRead} min read
      </Typography>
    </div>
  );
};

export default ArticleMeta;
