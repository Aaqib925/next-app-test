/* eslint-disable @next/next/no-img-element */
import React from 'react';

import Appbuttons from '@/components/buttons/Appbuttons';



interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { username, email, firstName, lastName, profileImage } = user;

  // const handleUpdateProfile = () => {
  //   // Placeholder logic for updating profile
  //   console.log('Updating profile...');
  // };

  // const handleUpdatePassword = () => {
  //   // Placeholder logic for changing password
  //   console.log('Changing password...');
  // };

  return (

    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div className="flex items-center mb-4">
        <img src={profileImage} alt="Profile" className="h-12 w-12 rounded-full mr-4" />

        <div>
          <p className="mb-1 ">
            <span className="font-semibold">Username:</span> {username}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p className="mb-1">
            <span className="font-semibold">First Name:</span> {firstName}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Last Name:</span> {lastName}
          </p>

          <div><Appbuttons title='Edit Profile' /> </div>

        </div>

      </div>
    </div>
  );
};



export default Profile;