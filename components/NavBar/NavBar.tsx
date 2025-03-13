'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TextButton from '../TextButton/TextButton';
import LangDropdown from '../LangDropdown/LangDropdown';
import type { LangType } from '@/types';

interface NavBarProps {
  lang: LangType;
}

const navLinks = [
  {
    label: 'Studio',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Work',
    href: '/work',
  },
  {
    label: 'Culture',
    href: '/culture',
  },
  {
    label: 'News',
    href: '/news',
  },
  {
    label: 'Careers',
    href: '/careers',
  },
];

const NavBar = ({ lang }: NavBarProps) => {
  const pathname = usePathname();

  const handleActive = (href: string) => {
    if (href === '/') {
      return pathname === `/${lang}`;
    }

    return pathname.toLowerCase() === `/${lang}${href.toLowerCase()}`;
  };

  return (
    <div className='absolute top-[3.6rem] left-[13.375rem] z-[10] -mt-5.5 flex items-center justify-between w-full max-w-[calc(100%-13.375rem)]'>
      <ul className='flex items-center gap-[2.625rem]'>
        {navLinks.map(item => (
          <li key={item.href} className='text-primary-white text-[0.9375rem] relative'>
            <span
              className={cn(
                'w-[0.125rem] h-[1rem] bg-primary-green rotate-[15deg] absolute -left-2.5 top-[calc(50%-0.020rem)] -translate-y-1/2',
                handleActive(item.href) ? 'opacity-100' : 'opacity-0'
              )}
            />

            <Link href={item.href} className='flex items-center gap-2'>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className='relative right-10 z-[10]'>
        <div className='flex items-center gap-4 mr-[4.3rem]'>
          <TextButton text={`Let's Connect`} href='/contact-us' />
          <span className='size-[4px] bg-white/20 rounded-full block' />
        </div>

        <LangDropdown lang={lang} />
      </div>
    </div>
  );
};

export default NavBar;
