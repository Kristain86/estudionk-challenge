import Image from 'next/image';
import ScrollBanner from './components/ScrollBanner/ScrollBanner';

export default function NotFound() {
  return (
    <div className='relative h-screen flex'>
      <div className='relative z-[1]'>
        <ScrollBanner />
      </div>

      <Image src='/images/background.webp' alt='Scroll Banner' fill className='object-cover' priority />
    </div>
  );
}
