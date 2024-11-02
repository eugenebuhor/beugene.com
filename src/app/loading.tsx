import { ArticleCardSkeleton } from '@/ui/articles/ArticleCard';
import Divider from '@/ui/common/Divider';

const HomePageLoading = () => {
  return (
    <>
      <ArticleCardSkeleton />
      <Divider role="separator" margin="32px 0" />
      <ArticleCardSkeleton />
    </>
  );
};

export default HomePageLoading;
