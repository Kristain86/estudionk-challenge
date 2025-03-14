import TextButton from '@/components/TextButton/TextButton';
import Image from 'next/image';
import ScrollBanner from '../ScrollBanner/ScrollBanner';

interface HeroProps {
  dict: {
    [key: string]: string;
  };
}

const Hero = ({ dict }: HeroProps) => {
  return (
    <div className='relative h-screen flex'>
      <div className='relative z-[1]'>
        <ScrollBanner />
      </div>

      <div className='relative z-[1] max-w-[51.3rem] h-screen flex flex-col justify-center ml-[5rem] pt-[6rem]'>
        <div className='flex items-center gap-2 mb-8'>
          <h2 className='text-white text-[0.6875rem] uppercase'>{dict.lead}</h2>
          <div className='w-5 h-[1px] bg-primary-green' />
          <p className='text-white/70 text-[0.6875rem]'>{dict.lead_description}</p>
        </div>
        <h1 className='text-[7rem] text-primary-white leading-[96%] mb-[7.125rem]'>{dict.title}</h1>

        <TextButton text={dict.button} href='/subscribe' />
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
};

export default Hero;
