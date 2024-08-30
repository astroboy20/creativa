import Link from "next/link";
import React from "react";

const Connect = () => {
  return (
    <div className="bg-[#ECD2FC66] text-center py-8 px-4 sm:py-[5%] sm:px-[10%] flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold">
          Connect With Other Creators
        </h1>
        <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]">
          Looking to find other creatives in your niche or interested in
          connecting with like-minded individuals? Connect with other creators
          on Creativa.
        </p>
      </div>
      <Link href={"/register"}>
        <span className="bg-[#501078] text-white py-2 px-4 sm:py-[10px] sm:px-[20px] md:px-[24px] lg:px-[28px] rounded-[8px] w-fit mx-auto text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]">
          Connect
        </span>
      </Link>
    </div>
  );
};

export { Connect };
