'use client';
import { useChangePassword } from 'hooks/auth/mutation';
import useFormWithSchema from 'hooks/useFormWithSchema';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
import TextInput from '@/components/input/TextInput';

interface ChangePasswordForm {
  old_password: string;
  new_password: string;
}

const ChangePasswordValidationForm = Yup.object({
  old_password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters.')
    .required('Password is required.'),
});

const ChangePassword = () => {
  const {
    mutateAsync: changePasswordAction,
    isPending: isLoadingChangePassword,
    error: changePasswordError,
    isError: isChangePasswordError,
    isSuccess: isChangePasswordSuccess,
  } = useChangePassword();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormWithSchema(ChangePasswordValidationForm);

  const onSubmit = useCallback(
    async (formData: ChangePasswordForm) => {
      await changePasswordAction({
        old_password: formData.old_password,
        new_password: formData.new_password,
      });
    },
    [changePasswordAction]
  );

  return (
    <>
      <div>
          <div className='max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-lg '>
              <h1 className='text-2xl text-center font-bold sm:text-3xl'>
                Change Password
              </h1>

              <p className='mt-4 text-gray-500 text-center'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                libero nulla eaque error neque ipsa culpa autem, at itaque
                nostrum!
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full mx-auto mb-0 mt-8 max-w-md space-y-4'
            >
              <Controller
                render={({ field: { onChange, onBlur, value, name } }) => {
                  return (
                    <TextInput
                      type='password'
                      placeholder='Old Password'
                      name='old_password'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors?.[name]?.message}
                      customInputStyles='p-4'
                    />
                  );
                }}
                name='old_password'
                control={control}
                defaultValue=''
              />

              <Controller
                render={({ field: { onChange, onBlur, value, name } }) => {
                  return (
                    <TextInput
                      type='password'
                      placeholder='New Password'
                      name='new_password'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={errors?.[name]?.message}
                      customInputStyles='p-4'
                    />
                  );
                }}
                name='new_password'
                control={control}
                defaultValue=''
              />
              {isChangePasswordError && (
                <p className='text-red-500 text-sm italic'>
                  {changePasswordError?.message}
                </p>
              )}
              {isChangePasswordSuccess && (
                <p className='text-green-500 text-sm italic'>
                  Password changed successfully
                </p>
              )}

              <div className='w-full flex items-center mt-12 justify-center'>
                <Appbuttons
                  title='Submit'
                  isLoading={isLoadingChangePassword}
                />
              </div>
            </form>
          </div>
      </div>
    </>
  );
};

export default ChangePassword;
