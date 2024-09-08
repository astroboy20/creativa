"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { CreatorForm } from "./creator";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

interface HeaderProps {
  showSearch?: boolean; // Optional prop to show search
  handleSearch?: (query: string) => void; // Search handler function
}

const Header: React.FC<HeaderProps> = ({ showSearch, handleSearch }) => {
  const pathName = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (handleSearch) {
      handleSearch(value);
    }
  };

  const currentUser = auth?.currentUser;

  const isActive = (route: string) =>
    pathName === route ? "border-b-2 border-[#501078]" : "";

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/login");
        toast.success("User logged out successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to log out. Please try again.");
      });
  };
  return (
    <div className="fixed flex justify-between items-center px-[6%] py-[3%] lg:py-[2%] bg-white w-full z-50">
      <div className="flex gap-14 items-center text-[20px]">
        <Link href={"/"}>
          <h1 className="text-[28px] md:text-[32px] font-[700] text-[#501078]">
            Creativa
          </h1>
        </Link>
        {pathName === "/explore" && (
          <div className="hidden lg:flex items-center gap-5">
            <Link href="/explore" className={isActive("/explore")}>
              <p>For You</p>
            </Link>
          </div>
        )}
      </div>

      {/* Navbar links for medium to large screens */}
      {pathName !== "/explore" && (
        <div className="hidden md:flex gap-10 items-center text-[20px]">
          <Link href="/explore" className={isActive("/explore")}>
            <p>Explore</p>
          </Link>
          <Link href="/about" className={isActive("/about")}>
            <p>About</p>
          </Link>
        </div>
      )}

      {showSearch && pathName === "/explore" ? (
        <div className="flex gap-5 items-center">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              className="hidden lg:flex border-2 border-[#501078] text-[#501078] py-[8px] px-[28px] rounded-[8px]"
              onClick={handleDialogOpen}
            >
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
              <CreatorForm onClose={handleDialogClose} />
            </DialogContent>
          </Dialog>
          <Input
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search"
            className="hidden lg:flex border border-[#501078]"
          />
        </div>
      ) : currentUser ? (
        <p
          className="hidden lg:flex bg-[#501078] text-white py-[10px] px-[28px] rounded-[8px] cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </p>
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
        {showSearch && pathName === "/explore" && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              className="border-2 border-[#501078] text-[#501078] py-[5px] px-[20px] rounded-[8px]"
              onClick={handleDialogOpen}
            >
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
              <CreatorForm onClose={handleDialogClose} />
            </DialogContent>
          </Dialog>
        )}

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
          <Link
            href="/explore"
            onClick={toggleMenu}
            className={isActive("/explore")}
          >
            Explore
          </Link>
          <Link
            href="/about"
            onClick={toggleMenu}
            className={isActive("/about")}
          >
            About
          </Link>

          {currentUser ? (
            <Link href="/register" onClick={toggleMenu}>
              <p
                className="bg-[#501078] text-white py-[10px] px-[28px] rounded-[8px] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </Link>
          ) : (
            <div className="flex flex-col gap-5 text-center">
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
      )}
    </div>
  );
};

export { Header };
