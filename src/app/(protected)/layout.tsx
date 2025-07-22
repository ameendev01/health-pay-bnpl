'use client'

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
    <div className="min-h-screen bg-[#d5f9fb] p-6">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      <div className={`transition-all duration-500 ease-in-out ${
        sidebarCollapsed 
          ? 'ml-6 lg:ml-22' // Collapsed: sidebar width (16) + gap (6) = 22
          : 'ml-6 lg:ml-78' // Expanded: sidebar width (72) + gap (6) = 78
      } h-[calc(100vh-3rem)] rounded-2xl bg-[#fefcf5] overflow-y-auto flex flex-col shadow-xl border border-[#e7e4db]/50`}>
        <div className="flex-shrink-0">
          <Header 
            setSidebarOpen={setSidebarOpen} 
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}