'use client';
import { SendOtpApiRequest } from 'hooks/auth/interface';
import { useSendOtp, useVerifyOtp } from 'hooks/auth/mutation';
import useFormWithSchema from 'hooks/useFormWithSchema';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import OTPInput from 'react-otp-input';
import { AUTH_ROUTES } from 'routes/page';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
import TextInput from '@/components/input/TextInput';

const forgetPassValidationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required('Email is required.'),
});

const Otp = () => {

  const {mutateAsync: sendOtp} = useSendOtp();
  const {mutateAsync: verifyOtp} = useVerifyOtp();

  const router = useRouter();

  const [isAccountConfirmed, setIsAccountConfirmed] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const {
    handleSubmit: handleSubmitForEmail,
    formState: { errors: emailErrors },
    control: controlForEmail,
  } = useFormWithSchema(forgetPassValidationSchema);

  const onSubmitEmail = useCallback((formData: SendOtpApiRequest) => {
    sendOtp(formData)
    setEmail(formData.email);
    setIsAccountConfirmed(true);
  }, [sendOtp]);

  const onSubmitOtp = useCallback(() => {  
  if(otp.length === 6, email){
    console.log("OTP ==> ", otp)
    console.log("Email ==> ", email)
    verifyOtp({ email, otp })
  }
    router.push(`${AUTH_ROUTES.RESETPASS}?email=${email}`);
  }, [otp, email, verifyOtp, router]);

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
          <div className='flex flex-col gap-4'>
            <div className='col-span-6 mt-10 flex flex-col items-center gap-8'>
                <div>
                  <label
                    className='col-span-6 sm:col-span-3 block text-sm font-medium text-center mb-3 text-gray-700'
                  >
                    Enter Otp
                  </label>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>{` `}</span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle='flex items-center gap-x-2'
                    inputStyle='min-w-[48px] h-[48px] rounded-2xl bg-black-400 text-white-500 placeholder:text-white-900/70 border border-black-300 outline-0 focus:outline-0 active:outline-0 ring-0 focus:ring-0 active:ring-0'
                    inputType='tel'
                    shouldAutoFocus={true}
                    placeholder='000000'
                  />
                </div>
              <Appbuttons title='Verify OTP' onClick={onSubmitOtp} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Otp;
