"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaHome, FaChartLine, FaCogs } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("token");
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
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static w-64 h-full bg-[#501078] text-white p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Dashboard</h2>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-white focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav>
          <Link href="/dashboard">
            <p className="flex items-center py-2.5 rounded hover:bg-[#ECD2FC66]">
              <FaHome className="mr-2" />
             Home
            </p>
          </Link>
          <Link href="/dashboard/performance">
            <p className="flex items-center py-2.5 rounded hover:bg-[#ECD2FC66]">
              <FaChartLine className="mr-2" />
              Performance Overview
            </p>
          </Link>
          <Link href="/dashboard/settings">
            <p className="flex items-center py-2.5 rounded hover:bg-[#ECD2FC66]">
              <FaCogs className="mr-2" />
              Account Settings
            </p>
          </Link>
          <p
            className="flex items-center py-2.5 rounded hover:bg-[#ECD2FC66] cursor-pointer"
            onClick={handleLogout}
          >
            <FaCogs className="mr-2" />
            Logout
          </p>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#ECD2FC66] p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-[#501078]">
            Welcome Back!
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden lg:flex lg:px-4 lg:py-2 lg:border lg:rounded-md lg:border-gray-300"
            />
            <button className="relative z-10 block w-8 h-8 rounded-full overflow-hidden shadow focus:outline-none">
              <img
                className="w-full h-full object-cover"
                src={user?.photoURL || "/default-avatar.png"} 
                alt="User avatar"
              />
            </button>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-[#501078] focus:outline-none"
            >
              <FaBars size={24} />
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
