import type { LangType } from '@/types';
import { DesktopOnly, MobileOnly } from '@/components/Responsive/Responsive';
import TextButton from '@/components/TextButton/TextButton';
import Image from 'next/image';
import ScrollBanner from '../../../components/ScrollBanner/ScrollBanner';

interface HeroProps {
  dict: {
    [key: string]: string;
  };
  lang: LangType;
}

const Hero = ({ dict, lang }: HeroProps) => {
  return (
    <div className='relative block lg:flex'>
      <div className='relative z-[2]'>
        <ScrollBanner lang={lang} />
      </div>

      <div className='relative z-[2] max-w-[31.25rem] lg:max-w-[51.3rem] h-screen flex flex-col justify-center ml-[2rem] lg:pt-[6rem] lg:ml-[5rem]'>
        <DesktopOnly>
          <div className='flex items-center gap-2 mb-8'>
            <h2 className='text-white text-[0.6875rem] uppercase'>{dict.lead}</h2>
            <div className='w-5 h-[1px] bg-primary-green' />
            <p className='text-white/70 text-[0.6875rem]'>{dict.lead_description}</p>
          </div>
        </DesktopOnly>

        <MobileOnly>
          <div className='flex flex-col gap-2 mb-8 max-w-[18rem]'>
            <div>
              <div className='w-5 h-[1px] bg-primary-green inline-block align-middle mr-2' />
              <h2 className='text-white text-[0.6875rem] uppercase inline-block'>{dict.lead}</h2>
            </div>

            <p className='text-white/70 text-[0.6875rem]'>{dict.lead_description}</p>
          </div>
        </MobileOnly>

        <h1 className='text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[3.125rem] lg:mb-[7.125rem]'>
          {dict.title}
        </h1>

        <TextButton text={dict.button} href={`/${lang}/subscribe`} />
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
};

export default Hero;
