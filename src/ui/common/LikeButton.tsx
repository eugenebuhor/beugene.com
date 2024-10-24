'use client';

import { useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import Button from '@/ui/common/Button';
import styles from './LikeButton.module.css';

type LikeButtonProps = {
  isLiked: boolean;
  onClick: () => void;
};

const LikeButton = ({ isLiked, onClick }: LikeButtonProps) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 300);

    onClick();
  };

  return (
    <Button
      variant="icon"
      size="medium"
      className={animating ? styles.animateLike : ''}
      onClick={handleClick}
      aria-label="like-button"
      aria-pressed={isLiked}
    >
      {isLiked ? (
        <IoHeart className={`${styles.likeIcon} ${styles.liked}`} />
      ) : (
        <IoHeartOutline className={styles.likeIcon} />
      )}
    </Button>
  );
};

export default LikeButton;
