"use client"
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { UserProfile } from './user-profile';
import PerformanceCard from './performance-card';
import { auth } from '@/firebase/firebaseConfig';

const DashboardMain: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        // User is not signed in
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <main>  <h1 className="text-3xl font-semibold mb-6 text-[#501078]">Dashboard</h1>

    {user ? (
      <UserProfile user={user} />
    ) : (
    ""
      // <CreateProfile />
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {/* Performance Metrics Cards */}
      <PerformanceCard title="User Growth" value="1234" />
      <PerformanceCard title="Content Engagement" value="5678" />
      <PerformanceCard title="System Health" value="Good" />
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Recent Activity Feed */}
      <h2 className="text-xl font-bold mb-4 text-[#501078]">Recent Activity</h2>
      {/* <RecentActivityFeed /> */}
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Quick Actions */}
      <div className="flex space-x-4">
        <button className="bg-[#501078] text-white py-2 px-4 rounded hover:bg-[#ECD2FC66]">
          Create New Content
        </button>
        <button className="bg-[#501078] text-white py-2 px-4 rounded hover:bg-[#ECD2FC66]">
          Manage Users
        </button>
        <button className="bg-[#501078] text-white py-2 px-4 rounded hover:bg-[#ECD2FC66]">
          View Analytics
        </button>
      </div>
    </div></main>
    
  );
};

export  {DashboardMain};
