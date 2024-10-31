import { type HTMLAttributes, type CSSProperties, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: number | string;
  height?: number | string;
  animation?: 'wave' | 'pulse' | 'none';
  style?: CSSProperties;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, animation = 'wave', style, className, ...rest }, ref) => {
    const skeletonStyles: CSSProperties = {
      width,
      height,
      ...style,
    };

    const classes = clsx(
      styles.skeleton,
      styles[variant],
      animation !== 'none' && styles[animation],
      className,
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={skeletonStyles}
        aria-busy="true"
        aria-live="polite"
        {...rest}
      ></div>
    );
  },
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
