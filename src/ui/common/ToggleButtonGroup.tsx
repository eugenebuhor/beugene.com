'use client';

import type { ReactElement, HTMLAttributes, CSSProperties } from 'react';
import { Children, cloneElement, isValidElement, useRef } from 'react';
import clsx from 'clsx';
import styles from './ToggleButtonGroup.module.css';
import { ToggleButtonProps } from './ToggleButton';

type MultiSelectCallback = (value: string[]) => void;
type SingleSelectCallback = (value: string) => void;

type ToggleButtonGroupProps = {
  children: ReactElement<ToggleButtonProps>[];
  value: string | string[];
  onChange: MultiSelectCallback | SingleSelectCallback;
  multiSelect?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'>;

function ToggleButtonGroup({
  children,
  value,
  onChange,
  multiSelect = false,
  disabled = false,
  className,
  ...rest
}: ToggleButtonGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const handleChange = (childValue: string) => {
    if (multiSelect) {
      const multiOnChange = onChange as MultiSelectCallback;
      if (Array.isArray(value)) {
        if (value.includes(childValue)) {
          multiOnChange(value.filter((v) => v !== childValue));
        } else {
          multiOnChange([...value, childValue]);
        }
      } else {
        multiOnChange([childValue]);
      }
    } else {
      const singleOnChange = onChange as SingleSelectCallback;
      singleOnChange(childValue);
    }
  };

  return (
    <div className={clsx(styles.buttonGroup, className)} role="group" ref={groupRef} {...rest}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null;

        const { value: childValue, selected: childSelected } = child.props;
        const isSelected =
          childSelected ||
          (multiSelect ? Array.isArray(value) && value.includes(childValue) : value === childValue);

        return cloneElement(child, {
          selected: isSelected,
          onChange: handleChange,
          disabled: disabled || child.props.disabled,
        });
      })}
    </div>
  );
}

export default ToggleButtonGroup;
