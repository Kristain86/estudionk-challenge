import type { LangType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ScrollBanner = ({ lang }: { lang: LangType }) => {
  return (
    <div className='h-screen border-r border-white/5 p-9 flex-col justify-between max-w-[7.5rem] hidden lg:flex'>
      <Link href={`/${lang}`} className='relative'>
        <Image src='/images/logo.svg' alt='Estudio/nk' width={52} height={24} priority loading='eager' quality={75} />
      </Link>
      <div className="-rotate-90 mb-10 relative before:content-[''] before:absolute before:size-[0.5625rem] before:bg-primary-green before:rounded-full before:-left-6 before:top-[calc(-50%+1.60rem)] before:-translate-y-1/2">
        <span className='uppercase text-white/50 text-[0.625rem] inline-block w-[7.5rem]'>scroll to discover</span>
      </div>
    </div>
  );
};

export default ScrollBanner;
