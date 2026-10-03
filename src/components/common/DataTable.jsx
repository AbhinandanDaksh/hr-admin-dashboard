"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./Pagination";
import { cn } from "@/lib/utils";

/**
 * Universal Open-Source Data Table Component
 *
 * @param {Array} columns - [{ header: "Name", accessor: "name", render: (row) => ... }]
 * @param {Array} data - Array of row objects
 * @param {Boolean} loading - Loading state boolean
 * @param {String} emptyMessage - Text when no data found
 * @param {Object} pagination - { currentPage, totalPages, onPageChange, rowsPerPage, onRowsPerPageChange }
 */
export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found",
  pagination,
  className,
  onRowClick,
}) {
  return (
    <div className={cn("w-full space-y-2.5", className)}>
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
        <Table className="min-w-full table-auto text-left">
          <TableHeader className="bg-zinc-50/70 border-b border-zinc-200/80">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "text-[11px] font-bold text-zinc-500 uppercase tracking-wider py-2.5 px-3.5",
                    col.className
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-zinc-100 text-xs sm:text-sm">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length || 1}
                  className="py-10 text-center text-zinc-400"
                >
                  <div className="inline-flex items-center gap-2 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((row, rowIdx) => (
                <TableRow
                  key={row.id || row._id || rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(
                    "hover:bg-rose-50/20 transition-colors",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className={cn("py-2.5 px-3.5 text-zinc-700", col.cellClassName)}
                    >
                      {col.render
                        ? col.render(row, rowIdx)
                        : col.accessor
                        ? row[col.accessor] ?? "-"
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length || 1}
                  className="py-8 text-center text-xs text-zinc-400 font-normal"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bar */}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
        />
      )}
    </div>
  );
}
