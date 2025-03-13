import type { LangType } from '@/types';
import Hero from '@/app/components/Hero/Hero';
import { getDictionary } from './dictionaries';

export default async function Page({ params }: { params: Promise<{ lang: LangType }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return <Hero dict={dict.home.hero_home} />;
}
