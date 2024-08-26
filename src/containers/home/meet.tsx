import { creators } from "@/lib/data";
import Image from "next/image";
import React from "react";

const Meet = () => {
  return (
    <div className="px-[6%] py-[5%] w-full">
      <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-4 text-center">
        Meet some creators
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden no-scrollbar w-full gap-5 pb-4">
        {creators.map((data) => (
          <div
            key={data.id}
            className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex-shrink-0 relative"
          >
            <Image
              src={data.src}
              alt="creator's image"
              width={300}
              height={300}
              className="rounded-[16px] object-cover w-full h-auto"
            />
            <div className="absolute bottom-4 left-4">
              <p className="mb-2 text-sm sm:text-lg md:text-xl font-bold">{data.name}</p>
              <div className="flex gap-3 items-center flex-wrap">
                {data.categories.map((category, index) => (
                  <div key={index}>
                    <p className="rounded-[16px] bg-[#F2F3F466] border border-black px-[10px] sm:px-[15px] md:px-[20px] py-[3px] text-xs sm:text-sm md:text-base">
                      {category}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Meet };
