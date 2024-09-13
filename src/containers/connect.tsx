"use client";
import { useFetchItem } from "@/hooks/useFetchItem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

type MeetProps = {
  users: any;
};

const Connect = () => {
    const router = useRouter()
  const { data: users = [], isLoading } = useFetchItem({
    collectionName: "users",
    orderByField: "createdAt",
    orderDirection: "desc",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#501078" />
      </div>
    );
  }

  return (
    <div className="pt-[25%] lg:pt-[10%] px-[6%] py-[5%] w-full">
      <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-4 text-center">
        Meet Some Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-4">
        {users?.map((data: any) => (
          <div key={data.id} onClick={()=>router.push("/connect")} className="relative">
            <div className="w-full h-[300px] overflow-hidden rounded-[16px] shadow-lg ">
              <Image
                src={data.profilePictureURL}
                alt="creator's image"
                layout="fill"
                objectFit="cover"
                className="w-full h-full rounded-[16px]"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 p-3 rounded-lg shadow-lg">
              <p className="text-lg font-bold mb-1">{data.name}</p>
              <p className="text-sm bg-[#F2F3F466] border border-black px-3 py-1 rounded-full">
                {data.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Connect };
