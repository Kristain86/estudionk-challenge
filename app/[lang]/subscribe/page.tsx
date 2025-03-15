import type { LangType } from '@/types';
import type { Metadata } from 'next';
import Hero from '@/app/components/Hero/Hero';
import { getDictionary } from '../dictionaries';
import SubscribeModal from './components/SubscribeModal/SubscribeModal';

export async function generateMetadata({ params }: { params: Promise<{ lang: LangType }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.subscribe.metadata.title,
    description: dict.subscribe.metadata.description,
  };
}

export default async function Page({ params }: { params: Promise<{ lang: LangType }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict.home.hero_home} lang={lang} />
      <SubscribeModal dict={dict.subscribe} />
    </>
  );
}
