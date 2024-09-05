"use client";
import { useFetchItem } from "@/hooks/useFetchItem";
import { ExploreType } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

type ExploreProps = {
  creators: any
}

const Explore = ({creators}:ExploreProps) => {
  const router = useRouter();


  const handleClick = (id: string) => {
    router.push(`/explore/${id}`);
  };



  return (
    <div className="px-4 sm:px-[6%] py-[5%] w-full">
      <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-6 text-center">
        Explore
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
        {creators?.map((data: ExploreType) => (
          <div
            key={data.id}
            className="bg-white p-4 rounded-lg shadow-lg lg:bg-none lg:rounded-none lg:shadow-none"
          >
            <div className="w-auto h-[300px] relative">
              <Image
                src={data.src}
                alt="creator's image"
                layout="fill"
                objectFit="cover"
                className="rounded-[16px] w-full h-full"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex w-[30px] h-[30px] items-center gap-2">
                <Image
                  src={data.profileImage}
                  width={30}
                  height={30}
                  objectFit="cover"
                  alt="profile-image"
                  className="rounded-full w-full h-full"
                />
                <p className="text-sm sm:text-lg md:text-[16px] font-bold">
                  {data.name}
                </p>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {data.averageRating! > index ? (
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
