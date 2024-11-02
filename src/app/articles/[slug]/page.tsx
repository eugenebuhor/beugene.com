import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/articles';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import Article from '@/ui/articles/[slug]/Article';
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
  const article = await getArticleBySlug({
    slug: params.slug,
    select: {
      id: true,
      title: true,
      content: true,
      timeToRead: true,
      publishedAt: true,
      tags: true,
    },
  });

  if (!article) {
    notFound();
  }

  const stringSearchParams = stringifyQueryString(parseSearchParams(searchParams));

  const backToArticlesLink = stringSearchParams
    ? `/articles?${stringSearchParams}#${params.slug}`
    : `/articles#${params.slug}`;

  return (
    <div>
      <Link href={backToArticlesLink} className={styles.backLink} prefetch>
        <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
      </Link>
      <Article
        id={article.id}
        title={article.title}
        content={article.content}
        timeToRead={article.timeToRead}
        publishedAt={article.publishedAt}
        tags={article.tags}
        slug={params.slug}
      />
      <RelatedArticles slug={params.slug} />
    </div>
  );
};

export default ArticleSlugPage;
