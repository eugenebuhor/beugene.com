'use client';

import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import type { ThemePaletteKey } from '@/ui/theme';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | ThemePaletteKey;
  variant?: 'outlined' | 'contained' | 'text' | 'icon' | 'icon-outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  bubbling?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'contained',
      size = 'medium',
      disabled = false,
      onClick,
      type = 'button',
      className,
      bubbling = true,
      fullWidth = false,
      ...rest
    },
    ref,
  ) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (!bubbling) {
        event.stopPropagation();
      }
      if (onClick) {
        onClick(event);
      }
    };

    const buttonClass = clsx(styles.button, styles[variant], styles[size], className, {
      [styles.disabled]: disabled,
      [styles.fullWidth]: fullWidth,
    });

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClass}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default Button;
