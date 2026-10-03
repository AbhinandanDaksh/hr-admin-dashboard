"use client";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart2, PieChart } from "lucide-react";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const reportsList = [
    { title: "Monthly Hiring & Velocity Report", format: "PDF & Excel", date: "Oct 01, 2026", desc: "Breakdown of applicant conversion, cost-per-hire, and department time-to-fill." },
    { title: "Quarterly Workforce Diversity & Headcount", format: "PDF", date: "Sep 30, 2026", desc: "Demographic breakdown, gender ratio, and seniority distribution." },
    { title: "Attendance & Overtime Ledger", format: "CSV", date: "Sep 28, 2026", desc: "Daily time tracking logs, punch-ins, and overtime pay calculation." },
    { title: "Annual Payroll & Tax Summary", format: "PDF & CSV", date: "Aug 31, 2026", desc: "Total compensation disbursement, benefit deductions, and tax withholdings." },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics Hub"
        subtitle="Generate and export automated audit reports, workforce analytics, and hiring insights"
        badge={<Badge variant="primary">4 Ready Reports</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportsList.map((rep, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 hover:border-rose-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                  {rep.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{rep.desc}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-xs text-zinc-400">
              <span className="font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                {rep.format}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`Downloading ${rep.title}`)}
                className="text-xs font-semibold text-rose-600 border-zinc-200 hover:bg-rose-50 hover:text-rose-700"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
