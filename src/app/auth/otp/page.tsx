'use client';
import useFormWithSchema from 'hooks/useFormWithSchema';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { Controller } from 'react-hook-form';
import { AUTH_ROUTES } from 'routes/page';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
import TextInput from '@/components/input/TextInput';
const OtpValidationSchema = Yup.object({
  otp: Yup.number()
    .required("OTP IS REQUIRED")
    .min(8, 'OTP must be  6 numbers.'),
});
const Otp = () => {
  const router = useRouter();
  const {


    handleSubmit,
    formState: { errors },
    control,
  } = useFormWithSchema(OtpValidationSchema);
  const onSubmit = useCallback(() => {
    router.push(AUTH_ROUTES.HOME);
  }, [router]);
  return (
    <><div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='col-span-6 mt-8 flex flex-col items-center gap-4'>
            <Controller
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <TextInput
                    type='text'
                    label=''
                    name='text'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors?.[name]?.message}
                  />
                );
              }}
              name='otp'
              control={control}
            />
            <Appbuttons title='Confirm Account' />
          </div>
        </form>
      </div>
    </div >
    </>

  );
};

export default Otp