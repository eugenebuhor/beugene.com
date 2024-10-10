import React from 'react';
import clsx from 'clsx';
import styles from './Flex.module.css';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  display?: 'flex' | 'inline-flex';
  flexDirection?: 'row' | 'column';
  alignContent?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  flexWrap?: 'nowrap' | 'wrap';
  gap?: string | number;
  flex?: string | number;
  style?: React.CSSProperties;
  component?: React.ElementType;
}

const Flex: React.FC<FlexProps> = ({
  component: Component = 'div',
  display = 'flex',
  flexDirection = 'row',
  flexWrap = 'nowrap',
  alignItems,
  alignContent,
  justifyContent,
  gap,
  flex,
  style = {},
  className,
  children,
  ...rest
}) => {
  const classes = clsx(
    {
      [styles[`display-${display}`]]: display,
      [styles[`flexDirection-${flexDirection}`]]: flexDirection,
      [styles[`flexWrap-${flexWrap}`]]: flexWrap,
      [styles[`alignItems-${alignItems}`]]: alignItems,
      [styles[`alignContent-${alignContent}`]]: alignContent,
      [styles[`justifyContent-${justifyContent}`]]: justifyContent,
    },
    className,
  );

  if (gap || gap === 0) {
    style.gap = gap;
  }

  if (flex || flex === 0) {
    style.flex = gap;
  }

  return (
    <Component className={classes} style={style} {...rest}>
      {children}
    </Component>
  );
};

export default Flex;
