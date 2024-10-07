'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { ThemeProvider } from 'styled-components';
import theme from '@/ui/theme';

export default function StyledThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: themeMode, systemTheme } = useTheme();

  const getThemeObject = (themeMode?: string, systemTheme?: string) => {
    switch (themeMode) {
      case 'dark':
        return theme.dark;
      case 'light':
        return theme.light;
      case 'system':
        return systemTheme === 'dark' ? theme.dark : theme.light;
      default:
        return theme.light;
    }
  };

  return <ThemeProvider theme={getThemeObject(themeMode, systemTheme)}>{children}</ThemeProvider>;
}
