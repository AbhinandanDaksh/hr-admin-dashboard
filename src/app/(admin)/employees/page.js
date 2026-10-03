"use client";
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import SearchInput from "@/components/common/SearchInput";
import { mockEmployees } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";
import toast from "react-hot-toast";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (emp) => {
    setSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  const columns = [
    {
      header: "Employee ID",
      accessor: "id",
      cellClassName: "text-xs font-semibold text-zinc-500",
    },
    {
      header: "Employee Name",
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
      header: "Designation",
      accessor: "role",
      cellClassName: "text-xs text-zinc-700 font-medium",
    },
    {
      header: "Department",
      accessor: "department",
      cellClassName: "text-xs text-zinc-500",
    },
    {
      header: "Location",
      accessor: "location",
      cellClassName: "text-xs text-zinc-400",
    },
    {
      header: "Status",
      render: (row) => (
        <Badge
          variant={row.status === "Active" ? "success" : "warning"}
          dot
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Action",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDetails(row);
          }}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <PageHeader
        title="Employee Directory"
        subtitle="Manage full-time staff, departmental allocations, and work statuses"
        badge={<Badge variant="primary">{employees.length} Staff</Badge>}
      >
        <SearchInput
          placeholder="Search by name, ID or department..."
          onDebounce={(val) => setSearchTerm(val)}
        />
        <Button
          onClick={() => toast.success("Add Employee Modal (Demo)")}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          Add Employee
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        onRowClick={(emp) => handleOpenDetails(emp)}
        emptyMessage="No employees found"
      />

      {/* Employee Details Modal */}
      <EmployeeDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
      />
    </div>
  );
}
