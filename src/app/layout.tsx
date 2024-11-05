import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
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
  title: 'Yevhenii Buhor | Web Development Insights',
  description:
    'Explore insightful articles and projects by Yevhenii Buhor on modern web development, featuring industry best-practices and the latest tech trends.',
  keywords: [
    'Web Development',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Fullstack',
    'Frontend',
    'blog',
  ],
  openGraph: {
    title: 'Yevhenii Buhor | Web Development Insights',
    description: 'Dive into web development insights and projects by Yevhenii Buhor.',
    url: `https://${process.env.VERCEL_URL}`,
    type: 'website',
    locale: 'en_US',
    siteName: 'Yevhenii Buhor | Web Development Insights',
    images: [
      {
        url: `https://${process.env.VERCEL_URL}/default-og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Yevhenii Buhor | Web Development Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@beugene_',
    title: 'Yevhenii Buhor | Web Development Insights',
    description: 'Dive into web development insights and projects by Yevhenii Buhor.',
    images: `https://${process.env.VERCEL_URL}/default-og-image.png`,
  },
  alternates: {
    canonical: `https://${process.env.VERCEL_URL}.com`,
  },
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
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Yevhenii Buhor',
              url: `https://${process.env.VERCEL_URL}.com`,
              sameAs: [
                'https://www.linkedin.com/in/beugene',
                'https://github.com/eugenebuhor',
                'https://x.com/beugene_',
              ],
              jobTitle: 'Senior Fullstack Developer',
              // worksFor: {
              //   '@type': 'Organization',
              //   name: 'Company Name',
              // },
            }),
          }}
        />
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
