import Link from 'next/link';
import type { Article } from '@prisma/client';
import Typography from '@/ui/common/Typography';
import { getArticles } from '@/lib/articles';
import styles from '@/ui/articles/ArticlesPreview.module.css';

type ArticlesPreviewProps = {
  articleId: Article['id'];
};

const ArticlesPreview = async ({ articleId }: ArticlesPreviewProps) => {
  const { data: articles } = await getArticles({
    limit: 3,
    offset: 0,
    orderBy: 'likes',
    order: 'desc',
    exclude: [articleId],
  });

  if (!articles.length) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Typography variant="h1" component="h1" fontStyle="italic" weight="bold" textAlign="center">
        What to read next?
      </Typography>
      <nav className={styles.nav}>
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <div className={styles.preview}>
              <Typography variant="h4" component="h4" weight="bold" fontFamily="title" trim={2}>
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
