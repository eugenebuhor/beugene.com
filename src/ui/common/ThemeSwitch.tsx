'use client';

import { useEffect, useState } from 'react';
import { MdMonitor, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import ToggleButton from '@/ui/common/ToggleButton';
import ToggleButtonGroup from '@/ui/common/ToggleButtonGroup';
import styles from '@/ui/common/ThemeSwitch.module.css';

function ThemeSwitch() {
  const { setTheme, themes, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  if (!mounted) {
    return null; // todo: add skilleton
  }

  return (
    <ToggleButtonGroup
      value={theme || ''}
      onChange={onToggleTheme}
      aria-label="theme switch"
      className={styles.toggleButtonGroup}
    >
      {themes.map((themeOption) => (
        <ToggleButton
          key={themeOption}
          value={themeOption}
          aria-label={`${themeOption} mode`}
          className={styles.toggleButton}
        >
          {themeOption === 'dark' ? (
            <MdDarkMode color="var(--text-primary)" />
          ) : themeOption === 'light' ? (
            <MdLightMode color="var(--text-primary)" />
          ) : (
            <MdMonitor color="var(--text-primary)" />
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ThemeSwitch;
