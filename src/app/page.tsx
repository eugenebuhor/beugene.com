import { getArticles } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';
import Article from '@/ui/articles/Article';
import Divider from '@/ui/common/Divider';
import styles from '@/app/page.module.css';

export const revalidate = 300; // 5 minutes

const Home = async () => {
  const limit = 5;
  const offset = 0;

  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const { data: articles } = await getArticles({ limit, offset });

  return (
    <ul className={styles.container}>
      {articles.map((article, index) => (
        <li key={article.id}>
          <Article
            asCard
            article={article}
            isLiked={userLikes.some((like) => article.id === like.articleId)}
          />
          {index === articles.length - 1 ? null : <Divider role="separator" margin="32px 0" />}
        </li>
      ))}
    </ul>
  );
};

export default Home;
