import { HTMLAttributes, ElementType, CSSProperties, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';
import type {
  ThemePaletteKey,
  TypographyFamily,
  TypographyVariant,
  TypographyWeight,
} from '@/ui/theme';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  fontFamily?: TypographyFamily;
  color?: ThemePaletteKey;
  trim?: boolean | number;
  noWrap?: boolean;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  lineHeight?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontStyle?: 'normal' | 'italic';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  verticalAlign?: 'top' | 'middle' | 'baseline';
  component?: ElementType;
  className?: string;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      component: Component = 'span',
      variant = 'body1',
      fontFamily,
      weight,
      color,
      trim = false,
      noWrap,
      wordBreak,
      lineHeight,
      fontStyle,
      verticalAlign,
      textAlign,
      textTransform,
      className = '',
      children,
      style = {},
      ...rest
    },
    ref,
  ) => {
    const classes = clsx(
      styles.typography, // Apply base typography styles
      styles[variant],
      weight && styles[`fontWeight-${weight}`],
      fontFamily && styles[`fontFamily-${fontFamily}`],
      textAlign && styles[`textAlign-${textAlign}`],
      textTransform && styles[`textTransform-${textTransform}`],
      verticalAlign && styles[`verticalAlign-${verticalAlign}`],
      noWrap && styles.noWrap,
      trim && styles.trim,
      wordBreak && styles[`wordBreak-${wordBreak}`],
      fontStyle && styles[`fontStyle-${fontStyle}`],
      className,
    );

    const combinedStyle: CSSProperties = {
      ...(trim ? { WebkitLineClamp: Number(trim) } : {}),
      color: color ? `var(--color-${color})` : undefined,
      lineHeight,
      ...style,
    };

    return (
      <Component className={classes} style={combinedStyle} {...rest} ref={ref}>
        {children}
      </Component>
    );
  },
);

export default Typography;
