'use client';

import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { cn } from '@/utils/cn';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
}

interface InputGroupProps {
  label: string;
  placeholder: string;
  type: string;
  name: keyof FormData;
  id: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isFieldValid: boolean;
}

const InputGroup = ({ label, placeholder, type, name, id, register, errors, isFieldValid }: InputGroupProps) => {
  return (
    <div>
      <label htmlFor={id} className='mb-3 flex items-center gap-2'>
        <div className='w-5 h-[1px] bg-primary-green' />
        <span className='text-secondary-grey-500 text-xs'>{label}</span>
      </label>
      <div className='relative'>
        <input
          autoComplete='off'
          id={id}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className={cn(
            'w-full px-5 py-2.5 border border-secondary-grey-400/5 bg-secondary-grey-400/40 rounded-[6.25rem] text-primary-white text-[0.9375rem] placeholder:text-primary-white outline-none transition-all duration-300',
            errors[name] && 'focus:border-primary-red',
            'focus:border-primary-green'
          )}
        />
        {isFieldValid && (
          <Image
            className='absolute right-5 top-[50%] -translate-y-1/2'
            src='/images/check.svg'
            alt='check'
            width={16}
            height={16}
          />
        )}

        {errors[name] && (
          <Image
            className='absolute right-5 top-[50%] -translate-y-1/2'
            src='/images/close.svg'
            alt='close'
            width={16}
            height={16}
          />
        )}
      </div>

      {errors[name] && (
        <span className='text-white text-[0.625rem] uppercase mt-2 inline-block'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default InputGroup;
