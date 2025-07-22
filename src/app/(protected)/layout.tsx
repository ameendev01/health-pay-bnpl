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
    <div className="min-h-screen bg-[#d5f9fb] p-6">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="ml-0 lg:ml-72 h-[calc(100vh-3rem)] rounded-2xl bg-[#fefcf5] overflow-y-auto flex flex-col transition-all duration-300 shadow-xl border border-[#e7e4db]/50">
        <div className="flex-shrink-0">
          <Header setSidebarOpen={setSidebarOpen} />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
        </div>
      </div>
    </div>
  );
}