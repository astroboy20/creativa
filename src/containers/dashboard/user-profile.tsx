import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

type UserProfileProps = {
  user: {
    name: string;
    email: string;
    profilePicture: string;
    recentActivities: string[];
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4 text-[#501078]">User Profile</h2>
    <div className="flex items-center mb-4">
      {user.profilePicture ? (
        <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
      ) : (
        <FaUserCircle className="text-4xl text-gray-600 mr-4" />
      )}
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
   
  </div>
);

export { UserProfile };


