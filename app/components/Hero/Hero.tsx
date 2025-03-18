'use client';

import type { LangType } from '@/types';
import CanvasWrapper from '@/components/CanvasWrapper/CanvasWrapper';
import { DesktopOnly, MobileOnly } from '@/components/Responsive/Responsive';
import ScrollBanner from '@/components/ScrollBanner/ScrollBanner';
import TextButton from '@/components/TextButton/TextButton';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef } from 'react';

interface HeroProps {
  dict: {
    [key: string]: string;
  };
  lang: LangType;
}

const Bar3D = dynamic(() => import('./Bar3D/Bar3D'), { ssr: false });

const DEFAULT_DURATION = 1;

const Hero = ({ dict, lang }: HeroProps) => {
  gsap.registerPlugin(useGSAP);
  const container = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline();
      const mobileTimeline = gsap.timeline();

      gsap.to('.scroll-banner', {
        autoAlpha: 1,
        duration: DEFAULT_DURATION,
        ease: 'power2.out',
        onComplete: () => {
          timeline.play();
        },
      });

      timeline
        .pause()
        .to('.lead', { autoAlpha: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' })
        .to('.green-line', { width: '1.25rem', duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.slash', { autoAlpha: 1, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.lead-description', { autoAlpha: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.main-title', { autoAlpha: 1, y: 0, rotate: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.text-button', { autoAlpha: 1, y: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5');

      mobileTimeline
        .to(
          '.main-title-mobile',
          { opacity: 1, y: 0, rotate: 0, duration: DEFAULT_DURATION, ease: 'power2.out' },
          '-=0.5'
        )
        .to('.lead-mobile', { autoAlpha: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' })
        .to('.text-button-mobile', { autoAlpha: 1, y: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5');
    },
    { scope: container }
  );

  return (
    <div className='relative flex' ref={container}>
      <div className='relative z-[3] scroll-banner opacity-0'>
        <ScrollBanner lang={lang} />
      </div>

      <div className='relative z-[3] max-w-[31.25rem] lg:max-w-[51.3rem] h-dvh lg:h-screen flex flex-col justify-center ml-[2rem] lg:pt-[6rem] lg:ml-[5rem]'>
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

        <h1 className='main-title text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[3.125rem] lg:mb-[7.125rem] invisible opacity-100 translate-y-10 hidden lg:block'>
          {dict.title}
        </h1>

        <h1 className='main-title-mobile text-[3.5rem] lg:text-[7rem] text-primary-white leading-[96%] mb-[3.125rem] lg:mb-[7.125rem] opacity-0 translate-y-10 block lg:hidden'>
          {dict.title}
        </h1>

        <DesktopOnly className='relative z-[10]'>
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
            className='opacity-0 text-button-mobile block lg:hidden relative z-[10]'
          />
        </MobileOnly>
      </div>

      <div className='absolute top-0 w-full h-full z-[2] left-0 right-auto lg:left-auto lg:-right-[25vw] slash lg:opacity-0 pointer-events-none'>
        <div className='block lg:hidden opacity-50 absolute top-0 right-0 bottom-0 left-0 bg-primary-black z-10' />
        <CanvasWrapper>
          <Bar3D />
        </CanvasWrapper>
      </div>

      <Image
        src='/images/background.webp'
        alt='Scroll Banner'
        fill
        className='object-cover'
        priority
        loading='eager'
        quality={75}
      />
    </div>
  );
};

export default Hero;
