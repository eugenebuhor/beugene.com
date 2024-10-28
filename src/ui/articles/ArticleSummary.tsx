import Link from 'next/link';
import { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import styles from './ArticleSummary.module.css';

type ArticleSummaryProps = {
  slug: Article['slug'];
  summary: Article['summary'];
};

const ArticleSummary = async ({ summary, slug }: ArticleSummaryProps) => {
  return (
    <div className={styles.container}>
      <Typography variant="subtitle" component="p" fontFamily="text">
        {summary}
      </Typography>

      <Link href={`/articles/${slug}`}>
        <Typography variant="body1" component="span" fontFamily="text" className={styles.readMore}>
          Read&nbsp;more..
        </Typography>
      </Link>
    </div>
  );
};

export default ArticleSummary;
