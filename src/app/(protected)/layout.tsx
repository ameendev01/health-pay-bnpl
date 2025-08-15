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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 grid grid-cols-40 gap-4">
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
        className={`transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "col-span-38" : "col-span-33"
        } min-w-0 rounded-2xl bg-white/70 backdrop-blur-xl overflow-y-auto flex flex-col shadow-xl border-0 px-6 sm:px-8 lg:px-8 pb-8 pt-4`}
      >
        <div className="flex-shrink-0">
          <Header
            setSidebarOpen={setSidebarOpen}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div>
        <div className="flex-1 pt-8">{children}</div>
      </div>
    </div>
  );
}
