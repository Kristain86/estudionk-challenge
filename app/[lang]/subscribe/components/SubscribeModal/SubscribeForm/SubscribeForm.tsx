'use client';

import type { LangType } from '@/types';
import InputGroup from '@/components/InputGroup/InputGroup';
import TextButton from '@/components/TextButton/TextButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { subscribeAction } from './actions';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid address'),
});

type FormValues = z.infer<typeof formSchema>;

interface SubscribeFormProps {
  dict: {
    [key: string]: string;
  };
  lang: LangType;
}

const SubscribeForm = ({ dict, lang }: SubscribeFormProps) => {
  const [successState, setSuccessState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    const { name, email } = data;

    const res = await subscribeAction({ name, email });

    if (res.success) {
      setSuccessState(true);
    } else {
      reset();
    }
  };

  return (
    <>
      <div className='mb-10'>
        <h3 className='text-[2.625rem] text-primary-white tracking-[-0.050rem] leading-[96%]'>
          {successState ? dict.success_title : dict.title}
        </h3>
        <h4 className='text-[2.625rem] text-primary-white tracking-[-0.050rem] leading-[96%]'>
          <span className='text-primary-green'>/</span>
          nk.news
        </h4>
      </div>
      <div>
        {successState ? (
          <div>
            <p className='text-[0.6875rem] text-white leading-[1.25rem] mb-[6rem]'>{dict.success_description}</p>
            <TextButton text={dict.cta_success} href={`/${lang}`} />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <InputGroup
              label='Name'
              placeholder='e.g: Steve'
              type='text'
              name='name'
              id='name'
              register={register}
              errors={errors}
              isFieldValid={!getFieldState('name').invalid && getFieldState('name').isDirty}
            />

            <InputGroup
              label='Email'
              placeholder='e.g: steve@apple.com'
              type='email'
              name='email'
              id='email'
              register={register}
              errors={errors}
              isFieldValid={!getFieldState('email').invalid && getFieldState('email').isDirty}
            />

            <div className='mt-10 flex items-center gap-6'>
              <div className='inline-block lg:hidden'>
                <TextButton text={dict.cta_success} href={`/${lang}`} />
              </div>

              <TextButton text={dict.cta_form} type='submit' />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default SubscribeForm;
