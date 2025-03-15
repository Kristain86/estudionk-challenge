import type { LangType } from '@/types';
import type { Metadata } from 'next';
import { getDictionary } from '../../dictionaries';
import SubscribeModal from '../../subscribe/components/SubscribeModal/SubscribeModal';

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

  return <SubscribeModal dict={dict.subscribe} />;
}
