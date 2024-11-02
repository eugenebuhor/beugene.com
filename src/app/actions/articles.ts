'use server';

import prisma from '@/lib/prisma';
import { createUserIfNotExists } from '@/app/actions/users';
import { InternalError } from '@/lib/errors';

/**
 * Toggles user's like for an article.
 */
export const toggleArticleLike = async (slug: string): Promise<void> => {
  try {
    const user = await createUserIfNotExists();

    if (!user) {
      return;
    }

    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return;
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        // eslint-disable-next-line camelcase
        userId_articleId: {
          userId: user.id,
          articleId: article.id,
        },
      },
    });

    if (existingLike) {
      // Unlike the article
      await prisma.$transaction([
        prisma.like.delete({
          where: { id: existingLike.id },
        }),
        prisma.article.update({
          where: { id: article.id },
          data: { likes: { decrement: 1 } },
        }),
      ]);
    } else {
      // Like the article
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId: user.id,
            articleId: article.id,
          },
        }),
        prisma.article.update({
          where: { id: article.id },
          data: { likes: { increment: 1 } },
        }),
      ]);
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new InternalError('Internal server error');
  }
};
