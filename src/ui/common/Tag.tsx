import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button, Typography } from '@/ui/common';
import styles from './Tag.module.css';

export interface TagProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  name: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  ({ name, className, onClick, link, size = 'small', selected, disabled, ...rest }, ref) => {
    const button = (
      <Button
        className={clsx(selected && styles.selected, disabled && styles.disabled, className)}
        size={size}
        tabIndex={-1}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        variant="outlined"
      >
        <Typography variant="body2" color="text-secondary" fontFamily="subtitle">
          {name}
        </Typography>
      </Button>
    );

    return link && !disabled ? (
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
