// components/UserProfile.tsx
import React from 'react';

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
      {/* <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mr-4" /> */}
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
    <div>
      <h4 className="text-md font-semibold mb-2">Recent Activities</h4>
      <ul>
        {/* {user.recentActivities.map((activity, index) => (
          <li key={index} className="text-gray-700 mb-1">
            {activity}
          </li>
        ))} */}
      </ul>
    </div>
  </div>
);

export  {UserProfile};
