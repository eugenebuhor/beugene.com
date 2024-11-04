'use client';

import { type CSSProperties, useState, useEffect, useRef } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
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
        <AiFillHeart className={`${styles.likeIcon} ${styles.liked}`} />
      ) : (
        <AiOutlineHeart className={styles.likeIcon} />
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
