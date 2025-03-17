'use client';

import type { LangType } from '@/types';
import { DesktopOnly, MobileOnly } from '@/components/Responsive/Responsive';
import TextButton from '@/components/TextButton/TextButton';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import ScrollBanner from '../../../components/ScrollBanner/ScrollBanner';

interface HeroProps {
  dict: {
    [key: string]: string;
  };
  lang: LangType;
}

const DEFAULT_DURATION = 1;

const Hero = ({ dict, lang }: HeroProps) => {
  gsap.registerPlugin(useGSAP);
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to('.scroll-banner', { opacity: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' });

      const timeline = gsap.timeline();

      timeline
        .delay(3)
        .to('.lead', { opacity: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' })
        .to('.green-line', { width: '1.25rem', duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.lead-description', { opacity: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.main-title', { opacity: 1, y: 0, rotate: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.text-button', { opacity: 1, y: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5');

      const mobileTimeline = gsap.timeline();

      mobileTimeline
        .to('.lead-mobile', { opacity: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' })
        .to(
          '.main-title-mobile',
          { opacity: 1, y: 0, rotate: 0, duration: DEFAULT_DURATION, ease: 'power2.out' },
          '-=0.5'
        )
        .to('.text-button-mobile', { opacity: 1, y: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5');
    },

    { scope: container }
  );

  return (
    <div className='relative flex' ref={container}>
      <div className='relative z-[2] scroll-banner opacity-0 translate-x-4'>
        <ScrollBanner lang={lang} />
      </div>

      <div className='relative z-[2] max-w-[31.25rem] lg:max-w-[51.3rem] h-dvh lg:h-screen flex flex-col justify-center ml-[2rem] lg:pt-[6rem] lg:ml-[5rem]'>
        <DesktopOnly>
          <div className='flex items-center gap-2 mb-8'>
            <h2 className='text-white text-xs uppercase lead opacity-0 translate-x-4'>{dict.lead}</h2>
            <div className='w-0 h-[1px] bg-primary-green green-line' />
            <p className='text-white/70 text-xs lead-description opacity-0 translate-x-0'>{dict.lead_description}</p>
          </div>
        </DesktopOnly>

        <MobileOnly>
          <div className='flex flex-col gap-2 mb-8 max-w-[18rem] lead-mobile opacity-0'>
            <div>
              <div className='w-5 h-[1px] bg-primary-green inline-block align-middle mr-2' />
              <h2 className='text-white text-xs uppercase inline-block'>{dict.lead}</h2>
            </div>

            <p className='text-white/70 text-xs'>{dict.lead_description}</p>
          </div>
        </MobileOnly>

        <h1 className='main-title text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[3.125rem] lg:mb-[7.125rem] opacity-0 translate-y-10 hidden lg:block'>
          {dict.title}
        </h1>

        <h1 className='main-title-mobile text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[3.125rem] lg:mb-[7.125rem] opacity-0 translate-y-10 block lg:hidden'>
          {dict.title}
        </h1>

        <DesktopOnly>
          <TextButton
            text={dict.button}
            href={`/${lang}/subscribe`}
            className='opacity-0 text-button hidden lg:block'
          />
        </DesktopOnly>

        <MobileOnly>
          <TextButton
            text={dict.button}
            href={`/${lang}/subscribe`}
            className='opacity-0 text-button-mobile block lg:hidden'
          />
        </MobileOnly>
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
};

export default Hero;
