import { getArticles } from '@/lib/articles';
import ArticleCardsList from '@/ui/articles/ArticleCardsList';
import { LayoutSection, LayoutSectionContent } from '@/ui/common/Layouts';
import { getUserLikes, getUserUUID } from '@/lib/users';

export const revalidate = 300; // 5 minutes

const Home = async () => {
  const limit = 5;
  const offset = 0;

  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const { data: articles } = await getArticles({ limit, offset });

  return (
    <LayoutSection>
      <LayoutSectionContent>
        <ArticleCardsList articles={articles} userLikes={userLikes} />
      </LayoutSectionContent>
    </LayoutSection>
  );
};

export default Home;
