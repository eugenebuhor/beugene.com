'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import styles from './ReadingProgress.module.css';

interface ReadingProgressProps {
  containerRef?: RefObject<HTMLElement | null>;
}

const ReadingProgress = ({ containerRef }: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateScroll = () => {
      let scrollPercentage;

      if (containerRef?.current) {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const visibleHeight = window.innerHeight;
        const containerHeight = container.scrollHeight;

        const containerTop = containerRect.top;
        const hiddenTop = Math.max(0, -containerTop);
        const visibleAmount = Math.min(
          visibleHeight,
          containerRect.height,
          containerHeight - hiddenTop,
        );

        // calculate percentage based on how much of the container has been scrolled past
        scrollPercentage = (hiddenTop / (containerHeight - visibleAmount)) * 100;
      } else {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        scrollPercentage = (scrollTop / documentHeight) * 100;
      }

      setProgress(scrollPercentage);
      setIsVisible(true);
    };

    // Calculate on mount
    calculateScroll();

    // Add event listeners
    window.addEventListener('scroll', calculateScroll);
    window.addEventListener('resize', calculateScroll);

    return () => {
      window.removeEventListener('scroll', calculateScroll);
      window.removeEventListener('resize', calculateScroll);
    };
  }, [containerRef]);

  const roundedProgress = Math.min(Math.round(progress), 100);

  return (
    <div className={`${styles.container} ${isVisible ? styles.visible : ''}`} aria-hidden="true">
      <div
        className={styles.progressBar}
        style={{ width: `${roundedProgress}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedProgress}
      />
    </div>
  );
};

export default ReadingProgress;
