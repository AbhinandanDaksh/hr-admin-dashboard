"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext({
  isCollapsed: false,
  toggleCollapse: () => {},
  isMobileOpen: false,
  toggleMobileOpen: () => {},
  closeMobile: () => {},
});

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load user preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hr_sidebar_collapsed");
      if (saved !== null) {
        setIsCollapsed(saved === "true");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("hr_sidebar_collapsed", String(next));
      } catch (e) {}
      return next;
    });
  };

  const toggleMobileOpen = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        isMobileOpen,
        toggleMobileOpen,
        closeMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
