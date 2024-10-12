'use client';

import type { ReactNode, ComponentProps } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './NavLink.module.css';

export interface NavLinkProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  className?: string;
}

function NavLink({ children, className, ...rest }: NavLinkProps) {
  return (
    <Link className={clsx(styles.link, className)} {...rest}>
      {children}
    </Link>
  );
}

export default NavLink;
