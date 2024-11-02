import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/articles';
import Divider from '@/ui/common/Divider';
import ArticleCard from '@/ui/articles/ArticleCard';
import styles from '@/app/page.module.css';

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

  if (total === 0 || articles.length === 0) {
    notFound();
  }

  return (
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
