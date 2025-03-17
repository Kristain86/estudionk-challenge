import type { LangType } from '@/types';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getDictionary } from '../dictionaries';
import SubscribeModal from './components/SubscribeModal/SubscribeModal';

const Hero = dynamic(() => import('@/app/components/Hero/Hero'), { ssr: true });

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
      <SubscribeModal dict={dict.subscribe} lang={lang} />
    </>
  );
}
