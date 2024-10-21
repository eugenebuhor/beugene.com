'use client';

import type { ReactNode, ComponentProps, CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavLink.module.css';
import { ThemePaletteKey } from '@/ui/theme';

export interface NavLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  color?: ThemePaletteKey;
  className?: string;
}

const NavLink = ({ children, className, style, color = 'link', ...rest }: NavLinkProps) => {
  const combinedStyle: CSSProperties = {
    color: color ? `var(--color-${color})` : undefined,
    ...style,
  };

  return (
    <Link className={clsx(styles.link, className)} style={combinedStyle} {...rest}>
      {children}
    </Link>
  );
};

export default NavLink;
