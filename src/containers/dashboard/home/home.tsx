"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { UserProfile } from "./user-profile";
import { PerformanceCard } from "./performance-card";
import { auth } from "@/firebase/firebaseConfig";
import { useFetchItem } from "@/hooks/useFetchItem";
import { FaFileAlt, FaStar, FaComment } from "react-icons/fa"; // Importing icons
import { RecentActivityChart } from "./recent-activity";

const DashboardMain: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const { data: projects } = useFetchItem({
    collectionName: "creators",
    filterByUser: true,
  });

  console.log(projects);
  const totalContent = projects?.length || 0;
  let totalRatings = 0;
  let ratingCount = 0;
  let totalComments = 0;

  projects?.forEach((project: any) => {
    if (project.rating && project.rating.length > 0) {
      project.rating.forEach((r: any) => {
        totalRatings += r.rating;
        ratingCount++;

        if (r.comment) {
          totalComments++;
        }
      });
    }
  });

  const averageRating =
    ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="sm:p-6 lg:p-8">
      {user ? <UserProfile user={user} /> : ""}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <PerformanceCard
          title={
            <div className="flex items-center space-x-2">
              <FaFileAlt />
              <span>Uploaded Works</span>
            </div>
          }
          value={totalContent}
        />

        <PerformanceCard
          title={
            <div className="flex items-center space-x-2">
              <FaStar />
              <span>Average Rating</span>
            </div>
          }
          value={averageRating}
        />

        {/* Displaying the total number of comments */}
        <PerformanceCard
          title={
            <div className="flex items-center space-x-2">
              <FaComment /> {/* Icon for comments */}
              <span>Comments</span>
            </div>
          }
          value={totalComments}
        />
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#501078]">
          Recent Activity
        </h2>
        {projects?.length === 0 ? (
          <p className="text-sm sm:text-base">No recent activity to show</p>
        ) : (
          <RecentActivityChart data={projects} />
        )}
      </div>

      {/* <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
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
      </div> */}
    </main>
  );
};

export { DashboardMain };
