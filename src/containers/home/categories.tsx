import { categoriesData } from "@/lib/data";
import Image from "next/image";
import React from "react";

const Categories = () => {
  return (
    <div className="px-[6%] py-[5%] w-full">
      <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-4 text-center">
       Categories
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden no-scrollbar w-full gap-5 pb-4">
        {categoriesData.map((data) => (
          <div
            key={data.id}
            className="min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex-shrink-0 "
          >
            <Image
              src={data.src}
              alt="creator's image"
              width={300}
              height={300}
              className="rounded-[16px] object-cover w-full h-auto"
            />
            <div className="mt-3">
              <p className=" text-sm sm:text-lg md:text-xl font-bold">
                {data.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Categories };
