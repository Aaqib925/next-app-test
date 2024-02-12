'use client';
import { SendOtpApiRequest } from 'hooks/auth/interface';
import { useSendOtp } from 'hooks/auth/mutation';
import useFormWithSchema from 'hooks/useFormWithSchema';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AUTH_ROUTES } from 'routes/page';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
import TextInput from '@/components/input/TextInput';

const forgetPassValidationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required('Email is required.'),
});

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'OTP must be a 6-digit code')
    .required('OTP is required.'),
});

const Otp = () => {

  const {mutateAsync: sendOtp} = useSendOtp();

  const router = useRouter();
  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const [otpValue, setOtpValue] = useState('');

  const {
    handleSubmit: handleSubmitForEmail,
    formState: { errors: emailErrors },
    control: controlForEmail,
  } = useFormWithSchema(forgetPassValidationSchema);

  const {
    handleSubmit: handleSubmitForOtp,
    formState: { errors: otpErrors },
    control: controlForOtp,
  } = useFormWithSchema(otpValidationSchema);

  const onSubmitEmail = useCallback((formData: SendOtpApiRequest) => {
    sendOtp(formData)
    setIsAccountConfirmed(true);
  }, [sendOtp]);

  const onSubmitOtp = useCallback(() => {
    router.push(AUTH_ROUTES.HOME);
  }, [router]);

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">Forgot Password ?</h2>
        <h5 className='w-full text-center text-sm'>Enter your Registered Email below for OTP verification</h5>
        <form onSubmit={handleSubmitForEmail(onSubmitEmail)} className='flex flex-col gap-4'>
          <div className='col-span-6 mt-8 flex flex-col items-center gap-4'>
            <Controller
              render={({ field: { onChange, onBlur, value, name } }) => (
                <TextInput
                  type='email'
                  label='Email'
                  name='email'
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={emailErrors?.[name]?.message}
                />
              )}
              name='email'
              control={controlForEmail}
              defaultValue=''
            />
            {!isAccountConfirmed && (
              <Appbuttons title='Send OTP' />
            )}
          </div>
        </form>
        {isAccountConfirmed && (
          <form onSubmit={handleSubmitForOtp(onSubmitOtp)} className='flex flex-col gap-4'>
            <div className='col-span-6 mt-8 flex flex-col items-center gap-4'>
              <Controller
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <TextInput
                    type='text'
                    label='Enter Your confirmation code.'
                    name='otp'
                    value={value}
                    onChange={(e) => {
                      if (e && e.target) {
                        setOtpValue(e.target.value);
                        onChange(e);
                      }
                    }}
                    onBlur={onBlur}
                    error={otpErrors?.[name]?.message}
                  />
                )}
                name='otp'
                control={controlForOtp}
              />
              <Appbuttons title='Update Password' />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Otp;
