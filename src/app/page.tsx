import { getArticles } from '@/lib/articles';
import ArticleCardsList from '@/ui/articles/ArticleCardsList';
import { getUserLikes, getUserUUID } from '@/lib/users';

export const revalidate = 300; // 5 minutes

const Home = async () => {
  const limit = 5;
  const offset = 0;

  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const { data: articles } = await getArticles({ limit, offset });

  return <ArticleCardsList articles={articles} userLikes={userLikes} />;
};

export default Home;
