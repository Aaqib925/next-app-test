'use client';
import { useResetPassword } from 'hooks/auth/mutation';
import useFormWithSchema from 'hooks/useFormWithSchema';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { Controller } from 'react-hook-form';
import { AUTH_ROUTES } from 'routes/page';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
import TextInput from '@/components/input/TextInput';

interface ResetPasswordProps {
  searchParams: {
    email: string;
  };
}

const ResetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required("OTP IS REQUIRED")
    .min(8, 'OTP must be  6 numbers.'),
});
const ResetPassword = (
    { searchParams: { email } }: ResetPasswordProps
) => {

  const {mutateAsync: resetPassword} = useResetPassword()

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormWithSchema(ResetPasswordValidationSchema);


  const onSubmit = useCallback((formData: {password: string}) => {

    if(email && formData) {
      console.log("EMAIL ==> ", email)
      console.log("OTP ==> ", formData.password)
      resetPassword({ email, password: formData.password })
      router.push(AUTH_ROUTES.SIGN_IN);
    }
  }, [email, resetPassword, router]);


  return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">Reset Password</h2>
        <h5 className='w-full text-center text-sm'>Reset new password for your email</h5>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='col-span-6 mt-8 flex flex-col items-center gap-4'>
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  type='password'
                  label='Password'
                  name='password'
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
              name='password'
              control={control}
              defaultValue=''
            />
              <Appbuttons title='Reset Password' />
          </div>
        </form>
      </div>
    </div>

  );
};

export default ResetPassword;