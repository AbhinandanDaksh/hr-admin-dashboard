"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiMenu, FiX } from "react-icons/fi";
import { LogOut } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/context/SidebarContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleCollapse, isMobileOpen, toggleMobileOpen, closeMobile } = useSidebar();

  // Format active route name
  const getPageTitle = () => {
    if (pathname.includes("/users")) return "Candidates Management";
    if (pathname.includes("/notification")) return "Job Openings";
    if (pathname.includes("/interviews")) return "Interviews & Evaluations";
    if (pathname.includes("/employees")) return "Employee Directory";
    if (pathname.includes("/attendance")) return "Attendance & Leaves";
    if (pathname.includes("/payroll")) return "Payroll & Compensation";
    if (pathname.includes("/reports")) return "Reports & Analytics";
    if (pathname.includes("/settings")) return "System Settings";
    return "Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsModalOpen(false);
    toast.success("Signed out successfully");
    router.replace("/login");
  };

  return (
    <>
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] px-4 sm:px-6 h-16 flex items-center justify-between z-30">
        {/* Left: Hamburger toggle + Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.innerWidth < 640) {
                toggleMobileOpen();
              } else {
                toggleCollapse();
              }
            }}
            className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <FiMenu className="text-lg" />
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
            <span className="hidden sm:inline">Home</span>
            <span className="hidden sm:inline text-zinc-300">»</span>
            <span className="text-zinc-900 font-bold text-sm sm:text-base">
              {getPageTitle()}
            </span>
          </div>
        </div>

        {/* Right action area */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* User profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-zinc-200/80">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-zinc-800 leading-none">Super Admin</p>
              <p className="text-[10px] text-zinc-400 leading-tight">HR Manager</p>
            </div>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            size="sm"
            className="text-xs font-semibold text-zinc-600 border-zinc-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 ml-1 cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-zinc-900/40 z-40 sm:hidden backdrop-blur-xs"
            onClick={closeMobile}
          />

          <aside className="fixed top-0 left-0 h-full w-64 shadow-2xl z-50 transition-transform duration-300 sm:hidden">
            <div className="relative h-full">
              <button
                onClick={closeMobile}
                className="absolute top-4 right-4 z-50 text-zinc-600 text-lg p-1.5 bg-zinc-100 rounded-full cursor-pointer"
                aria-label="Close Sidebar"
              >
                <FiX />
              </button>
              <Sidebar />
            </div>
          </aside>
        </>
      )}

      {/* Logout Confirmation Dialog Modal (Matches Sidebar exactly) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-zinc-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-2xl border border-zinc-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-100">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 mb-1">
              Sign Out of Portal?
            </h3>
            <p className="text-xs text-zinc-500 mb-5">
              Are you sure you want to end your administrative session?
            </p>
            <div className="flex justify-center gap-2.5">
              <Button
                variant="outline"
                className="flex-1 text-xs font-semibold border-zinc-200 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
                onClick={handleLogout}
              >
                Yes, Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


