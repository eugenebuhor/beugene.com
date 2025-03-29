import Link from 'next/link';
import { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import styles from './ArticleSummary.module.css';
import Skeleton from '@/ui/common/Skeleton';

type ArticleSummaryProps = {
  articleLink: string;
  summary: Article['summary'];
};

const ArticleSummary = async ({ summary, articleLink }: ArticleSummaryProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="subtitle" component="p" fontFamily="text">
        {summary}
      </Typography>

      <Link href={articleLink}>
        <Typography variant="body1" component="span" fontFamily="text" className={styles.readMore}>
          Read&nbsp;more..
        </Typography>
      </Link>
    </div>
  );
};

export const ArticleSummarySkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton width="100%" height="1.25rem" />
      <Skeleton width="100%" height="1.25rem" />
      <Skeleton width="100%" height="1.25rem" />
      <Skeleton width="100%" height="1.25rem" />
      <Skeleton width="80%" height="1.25rem" />
    </div>
  );
};

export default ArticleSummary;
