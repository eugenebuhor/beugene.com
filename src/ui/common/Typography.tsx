import type { ElementType, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';
import type {
  ThemePaletteKey,
  TypographyFamily,
  TypographyVariant,
  TypographyWeight,
} from '@/ui/theme';
import type { PolymorphicComponentProps } from '@/types/react';

export type TypographyProps<C extends ElementType = 'span'> = PolymorphicComponentProps<
  C,
  {
    variant?: TypographyVariant;
    weight?: TypographyWeight;
    fontFamily?: TypographyFamily;
    color?: ThemePaletteKey;
    trim?: boolean | number;
    noWrap?: boolean;
    wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
    lineHeight?: string | number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    verticalAlign?: 'top' | 'middle' | 'baseline';
    component?: ElementType;
    className?: string;
    style?: CSSProperties;
  }
>;

const Typography = <C extends ElementType = 'span'>({
  component,
  variant = 'body1',
  fontFamily,
  weight,
  color,
  trim = false,
  noWrap,
  wordBreak,
  lineHeight,
  verticalAlign,
  textAlign,
  textTransform,
  className = '',
  children,
  style = {},
  ...rest
}: TypographyProps<C>) => {
  let Component = component || ('span' as ElementType);

  if (
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6'
  ) {
    Component = (Component ?? variant) as ElementType;
  }

  const classes = clsx(
    styles.typography,
    styles[variant],
    weight && styles[`fontWeight-${weight}`],
    fontFamily && styles[`fontFamily-${fontFamily}`],
    textAlign && styles[`textAlign-${textAlign}`],
    textTransform && styles[`textTransform-${textTransform}`],
    verticalAlign && styles[`verticalAlign-${verticalAlign}`],
    noWrap && styles.noWrap,
    trim && styles.trim,
    wordBreak && styles[`wordBreak-${wordBreak}`],
    className,
  );

  const combinedStyle: CSSProperties = {
    ...(trim ? { WebkitLineClamp: Number(trim) } : {}),
    color: color ? `var(--color-${color})` : undefined,
    lineHeight,
    ...style,
  };

  return (
    <Component className={classes} style={combinedStyle} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
