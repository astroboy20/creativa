"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex justify-between items-center px-[6%] py-[3%] bg-white">
      <h1 className="text-[28px] md:text-[32px] font-[700] text-[#501078]">
        Creativa
      </h1>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden">
        {menuOpen ? (
          <MdCancel size={28} onClick={toggleMenu} className="cursor-pointer" />
        ) : (
          <GiHamburgerMenu
            size={28}
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Navbar links for medium to large screens */}
      <div className="hidden md:flex gap-10 items-center text-[20px]">
        <p>Explore</p>
        <p>Connect</p>
        <p>About</p>
      </div>

      {/* Authentication buttons for medium to large screens */}
      <div className="hidden md:flex gap-10 items-center text-[20px]">
        <Link href={"/login"}>
          {" "}
          <p>Sign in</p>
        </Link>
        <Link href={"/register"}>
          <p className="bg-[#501078] text-white py-[10px] px-[28px] rounded-[8px]">
            Sign up
          </p>
        </Link>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center gap-4 py-4 text-[20px]">
            <p onClick={toggleMenu}>Explore</p>
            <p onClick={toggleMenu}>Connect</p>
            <p onClick={toggleMenu}>About</p>
            <p onClick={toggleMenu}>Sign in</p>
            <p
              onClick={toggleMenu}
              className="bg-[#501078] text-white py-[10px] px-[28px] rounded-[8px]"
            >
              Sign up
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Header };
