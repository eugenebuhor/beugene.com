'use client';

import { useEffect, useState } from 'react';
import { MdMonitor, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import ToggleButton from '@/ui/common/ToggleButton';
import ToggleButtonGroup from '@/ui/common/ToggleButtonGroup';
import Skeleton from '@/ui/common/Skeleton';
import styles from '@/ui/common/ThemeSwitch.module.css';

const ThemeSwitch = () => {
  const { setTheme, themes, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  if (!mounted) {
    return (
      <div className={styles.skeletonContainer}>
        <Skeleton variant="circle" animation="pulse" width="2.5rem" height="2.5rem" />
        <Skeleton variant="circle" animation="pulse" width="2.5rem" height="2.5rem" />
        <Skeleton variant="circle" animation="pulse" width="2.5rem" height="2.5rem" />
      </div>
    );
  }

  return (
    <ToggleButtonGroup
      value={theme || ''}
      onChange={onToggleTheme}
      aria-label="theme group switch"
      className={styles.toggleButtonGroup}
    >
      {themes.map((themeOption) => (
        <ToggleButton
          variant="icon-outlined"
          size="medium"
          key={themeOption}
          value={themeOption}
          aria-label={`${themeOption} mode`}
        >
          {themeOption === 'dark' ? (
            <MdDarkMode color="var(--color-text-primary)" />
          ) : themeOption === 'light' ? (
            <MdLightMode color="var(--color-text-primary)" />
          ) : (
            <MdMonitor color="var(--color-text-primary)" />
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ThemeSwitch;
