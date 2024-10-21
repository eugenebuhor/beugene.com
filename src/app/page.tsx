import { getArticles } from '@/lib/articles';
import ArticleCardsList from '@/ui/articles/ArticleCardsList';
import { LayoutSection, LayoutSectionContent } from '@/ui/common/Layouts';

export const revalidate = 300; // 5 minutes

const Home = async () => {
  const limit = 5;
  const offset = 0;

  const { data: articles } = await getArticles({ limit, offset });

  return (
    <LayoutSection>
      <LayoutSectionContent>
        <ArticleCardsList articles={articles} />
      </LayoutSectionContent>
    </LayoutSection>
  );
};

export default Home;
