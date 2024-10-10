import React from 'react';
import clsx from 'clsx';
import styles from '@/ui/common/Layouts.module.css';
import Flex from '@/ui/common/Flex';

/* LayoutMain */
type LayoutMainProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export const LayoutMain: React.FC<LayoutMainProps> = ({ children, className }) => {
  return (
    <Flex component="main" flexDirection="column" className={clsx(styles.layoutMain, className)}>
      {children}
    </Flex>
  );
};

/* LayoutSection */
type LayoutSectionProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export const LayoutSection: React.FC<LayoutSectionProps> = ({ children, className }) => {
  return (
    <Flex
      component="section"
      justifyContent="center"
      className={clsx(styles.layoutSection, className)}
    >
      {children}
    </Flex>
  );
};

/* LayoutContent */
type LayoutContentProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export const LayoutContent: React.FC<LayoutContentProps> = ({ children, className }) => {
  return (
    <Flex
      component="div"
      flexDirection="row"
      justifyContent="flex-start"
      className={clsx(styles.layoutContent, className)}
    >
      {children}
    </Flex>
  );
};
