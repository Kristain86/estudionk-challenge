import { useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';
import type { LangType } from '@/types';

interface LangDropdownProps {
  lang: LangType;
  className?: string;
}

const langs = [
  {
    label: 'ENG',
    value: 'en',
  },
  {
    label: 'ESP',
    value: 'es',
  },
];

const LangDropdown = ({ lang, className }: LangDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside({ ref, callback: () => setIsOpen(false) });

  const handleChangeLang = (lang: string) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = lang;
    router.push(`/${segments.join('/')}`);
  };

  const parsedLang = langs.find(langItem => langItem.value === lang);

  return (
    <div className={cn('absolute top-0 right-0', className)} onClick={() => setIsOpen(!isOpen)} ref={ref}>
      <div
        className={cn(
          'group h-auto border py-1.5 px-2.5 cursor-pointer flex flex-col items-center transition-colors duration-300',
          isOpen
            ? 'h-[100px] border-primary-green bg-primary-green/5 rounded-2xl'
            : 'border-primary-white/10 rounded-[6.25rem]'
        )}>
        <div className='flex items-center'>
          <div className='text-primary-white text-[0.625rem] font-bold uppercase'>
            {isOpen ? 'Lan' : parsedLang?.label}
          </div>
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={8}
            height={8}
            className={cn('ml-1 transition-all duration-300', isOpen && 'rotate-180')}
          />
        </div>

        {isOpen && (
          <div className='w-full'>
            <div className='w-full h-[0.0625rem] bg-primary-white/20 my-1.5' />
            <div className='block mr-auto'>
              {langs.map(langItem => (
                <span
                  className={cn(
                    'text-primary-white block text-xs uppercase mb-2.5 cursor-pointer max-w-6 hover:text-primary-green',
                    lang === langItem.value && 'border-b border-primary-green text-primary-green'
                  )}
                  key={langItem.value}
                  onClick={() => handleChangeLang(langItem.value)}>
                  {langItem.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LangDropdown;
