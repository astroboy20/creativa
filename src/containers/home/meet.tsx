"use client";
import Image from "next/image";

type MeetProps = {
  users: any;
};
const Meet = ({ users }: MeetProps) => {
  return (
    <div className="px-[6%] py-[5%] w-full">
      <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-4 text-center">
        Meet some creators
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden no-scrollbar w-full gap-5 pb-4">
        {users?.map((data: any) => (
          <div
            key={data.id}
            className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex-shrink-0 relative"
          >
            <div className="w-[300px] h-[300px] ">
              <img
                src={data.profilePictureURL}
                alt="creator's image"
                className="w-full h-full object-cover rounded-[16px]"
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

export { Meet };
