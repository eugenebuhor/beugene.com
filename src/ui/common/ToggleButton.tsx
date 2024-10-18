'use client';

import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from '@/ui/common/ToggleButton.module.css';

export type ToggleButtonProps = {
  value: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange' | 'disabled' | 'children'>;

const ToggleButton = ({
  value,
  selected,
  onChange,
  disabled = false,
  children,
  className = '',
  ...rest
}: ToggleButtonProps) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.toggleButton} ${selected ? styles.selected : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={selected}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
