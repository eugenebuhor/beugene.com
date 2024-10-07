import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import StyledThemedProvider from '@/context/StyledThemeContext';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/ui/globalStyles';
import { inter, lusitana } from '@/ui/fonts';

export const metadata: Metadata = {
  title: 'Yevhenii Buhor',
  description: 'Personal website of Yevhenii Buhor',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${lusitana.className}`}>
        <NextThemeProvider themes={['dark', 'light']}>
          <StyledComponentsRegistry>
            <StyledThemedProvider>
              <GlobalStyles />
              {children}
            </StyledThemedProvider>
          </StyledComponentsRegistry>
        </NextThemeProvider>
      </body>
    </html>
  );
}
