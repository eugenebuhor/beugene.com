import ArticleCard from '@/ui/articles/ArticleCard';
import MarkdownRenderer from '@/ui/common/MarkdownRenderer';
import { getArticleBySlug } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';

type Params = {
  slug: string;
};

type ArticlePageProps = {
  params: Params;
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const article = await getArticleBySlug(params.slug);
  const isLiked = userLikes.some((like) => article.id === like.articleId);

  return (
    <ArticleCard article={article} isLiked={isLiked}>
      <MarkdownRenderer content={article.content} />
    </ArticleCard>
  );
};

export default ArticlePage;
