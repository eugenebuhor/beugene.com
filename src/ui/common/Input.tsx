import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
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
        <input
          ref={ref}
          className={clsx(styles.input, error && styles.inputError, inputClassName)}
          {...props}
        />
        {error && <div className={clsx(styles.error, errorClassName)}>{error}</div>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
