import type { Metadata } from "next";
import { geistMono, geistSans, inter, lusitana } from '@/ui/fonts';

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${lusitana.className}`}>
      {children}
      </body>
    </html>
  );
}
