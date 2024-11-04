// prisma/seed.ts
/* eslint-disable @typescript-eslint/no-require-imports */
import { PrismaClient, ArticleStatus } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { calcTimeToRead } from '@/utils/calcTimeToRead';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  // Read the articles JSON file
  const articlesJsonPath = path.join(__dirname, '..', 'content', 'articles.json');
  const articlesJsonContent = fs.readFileSync(articlesJsonPath, 'utf8');
  const articles = JSON.parse(articlesJsonContent);

  for (const articleData of articles) {
    const { slug } = articleData;

    // Read the content from the corresponding .md file
    const mdFilePath = path.join(__dirname, '..', 'content', `${slug}.md`);
    if (!fs.existsSync(mdFilePath)) {
      console.error(`Markdown file not found: ${mdFilePath}`);
      continue;
    }
    const content = fs.readFileSync(mdFilePath, 'utf8');

    // Calculate timeToRead
    const timeToRead = calcTimeToRead(content);

    // Prepare the data for the article
    const {
      title,
      summary,
      coverImageUrl,
      status,
      likes,
      metaTitle,
      metaDescription,
      publishedAt,
      tags,
    } = articleData;

    // Map tags to Tag records
    const tagRecords = [];
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
        });
        if (!tag) {
          // Create the tag if it doesn't exist
          tag = await prisma.tag.create({
            data: { name: tagName },
          });
        }
        tagRecords.push({ id: tag.id });
      }
    }

    // Check if the article already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    });

    if (existingArticle) {
      // Update the existing article
      await prisma.article.update({
        where: { slug },
        data: {
          title,
          summary,
          coverImageUrl,
          status: status || ArticleStatus.DRAFT,
          likes: likes || 0,
          metaTitle,
          metaDescription,
          publishedAt: publishedAt ? new Date(publishedAt) : undefined,
          content,
          timeToRead,
          tags: {
            set: [], // Disconnect existing tags
            connect: tagRecords.map((tag) => ({ id: tag.id })),
          },
        },
      });
    } else {
      // Create a new article
      await prisma.article.create({
        data: {
          slug,
          title,
          summary,
          coverImageUrl,
          status: status || ArticleStatus.DRAFT,
          likes: likes || 0,
          metaTitle,
          metaDescription,
          publishedAt: publishedAt ? new Date(publishedAt) : undefined,
          content,
          timeToRead,
          tags: {
            connect: tagRecords.map((tag) => ({ id: tag.id })),
          },
        },
      });
    }

    console.log(
      `Article "${slug}" has been ${existingArticle ? 'updated' : 'created'} successfully.`,
    );
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
