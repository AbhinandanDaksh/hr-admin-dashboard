"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  UserCheck,
  Clock,
  CreditCard,
  BarChart3,
  Settings,
  ChevronDown,
  Building2,
  FileSpreadsheet,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/common/BrandLogo";
import toast from "react-hot-toast";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Navigation schema with standalone links and collapsible groups
  const menuItems = [
    {
      type: "link",
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      type: "group",
      id: "recruitment",
      label: "Recruitment & ATS",
      icon: Users,
      children: [
        { label: "Job Openings", href: "/notification" },
        { label: "Candidates (ATS)", href: "/users" },
        { label: "Interview Pipeline", href: "/interviews" },
      ],
    },
    {
      type: "group",
      id: "workforce",
      label: "Workforce & Staff",
      icon: UserCheck,
      children: [
        { label: "Employee Directory", href: "/employees" },
        { label: "Attendance & Leaves", href: "/attendance" },
        { label: "Payroll & Salary", href: "/payroll" },
      ],
    },
    {
      type: "group",
      id: "organization",
      label: "Organization & Admin",
      icon: Building2,
      children: [
        { label: "Reports & Analytics", href: "/reports" },
        { label: "System Settings", href: "/settings" },
      ],
    },
  ];

  // Track open state of collapsible groups in expanded mode
  const [openGroups, setOpenGroups] = useState({
    recruitment: true,
    workforce: true,
    organization: true,
  });

  // Auto-expand the group that contains the current active route
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.type === "group" && item.children) {
        const hasActiveChild = item.children.some((child) => pathname === child.href);
        if (hasActiveChild) {
          setOpenGroups((prev) => ({ ...prev, [item.id]: true }));
        }
      }
    });
  }, [pathname]);

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    toast.success("Signed out successfully");
    router.replace("/login");
  };

  return (
    <>
      <div
        className={`min-h-screen h-full bg-white border-r border-zinc-200/80 flex flex-col shadow-[1px_0_12px_rgba(0,0,0,0.02)] select-none transition-all duration-300 ${
          isCollapsed ? "w-20 items-center overflow-visible" : "w-64 overflow-hidden"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`p-3.5 border-b border-zinc-100 flex items-center ${
            isCollapsed ? "justify-center w-full" : "justify-start"
          }`}
        >
          <BrandLogo
            size="md"
            showText={!isCollapsed}
            subtitle="Talent Management"
            href="/dashboard"
          />
        </div>

        {/* Navigation List */}
        <nav
          className={`flex-1 p-3 space-y-1.5 w-full ${
            isCollapsed ? "flex flex-col items-center overflow-visible" : "overflow-y-auto"
          }`}
        >
          {!isCollapsed && (
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Main Navigation
            </div>
          )}

          {menuItems.map((item, idx) => {
            // STANDALONE LINK
            if (item.type === "link") {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              if (isCollapsed) {
                return (
                  <div key={item.href} className="relative group my-1">
                    <Link
                      href={item.href}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ${
                        isActive
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 font-semibold"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>

                    {/* Floating Tooltip */}
                    <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-xl whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-[100] before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3 before:content-['']">
                      {item.label}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-rose-50 text-rose-700 font-semibold border border-rose-200/60 shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-rose-600" : "text-zinc-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            }

            // GROUP WITH SUB-TABS
            if (item.type === "group") {
              const isOpen = !!openGroups[item.id];
              const hasActiveChild = item.children.some((child) => pathname === child.href);
              const Icon = item.icon;

              // COLLAPSED MINI RAIL VIEW (Flyout on hover)
              if (isCollapsed) {
                return (
                  <div key={item.id} className="relative group my-1">
                    {/* Subtle divider before first group */}
                    {idx === 1 && (
                      <div className="w-8 h-px bg-zinc-200/70 mx-auto my-1.5" />
                    )}

                    <button
                      type="button"
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer ${
                        hasActiveChild
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>

                    {/* Flyout Submenu Popover on Hover */}
                    <div className="absolute left-[calc(100%+8px)] top-0 w-56 bg-white border border-zinc-200/90 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.1)] p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-[100] before:absolute before:-left-3 before:top-0 before:bottom-0 before:w-3 before:content-['']">
                      <div className="px-2.5 py-1 text-xs font-bold text-zinc-900 border-b border-zinc-100 mb-1.5 flex items-center justify-between">
                        <span>{item.label}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-semibold">
                          {item.children.length} tabs
                        </span>
                      </div>

                      <div className="space-y-1">
                        {item.children.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                                isSubActive
                                  ? "bg-rose-50 text-rose-700 font-bold border border-rose-200/60"
                                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              // EXPANDED VIEW WITH TREE BRANCH CONNECTORS
              return (
                <div key={item.id} className="space-y-0.5">
                  {/* Collapsible Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                      hasActiveChild && !isOpen
                        ? "bg-rose-50/70 text-rose-700 border border-rose-200/50"
                        : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          hasActiveChild ? "text-rose-600" : "text-zinc-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-zinc-600" : ""
                      }`}
                    />
                  </button>

                  {/* Tree-Branch Submenu */}
                  {isOpen && (
                    <div className="relative ml-5 pl-3.5 border-l border-zinc-200/90 py-1 space-y-0.5 my-0.5">
                      {item.children.map((subItem) => {
                        const isSubActive = pathname === subItem.href;

                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`group relative flex items-center py-1.5 px-2.5 rounded-lg text-xs transition-all duration-150 ${
                              isSubActive
                                ? "text-rose-700 font-semibold bg-rose-50/80"
                                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                            }`}
                          >
                            {/* Curved tree-branch connector line */}
                            <span className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-3.5 h-3 border-b border-l border-zinc-200/90 rounded-bl-[6px] pointer-events-none" />

                            <span className="truncate">{subItem.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })}
        </nav>

        {/* User Profile, Settings & Logout Footer */}
        <div className={`p-3 border-t border-zinc-100 bg-zinc-50/30 ${isCollapsed ? "w-full flex flex-col items-center gap-2" : ""}`}>
          {isCollapsed ? (
            <>
              {/* Settings Icon in Mini Rail */}
              <div className="relative group">
                <Link
                  href="/settings"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    pathname === "/settings"
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </Link>
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-zinc-900 text-white text-xs font-medium rounded-xl whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100]">
                  System Settings
                </div>
              </div>

              {/* Logout Icon in Mini Rail */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-2.5 py-1 bg-rose-600 text-white text-xs font-medium rounded-xl whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100]">
                  Sign Out
                </div>
              </div>
            </>
          ) : (
            <div className="p-2.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  A
                </div>
                <div className="leading-tight overflow-hidden">
                  <p className="text-xs font-bold text-zinc-900 truncate">Super Admin</p>
                  <p className="text-[10px] text-zinc-400 truncate">admin@company.com</p>
                </div>
              </div>

              {/* Quick Action Buttons: Settings & Logout */}
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href="/settings"
                  className={`p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors ${
                    pathname === "/settings" ? "text-rose-600 bg-rose-50 font-bold" : ""
                  }`}
                  title="System Settings"
                >
                  <Settings className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog Modal */}
      {showLogoutModal && (
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
                onClick={() => setShowLogoutModal(false)}
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



