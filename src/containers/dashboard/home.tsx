// DashboardMain.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { UserProfile } from './user-profile';
import { PerformanceCard } from './performance-card';
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
    <main className=" sm:p-6 lg:p-8">
      {/* <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-[#501078]">Dashboard</h1> */}
      
      {user ? (
        <UserProfile user={user} />
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Personalized Performance Metrics */}
        <PerformanceCard title="Uploaded Works" value="15" />
        <PerformanceCard title="Likes Received" value="230" />
        <PerformanceCard title="Comments" value="47" />
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        {/* Recent Activity Feed */}
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#501078]">Recent Activity</h2>
        {/* Display recent activity related to user's creative work */}
        <p className="text-sm sm:text-base">No recent activity to show</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-[#501078] text-white py-2 px-4 rounded hover:bg-[#ECD2FC66]">
            Add New Work
          </button>
          <button className="bg-[#501078] text-white py-2 px-4 rounded hover:bg-[#ECD2FC66]">
            View My Gallery
          </button>
          <button className="bg-[#501078] text-white py-2 px-4 rounded hover:bg-[#ECD2FC66]">
            Update Profile
          </button>
        </div>
      </div>
    </main>
  );
};

export { DashboardMain };
