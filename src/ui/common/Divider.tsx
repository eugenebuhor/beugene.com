import { CSSProperties, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Divider.module.css';
import type { ThemePaletteKey } from '@/ui/theme';

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  color?: ThemePaletteKey;
  thickness?: CSSProperties['width'];
  margin?: CSSProperties['margin'];
  length?: CSSProperties['width'];
  style?: CSSProperties;
  variant?: 'solid' | 'dashed' | 'dotted';
} & HTMLAttributes<HTMLElement>;

const Divider = ({
  orientation = 'horizontal',
  className,
  color = 'border-light',
  thickness = '1px',
  margin = '16px 0',
  length = '100%',
  style = {},
  variant = 'solid',
  ...rest
}: DividerProps) => {
  const classes = clsx(
    styles.divider,
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    styles[variant],
    className,
  );

  const combinedStyle: CSSProperties = {
    backgroundColor: color ? `var(--color-${color})` : undefined,
    ...(orientation === 'horizontal'
      ? { height: thickness, width: length }
      : { width: thickness, height: length }),
    margin,
    ...style,
  };

  return <div className={classes} style={combinedStyle} aria-hidden="true" {...rest} />;
};

export default Divider;
