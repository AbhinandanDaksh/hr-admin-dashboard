"use client";
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import SearchInput from "@/components/common/SearchInput";
import { mockInterviews } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function InterviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [interviews, setInterviews] = useState(mockInterviews);

  const columns = [
    {
      header: "#",
      className: "w-12 text-center",
      cellClassName: "text-center text-xs text-zinc-400 font-medium",
      render: (_, idx) => idx + 1,
    },
    {
      header: "Candidate Name",
      accessor: "candidate",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] flex items-center justify-center border border-rose-100">
            {row.candidate.charAt(0)}
          </div>
          <p className="font-semibold text-zinc-900 text-xs">{row.candidate}</p>
        </div>
      ),
    },
    {
      header: "Job Role",
      accessor: "role",
      cellClassName: "text-xs text-zinc-700 font-medium",
    },
    {
      header: "Interview Round",
      accessor: "type",
      cellClassName: "text-xs text-zinc-500",
    },
    {
      header: "Assigned Interviewer",
      accessor: "interviewer",
      cellClassName: "text-xs text-zinc-600 font-medium",
    },
    {
      header: "Scheduled Time",
      accessor: "date",
      render: (row) => (
        <span className="text-xs font-semibold text-rose-600">
          {row.date}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <Badge
          variant={row.status === "Confirmed" ? "success" : "primary"}
          dot
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-5 bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <PageHeader
        title="Interviews & Evaluations"
        subtitle="Manage candidate interview schedules, technical rounds, and feedback"
        badge={<Badge variant="primary">{interviews.length} Scheduled</Badge>}
      >
        <SearchInput
          placeholder="Search by candidate or role..."
          onDebounce={(val) => setSearchTerm(val)}
        />
        <Button
          onClick={() => toast.success("Schedule modal opened (Demo)")}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Schedule Interview
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={interviews.filter(
          (i) =>
            i.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.role.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        emptyMessage="No interviews scheduled matching criteria"
      />
    </div>
  );
}
