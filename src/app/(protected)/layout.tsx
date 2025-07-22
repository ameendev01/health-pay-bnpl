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
          ? 'ml-0 lg:ml-20' // Collapsed: small margin for icon bar
          : 'ml-0 lg:ml-80' // Expanded: full margin for full sidebar
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