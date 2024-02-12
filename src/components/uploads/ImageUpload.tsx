import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';
import { APP_IMAGES } from '@/constant/images';


/* eslint-disable @typescript-eslint/no-explicit-any */
interface ImageUploadProps {
  variant?: 'sm' | 'base';
  selectedImage: string | null;
  handleImageClick: () => void;
  fileInputRef: any;
  handleImageChange: (e: any) => void;
}

const ImageUpload = ({
  variant = 'sm',
  selectedImage,
  handleImageClick,
  fileInputRef,
  handleImageChange,
}: ImageUploadProps) => {
  return (
    <>
      {!selectedImage && (
        <div
          onClick={handleImageClick}
          className={cn(
            variant === 'sm'
              ? 'h-24 w-24 md:h-32 md:w-32'
              : 'h-[200px] w-[200px]',
            'flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border border-gray-100 bg-gray-200'
          )}
        >
          <Image
            src={APP_IMAGES.photo}
            width={200}
            height={200}
            className='h-4 w-4 md:h-6 md:w-6'
            alt='avatar'
          />
        </div>
      )}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <Image
            src={selectedImage}
            onClick={handleImageClick}
            width={200}
            height={200}
            alt='Selected'
            className={cn(
              variant === 'sm'
                ? 'h-24 w-24 md:h-32 md:w-32'
                : 'h-[200px] w-[200px]'
            )}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(ImageUpload);
