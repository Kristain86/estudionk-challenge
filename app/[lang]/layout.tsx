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

export async function generateMetadata({ params }: { params: Promise<{ lang: LangType }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.layout.metadata.title,
    description: dict.layout.metadata.description,
    openGraph: {
      images: [
        {
          url: 'https://estudionkcdn.sfo3.cdn.digitaloceanspaces.com/assets/img/share/og_image_share.jpg',
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  subscribe,
  params,
}: Readonly<{
  children: React.ReactNode;
  subscribe: React.ReactNode;
  params: Promise<{ lang: LangType }>;
}>) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className='overflow-x-hidden' suppressHydrationWarning>
      <body className={`${dmSans.variable} overflow-x-hidden antialiased`}>
        <NavBar lang={lang} dict={dict.navbar} />
        {subscribe}
        {children}
      </body>
    </html>
  );
}
