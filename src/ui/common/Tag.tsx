import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button, Typography } from '@/ui/common';
import styles from './Tag.module.css';

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ name, className, onClick, link, size = 'small', selected, ...rest }, ref) => {
    const button = (
      <Button
        className={clsx(selected && styles.selected, className)}
        size={size}
        tabIndex={-1}
        onClick={onClick}
        ref={ref}
      >
        <Typography variant="body2" color="text-secondary" fontFamily="subtitle">
          {name}
        </Typography>
      </Button>
    );

    return link ? (
      <Link className={clsx(styles.link, className)} href={link}>
        {button}
      </Link>
    ) : (
      button
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
