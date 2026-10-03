"use client";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function SearchInput({
  value = "",
  onChange,
  onDebounce,
  debounceMs = 400,
  placeholder = "Search...",
  className,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (!onDebounce) return;
    const timer = setTimeout(() => {
      onDebounce(internalValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, debounceMs, onDebounce]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    setInternalValue("");
    if (onChange) onChange("");
    if (onDebounce) onDebounce("");
  };

  return (
    <div className={cn("relative flex items-center w-full sm:w-72", className)}>
      <FiSearch className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all shadow-xs"
        {...props}
      />
      {internalValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 text-zinc-400 hover:text-zinc-600 p-0.5 rounded-full"
          aria-label="Clear search"
        >
          <FiX className="text-xs" />
        </button>
      )}
    </div>
  );
}
