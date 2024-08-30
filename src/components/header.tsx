"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatorData, CreatorForm } from "./creator";

const Header = () => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
  return (
    <div className="flex justify-between items-center px-[6%] py-[3%] bg-white relative">
      <div className="flex gap-14 items-center text-[20px]">
        <h1 className="text-[28px] md:text-[32px] font-[700] text-[#501078]">
          Creativa
        </h1>

        {pathName === "/explore" ? (
          <div className="hidden lg:flex items-center gap-5">
            <p>For You</p>
            <p>Follow</p>
          </div>
        ) : (
          ""
        )}
      </div>

     

      {/* Navbar links for medium to large screens */}
      {pathName === "/explore" ? (
        ""
      ) : (
        <div className="hidden md:flex gap-10 items-center text-[20px]">
          <Link href="/explore">
            <p>Explore</p>
          </Link>
          <Link href="/connect">
            <p>Connect</p>
          </Link>
          <Link href="/about">
            <p>About</p>
          </Link>
        </div>
      )}

      {pathName === "/explore" ? (
        <div className="flex gap-5 items-center">
          {" "}
          <Dialog>
            <DialogTrigger className="hidden lg:flex border-2 border-[#501078] text-[#501078] py-[8px] px-[28px] rounded-[8px]">
              Create
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fill the form below</DialogTitle>
                <DialogDescription>
                  Fill out the form below to showcase and publish your creative
                  ideas.
                </DialogDescription>
              </DialogHeader>
              <CreatorForm  />
            </DialogContent>
          </Dialog>
          <Input placeholder="Search" className="hidden lg:flex border border-[#501078]" />
        </div>
      ) : (
        <div className="hidden md:flex gap-10 items-center text-[20px]">
          <Link href="/login">
            <p>Sign in</p>
          </Link>
          <Link href="/register">
            <p className="bg-[#501078] text-white py-[10px] px-[28px] rounded-[8px]">
              Sign up
            </p>
          </Link>
        </div>
      )}
 {/* Hamburger menu for small screens */}
 <div className="md:hidden z-30 flex items-center gap-3">
 <Dialog>
            <DialogTrigger className="border-2 border-[#501078] text-[#501078] py-[5px] px-[20px] rounded-[8px]">
              Create
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fill the form below</DialogTitle>
                <DialogDescription>
                  Fill out the form below to showcase and publish your creative
                  ideas.
                </DialogDescription>
              </DialogHeader>
              <CreatorForm  />
            </DialogContent>
          </Dialog>
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
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white text-black shadow-md md:hidden z-20 flex flex-col items-center justify-center gap-8 text-[24px]">
          <Link href="/explore" onClick={toggleMenu}>
            Explore
          </Link>
          <Link href="/connect" onClick={toggleMenu}>
            Connect
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/login" onClick={toggleMenu}>
            Sign in
          </Link>
          <Link href="/register" onClick={toggleMenu}>
            <p className="bg-[#501078] text-white py-[10px] px-[28px] rounded-[8px]">
              Sign up
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export { Header };
