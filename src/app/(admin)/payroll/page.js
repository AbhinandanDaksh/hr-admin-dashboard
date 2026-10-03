"use client";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import StatCard from "@/components/common/StatCard";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function PayrollPage() {
  const payrollData = [
    { id: "PAY-01", employee: "Rahul Mehra", base: "$11,666", bonus: "$1,200", tax: "$1,800", net: "$11,066", status: "Processed" },
    { id: "PAY-02", employee: "Neha Singhania", base: "$9,583", bonus: "$800", tax: "$1,450", net: "$8,933", status: "Processed" },
    { id: "PAY-03", employee: "Karan Johar", base: "$7,083", bonus: "$500", tax: "$950", net: "$6,633", status: "Processed" },
    { id: "PAY-04", employee: "Tanvi Saxena", base: "$7,916", bonus: "$600", tax: "$1,100", net: "$7,416", status: "Pending" },
  ];

  const columns = [
    { header: "Receipt ID", accessor: "id", cellClassName: "text-xs font-semibold text-zinc-500" },
    { header: "Employee", accessor: "employee", cellClassName: "text-xs font-semibold text-zinc-900" },
    { header: "Base Salary", accessor: "base", cellClassName: "text-xs text-zinc-600" },
    { header: "Allowances / Bonus", accessor: "bonus", cellClassName: "text-xs text-emerald-600 font-medium" },
    { header: "Tax Deduction", accessor: "tax", cellClassName: "text-xs text-red-500" },
    { header: "Net Disbursed", accessor: "net", cellClassName: "text-xs font-bold text-zinc-900" },
    {
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "Processed" ? "success" : "warning"} dot>
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Payslip",
      className: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <button
          onClick={() => toast.success(`Downloading payslip for ${row.employee}`)}
          className="text-xs font-semibold text-rose-600 hover:text-rose-800"
        >
          Download PDF
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll & Compensation"
        subtitle="Monthly staff salary disbursement, tax withholdings, and payslips"
        badge={<Badge variant="primary">Cycle: October 2026</Badge>}
      >
        <Button
          onClick={() => toast.success("Exporting Payroll Batch (Demo)")}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
        >
          <Download className="w-4 h-4 mr-1.5" />
          Export Payroll Summary
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Payroll Outflow"
          value="$34,048"
          percentage={3.2}
          isIncrease={true}
          description="Total budget for October cycle"
          icon={CreditCard}
          variant="rose"
        />
        <StatCard
          title="Avg Net Salary"
          value="$8,512"
          description="Across 51 active team members"
          icon={DollarSign}
          variant="emerald"
        />
        <StatCard
          title="Pending Approvals"
          value="1 Slip"
          description="Awaiting finance sign-off"
          icon={CreditCard}
          variant="amber"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <DataTable
          columns={columns}
          data={payrollData}
          emptyMessage="No payroll records found"
        />
      </div>
    </div>
  );
}
