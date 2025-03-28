'use client';

import Link from 'next/link';
import Typography from '@/ui/common/Typography';
import styles from '@/app/page.module.css';

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <Link href="/articles">
        <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
      </Link>
      <div className={styles.rootError}>
        <Typography
          className={styles.codeError}
          variant="h1"
          component="h1"
          weight="regular"
          fontFamily="subtitle"
        >
          Error
        </Typography>
        <Typography variant="body1" component="p" fontFamily="subtitle">
          Something went wrong.
        </Typography>
      </div>
    </>
  );
}
