import ArticleCardsList from '@/ui/articles/ArticleCardsList';
import { LayoutSection, LayoutSectionContent } from '@/ui/common/Layouts';
import { parseSearchParams } from '@/utils/query-string';
import { getArticles } from '@/lib/articles';

type SearchParams = {
  page?: string;
  limit?: string;
  q?: string;
  tags?: string[];
};

type ArticlesPageProps = {
  searchParams: Promise<SearchParams>;
};

const ArticlesPage = async (props: ArticlesPageProps) => {
  const searchParams = await props.searchParams;
  const parsedParams = parseSearchParams<SearchParams>(searchParams);
  const page = parseInt(parsedParams.page || '1', 10);
  const limit = parseInt(parsedParams.limit || '5', 10);
  const q = parsedParams.q || '';
  const tags = parsedParams.tags || [];

  const offset = (page - 1) * limit;

  const { data: articles, total } = await getArticles({ limit, offset, q, tags });

  const totalPages = Math.ceil(total / limit);

  return (
    <LayoutSection>
      <LayoutSectionContent>
        <ArticleCardsList
          articles={articles}
          withPagination
          totalPages={totalPages}
          currentPage={page}
        />
      </LayoutSectionContent>
    </LayoutSection>
  );
};

export default ArticlesPage;
