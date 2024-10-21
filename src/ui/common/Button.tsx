'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  variant?: 'outlined' | 'contained' | 'text' | 'icon';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  bubbling?: boolean;
  fullWidth?: boolean;
};

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
      >
        {children}
      </button>
    );
  },
);

export default Button;
