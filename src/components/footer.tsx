import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col text-black">
      <div className="py-6 px-4 sm:px-[6%] flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-[#501078] text-xl sm:text-2xl font-bold mb-4 md:mb-0">
          Creativa
        </h1>
        <div className="flex m-auto gap-2 sm:gap-4 text-center md:text-left">
          <p className="cursor-pointer hover:underline">Following</p>
          <p className="cursor-pointer hover:underline">Explore</p>
          <p className="cursor-pointer hover:underline">About</p>
          <p className="cursor-pointer hover:underline">Connect</p>
          <p className="cursor-pointer hover:underline">Categories</p>
        </div>
        <div className="flex gap-2 sm:gap-4 mt-4 md:mt-0">
          <FaInstagramSquare
            size={20}
            className="hover:text-gray-400 cursor-pointer"
          />
          <FaTwitterSquare
            size={20}
            className="hover:text-gray-400 cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-[#501078] text-right text-white py-3 px-4 sm:px-[6%] w-full text-sm sm:text-base">
        <p>creativa.vercel.app</p>
      </div>
    </footer>
  );
};

export { Footer };
