'use client';

import styles from '@/ui/common/ToggleButton.module.css';
import Button from '@/ui/common/Button';
import type { ButtonProps } from '@/ui/common/Button';

export interface ToggleButtonProps extends Omit<ButtonProps, 'value' | 'onChange'> {
  value: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

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
    <Button
      type="button"
      className={`${styles.toggleButton} ${selected ? styles.selected : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={selected}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ToggleButton;
