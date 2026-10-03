"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function AdminLayoutContent({ children }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#faf8f9] text-zinc-800 antialiased flex selection:bg-rose-100 selection:text-rose-900">
      {/* Desktop Sidebar - Fixed to left with smooth width transition */}
      <aside
        className={`hidden sm:block fixed top-0 left-0 h-screen z-50 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20 overflow-visible" : "w-64"
        }`}
      >
        <Sidebar />
      </aside>


      {/* Main Container - Naturally flows directly under navbar with dynamic margin */}
      <div
        className={`flex-1 flex flex-col min-h-screen min-w-0 w-full transition-all duration-300 ease-in-out ${
          isCollapsed ? "sm:ml-20" : "sm:ml-64"
        }`}
      >
        {/* Sticky Top Navbar */}
        <div className="sticky top-0 z-40 w-full">
          <Navbar />
        </div>

        {/* Content Area - starts right below navbar without overlapping */}
        <main className="flex-1 p-5 sm:p-7 lg:p-8 w-full min-w-0 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}