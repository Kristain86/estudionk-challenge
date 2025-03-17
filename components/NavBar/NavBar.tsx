'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import TextButton from '../TextButton/TextButton';
import LangDropdown from '../LangDropdown/LangDropdown';
import type { LangType } from '@/types';
import { DesktopOnly, MobileOnly } from '../Responsive/Responsive';
import { useRef, useState } from 'react';
import HamburguerIcon from './HamburguerIcon/HamburguerIcon';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

interface NavBarProps {
  lang: LangType;
  dict: {
    [key: string]: string;
  };
}

const navLinks = [
  {
    id: 'studio',
    label: 'Studio',
    href: '/',
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
  },
  {
    id: 'work',
    label: 'Work',
    href: '/work',
  },
  {
    id: 'culture',
    label: 'Culture',
    href: '/culture',
  },
  {
    id: 'news',
    label: 'News',
    href: '/news',
  },
  {
    id: 'careers',
    label: 'Careers',
    href: '/careers',
  },
];

const DEFAULT_DURATION = 0.6;

const NavBar = ({ lang, dict }: NavBarProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleActive = (href: string) => {
    if (href === '/') {
      return pathname === `/${lang}`;
    }

    return pathname.toLowerCase() === `/${lang}${href.toLowerCase()}`;
  };

  gsap.registerPlugin(useGSAP);
  const container = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline();
      timeline
        .delay(3)
        .to('.nav-link', { opacity: 1, duration: DEFAULT_DURATION, stagger: 0.2, ease: 'power2.out' })
        .to('.text-button', { opacity: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5')
        .to('.lang-dropdown', { opacity: 1, x: 0, duration: DEFAULT_DURATION, ease: 'power2.out' }, '-=0.5');

      gsap.to(['.mobile-link', '.mobile-lang'], {
        delay: 0.5,
        opacity: isMenuOpen ? 1 : 0,
        duration: DEFAULT_DURATION,
        stagger: isMenuOpen ? 0.2 : 0,
        ease: 'power2.out'
      });
    },
    { scope: container, dependencies: [isMenuOpen] }
  );

  return (
    <div ref={container}>
      <DesktopOnly>
        <div className='absolute top-[3.6rem] left-[13.375rem] z-[10] -mt-5.5 flex items-center justify-between w-full max-w-[calc(100%-13.375rem)]'>
          <ul className='flex items-center gap-[2.625rem]'>
            {navLinks.map(item => (
              <li key={item.href} className='text-primary-white text-[0.9375rem] relative group nav-link opacity-0'>
                <span
                  className={cn(
                    'w-[0.125rem] h-[1rem] bg-primary-green rotate-[15deg] absolute -left-2.5 top-[calc(50%-0.020rem)] -translate-y-1/2',
                    handleActive(item.href) ? 'opacity-100' : 'opacity-0'
                  )}
                />

                <Link href={`/${lang}${item.href}`} className='flex items-center gap-2'>
                  <span>{dict[item.id]}</span>
                </Link>

                <div className='absolute -bottom-1 left-0 w-0 h-[0.125rem] group-hover:w-full group-hover:bg-primary-green transition-all duration-300' />
              </li>
            ))}
          </ul>
          <div className='relative right-10 z-[10]'>
            <div className='flex items-center gap-4 mr-[4.3rem] text-button opacity-0 translate-x-4'>
              <TextButton text={dict.contact_us} href={`/${lang}/contact-us`} />
              <span className='size-[4px] bg-white/20 rounded-full block' />
            </div>

            <LangDropdown lang={lang} className='lang-dropdown opacity-0 -translate-x-4' />
          </div>
        </div>
      </DesktopOnly>
      <MobileOnly>
        <div className='relative'>
          <div
            className={cn(
              'fixed top-0 left-0 w-full z-[10] py-0 px-6 flex items-center justify-between transition-all duration-300',
              isMenuOpen ? 'bg-primary-black/80' : 'bg-transparent'
            )}>
            <Link href={`/${lang}`} className='relative inline-block' onClick={() => setIsMenuOpen(false)}>
              <Image src='/images/logo.svg' alt='Estudio/nk' width={52} height={24} />
            </Link>

            <HamburguerIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
          <div
            className={cn(
              'fixed top-0 bottom-0 w-[100vw] h-full bg-primary-black/80 backdrop-blur-sm z-[8] pt-30 px-6 transition-all duration-300 overflow-y-auto',
              isMenuOpen ? 'left-0' : 'left-full'
            )}>
            <div className='flex flex-col gap-6'>
              {navLinks.map(item => (
                <Link
                  href={`/${lang}${item.href}`}
                  key={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'text-primary-white text-3xl inline-block w-fit mobile-link opacity-0',
                    handleActive(item.href) ? 'border-b border-primary-green pb-2' : ''
                  )}>
                  {dict[item.id]}
                </Link>
              ))}
            </div>

            <div className='fixed bottom-[12%] left-6'>
              <div className='flex items-center gap-4 mr-[4.3rem] mobile-lang opacity-0'>
                <div onClick={() => setIsMenuOpen(false)}>
                  <TextButton text={dict.contact_us} />
                </div>

                <span className='size-[0.25rem] bg-white/20 rounded-full block' />
                <LangDropdown lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </MobileOnly>
    </div>
  );
};

export default NavBar;
