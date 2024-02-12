'use client';
import React, { useState } from 'react';

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
  const { firstName: initialFirstName, lastName: initialLastName, email: initialEmail, } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {

    console.log('Saving changes...', editedUser);

    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className=" m-20 max-w-md mx-auto p-10 pb bg-white shadow-md rounded-lg">
      <h2 className="flex text-xl font-semibold mb-4 justify-center">User Profile</h2>
      <div className="flex items-center justify-center mb-4">

        <div>
          {isEditing ? (
            <>
              <div className="flex mb-4 items-center">
                <label htmlFor="firstName" className="flex font-semibold w-1/3 p-1 ">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleInputChange}
                  className="flex border-solid border-2 border-sky-500  col-span-6 sm:col-span-3 text-sm font-medium text-gray-700"
                />
              </div>
              <div className="flex mb-4">
                <label htmlFor="lastName" className="flex  font-semibold mb-1 w-1/3">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editedUser.lastName}
                  onChange={handleInputChange}
                  className="flex border-solid border-2 border-sky-500 col-span-6 sm:col-span-3 text-sm font-medium text-gray-700"
                />
              </div>
              <div className="flex mb-4">
                <label htmlFor="email" className="flex font-semibold mb-1 w-1/3 ">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  className="flex border-solid border-2 border-sky-500 col-span-6 sm:col-span-3 text-sm font-medium text-gray-700"
                />
              </div>
            </>
          ) : (

            <div>
              <p className="flex mb-1 flex-row gap-2">
                <span className="flex  font-semibold">First Name:</span> {initialFirstName}
              </p>
              <p className="flex mb-1 flex-row gap-2">
                <span className="flex font-semibold">Last Name:</span> {initialLastName}
              </p>
              <p className="flex mb-1 flex-row gap-2">
                <span className="flex font-semibold">Email:</span> {initialEmail}
              </p>


            </div>

          )}
          <div className='flex justify-center '>
            {isEditing ? (
              <Appbuttons title="Save Changes" onClick={handleSaveClick} />
            ) : (
              <Appbuttons title="Edit Profile" onClick={handleEditClick} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
