'use client';
/* eslint-disable @next/next/no-img-element */
import { useUpdateProfile } from 'hooks/auth/mutation';
import { useFetchUserProfile } from 'hooks/auth/query';
import useFormWithSchema from 'hooks/useFormWithSchema';
import React, { SetStateAction, useCallback, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import * as Yup from 'yup';

import { getImagePathUsingBackend } from '@/lib/helper';

import TextInput from '@/components/input/TextInput';
import ImageUpload from '@/components/uploads/ImageUpload';


const UpdateProfileValidationSchema = Yup.object({
  name: Yup.string().required('Name is required.'),
  email: Yup.string()
    .email()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is not a valid email format.'
    )
    .required('Email is required.'),
});
const Profile: React.FC = () => {
  // const session = useSession()

  const { mutateAsync: updateUserProfile } = useUpdateProfile()

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const { data } = useFetchUserProfile()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormWithSchema(UpdateProfileValidationSchema);

  const handleOnEdit = useCallback(() => {
    setIsEditable(true);
  }, []);

  const onSave = useCallback((body: any) => {
    console.log('Form Data: ', body);

    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('email', body.email);
    formData.append('image', fileInputRef.current?.files?.[0] as Blob);

    updateUserProfile(formData)
    setIsEditable(false);
  }, [updateUserProfile]);

  const onCancel = useCallback(() => {
    setIsEditable(false);
  }, [])

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const imageFile = new FormData();
      imageFile.append('image', e.target.files?.[0] as Blob);
      const file = e.target.files?.[0];
      // make formdata of a file

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setSelectedImage(reader.result as SetStateAction<string>);
        };

        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <div className='max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg '>

        <div className='items-start justify-between md:flex'>
          <div className='max-w-lg'>
            <h3 className='text-gray-800 text-xl font-bold sm:text-2xl'>
              Update Profile
            </h3>
            <p className='text-gray-600 mt-2'>
              Logging out from a session will remove all sessions except the current one.
            </p>
          </div>
          {
            !isEditable && (
              <div className='mt-3 md:mt-0'>
                <div
                  onClick={handleOnEdit}
                  className='inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm'
                >
                  Edit
                </div>
              </div>
            )
          }

        </div>
      </div>

      <div className='flex items-center flex-col justify-center mb-10 gap-y-2'>
        {!isEditable ? <img
          width={120}
          height={120}
          src={getImagePathUsingBackend(data?.user?.profile_image)}
          alt='profile'
          className='rounded-full w-20 h-20'
        /> :
          <ImageUpload
            variant='sm'
            selectedImage={selectedImage}
            handleImageClick={handleImageClick}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
          />
        }

        <form className="flex items-center flex-col justify-center w-1/4">
          {data && <>
            <div className="w-full flex mb-5 items-center gap-x-4">
              <Controller
                render={({ field: { onChange, value, name, onBlur } }) => {
                  return (
                    <TextInput
                      label='Name'
                      type='name'
                      placeholder='Name'
                      name='name'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      readOnly={!isEditable}
                      error={errors?.[name]?.message}
                      customInputStyles='p-4 border-solid border rounded-lg border-gray-300'
                    />
                  );
                }}
                name='name'
                control={control}
                defaultValue={data.user.name}
              />


            </div>

            <div className="w-full flex mb-4  items-center gap-x-4">
              <Controller
                render={({ field: { onChange, value, name, onBlur } }) => {
                  return (
                    <TextInput
                      label='Email'
                      type='email'
                      placeholder='Email'
                      name='email'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      readOnly={!isEditable}
                      error={errors?.[name]?.message}
                      customInputStyles='p-4 border-solid border rounded-lg border-gray-300'
                    />
                  );
                }}
                name='email'
                control={control}
                defaultValue={data.user.email}
              />


            </div>
          </>}
          {
            isEditable && (
                <div className='w-full flex items-center gap-x-4 justify-between mt-6 '>
                  <div className='mt-3 md:mt-0'>
                    <div
                      onClick={onCancel}
                      className='inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-600 rounded-lg hover:bg-gray-500 active:bg-gray-700 md:text-sm'
                    >
                      Cancel
                    </div>
                  </div>
                  <div className='flex items-center gap-x-4'>
                    <div className='mt-3 md:mt-0'>
                      <div
                        onClick={handleSubmit(onSave)}
                        className='inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm'
                      >
                        Save Changes
                      </div>
                    </div>
                  </div>
                </div>

            )
          }
        </form>
      </div>

    </div>
  )

};


export default Profile;
