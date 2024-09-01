import { exploreData } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Explore = () => {
  return (
    <div className="px-4 sm:px-[6%] py-[5%] w-full">
      <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-6 text-center">
        Explore
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {exploreData.map((data) => (
          <div key={data.id} className="bg-white p-4 rounded-lg shadow-lg lg:bg-none lg:rounded-none lg:shadow-none">
            <div className="w-full h-[300px] relative"> {/* Container with fixed dimensions */}
              <Image
                src={data.src}
                alt="creator's image"
                layout="fill" // This makes the image fill the container
                objectFit="cover" // Ensures the image covers the entire container
                className="rounded-[16px]"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={data.profile}
                  width={30}
                  height={30}
                  alt="profile-image"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-lg md:text-[16px] font-bold">
                  {data.name}
                </p>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {data.rating > index ? (
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
