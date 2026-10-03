"use client";
import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  rowsOptions = [5, 10, 25, 50],
  className,
}) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 py-3 text-xs sm:text-sm text-zinc-500",
        className
      )}
    >
      {/* Rows per page selector */}
      {onRowsPerPageChange && (
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1 text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 shadow-xs"
          >
            {rowsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Page controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className="h-8 w-8 p-0 rounded-lg border-zinc-200 hover:bg-zinc-50 disabled:opacity-40"
          aria-label="Previous Page"
        >
          <FiChevronLeft />
        </Button>

        {getPageNumbers().map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-1 text-zinc-400 select-none">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={currentPage === p ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(p)}
              className={cn(
                "h-8 min-w-8 px-2 rounded-lg text-xs font-semibold transition-all",
                currentPage === p
                  ? "bg-rose-600 hover:bg-rose-700 text-white shadow-xs border-transparent"
                  : "border-zinc-200 hover:bg-rose-50 hover:text-rose-700 text-zinc-600"
              )}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 p-0 rounded-lg border-zinc-200 hover:bg-zinc-50 disabled:opacity-40"
          aria-label="Next Page"
        >
          <FiChevronRight />
        </Button>
      </div>
    </div>
  );
}
