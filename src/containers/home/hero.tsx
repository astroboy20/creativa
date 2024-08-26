import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col gap-5 text-center px-4 md:px-8 lg:px-16 py-[10%] lg:pb-[5%] lg:pt-[5%]">
      <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold">
        Welcome to Creativa, <br className="hidden md:block" /> Where Expertise
        Meets Creativity.
      </h1>
      <p className="text-[18px] md:text-[20px] lg:text-[24px]">
        Explore the powerful blend of expertise and creativity with{" "}
        <span className="text-[#501078]">creativa</span>, where you can create,
        <br className="hidden md:block" /> showcase, and publish your ideas.
      </p>

      <span className="bg-[#501078] text-white py-[10px] px-[20px] md:px-[24px] lg:px-[28px] rounded-[8px] w-fit m-auto text-[16px] md:text-[18px] lg:text-[20px]">
        Get Started
      </span>
    </div>
  );
};

export { Hero };
