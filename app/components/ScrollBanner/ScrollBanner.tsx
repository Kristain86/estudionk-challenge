import Image from 'next/image';
import Link from 'next/link';

const ScrollBanner = () => {
  return (
    <div className='h-screen border-r border-white/5 p-9 flex flex-col justify-between max-w-[7.5rem]'>
      <Link href='/' className='relative'>
        <Image src='/images/logo.svg' alt='Scroll Banner' width={52} height={24} />
      </Link>
      <div className="-rotate-90 mb-10 relative before:content-[''] before:absolute before:size-[0.5625rem] before:bg-primary-green before:rounded-full before:-left-6 before:top-[calc(-50%+1.60rem)] before:-translate-y-1/2">
        <span className='uppercase text-white/50 text-[0.625rem] inline-block w-[7.5rem]'>scroll to discover</span>
      </div>
    </div>
  );
};

export default ScrollBanner;
