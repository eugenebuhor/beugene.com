import Link from 'next/link';
import Article from '@/ui/articles/[slug]/Article';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import Typography from '@/ui/common/Typography';
import RelatedArticles from '@/ui/articles/[slug]/RelatedArticles';
import type { SearchParams as ArticlePageSearchParams } from '@/app/articles/page';
import styles from '@/ui/articles/[slug]/Article.module.css';

type Params = {
  slug: string;
};

type SearchParams = ArticlePageSearchParams;

type ArticleSlugPageProps = {
  params: Params;
  searchParams: SearchParams;
};

const ArticleSlugPage = async ({ params, searchParams }: ArticleSlugPageProps) => {
  const stringSearchParams = stringifyQueryString(parseSearchParams(searchParams));

  const backToArticlesLink = stringSearchParams
    ? `/articles?${stringSearchParams}#${params.slug}`
    : `/articles#${params.slug}`;

  return (
    <div>
      <Link href={backToArticlesLink} className={styles.backLink} prefetch>
        <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
      </Link>
      <Article slug={params.slug} />
      <RelatedArticles slug={params.slug} />
    </div>
  );
};

export default ArticleSlugPage;
