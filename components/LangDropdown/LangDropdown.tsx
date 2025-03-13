import Image from 'next/image';
import { useState } from 'react';

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

  return (
    <div className="relative" onClick={() => setIsOpen(!isOpen)}>
      <div className='border border-primary-white/10 rounded-[6.25rem] py-1.5 px-2.5 cursor-pointer flex items-center group'>
        <span className='text-primary-white text-[0.625rem] font-bold uppercase'>Lang</span>
        <Image
          src='/images/arrow.svg'
          alt='arrow'
          width={8}
          height={8}
          className='ml-1 group-hover:rotate-180 transition-all duration-300'
        />
      </div>
      {isOpen && <div className='bg-white absolute top-8 right-0'>is Open</div>}
    </div>
  );
};

export default LangDropdown;
