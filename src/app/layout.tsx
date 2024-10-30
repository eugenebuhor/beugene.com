import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import * as fonts from '@/ui/fonts';
import Header from '@/ui/common/Header';
import Footer from '@/ui/common/Footer';
import ScrollHandler from '@/ui/common/ScrollHandler';
import { LayoutMain, LayoutSection } from '@/ui/common/Layouts';
import '@/ui/global.css';

export const metadata: Metadata = {
  title: 'Yevhenii Buhor',
  description: 'Personal website of Yevhenii Buhor',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fonts.mediumContentSerif.variable} ${fonts.mediumContentSansSerif.variable}`}
    >
      <body>
        <ScrollHandler />
        <NextThemeProvider defaultTheme="system">
          <Header />
          <LayoutMain>
            <LayoutSection>{children}</LayoutSection>
          </LayoutMain>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
