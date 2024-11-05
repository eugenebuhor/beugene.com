import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { url: `${process.env.VERCEL_URL}/`, lastModified: new Date().toISOString() },
    { url: `${process.env.VERCEL_URL}/about`, lastModified: new Date().toISOString() },
  ];

  const fetchArticles = async () => {
    const { data: articles } = await getArticles({
      offset: 0,
      limit: 100,
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    return articles.map(({ slug, updatedAt }) => ({
      url: `${process.env.VERCEL_URL}/articles/${slug}`,
      lastModified: updatedAt,
    }));
  };

  const dynamicPaths = await fetchArticles();

  return [...staticPaths, ...dynamicPaths];
}
