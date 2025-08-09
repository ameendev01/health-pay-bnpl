"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen bg-[#d5f9fb] p-3 grid grid-cols-40 gap-3">
      {/* Put sidebar in a real grid column and let it fill that track */}
      <div className={sidebarCollapsed ? "col-span-2" : "col-span-7"}>
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          sidebarCollapsed ? "col-span-38" : "col-span-33"
        } min-w-0 rounded-2xl bg-[#fefcf5] overflow-y-auto flex flex-col shadow-xl border border-[#e7e4db]/50`}
      >
        <div className="flex-shrink-0">
          <Header
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
