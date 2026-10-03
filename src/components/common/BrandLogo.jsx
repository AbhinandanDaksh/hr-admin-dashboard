"use client";

import React from "react";
import Link from "next/link";

export default function BrandLogo({
  size = "md",
  showText = true,
  subtitle = "HR Management",
  href = "/dashboard",
  className = "",
}) {
  // Dimensions based on size
  const iconSizes = {
    sm: "w-8 h-8 rounded-lg text-xs",
    md: "w-10 h-10 rounded-xl text-sm",
    lg: "w-12 h-12 rounded-2xl text-base",
  };

  const titleSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-extrabold",
  };

  const LogoIcon = (
    <div
      className={`${iconSizes[size] || iconSizes.md} bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-500 text-white flex items-center justify-center font-black tracking-tight shadow-md shadow-rose-500/25 shrink-0 select-none relative overflow-hidden group`}
    >
      {/* Subtle shine highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20 pointer-events-none" />
      
      {/* Dynamic SVG Emblem */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/4 h-3/4"
      >
        {/* Left Pillar H */}
        <rect x="6" y="8" width="3.2" height="16" rx="1.6" fill="#ffffff" />
        {/* Right Pillar R */}
        <rect x="14.5" y="8" width="3.2" height="16" rx="1.6" fill="#ffffff" />
        {/* Middle Crossbar */}
        <rect x="6" y="14" width="11.5" height="3" rx="1.5" fill="#ffffff" />
        {/* R Loop */}
        <path
          d="M 16 8.5 C 20 8.5 22.5 10 22.5 12.5 C 22.5 15 20 16.5 16 16.5"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* R Leg */}
        <path
          d="M 18.5 16 L 23 23.5"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Small top talent spark */}
        <circle cx="24.5" cy="7" r="2" fill="#fed7aa" />
      </svg>
    </div>
  );

  const LogoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      {LogoIcon}

      {showText && (
        <div className="overflow-hidden leading-tight text-left">
          <h2 className={`${titleSizes[size] || "text-sm"} font-bold tracking-tight text-zinc-900 truncate`}>
            HR Core <span className="text-rose-600 font-extrabold">Admin</span>
          </h2>
          {subtitle && (
            <p className="text-[10px] text-zinc-400 font-medium truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center hover:opacity-95 transition-opacity">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
