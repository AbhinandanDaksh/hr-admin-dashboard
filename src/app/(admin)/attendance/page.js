"use client";
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import StatCard from "@/components/common/StatCard";
import { UserCheck, Clock, AlertCircle } from "lucide-react";

export default function AttendancePage() {
  const attendanceRecords = [
    { id: 1, name: "Rahul Mehra", checkIn: "09:05 AM", checkOut: "06:10 PM", status: "On Time", hours: "9h 05m" },
    { id: 2, name: "Neha Singhania", checkIn: "09:25 AM", checkOut: "06:30 PM", status: "Late Arrival", hours: "9h 05m" },
    { id: 3, name: "Karan Johar", checkIn: "08:55 AM", checkOut: "05:50 PM", status: "On Time", hours: "8h 55m" },
    { id: 4, name: "Tanvi Saxena", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "On Time", hours: "9h 00m" },
    { id: 5, name: "Aditya Roy", checkIn: "-", checkOut: "-", status: "On Leave", hours: "0h" },
  ];

  const columns = [
    { header: "Employee", accessor: "name", cellClassName: "text-xs font-semibold text-zinc-900" },
    { header: "Check In", accessor: "checkIn", cellClassName: "text-xs text-zinc-600" },
    { header: "Check Out", accessor: "checkOut", cellClassName: "text-xs text-zinc-600" },
    { header: "Effective Hours", accessor: "hours", cellClassName: "text-xs font-medium text-zinc-700" },
    {
      header: "Status",
      render: (row) => (
        <Badge
          variant={
            row.status === "On Time"
              ? "success"
              : row.status === "Late Arrival"
              ? "warning"
              : "danger"
          }
          dot
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance & Time Tracking"
        subtitle="Live daily clock-in records, shift overtimes, and leave requests"
        badge={<Badge variant="success" dot>Today: Live</Badge>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Present Today"
          value="94.2%"
          description="48 / 51 staff checked in"
          icon={UserCheck}
          variant="emerald"
        />
        <StatCard
          title="On-Time Arrival"
          value="89.5%"
          description="Average check-in 09:04 AM"
          icon={Clock}
          variant="rose"
        />
        <StatCard
          title="On Approved Leave"
          value="3 Staff"
          description="2 Sick Leaves, 1 Casual"
          icon={AlertCircle}
          variant="amber"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
        <DataTable
          columns={columns}
          data={attendanceRecords}
          emptyMessage="No attendance logs found for today"
        />
      </div>
    </div>
  );
}
