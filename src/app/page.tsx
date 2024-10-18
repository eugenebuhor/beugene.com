import { LayoutSection, LayoutSectionContent } from '@/ui/common/Layouts';
import ArticlesList from '@/ui/articles/ArticlesList';

export const revalidate = 300; // 5 minutes

const Home = () => {
  return (
    <LayoutSection>
      <LayoutSectionContent>
        <ArticlesList page={1} limit={5} />
      </LayoutSectionContent>
    </LayoutSection>
  );
};

export default Home;
