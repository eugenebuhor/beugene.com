import Link from 'next/link';
import { format } from 'date-fns/format';
import { Article } from '@prisma/client';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Typography from '@/ui/common/Typography';
import Skeleton from '@/ui/common/Skeleton';
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
        {articleLink ? (
          <Link href={articleLink} prefetch>
            {title}
          </Link>
        ) : (
          title
        )}
      </Typography>

      <Typography
        variant="body1"
        color="text-tertiary"
        fontFamily="subtitle"
        className={styles.meta}
      >
        {publishedAt ? (
          <time dateTime={new Date(publishedAt).toISOString()}>
            {format(publishedAt, DATE_FORMAT)}
          </time>
        ) : null}
        &nbsp;·&nbsp;
        <AiOutlineClockCircle />
        {timeToRead} min read
      </Typography>
    </div>
  );
};

export const ArticleMetaSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      {/* Title */}
      <Skeleton width="100%" height="3rem" />
      {/* Publishing date and time to read */}
      <Skeleton width="30%" height="1.5rem" />
    </div>
  );
};

export default ArticleMeta;
