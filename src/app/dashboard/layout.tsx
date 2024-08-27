// components/Layout.tsx
import React from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#501078] text-white p-6 md:h-full">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <Link href="/dashboard/user-management">
            <p className="block py-2.5 px-4 rounded hover:bg-[#ECD2FC66]">User Management</p>
          </Link>
          <Link href="/dashboard/content-management">
            <p className="block py-2.5 px-4 rounded hover:bg-[#ECD2FC66]">Content Management</p>
          </Link>
          <Link href="/dashboard/analytics">
            <p className="block py-2.5 px-4 rounded hover:bg-[#ECD2FC66]">Analytics</p>
          </Link>
          <Link href="/dashboard/settings">
            <p className="block py-2.5 px-4 rounded hover:bg-[#ECD2FC66]">Settings</p>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-[#ECD2FC66] p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-[#501078]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md border-gray-300"
            />
            <button className="relative z-10 block w-8 h-8 rounded-full overflow-hidden shadow focus:outline-none">
              <img className="w-full h-full object-cover" src="/user-avatar.png" alt="User avatar" />
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
