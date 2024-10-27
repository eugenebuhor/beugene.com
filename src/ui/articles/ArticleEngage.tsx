'use client';

import type { Article } from '@prisma/client';
import { debounce } from 'lodash';
import { useState } from 'react';
import Flex from '@/ui/common/Flex';
import Typography from '@/ui/common/Typography';
import LikeButton from '@/ui/common/LikeButton';
import { toggleArticleLike } from '@/app/actions/articles';

type ArticleEngageProps = {
  slug: Article['slug'];
  likes: Article['likes'];
  isLiked: boolean;
};

const ArticleEngage = ({
  likes: initialLikes,
  isLiked: initialIsLiked,
  slug,
}: ArticleEngageProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);

  const onToggleArticleLike = debounce(async () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }

    try {
      await toggleArticleLike(slug);
    } catch (error) {
      setLikes(initialLikes);
      setIsLiked(initialIsLiked);
    }
  }, 50);

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center">
        <LikeButton isLiked={isLiked} onClick={onToggleArticleLike} />
        <Typography variant="subtitle1" color="text-secondary" fontFamily="subtitle">
          &nbsp;{likes || ''}
        </Typography>
      </Flex>
    </Flex>
  );
};

export default ArticleEngage;
