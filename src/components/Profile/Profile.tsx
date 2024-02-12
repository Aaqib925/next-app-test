'use client';
import { useFetchUserProfile } from 'hooks/auth/query';
import React, { useEffect, useState } from 'react';

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
  // const session = useSession()

  const { data } = useFetchUserProfile()

  useEffect(() => {
    console.log('User Profile Data: ', data);
  }, [data])

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
    <div className=" m-20 max-w-lg mx-auto p-10 pb bg-white shadow-md rounded-lg">
      <h4 className="flex text-xl font-semibold mb-8 justify-center">User Profile</h4>
      <div className="flex items-center justify-center mb-4">
        <div>
            {data && <>
              <div className="flex mb-4 items-center gap-x-4">
                <label htmlFor="name" className="flex text-left font-semibold p-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={data.user.name}
                  onChange={handleInputChange}
                  className="flex border-solid border-1 min-w-full border-slate-500 text-sm font-medium text-gray-700"
                />
              </div>
              <div className="flex mb-4 items-center gap-x-4">
                <label htmlFor="email" className="flex text-left font-semibold p-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={data.user.email}
                  onChange={handleInputChange}
                  className="flex border-solid border-1 min-w-full border-slate-500 text-sm font-medium text-gray-700"
                />
              </div>
            </>}
          
          <div className='flex justify-center mt-10'>
            {/* {isEditing ? (
              <Appbuttons title="Save Changes" onClick={handleSaveClick} />
            ) : ( */}
              <Appbuttons title="Edit Profile" onClick={handleEditClick} />
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
