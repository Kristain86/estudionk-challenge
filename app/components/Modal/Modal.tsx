'use client';

import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ children, className }: ModalProps) => {
  const router = useRouter();

  return (
    <div
      onMouseDown={() => router.push('/')}
      className={cn('fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-[20]', className)}>
      <div
        className='bg-secondary-black rounded-[0.625rem] shadow-lg p-[2.75rem] max-w-[24.0625rem] w-full'
        onMouseDown={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
