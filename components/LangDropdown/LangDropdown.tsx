import { useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { useClickOutside } from '@/hooks/useClickOutside';

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

const LangDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside({ ref, callback: () => setIsOpen(false) });

  return (
    <div className='absolute top-0 right-0' onClick={() => setIsOpen(!isOpen)} ref={ref}>
      <div
        className={cn(
          'group h-auto border py-1.5 px-2.5 cursor-pointer flex flex-col items-center transition-colors duration-300',
          isOpen
            ? 'h-[100px] border-primary-green bg-primary-green/5 rounded-2xl'
            : 'border-primary-white/10 rounded-[6.25rem]'
        )}>
        <div className='flex items-center'>
          <div className='text-primary-white text-[0.625rem] font-bold uppercase'>Lang</div>
          <Image
            src='/images/arrow.svg'
            alt='arrow'
            width={8}
            height={8}
            className={cn('ml-1 transition-all duration-300', isOpen && 'rotate-180')}
          />
        </div>

        {isOpen && (
          <div className='block mr-auto w-full'>
            <div className='w-full h-[0.0625rem] bg-primary-white/20 my-1.5' />

            {langs.map(lang => (
              <span className='text-primary-white block text-[0.6875rem] uppercase mb-2.5' key={lang.value}>
                {lang.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LangDropdown;
