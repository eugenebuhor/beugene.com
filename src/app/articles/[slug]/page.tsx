import ArticleCard from '@/ui/articles/ArticleCard';
import MarkdownRenderer from '@/ui/common/MarkdownRenderer';
import { getArticleBySlug } from '@/lib/articles';
import { getUserLikes, getUserUUID } from '@/lib/users';

type Params = {
  slug: string;
};

type ArticlePageProps = {
  params: Params;
};

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const userUUID = await getUserUUID();
  const userLikes = await getUserLikes(userUUID!); // fixme: fix this
  const article = await getArticleBySlug(params.slug);
  const isLiked = userLikes.some((like) => article.id === like.articleId);

  const mdx = `
  This is a [Next.js](https://nextjs.org) project bootstrapped with [\`create-next-app\`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`javascript
const a: number = 1;

console.log(a);
\`\`\`

\`\`\`jsx
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App';
ReactDOM.render(<App/>, document.getElementById('root'));
\`\`\`

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

This project uses [\`next/font\`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

  `;

  return (
    <ArticleCard article={article} isLiked={isLiked}>
      <MarkdownRenderer content={mdx} />
    </ArticleCard>
  );
};

export default ArticlePage;
