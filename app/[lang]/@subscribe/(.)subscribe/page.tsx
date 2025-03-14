import type { LangType } from '@/types';
import { getDictionary } from '../../dictionaries';
import SubscribeModal from '../../subscribe/components/SubscribeModal/SubscribeModal';

export default async function Page({ params }: { params: Promise<{ lang: LangType }> }) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return <SubscribeModal dict={dict.subscribe} />;
}
