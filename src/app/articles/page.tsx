import { getArticles } from '@/lib/articles';
import { getTopTags } from '@/lib/tags';
import ArticleCard from '@/ui/articles/ArticleCard';
import ArticlesSearch from '@/ui/articles/ArticlesSearch';
import styles from '@/app/articles/page.module.css';
import { Typography, PaginationControls, Divider } from '@/ui/common';
import {
  normalizeSearchParams,
  stringifyArticlesSearchParams,
} from '@/ui/articles/utils/articlesSearch';

export type ArticlesSearchParams = {
  page?: string;
  limit?: string;
  q?: string;
  tags?: string[];
};

export const revalidate = 300; // 5 minutes
export const generateMetadata = async (props: ArticlesPageProps) => {
  const searchParams = await props.searchParams;
  const { page } = normalizeSearchParams(searchParams);

  return {
    title: `Articles - Page ${page} | Yevhenii Buhor | Web Development Insights`,
    description: `Browse page ${page} of articles by Yevhenii Buhor on web development and technology.`,
  };
};

export type SearchParams = {
  page?: string;
  limit?: string;
  q?: string;
  tags?: string[];
};

type ArticlesPageProps = {
  searchParams: Promise<SearchParams>;
};

const ArticlesPage = async (props: ArticlesPageProps) => {
  const searchParams = normalizeSearchParams(await props.searchParams);
  const page = Number(searchParams.page);
  const limit = Number(searchParams.limit);
  const { q, tags } = searchParams;

  const topTags = await getTopTags(5);
  const { data: articles, total } = await getArticles({
    limit,
    offset: (page - 1) * limit,
    q,
    tags,
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      timeToRead: true,
      publishedAt: true,
      tags: true,
    },
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <ArticlesSearch
        className={styles.searchBox}
        tags={topTags}
        initialQuery={q}
        initialInputTags={tags}
      />

      {articles.length === 0 ? (
        <Typography className={styles.noResults}>No articles found.</Typography>
      ) : (
        <ul className={styles.container}>
          {articles.map((article, index) => (
            <li key={article.id} id={article.slug}>
              <ArticleCard
                id={article.id}
                slug={article.slug}
                title={article.title}
                summary={article.summary}
                timeToRead={article.timeToRead}
                publishedAt={article.publishedAt}
                tags={article.tags}
                articleLink={`/articles/${article.slug}?${stringifyArticlesSearchParams(searchParams) || '\u0020'}`}
              />
              {index === articles.length - 1 ? null : <Divider role="separator" margin="32px 0" />}
            </li>
          ))}

          {totalPages > 1 && (
            <PaginationControls
              className={styles.paginationControls}
              currentPage={page}
              totalPages={totalPages}
            />
          )}
        </ul>
      )}
    </>
  );
};

export default ArticlesPage;
