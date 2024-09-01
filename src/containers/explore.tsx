"use client";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "@/firebase/firebaseConfig";
import { ClipLoader } from "react-spinners";

interface RatingType {
  user: string;
  rating: number;
  comment?: string;
}

interface ExploreType {
  id: string;
  name: string;
  categories: string;
  src: string;
  profileName: string;
  profileImage: string;
  rating: number | RatingType[];
  description?: string;
  averageRating?: number;
}

const Explore = () => {
  const router = useRouter();
  const [creators, setCreators] = useState<ExploreType[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true); // Track initial loading

  const fetchCreators = async () => {
    console.log("Fetching creators...");
    try {
      const data = await getDocs(collection(fireStore, "creators"));
      const filteredData = data.docs.map((doc) => {
        const docData = doc.data() as ExploreType;

        // Calculate average rating
        let averageRating = 0;
        if (Array.isArray(docData.rating)) {
          if (docData.rating.length > 0) {
            averageRating =
              docData.rating.reduce((acc, cur) => acc + cur.rating, 0) /
              docData.rating.length;
          }
        } else {
          averageRating = docData.rating; // If it's a number, use it directly
        }

        return { ...docData, id: doc.id, averageRating };
      });
      setCreators(filteredData);
      console.log("Creators fetched successfully");
    } catch (err) {
      console.error("Error fetching creators:", err);
    } finally {
      setInitialLoading(false); // Set initial loading to false after fetch
    }
  };

  useEffect(() => {
    fetchCreators();

    const intervalId = setInterval(fetchCreators, 1000); // Fetch every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleClick = (id: string) => {
    router.push(`/explore/${id}`);
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-[100svh]">
        <ClipLoader color="#501078" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-[6%] w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-white p-4 rounded-lg shadow-lg lg:bg-none lg:rounded-none lg:shadow-none cursor-pointer"
            onClick={() => handleClick(creator.id)}
          >
            <Image
              src={creator.src || "/default-image.jpg"}
              alt="creator's image"
              width={300}
              height={300}
              className="rounded-[16px] object-cover w-full h-auto"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={creator.profileImage}
                  width={30}
                  height={30}
                  alt="profile-image"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-lg md:text-[16px] font-bold">
                  {creator.profileName}
                </p>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {creator.averageRating! > index ? (
                      <AiFillStar className="text-[#FFD700]" size={18} />
                    ) : (
                      <AiOutlineStar className="text-[#FFD700]" size={18} />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Explore };
