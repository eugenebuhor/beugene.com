import { HTMLAttributes, CSSProperties, ElementType, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Flex.module.css';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
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
  style?: CSSProperties;
  component?: ElementType;
  className?: string;
}

const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      component: Component = 'div',
      display = 'flex',
      flexDirection = 'row',
      flexWrap,
      alignItems,
      alignContent,
      justifyContent,
      gap,
      flex,
      style = {},
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = clsx(
      styles[`display-${display}`],
      styles[`flexDirection-${flexDirection}`],
      styles[`flexWrap-${flexWrap}`],
      alignItems && styles[`alignItems-${alignItems}`],
      alignContent && styles[`alignContent-${alignContent}`],
      justifyContent && styles[`justifyContent-${justifyContent}`],
      className,
    );

    const combinedStyle: CSSProperties = {
      gap,
      flex,
      ...style,
    };

    return (
      <Component className={classes} style={combinedStyle} ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

export default Flex;
