"use client";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useFetchItem } from "@/hooks/useFetchItem";
import { ExploreType } from "@/lib/types";



const Explore = () => {
  const router = useRouter();
  const { data: projects = [], isLoading } = useFetchItem({ collectionName: "creators" });

  const handleClick = (id: string) => {
    router.push(`/explore/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100svh]">
        <ClipLoader color="#501078" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-[6%] w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {projects.map((creator: ExploreType) => (
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
              <div className="flex items-center gap-2 w-[30px] h-[30px] rounded-full">
                <img
                  src={creator.profileImage}
                  alt="profile-image"
                  className="rounded-full w-full h-full"
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
