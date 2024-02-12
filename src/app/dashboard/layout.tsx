import React from 'react';

import Slide from '@/components/sidebar/Slide';


interface BrandsLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: BrandsLayoutProps) => {
  return (
    <>
      <Slide />
      <div className='ml-0 md:ml-24'>{children}</div>
    </>
  );
};

export default HomeLayout;
