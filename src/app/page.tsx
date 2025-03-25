import { getArticles } from '@/lib/articles';
import ArticleCard from '@/ui/articles/ArticleCard';
import styles from '@/app/page.module.css';
import { Typography, Divider } from '@/ui/common';

export const revalidate = 300; // 5 minutes

const HomePage = async () => {
  const { data: articles, total } = await getArticles({
    limit: 5,
    offset: 0,
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      timeToRead: true,
      publishedAt: true,
      tags: true,
    },
  });

  const noResults = total === 0 || articles.length === 0;

  return noResults ? (
    <Typography className={styles.noResults}>No articles found.</Typography>
  ) : (
    <ul className={styles.rootPageContainer}>
      {articles.map((article, index) => (
        <li key={article.id} id={article.slug}>
          <ArticleCard
            id={article.id}
            slug={article.slug}
            title={article.title}
            summary={article.summary}
            timeToRead={article.timeToRead}
            publishedAt={article.publishedAt}
            tags={article.tags}
            articleLink={`/articles/${article.slug}`}
          />
          {index === articles.length - 1 ? null : <Divider role="separator" margin="32px 0" />}
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
