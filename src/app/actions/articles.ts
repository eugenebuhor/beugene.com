'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { ValidationError, NotFoundError /*, InternalError */ } from '@/lib/errors';

const LIKED_ARTICLES_COOKIE_KEY = 'liked_articles';
const VIEWED_ARTICLES_COOKIE_KEY = 'viewed_articles';
const MAX_LIKED_ARTICLES = 1000;
const MAX_VIEWED_ARTICLES = 1000;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 6 months

/**
 * Toggles the like status for an article and updates the cookies accordingly.
 *
 * @param slug - The slug of the article to like or unlike.
 * @returns Promise<void>
 * @throws ValidationError if slug validation fails.
 * @throws NotFoundError if no article found.
 // * @throws InternalError if database query fails.
 */
export async function toggleArticleLike(slug: string): Promise<void> {
  if (!slug) {
    throw new ValidationError('Slug is required');
  }

  const cookieStore = cookies();
  const likedArticlesCookie = cookieStore.get(LIKED_ARTICLES_COOKIE_KEY);
  let likedArticles: string[] = [];

  if (likedArticlesCookie?.value) {
    try {
      likedArticles = JSON.parse(likedArticlesCookie.value) as string[];
    } catch {
      likedArticles = [];
    }
  }

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    throw new NotFoundError('Article not found');
  }

  try {
    if (likedArticles.includes(slug)) {
      // Unlike the article
      await prisma.article.update({
        where: { slug },
        data: {
          likes: { decrement: 1 },
        },
      });

      likedArticles = likedArticles.filter((s) => s !== slug);
    } else {
      // Like the article
      await prisma.article.update({
        where: { slug },
        data: {
          likes: { increment: 1 },
        },
      });

      likedArticles.push(slug);

      // Limit the cookie value maximum size
      if (likedArticles.length > MAX_LIKED_ARTICLES) {
        likedArticles = likedArticles.slice(-MAX_LIKED_ARTICLES);
      }
    }

    // Update the cookie
    cookieStore.set(LIKED_ARTICLES_COOKIE_KEY, JSON.stringify(likedArticles), {
      httpOnly: true,
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: true,
    });
  } catch (error) {
    console.error('Error toggling article like:', error);
    // throw new InternalError('Failed to increment article views');
  }
}

/**
 * Increments the views for an article if it hasn't been viewed already.
 *
 * @param slug - The slug of the article to view.
 * @returns Promise<void>
 * @throws ValidationError if slug validation fails.
 * @throws NotFoundError if no article found.
 *  // * @throws InternalError if database query fails.
 */
export async function incrementArticleViews(slug: string): Promise<void> {
  if (!slug) {
    throw new ValidationError('Slug is required');
  }

  const cookieStore = cookies();
  const viewedArticlesCookie = cookieStore.get(VIEWED_ARTICLES_COOKIE_KEY);
  let viewedArticles: string[] = [];

  if (viewedArticlesCookie?.value) {
    try {
      viewedArticles = JSON.parse(viewedArticlesCookie.value) as string[];
    } catch {
      viewedArticles = [];
    }
  }

  if (viewedArticles.includes(slug)) {
    // Article has already been viewed; do nothing
    return;
  }

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article) {
    throw new NotFoundError('Article not found');
  }

  try {
    // Increment the article views
    await prisma.article.update({
      where: { slug },
      data: {
        views: { increment: 1 },
      },
    });

    viewedArticles.push(slug);

    // Limit the cookie value maximum size
    if (viewedArticles.length > MAX_VIEWED_ARTICLES) {
      viewedArticles = viewedArticles.slice(-MAX_VIEWED_ARTICLES);
    }

    // Update the cookie
    cookieStore.set(VIEWED_ARTICLES_COOKIE_KEY, JSON.stringify(viewedArticles), {
      httpOnly: true,
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: true,
    });
  } catch (error) {
    console.error('Error incrementing article views:', error);
    // throw new InternalError('Failed to increment article views');
  }
}
