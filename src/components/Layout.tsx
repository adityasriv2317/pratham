'use client'

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";

interface LayoutProps {
  role: "admin" | "doctor" | "staff" | "patient";
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ role, children }) => {
  return (
    <div className="flex md:flex-row flex-col h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="flex-1 p-6 bg-gray-50">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t text-center py-3 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} HospitalSys. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
