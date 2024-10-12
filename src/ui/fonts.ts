import { Inter, Lora } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-lora',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '800'],
  variable: '--font-inter',
});
