import React from 'react';

import Profile from '@/components/Profile/Profile';
import Slide from '@/components/sidebar/Slide';

const user = {
  username: 'exampleuser',
  email: 'example@example.com',
  firstName: 'John',
  lastName: 'Doe',
  profileImage: 'path/to/profile/image.jpg',
};

const ProfilePage = () => {
  return (
    <>
      <div>
        <Slide />
        <div className='ml-64'>
          <Profile user={user} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
