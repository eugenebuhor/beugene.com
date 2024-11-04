import { Suspense } from 'react';
import MarkdownRenderer from '@/ui/common/MarkdownRenderer';
import Skeleton from '@/ui/common/Skeleton';
import Typography from '@/ui/common/Typography';
import styles from '@/ui/articles/[slug]/ArticleMarkdown.module.css';

type ArticleMarkdownProps = {
  markdown: string;
};

const ArticleMarkdown = async ({ markdown }: ArticleMarkdownProps) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<ArticleMarkdownSkeleton />}>
        <MarkdownRenderer markdown={markdown} />
      </Suspense>
      <Typography fontStyle="italic" color="text-secondary">
        Thanks for exploring this topic with me.
      </Typography>
    </div>
  );
};

export const ArticleMarkdownSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div>
        {/* Simulating paragraphs */}
        <Skeleton width="100%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="90%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="85%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="100%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="95%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="70%" height="1.5rem" className={styles.skeletonItem} />

        {/* Simulating a list */}
        <ul className={styles.skeletonList}>
          <Skeleton width="40%" height="1.5rem" className={styles.skeletonListItem} />
          <Skeleton width="50%" height="1.5rem" className={styles.skeletonListItem} />
          <Skeleton width="30%" height="1.5rem" className={styles.skeletonListItem} />
        </ul>

        {/* Additional paragraph content */}
        <Skeleton width="100%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="85%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="90%" height="1.5rem" className={styles.skeletonItem} />
        <Skeleton width="75%" height="1.5rem" className={styles.skeletonItem} />
      </div>
    </div>
  );
};

export default ArticleMarkdown;
