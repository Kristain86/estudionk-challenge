import type { LangType } from '@/types';
import type { Metadata } from 'next';
import Hero from '@/app/components/Hero/Hero';
import { getDictionary } from './dictionaries';

export async function generateMetadata({ params }: { params: Promise<{ lang: LangType }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.home.metadata.title,
    description: dict.home.metadata.description,
    openGraph: {
      images: [
        {
          url: 'https://estudionkcdn.sfo3.cdn.digitaloceanspaces.com/assets/img/share/og_image_share.jpg',
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: LangType }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <div>
      <Hero dict={dict.home.hero_home} lang={lang} />;
    </div>
  );
}
