"use client";
import { useState, useEffect } from "react";
import { hrService } from "@/lib/apiClient";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import toast from "react-hot-toast";

export default function CandidatesTable() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await hrService.getCandidates({
        search: searchTerm,
        page: currentPage,
        per_page: rowsPerPage,
      });

      setCandidates(response.data || []);
      setTotalPages(Math.ceil((response.total || 0) / rowsPerPage) || 1);
    } catch (err) {
      console.error("Error loading candidates:", err);
      toast.error("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [currentPage, rowsPerPage, searchTerm]);

  // Column definitions for DataTable
  const columns = [
    {
      header: "#",
      className: "w-14 text-center",
      cellClassName: "text-center text-xs font-semibold text-zinc-400",
      render: (_, idx) => (currentPage - 1) * rowsPerPage + idx + 1,
    },
    {
      header: "Candidate Name",
      accessor: "name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] flex items-center justify-center border border-rose-100 shrink-0">
            {row.name.charAt(0)}
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-zinc-900 text-xs">{row.name}</p>
            <p className="text-[11px] text-zinc-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Applied Role",
      accessor: "job_title",
      render: (row) => (
        <span className="font-medium text-zinc-700 text-xs">
          {row.job_title}
        </span>
      ),
    },
    {
      header: "Phone",
      accessor: "phone",
      cellClassName: "text-xs text-zinc-500 font-normal",
    },
    {
      header: "Status",
      render: (_, idx) => {
        const statuses = [
          { label: "Under Review", variant: "primary" },
          { label: "Shortlisted", variant: "purple" },
          { label: "Technical Round", variant: "info" },
          { label: "Hired", variant: "success" },
        ];
        const status = statuses[idx % statuses.length];
        return (
          <Badge variant={status.variant} dot>
            {status.label}
          </Badge>
        );
      },
    },
    {
      header: "Applied On",
      accessor: "applied_at",
      render: (row) => (
        <span className="text-xs text-zinc-400">
          {new Date(row.applied_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Resume",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={() => toast.success(`Viewing demo resume for ${row.name}`)}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline transition-colors"
        >
          View Resume
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Candidate Applications"
        subtitle="Review, search, and manage candidate hiring pipelines"
        badge={
          <Badge variant="primary">
            {candidates.length} Loaded
          </Badge>
        }
      >
        <SearchInput
          placeholder="Search by name, role or email..."
          onDebounce={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
        />
      </PageHeader>

      <DataTable
        columns={columns}
        data={candidates}
        loading={loading}
        emptyMessage="No candidate applications found"
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          rowsPerPage,
          onRowsPerPageChange: (size) => {
            setRowsPerPage(size);
            setCurrentPage(1);
          },
        }}
      />
    </div>
  );
}
