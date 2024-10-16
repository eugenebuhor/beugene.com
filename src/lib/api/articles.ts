import type { Article } from '@prisma/client';

// Articles

export async function getArticles(params?: {
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<Article[]> {
  const queryParams = new URLSearchParams();

  if (params?.q) queryParams.append('q', params.q);
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());

  const res = await fetch(`/api/articles?${queryParams.toString()}`, {
    method: 'GET',
    next: { revalidate: 300 }, // 5 minutes
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch articles');
  }

  return await res.json();
}

// Article by Slug

export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`/api/articles/${slug}`, {
    method: 'GET',
    next: { revalidate: 300 }, // 5 minutes
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch article');
  }

  return await res.json();
}

// Article Likes

export async function getArticleLikes(slug: string): Promise<number> {
  const res = await fetch(`/api/articles/${slug}/likes`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch article likes');
  }

  const data = await res.json();
  return data.likes;
}

export async function incrementArticleLikes(slug: string): Promise<Article> {
  const res = await fetch(`/api/articles/${slug}/likes`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to increment article likes');
  }

  return await res.json();
}

// Article Views

export async function getArticleViews(slug: string): Promise<number> {
  const res = await fetch(`/api/articles/${slug}/views`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch article views');
  }

  const data = await res.json();
  return data.views;
}

export async function incrementArticleViews(slug: string): Promise<Article> {
  const res = await fetch(`/api/articles/${slug}/views`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to increment article views');
  }

  return await res.json();
}
