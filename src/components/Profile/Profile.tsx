'use client';
/* eslint-disable @next/next/no-img-element */

import { useUpdateProfile } from 'hooks/auth/mutation';
import { useFetchUserProfile } from 'hooks/auth/query';
import useFormWithSchema from 'hooks/useFormWithSchema';
import React, { SetStateAction, useCallback, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import * as Yup from 'yup';

import Appbuttons from '@/components/buttons/Appbuttons';
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

  const {mutateAsync: updateUserProfile} = useUpdateProfile()

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);  
  const [isEditable, setIsEditable] = useState(false);

  const { data } = useFetchUserProfile()

  const {
    handleSubmit,
    control,
  } = useFormWithSchema(UpdateProfileValidationSchema);

  const handleOnEdit = useCallback(() => {
    setIsEditable(true);
  }, []);

  const onSave = useCallback((body: any) => {
    console.log('Form Data: ', body);
    setIsUpdating(true);

    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('email', body.email);
    formData.append('image', fileInputRef.current?.files?.[0] as Blob);

    updateUserProfile(formData)
    setIsUpdating(false);
    setIsEditable(false);
  }, [updateUserProfile]);

  const onCancel = useCallback(() => {
    setIsEditable(false);
  } ,[])

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
    <div className="min-h-screen flex items-center justify-center mx-auto max-w-lg bg-white">
      <div className='shadow-xl rounded-lg w-full flex flex-col items-stretch border border-solid border-grey-400 p-5'>

      <h4 className="flex text-xl font-semibold mb-12 justify-center">User Profile</h4>
              <div className='flex items-center flex-col justify-center mb-10 gap-y-2'>
                {!isEditable ? <img
                  width={120}
                  height={120}
                  src={`http://localhost:8000/storage/${data?.user?.profile_image}`}
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
              </div>
      <form className="flex items-center flex-col justify-center mb-4 w-full">
            {data && <>
              <div className="w-full flex mb-5 items-center gap-x-4">
                <label htmlFor="name" className="flex text-left font-semibold w-[100px] p-1">Name</label>
                {
                  isEditable ?
                <Controller
                  render={({ field: { onChange, value } }) => {
                    return (
                      <input
                        id='name'
                        name='name'
                        type='text'
                        value={value}
                        onChange={onChange}
                        className="flex border-solid border rounded-lg border-gray-300 text-sm font-medium text-gray-500 w-[80%]"
                      />
                    );
                  }}
                  name='name'
                  control={control}
                  defaultValue={data.user.name}
                /> : <div className="flex border-solid px-4 py-2 border rounded-lg border-gray-300 text-sm font-medium text-gray-500 w-[80%]">{data.user.name}</div>
                }
              </div>
              <div className="w-full flex mb-4 items-center gap-x-4">
                <label htmlFor="email" className="flex text-left font-semibold w-[100px] p-1">Email</label>
                {isEditable ? <Controller
                  render={({ field: { onChange, value } }) => {
                    return (
                      <input
                        id='email'
                        name='email'
                        type='email'
                        value={value}
                        onChange={onChange}
                        className="flex border-solid border rounded-lg border-gray-300 text-sm font-medium text-gray-500 w-[80%]"
                      />
                    );
                  }}
                  name='email'
                  control={control}
                  defaultValue={data.user.email}
                />: <div className="flex border-solid border px-4 py-2 rounded-lg border-gray-300 text-sm font-medium text-gray-500 w-[80%]">{data.user.email}</div>}

              </div>
            </>}
          
      </form>
          <div className='flex justify-center mt-10'>
            {!isEditable ? (
              <Appbuttons title="Edit" onClick={handleOnEdit} />
            ) : (
              <div className='flex items-center gap-x-4'>
                <Appbuttons title="Cancel" onClick={onCancel} />
                <Appbuttons title="Save Changes" isLoading={isUpdating} onClick={handleSubmit(onSave)} />
              </div>
             )} 
          </div>
    </div>
    </div>
  );
};
export default Profile;
