"use client";

import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  role: "admin" | "doctor" | "staff" | "patient";
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ role, children }) => {
  return (
    <div className="flex md:flex-row flex-col h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar role={role} />

      <div className="flex flex-col flex-1 bg-[#0a2540] overflow-y-auto">
        <main className="flex-1 bg-[#0a2540]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
