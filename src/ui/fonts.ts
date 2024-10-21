import localFont from 'next/font/local';

const mediumContentSerif = localFont({
  src: [
    {
      path: '../../public/fonts/medium-content-serif-400.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-medium-content-serif',
});

const mediumContentSansSerif = localFont({
  src: [
    {
      path: '../../public/fonts/medium-content-sans-serif-300.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/medium-content-sans-serif-700.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-medium-content-sans-serif',
});

export { mediumContentSerif, mediumContentSansSerif };
