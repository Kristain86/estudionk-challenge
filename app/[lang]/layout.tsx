import type { LangType } from '@/types';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { DM_Sans } from 'next/font/google';
import { getDictionary } from './dictionaries';
import './globals.css';

const NavBar = dynamic(() => import('@/components/NavBar/NavBar'));

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Estudio/nk Challenge',
  description:
    'We create innovative digital products & future-oriented brands. We design for brands, we work for people.',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: LangType }>;
}>) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className='overflow-x-hidden' suppressHydrationWarning>
      <body className={`${dmSans.variable} overflow-x-hidden antialiased`}>
        <NavBar lang={lang} dict={dict.navbar} />
        {children}
      </body>
    </html>
  );
}
