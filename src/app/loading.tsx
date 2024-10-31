import { ArticleCardSkeleton } from '@/ui/articles/ArticleSkeletons';
import Divider from '@/ui/common/Divider';

const Loading = () => {
  return (
    <>
      <ArticleCardSkeleton />
      <Divider role="separator" margin="32px 0" />
      <ArticleCardSkeleton />
    </>
  );
};

export default Loading;
