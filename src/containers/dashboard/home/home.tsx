"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { UserProfile } from "./user-profile";
import { PerformanceCard } from "./performance-card";
import { auth } from "@/firebase/firebaseConfig";
import { useFetchItem } from "@/hooks/useFetchItem";
import { FaFileAlt, FaStar, FaComment } from "react-icons/fa"; // Importing icons
import { RecentActivityChart } from "./recent-activity";
import { useRouter } from "next/navigation";

const DashboardMain: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Fetch projects filtered by the authenticated user
  const { data: projects, isLoading, isError, error } = useFetchItem({
    collectionName: "creators",
    filterByUser: false,
  });

  // Calculate metrics (uploaded works, average rating, total comments)
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

  // Calculate the average rating
  const averageRating = ratingCount > 0 ? (totalRatings / ratingCount).toFixed(1) : 0;

  // Handle user authentication state changes
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
        router.push("/login"); // Redirect to login if no user is found
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Show error state if fetching fails
  }

  return (
    <main className="sm:p-6 lg:p-8">
      {user ? <UserProfile user={user} /> : null}

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
    </main>
  );
};

export { DashboardMain };
