import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
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
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/favicon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        rel: 'icon',
        url: '/favicon-light.png',
        media: '(prefers-color-scheme: light)',
      },
    ],
  },
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fonts.mediumContentSerif.variable} ${fonts.mediumContentSansSerif.variable}`}
    >
      <head>
        <link rel="preload" href="/logo-dark.svg" as="image" />
        <link rel="preload" href="/logo-light.svg" as="image" />
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <ScrollHandler />
        <NextThemeProvider defaultTheme="system" disableTransitionOnChange enableColorScheme>
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
