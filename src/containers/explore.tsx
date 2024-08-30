"use client";
import { auth, fireStore } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface ExploreType {
  name: string;
  categories: string;
  src: string;
  profileName: string;
  profileImage: string;
  rating:number
}
const Explore = () => {
  const [creators, setCreators] = useState<ExploreType[]>([]);

  const getCreatorsData = collection(fireStore, "creators");

  const getCreators = async () => {
    try {
      const data = await getDocs(getCreatorsData);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data() as ExploreType,
        id: doc.id,
      }));
      console.log(filteredData);
      setCreators(filteredData); // Corrected syntax
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <div className="px-4 sm:px-[6%]  w-full">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {creators.map((data, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg lg:bg-none lg:rounded-none lg:shadow-none"
          >
            <Image
              src={data.src}
              alt="creator's image"
              width={300}
              height={300}
              className="rounded-[16px] object-cover w-full h-auto"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={data.profileImage}
                  width={30}
                  height={30}
                  alt="profile-image"
                  className="rounded-full"
                />
                <p className="text-sm sm:text-lg md:text-[16px] font-bold">
                  {data.profileName}
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
