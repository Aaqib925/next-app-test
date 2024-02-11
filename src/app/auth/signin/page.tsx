/* eslint-disable @next/next/no-img-element */
'use client';


import useFormWithSchema from 'hooks/useFormWithSchema';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { AUTH_ROUTES } from 'routes/page';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
import TextInput from '@/components/input/TextInput';


interface SignInProps {
  searchParams: {
    error?: string;
  };
}

interface SignIn {
  email: string;
  password: string;
}

const SignInValidationSchema = Yup.object({
  otp: Yup.number().required("OTP IS REQUIRED"),
  email: Yup.string()
    .email()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is not a valid email format.'
    )
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
});


const SignIn = ({ searchParams: { error } }: SignInProps) => {

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useFormWithSchema(SignInValidationSchema);

  const router = useRouter();

  const emailValue = watch('email')
  const passwordValue = watch('password')

  const onSubmit = useCallback(() => {
    if (error) {
      console.log("ERROR", error)
    }
    router.push(AUTH_ROUTES.OTP)
    console.log("SIGN IN DATA", emailValue, passwordValue)
  }, [emailValue, passwordValue, router, error]);



  return (
    <>
      <div className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

            <p className="mt-4 text-gray-500">
              The company itself is a very successful company. And the free man has neither that mistake nor the fault itself, but therefore ours!
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <Controller
                render={({ field: { onChange, onBlur, value, name } }) => {
                  return (
                    <TextInput
                      type='email'
                      label='Email'
                      name='email'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors?.[name]?.message}
                    />
                  );
                }}
                name='email'
                control={control}
                defaultValue=''

              />


              <Controller
                render={({ field: { onChange, onBlur, value, name } }) => {
                  return (
                    <TextInput
                      type='password'
                      label='Password'
                      name='password'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors?.[name]?.message}
                    />
                  );
                }}
                name='password'
                control={control}
                defaultValue=''
              />

              <div className='col-span-6 mt-8 flex flex-col items-center gap-4'>



                <Appbuttons title='Sign In' />
                <a className=' text-sky-600 underline'>Forget Password ?</a>
                <p className=' text-center text-sm text-gray-500'>
                  Don&apos;t have an account?{' '}
                  <a
                    href={AUTH_ROUTES.SIGN_UP}
                    className=' text-sky-600 underline'
                  >
                    Sign Up
                  </a>

                  .

                </p>
              </div>
            </form>

          </div>

        </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div >

    </>
  )
}

export default SignIn;
