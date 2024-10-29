'use client';

import { type CSSProperties, useState, useEffect, useRef } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import Button from '@/ui/common/Button';
import styles from './ButtonLike.module.css';

type ButtonLikeProps = {
  isLiked: boolean;
  onClick: () => void;
};

const ButtonLike = ({ isLiked, onClick }: ButtonLikeProps) => {
  const [animating, setAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const prevIsLiked = useRef(isLiked);

  useEffect(() => {
    if (isLiked !== prevIsLiked.current) {
      setAnimating(true);

      if (isLiked) {
        setShowParticles(true);
      } else {
        setShowParticles(false);
      }

      const timeout = setTimeout(() => {
        setAnimating(false);
      }, 600);

      prevIsLiked.current = isLiked;
      return () => clearTimeout(timeout);
    }
  }, [isLiked]);

  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      variant="icon"
      size="medium"
      className={`${styles.likeButton} ${animating ? styles.animateLike : ''}`}
      onClick={handleClick}
      aria-label={isLiked ? 'Unlike' : 'Like'}
      aria-pressed={isLiked}
    >
      {isLiked ? (
        <IoHeart className={`${styles.likeIcon} ${styles.liked}`} />
      ) : (
        <IoHeartOutline className={styles.likeIcon} />
      )}
      {animating && showParticles && (
        <span className={styles.particles}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{ '--angle': `${i * 72}deg` } as CSSProperties}
            />
          ))}
        </span>
      )}
    </Button>
  );
};

export default ButtonLike;
