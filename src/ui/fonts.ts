import localFont from 'next/font/local';

const mediumContentSerif = localFont({
  src: [
    {
      path: '../../public/fonts/medium-content-serif-latin-400.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-serif-latin-italic-400.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/medium-content-serif-latin-700.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-serif-latin-italic-700.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/medium-content-serif-nonlatin-400.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-serif-nonlatin-italic-400.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/medium-content-serif-nonlatin-700.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-serif-nonlatin-italic-700.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-medium-content-serif',
});

const mediumContentSansSerif = localFont({
  src: [
    {
      path: '../../public/fonts/medium-content-sans-serif-latin-300.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-sans-serif-latin-700.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-sans-serif-nonlatin-300.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-sans-serif-nonlatin-700.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-medium-content-sans-serif',
});

export { mediumContentSerif, mediumContentSansSerif };
