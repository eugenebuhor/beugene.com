import type { Metadata } from 'next';
import Typography from '@/ui/common/Typography';
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found | Yevhenii Buhor | Web Development Insights',
  description: 'This page could not be found.',
};

export default function NotFound() {
  return (
    <>
      <a href="/articles">
        <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
      </a>
      <div className={styles.rootNotFound}>
        <Typography
          className={styles.codeError}
          variant="h1"
          component="h1"
          weight="regular"
          fontFamily="subtitle"
        >
          404
        </Typography>
        <Typography variant="body1" component="p" fontFamily="subtitle">
          This page could not be found.
        </Typography>
      </div>
    </>
  );
}
