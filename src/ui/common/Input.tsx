import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      fullWidth = false,
      className,
      inputClassName,
      labelClassName,
      errorClassName,
      endAdornment = null,
      startAdornment = null,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx(styles.container, fullWidth && styles.fullWidth, className)}>
        {label && (
          <label className={clsx(styles.label, labelClassName)} htmlFor={props.id}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {startAdornment && <span className={styles.startAdornment}>{startAdornment}</span>}
          <input
            ref={ref}
            className={clsx(
              styles.input,
              error && styles.inputError,
              startAdornment && styles.hasStartAdornment,
              endAdornment && styles.hasEndAdornment,
              inputClassName,
            )}
            {...props}
          />
          {endAdornment && <span className={styles.endAdornment}>{endAdornment}</span>}
        </div>
        {error && <div className={clsx(styles.error, errorClassName)}>{error}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
