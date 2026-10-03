"use client";
import { useState, useEffect } from "react";
import { hrService } from "@/lib/apiClient";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import AddJobModal from "./addJobs";
import EditJobModal from "./editJobs";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await hrService.getJobs({
        search: searchTerm,
        page: currentPage,
        limit: rowsPerPage,
      });

      setJobs(response.data || []);
      setTotalPages(Math.ceil((response.total || 0) / rowsPerPage) || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error("Failed to load job listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, rowsPerPage, searchTerm]);

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await hrService.deleteJob(deleteTargetId);
      toast.success("Job posting deleted successfully");
      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      fetchJobs();
    } catch (err) {
      toast.error("Failed to delete job posting");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      header: "#",
      className: "w-14 text-center",
      cellClassName: "text-center text-xs font-semibold text-zinc-400",
      render: (_, idx) => (currentPage - 1) * rowsPerPage + idx + 1,
    },
    {
      header: "Job Title",
      accessor: "title",
      render: (row) => (
        <div className="leading-tight">
          <p className="font-semibold text-zinc-900 text-xs">{row.title}</p>
          <p className="text-[11px] text-zinc-400">{row.department || "General"}</p>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: "location",
      cellClassName: "text-xs text-zinc-600 font-medium",
    },
    {
      header: "Experience",
      accessor: "experience",
      render: (row) => (
        <span className="text-xs text-zinc-500 font-normal">
          {row.experience || "Not Specified"}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "success" : "primary"} dot>
          {row.status || "Active"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedJob(row);
              setIsEditOpen(true);
            }}
            className="h-7 w-7 p-0 rounded-lg text-zinc-500 hover:text-rose-600 hover:border-rose-200"
            aria-label="Edit Job"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDeleteTargetId(row.id);
              setIsDeleteOpen(true);
            }}
            className="h-7 w-7 p-0 rounded-lg text-zinc-500 hover:text-red-600 hover:border-red-200"
            aria-label="Delete Job"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Job Openings"
        subtitle="Manage open positions, job descriptions, and hiring requisitions"
        badge={<Badge variant="primary">{jobs.length} Positions</Badge>}
      >
        <SearchInput
          placeholder="Search jobs by title or department..."
          onDebounce={(val) => {
            setSearchTerm(val);
            setCurrentPage(1);
          }}
        />
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
        >
          <FiPlus className="w-4 h-4 mr-1.5" />
          Post New Job
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={jobs}
        loading={loading}
        emptyMessage="No job openings available"
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

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={() => {
          fetchJobs();
          setIsAddOpen(false);
        }}
      />

      {/* Edit Job Modal */}
      {selectedJob && (
        <EditJobModal
          isOpen={isEditOpen}
          job={selectedJob}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedJob(null);
          }}
          onUpdated={() => {
            fetchJobs();
            setIsEditOpen(false);
            setSelectedJob(null);
          }}
        />
      )}

      {/* Confirm Delete Alert */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Job Opening"
        description="Are you sure you want to remove this job posting? This action cannot be undone."
        confirmText="Delete Job"
        loading={deleting}
      />
    </div>
  );
}
