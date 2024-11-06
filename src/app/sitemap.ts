import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { url: `https://beugene.com/`, lastModified: new Date().toISOString() },
    { url: `https://beugene.com/articles`, lastModified: new Date().toISOString() },
    { url: `https://beugene.com/about`, lastModified: new Date().toISOString() },
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
      url: `https://beugene.com/articles/${slug}`,
      lastModified: publishedAt || updatedAt,
    }));
  };

  const dynamicPaths = await fetchArticles();

  return [...staticPaths, ...dynamicPaths];
}
