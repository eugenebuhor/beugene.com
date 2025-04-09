import clsx from 'clsx';
import styles from './SpinningLoader.module.css';

interface SpinningLoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SpinningLoader = ({ className, size = 'small' }: SpinningLoaderProps) => {
  return (
    <div
      className={clsx(styles.spinningLoader, className, size && styles[size])}
      aria-label="Loading"
    />
  );
};

SpinningLoader.displayName = 'SpinningLoader';

export default SpinningLoader;
