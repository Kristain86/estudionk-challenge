'use client';

import type { LangType } from '@/types';
import ScrollBanner from '@/components/ScrollBanner/ScrollBanner';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || 'en';

  return (
    <div className='relative h-screen flex'>
      <div className='relative z-[10]'>
        <ScrollBanner lang={lang as LangType} />
      </div>
      <div className='relative z-[1] max-w-[31.25rem] lg:max-w-[51.3rem] h-screen flex flex-col justify-center ml-[2rem] lg:pt-[6rem] lg:ml-[5rem]'>
        <h1 className='text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[7.125rem]'>
          {lang === 'es' ? '404 no encontrada' : '404 Not Found'}
        </h1>
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
}
