import type { LangType } from '@/types';
import ScrollBanner from '@/app/components/ScrollBanner/ScrollBanner';
import Image from 'next/image';
import { getDictionary } from '../dictionaries';

export default async function Page({ params }: { params: Promise<{ lang: LangType }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='relative h-screen flex'>
      <div className='relative z-[10]'>
        <ScrollBanner />
      </div>

      <div className='relative z-[1] max-w-[51.3rem] h-screen flex flex-col justify-center ml-[5rem] pt-[6rem]'>
        <h1 className='text-[7rem] text-primary-white leading-[96%] mb-[7.125rem]'>{dict.work.title}</h1>
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
}
