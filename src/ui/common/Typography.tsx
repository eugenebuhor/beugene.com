import React from 'react';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

export type TypographyWeight = 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'black';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  weight?: TypographyWeight;
  trim?: boolean | number;
  noWrap?: boolean;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  lineHeight?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  component?: React.ElementType;
}

const Typography: React.FC<TypographyProps> = ({
  component: Component = 'span',
  variant = 'body1',
  weight,
  color = 'inherit',
  trim = false,
  noWrap,
  wordBreak = 'normal',
  lineHeight,
  textAlign = 'left',
  textTransform = 'none',
  children,
  style = {},
  onClick,
  ...rest
}) => {
  const classes = clsx({
    [styles[variant]]: true,
    [styles[`fontWeight-${weight}`]]: weight,
    [styles[`textAlign-${textAlign}`]]: textAlign,
    [styles[`textTransform-${textTransform}`]]: textTransform,
    [styles.noWrap]: noWrap,
    [styles.trim]: Boolean(trim),
    [styles[`wordBreak-${wordBreak}`]]: wordBreak,
    [styles.clickable]: Boolean(onClick),
  });

  if (trim) {
    style.WebkitLineClamp = Number(trim);
  }

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
