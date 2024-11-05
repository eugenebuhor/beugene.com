import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { url: `https://${process.env.VERCEL_URL}/`, lastModified: new Date().toISOString() },
    { url: `https://${process.env.VERCEL_URL}/articles`, lastModified: new Date().toISOString() },
    { url: `https://${process.env.VERCEL_URL}/about`, lastModified: new Date().toISOString() },
  ];

  const fetchArticles = async () => {
    const { data: articles } = await getArticles({
      offset: 0,
      limit: 100,
      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },
    });

    return articles.map(({ slug, publishedAt, updatedAt }) => ({
      url: `https://${process.env.VERCEL_URL}/articles/${slug}`,
      lastModified: publishedAt || updatedAt,
    }));
  };

  const dynamicPaths = await fetchArticles();

  return [...staticPaths, ...dynamicPaths];
}
