import { notFound, redirect } from 'next/navigation';
import { getArticles } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';
import Article from '@/ui/articles/Article';
import Divider from '@/ui/common/Divider';
import { NotFoundError } from '@/lib/errors';
import styles from '@/app/page.module.css';

export const revalidate = 300; // 5 minutes

const Home = async () => {
  const limit = 5;
  const offset = 0;
  let userLikes = [];
  let articles = [];

  try {
    const userUUID = await getUserUUID();
    userLikes = await getUserLikes(userUUID!);
    const { data } = await getArticles({ limit, offset });
    articles = data;
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    } else {
      redirect('/articles');
    }
  }

  return (
    <ul className={styles.rootPageContainer}>
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
