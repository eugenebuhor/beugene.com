'use client';

import type { Article } from '@prisma/client';
import { debounce } from 'lodash';
import { useState } from 'react';
import Typography from '@/ui/common/Typography';
import ButtonLike from '@/ui/common/ButtonLike';
import { toggleArticleLike } from '@/app/actions/articles';
import styles from '@/ui/articles/ArticleLikes.module.css';

type ArticleLikesProps = {
  slug: Article['slug'];
  likes: Article['likes'];
  isLiked: boolean;
};

const ArticleLikes = ({
  likes: initialLikes,
  isLiked: initialIsLiked,
  slug,
}: ArticleLikesProps) => {
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
  }, 300);

  return (
    <div className={styles.container}>
      <ButtonLike isLiked={isLiked} onClick={onToggleArticleLike} />
      <Typography variant="body1" color="text-secondary" fontFamily="subtitle">
        &nbsp;{likes || ''}
      </Typography>
    </div>
  );
};

export default ArticleLikes;
