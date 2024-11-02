import { getArticles } from '@/lib/articles';
import Divider from '@/ui/common/Divider';
import styles from '@/app/page.module.css';
import ArticleCard from '@/ui/articles/ArticleCard';

export const revalidate = 300; // 5 minutes

const HomePage = async () => {
  const { data: articles } = await getArticles({ limit: 5, offset: 0 });

  return (
    <ul className={styles.rootPageContainer}>
      {articles.map((article, index) => (
        <li key={article.id} id={article.slug}>
          <ArticleCard article={article} articleLink={`/articles/${article.slug}`} />
          {index === articles.length - 1 ? null : <Divider role="separator" margin="32px 0" />}
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
