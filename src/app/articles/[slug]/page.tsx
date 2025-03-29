import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/articles';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import Article from '@/ui/articles/[slug]/Article';
import Typography from '@/ui/common/Typography';
import RelatedArticles from '@/ui/articles/[slug]/RelatedArticles';
import type { SearchParams as ArticlePageSearchParams } from '@/app/articles/page';
import styles from '@/ui/articles/[slug]/Article.module.css';

export const revalidate = 60; // every 60 seconds

export async function generateStaticParams() {
  const { data } = await getArticles({
    limit: 100,
    offset: 0,
    select: {
      slug: true,
    },
  });

  return data.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: ArticleSlugPageProps): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticleBySlug({
    slug: params.slug,
    select: {
      title: true,
      summary: true,
      metaTitle: true,
      metaDescription: true,
      publishedAt: true,
      tags: true,
    },
  });

  if (!article) {
    return {};
  }

  return {
    title: `${article.title || article.metaTitle} | Yevhenii Buhor | Web Development Insights`,
    description: article.metaDescription || article.summary || 'Read more about this article.',
    openGraph: {
      title: `${article.title || article.metaTitle} | Yevhenii Buhor | Web Development Insights`,
      description: article.metaDescription || article.summary || 'Read more about this article.',
      url: `https://beugene.com/articles/${params.slug}`,
      type: 'article',
      publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : '',
      tags: article.tags.map((tag) => tag.name),
      siteName: 'Yevhenii Buhor | Web Development Insights',
      images: [
        {
          url: article.coverImageUrl || `https://beugene.com/default-og-image.png`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title || article.metaTitle} | Yevhenii Buhor | Web Development Insights`,
      description: article.metaDescription || article.summary || 'Read more about this article.',
      images: article.coverImageUrl || `https://beugene.com/default-og-image.png`,
    },
    alternates: {
      canonical: `https://beugene.com/articles/${params.slug}`,
    },
  };
}

type Params = {
  slug: string;
};

type SearchParams = ArticlePageSearchParams;

type ArticleSlugPageProps = {
  params: Params;
  searchParams: SearchParams;
};

const ArticleSlugPage = async (props: ArticleSlugPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
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
    <>
      <nav aria-label="breadcrumb">
        <Link href={backToArticlesLink} className={styles.backLink} prefetch>
          <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
        </Link>
      </nav>
      <br />
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
    </>
  );
};

export default ArticleSlugPage;
