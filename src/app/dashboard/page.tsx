"use client";
import { useFetchUserProfile } from 'hooks/auth/query';
import React from 'react';

import Profile from '@/components/Profile/Profile';

import useAuthStore from '@/store/auth';



const initialUser = {
  username: 'john_doe',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  profileImage: '/path/to/profile/image.jpg',
};

const ProfilePage = () => {
  const {data, isFetched} = useFetchUserProfile();

  const setUserData = useAuthStore(state => state.setUserData);

  if (isFetched) {
    setUserData(data.user);
  }

  return (
    <>
      <div>
        <div className=''>
          <Profile user={initialUser} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
