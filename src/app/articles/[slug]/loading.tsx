import { ArticleSkeleton } from '@/ui/articles/[slug]/Article';
import Skeleton from '@/ui/common/Skeleton';

const ArticleSlugPageLoading = () => {
  return (
    <>
      <Skeleton width="20%" height="1.5rem" />
      <br />
      <ArticleSkeleton />
    </>
  );
};

export default ArticleSlugPageLoading;
