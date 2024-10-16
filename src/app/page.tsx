import { getArticles } from '@/lib/api/articles';

export const revalidate = 300; // 5 minutes

async function Home() {
  const articles = await getArticles();

  return null;
}

export default Home;
