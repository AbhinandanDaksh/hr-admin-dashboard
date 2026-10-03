import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes conditionally
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string into readable format (e.g., "Oct 02, 2026")
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    });
  } catch {
    return dateString;
  }
}

/**
 * Format a number with commas (e.g., 1,280)
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return "0";
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Truncate long text with ellipsis
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
