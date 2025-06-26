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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="pl-0 lg:pl-64 transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}
