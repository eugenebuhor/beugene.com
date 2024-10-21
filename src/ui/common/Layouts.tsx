import React from 'react';
import clsx from 'clsx';
import styles from '@/ui/common/Layouts.module.css';
import Flex from '@/ui/common/Flex';
import type { FlexProps } from '@/ui/common/Flex';

/* LayoutMain */
type LayoutMainProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export function LayoutMain({ children, className, ...rest }: LayoutMainProps & FlexProps) {
  return (
    <Flex
      component="main"
      flexDirection="column"
      className={clsx(styles.layoutMain, className)}
      {...rest}
    >
      {children}
    </Flex>
  );
}

/* LayoutSection */
type LayoutSectionProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export function LayoutSection({ children, className, ...rest }: LayoutSectionProps & FlexProps) {
  return (
    <Flex
      component="section"
      justifyContent="center"
      className={clsx(styles.layoutSection, className)}
      {...rest}
    >
      {children}
    </Flex>
  );
}

/* LayoutContent */
type LayoutContentProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export function LayoutContent({ children, className, ...rest }: LayoutContentProps & FlexProps) {
  return (
    <Flex
      component="div"
      flexDirection="row"
      justifyContent="flex-start"
      className={clsx(styles.layoutContent, className)}
      {...rest}
    >
      {children}
    </Flex>
  );
}
