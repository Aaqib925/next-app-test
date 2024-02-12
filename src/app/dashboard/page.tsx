import React from 'react';

import Profile from '@/components/Profile/Profile';

const initialUser = {
  username: 'john_doe',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  profileImage: '/path/to/profile/image.jpg',
};

const ProfilePage = () => {
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
