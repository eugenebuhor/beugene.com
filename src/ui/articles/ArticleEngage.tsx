'use client';

import type { Article } from '@prisma/client';
import { debounce } from 'lodash';
import { IoHeartOutline, IoShareOutline } from 'react-icons/io5';
import Flex from '@/ui/common/Flex';
import Button from '@/ui/common/Button';
import Typography from '@/ui/common/Typography';
import { toggleArticleLike } from '@/app/actions/articles';
import { copyToClipboard } from '@/utils/copyToClipboard';

type ArticleEngageProps = {
  slug: Article['slug'];
  likes: Article['likes'];
};

const ArticleEngage = ({ likes, slug }: ArticleEngageProps) => {
  const onToggleArticleLike = debounce(async (articleSlug: string) => {
    await toggleArticleLike(articleSlug);
  }, 500);

  const onShareArticle = debounce(async (articleSlug: string) => {
    const articleUrl = `${window.location.origin}/articles/${articleSlug}`;
    await copyToClipboard(articleUrl);
  }, 500);

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center">
        <Button
          size="small"
          variant="icon"
          onClick={() => onToggleArticleLike(slug)}
          aria-label="like-article"
        >
          <IoHeartOutline color="var(--color-text-secondary)" />
        </Button>
        <Typography variant="body1" color="text-secondary" fontFamily="subtitle">
          &nbsp;{likes}
        </Typography>
      </Flex>

      <Button
        size="small"
        variant="icon-outlined"
        onClick={() => onShareArticle(slug)}
        aria-label="share-article"
      >
        <IoShareOutline color="var(--color-text-secondary)" />
      </Button>
    </Flex>
  );
};

export default ArticleEngage;
