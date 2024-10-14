import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import * as fonts from '@/ui/fonts';
import Header from '@/ui/common/Header';
import Footer from '@/ui/common/Footer';
import { LayoutMain } from '@/ui/common/Layouts';
import '@/ui/global.css';

export const metadata: Metadata = {
  title: 'Yevhenii Buhor',
  description: 'Personal website of Yevhenii Buhor',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fonts.lora.variable} ${fonts.inter.variable}`}
    >
      <body>
        <NextThemeProvider defaultTheme="system">
          <Header />
          <LayoutMain>{children}</LayoutMain>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}
