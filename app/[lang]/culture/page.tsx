import type { LangType } from '@/types';
import type { Metadata } from 'next';
import ScrollBanner from '@/components/ScrollBanner/ScrollBanner';
import Image from 'next/image';
import { getDictionary } from '../dictionaries';

export async function generateMetadata({ params }: { params: Promise<{ lang: LangType }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: dict.culture.metadata.title,
    description: dict.culture.metadata.description,
  };
}

export default async function Page({ params }: { params: Promise<{ lang: LangType }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='relative h-screen flex'>
      <div className='relative z-[10]'>
        <ScrollBanner lang={lang} />
      </div>

      <div className='relative z-[1] max-w-[51.3rem] h-screen flex flex-col justify-center ml-[2rem] pt-[6rem] lg:ml-[5rem]]'>
        <h1 className='text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[7.125rem]'>
          {dict.culture.title}
        </h1>
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
}
