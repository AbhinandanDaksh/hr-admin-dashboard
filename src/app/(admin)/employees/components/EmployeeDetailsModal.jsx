"use client";
import Modal from "@/components/common/Modal";
import Badge from "@/components/common/Badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  UserCheck, 
  CreditCard, 
  ShieldAlert,
  Clock,
  Sparkles,
  Download
} from "lucide-react";
import toast from "react-hot-toast";

export default function EmployeeDetailsModal({ isOpen, onClose, employee }) {
  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Profile Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-rose-50/30 border border-rose-100/80">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-rose-500/20">
              {employee.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-900 leading-tight">
                  {employee.name}
                </h2>
                <Badge
                  variant={employee.status === "Active" ? "success" : "warning"}
                  dot
                >
                  {employee.status}
                </Badge>
              </div>
              <p className="text-xs font-medium text-rose-600 mt-0.5">{employee.role}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                <span className="font-semibold text-zinc-700 bg-white/80 px-2 py-0.5 rounded-md border border-rose-100">
                  {employee.id}
                </span>
                <span>•</span>
                <span>{employee.department}</span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs">
            <p className="text-zinc-400">Joined Company</p>
            <p className="font-bold text-zinc-800">{employee.joinedDate}</p>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <p className="text-[11px] font-medium text-zinc-400">Attendance Rate</p>
            <p className="text-base font-bold text-zinc-900 mt-0.5">
              {employee.attendanceRate || "98.0%"}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <p className="text-[11px] font-medium text-zinc-400">Leaves Balance</p>
            <p className="text-base font-bold text-zinc-900 mt-0.5">
              {employee.leavesRemaining || "14 / 18 Days"}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100 col-span-2 sm:col-span-1">
            <p className="text-[11px] font-medium text-zinc-400">Employment Type</p>
            <p className="text-xs font-bold text-zinc-900 mt-1 truncate">
              {employee.employmentType || "Full-Time"}
            </p>
          </div>
        </div>

        {/* 2-Column Detailed Information Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* Column 1: Contact & Location */}
          <div className="space-y-3.5 p-4 rounded-xl border border-zinc-100 bg-white shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              Contact & Location
            </h3>

            <div className="space-y-2.5">
              <div>
                <p className="text-zinc-400 text-[11px]">Work Email</p>
                <a
                  href={`mailto:${employee.email}`}
                  className="font-semibold text-rose-600 hover:underline"
                >
                  {employee.email}
                </a>
              </div>

              <div>
                <p className="text-zinc-400 text-[11px]">Contact Phone</p>
                <p className="font-semibold text-zinc-800">
                  {employee.phone || "+91 98765 00000"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 text-[11px]">Office / Work Location</p>
                <p className="font-semibold text-zinc-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  {employee.location || "Mumbai HQ (Hybrid)"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 text-[11px]">Emergency Contact</p>
                <p className="font-medium text-zinc-700">
                  {employee.emergencyContact || "Family Contact Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Employment & Compensation */}
          <div className="space-y-3.5 p-4 rounded-xl border border-zinc-100 bg-white shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-rose-500" />
              Role & Compensation
            </h3>

            <div className="space-y-2.5">
              <div>
                <p className="text-zinc-400 text-[11px]">Reporting Manager</p>
                <p className="font-semibold text-zinc-800">
                  {employee.manager || "Executive Leadership"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 text-[11px]">Base Salary Compensation</p>
                <p className="font-bold text-zinc-900 text-sm">
                  {employee.salary || "$95,000 / year"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 text-[11px]">Disbursement Method</p>
                <p className="font-semibold text-zinc-700 flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-zinc-400" />
                  {employee.payCycle || "Monthly Direct Deposit"}
                </p>
              </div>

              <div>
                <p className="text-zinc-400 text-[11px]">Work Shift</p>
                <p className="font-medium text-zinc-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  09:00 AM - 06:00 PM (IST)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Badges */}
        {employee.skills && employee.skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              Verified Core Skills & Competencies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {employee.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toast.success(`Exporting summary for ${employee.name}`)}
            className="text-xs font-semibold text-zinc-700 border-zinc-200 hover:bg-zinc-50"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
            Download Summary
          </Button>

          <Button
            type="button"
            onClick={onClose}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-5"
          >
            Close Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
}
