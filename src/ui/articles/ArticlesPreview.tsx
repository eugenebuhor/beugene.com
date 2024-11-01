import Link from 'next/link';
import type { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import { getArticles } from '@/lib/articles';
import styles from '@/ui/articles/ArticlesPreview.module.css';

type ArticlesPreviewProps = {
  limit?: number;
  articleId?: Article['id'];
};

const ArticlesPreview = async ({ articleId, limit = 3 }: ArticlesPreviewProps) => {
  const { data: articles } = await getArticles({
    limit: limit,
    offset: 0,
    orderBy: 'likes',
    order: 'desc',
    exclude: articleId ? [articleId] : [],
  });

  if (!articles.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Typography
        variant="h1"
        component="h1"
        fontStyle="italic"
        weight="regular"
        textAlign="center"
      >
        What to read next?
      </Typography>
      <nav className={styles.nav}>
        {articles.map((article) => (
          <Link key={article.slug} href={`/src/app/(articles)/articles/${article.slug}`}>
            <div className={styles.preview}>
              <Typography variant="h4" component="h4" fontFamily="title" trim={2}>
                {article.title}
              </Typography>

              <Typography variant="body1" component="p" fontFamily="text" trim={3}>
                {article.summary}
              </Typography>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ArticlesPreview;
