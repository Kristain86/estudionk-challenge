'use client';

import type { MouseEvent } from 'react';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
}

const widthOffset = 300;

const Modal = ({ children, className }: ModalProps) => {
  const router = useRouter();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setPosition({
      x: e.clientX - rect.left - centerX,
      y: e.clientY - rect.top - centerY - widthOffset,
    });
  };

  const handleLimitedPosition = () => {
    const limitRange = 14;
    const xOffset = 15;
    const yOffset = 33;
    return {
      x: position.x / (limitRange * 3) + xOffset,
      y: position.y / (limitRange - 7) - widthOffset - yOffset,
    };
  };

  useClickOutside({
    ref: modalRef,
    callback: () => router.push('/'),
  });

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn('fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-20', className)}>
      <div className='relative flex-grow-1 mx-3 lg:flex-grow-0 lg:p-40 overflow-hidden'>
        <div className='bg-transparent p-[1px] rounded-[0.625rem] relative overflow-hidden max-w-[24.0625rem] lg:max-w-[25rem] mx-auto'>
          <div
            ref={modalRef}
            className='relative z-[10] bg-secondary-black rounded-[0.625rem] shadow-lg p-[2rem] lg:p-[2.75rem] w-full max-w-[24.0625rem] lg:min-w-[24.0625rem] mx-auto'>
            {children}
          </div>
          <div
            className='hidden lg:block absolute -z-10 w-[25rem] h-[25rem] bg-gradient-to-r from-primary-green to-primary-green/50 blur-[60px]'
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          />

          <div className='block lg:hidden absolute top-0 left-0 -z-10 w-[25rem] h-[25rem] bg-gradient-to-r from-primary-green to-primary-green/50 blur-[60px] animate-circular-shadow' />
        </div>

        <div
          className='absolute -z-10 w-[350px] h-[300px] rounded-full bg-primary-green/70 blur-[20px] hidden lg:block'
          style={{ transform: `translate(${handleLimitedPosition().x}px, ${handleLimitedPosition().y}px)` }}
        />
      </div>
    </div>
  );
};

export default Modal;
