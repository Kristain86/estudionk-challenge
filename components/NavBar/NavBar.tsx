'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TextButton from '../TextButton/TextButton';
import LangDropdown from '../LangDropdown/LangDropdown';
import type { LangType } from '@/types';

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

const NavBar = ({ lang, dict }: NavBarProps) => {
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
          <li key={item.href} className='text-primary-white text-[0.9375rem] relative group'>
            <span
              className={cn(
                'w-[0.125rem] h-[1rem] bg-primary-green rotate-[15deg] absolute -left-2.5 top-[calc(50%-0.020rem)] -translate-y-1/2',
                handleActive(item.href) ? 'opacity-100' : 'opacity-0'
              )}
            />

            <Link href={item.href} className='flex items-center gap-2'>
              <span>{dict[item.id]}</span>
            </Link>

            <div className='absolute -bottom-1 left-0 w-0 h-[0.125rem] group-hover:w-full group-hover:bg-primary-green transition-all duration-300' />
          </li>
        ))}
      </ul>
      <div className='relative right-10 z-[10]'>
        <div className='flex items-center gap-4 mr-[4.3rem]'>
          <TextButton text={dict.contact_us} href='/contact-us' />
          <span className='size-[4px] bg-white/20 rounded-full block' />
        </div>

        <LangDropdown lang={lang} />
      </div>
    </div>
  );
};

export default NavBar;
