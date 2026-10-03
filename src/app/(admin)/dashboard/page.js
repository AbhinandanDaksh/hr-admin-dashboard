"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ApplicationTrendsChart from "./components/RevenueChart";
import DepartmentBarChart from "./components/TransactionsChart";
import RecruitmentStatusDoughnut from "./components/UserDistributionChart";
import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import Badge from "@/components/common/Badge";
import { mockCandidates, mockJobs } from "@/lib/mockData";
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Calendar, 
  PlusCircle, 
  ArrowUpRight, 
  Clock,
  Award,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#64748b",
          font: { size: 12, family: "Inter, sans-serif" },
          boxWidth: 14,
          padding: 16,
        },
      },
      title: {
        display: true,
        color: "#0f172a",
        font: { size: 15, weight: "600", family: "Inter, sans-serif" },
        padding: { top: 4, bottom: 16 },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
        cornerRadius: 8,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(226, 232, 240, 0.6)" },
        ticks: { color: "#94a3b8", font: { size: 11 } },
      },
      y: {
        grid: { color: "rgba(226, 232, 240, 0.6)" },
        ticks: { color: "#94a3b8", font: { size: 11 } },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#64748b",
          font: { size: 12, family: "Inter, sans-serif" },
          boxWidth: 14,
          padding: 16,
        },
      },
      title: {
        display: true,
        color: "#0f172a",
        font: { size: 15, weight: "600", family: "Inter, sans-serif" },
        padding: { top: 4, bottom: 16 },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#f1f5f9",
        cornerRadius: 8,
        padding: 10,
      },
    },
  };

  const applicationTrendsData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Total Applications",
        data: [180, 240, 310, 290, 420, 530],
        borderColor: "#e11d48",
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.ctx;
          const gradient = canvas.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(225, 29, 72, 0.12)");
          gradient.addColorStop(1, "rgba(225, 29, 72, 0.0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#e11d48",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Shortlisted Candidates",
        data: [45, 60, 85, 78, 110, 145],
        borderColor: "#fb7185",
        backgroundColor: "transparent",
        borderDash: [4, 4],
        tension: 0.4,
        pointBackgroundColor: "#fb7185",
        pointRadius: 3,
      },
    ],
  };

  const departmentData = {
    labels: ["Engineering", "Design", "HR & Admin", "Marketing", "Sales", "DevOps"],
    datasets: [
      {
        label: "Applicants",
        data: [420, 180, 130, 210, 190, 150],
        backgroundColor: "#f43f5e",
        borderRadius: 6,
        barThickness: 26,
      },
    ],
  };

  const pipelineDistribution = {
    labels: ["Screening", "Tech Interview", "HR Round", "Offer Sent", "Hired"],
    datasets: [
      {
        data: [45, 25, 15, 8, 7],
        backgroundColor: [
          "#e11d48",
          "#fb7185",
          "#f472b6",
          "#fbcfe8",
          "#10b981",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 6,
      },
    ],
  };

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Aarav Sharma",
      role: "Senior Full Stack Developer",
      time: "Tomorrow, 10:30 AM",
      type: "Technical Round",
      interviewer: "Lead Architect",
    },
    {
      id: 2,
      candidate: "Priya Patel",
      role: "HR Operations Lead",
      time: "Tomorrow, 02:00 PM",
      type: "Cultural Fit & HR",
      interviewer: "HR Director",
    },
    {
      id: 3,
      candidate: "Rohan Verma",
      role: "UI/UX Product Designer",
      time: "Oct 05, 11:00 AM",
      type: "Portfolio Review",
      interviewer: "Design Head",
    },
  ];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Top Clean Page Header with Actions */}
      <PageHeader
        title="Talent & Recruitment Overview"
        subtitle="Monitor active openings, candidate pipelines, recruitment velocity, and team metrics."
        badge={
          <Badge variant="primary" dot>
            Live Insights
          </Badge>
        }
      >
        <Link href="/notification">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-all">
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Post New Job
          </Button>
        </Link>
        <Link href="/users">
          <Button variant="outline" className="bg-white text-zinc-700 border-zinc-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-semibold">
            <Users className="w-4 h-4 mr-1.5" />
            View Candidates
          </Button>
        </Link>
      </PageHeader>

      {/* Top 4 Metrics Cards using StatCard Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        <StatCard
          title="Active Openings"
          value={mockJobs.length + 8}
          percentage={14}
          isIncrease={true}
          description="Across 6 active departments"
          icon={Briefcase}
          variant="rose"
        />
        <StatCard
          title="Total Applicants"
          value="1,280"
          percentage={22}
          isIncrease={true}
          description="145 new applicants this week"
          icon={Users}
          variant="pink"
        />
        <StatCard
          title="In Interview"
          value="94"
          description="18 interviews scheduled this week"
          icon={Calendar}
          variant="amber"
        />
        <StatCard
          title="Offers Accepted"
          value="38"
          percentage={92}
          isIncrease={true}
          description="Target on-track for Q4"
          icon={UserCheck}
          variant="emerald"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <ApplicationTrendsChart
          data={applicationTrendsData}
          baseOptions={baseOptions}
        />
        <DepartmentBarChart
          data={departmentData}
          baseOptions={baseOptions}
        />
      </div>

      {/* Pipeline Distribution + HR KPIs & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Pipeline Doughnut Chart */}
        <div className="lg:col-span-1">
          <RecruitmentStatusDoughnut
            title="Recruitment Pipeline (%)"
            chartData={pipelineDistribution}
            baseOptions={doughnutOptions}
          />
        </div>

        {/* HR Key Performance Indicators */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-sm font-bold text-zinc-900 mb-0.5">
              HR Performance Indicators
            </h2>
            <p className="text-xs text-zinc-400">Recruitment velocity & efficiency</p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-100">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Avg Time to Hire</p>
                  <p className="text-sm font-bold text-zinc-900">18 Days</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                -3d faster
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-100">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">Offer Acceptance Rate</p>
                  <p className="text-sm font-bold text-zinc-900">91.4%</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                +4.2%
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-100">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-medium">90-Day Retention</p>
                  <p className="text-sm font-bold text-zinc-900">96.8%</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                Top Tier
              </span>
            </div>
          </div>

          <div className="pt-1 text-center">
            <Link
              href="/users"
              className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700 gap-1"
            >
              Explore Talent Analytics <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Upcoming Interview Schedule */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  Upcoming Interviews
                </h2>
                <p className="text-xs text-zinc-400">Scheduled for this week</p>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                {upcomingInterviews.length} Scheduled
              </span>
            </div>

            <div className="space-y-2.5">
              {upcomingInterviews.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-zinc-100 hover:border-rose-200 hover:bg-rose-50/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-800">
                        {item.candidate}
                      </h4>
                      <p className="text-[11px] text-zinc-400">{item.role}</p>
                    </div>
                    <span className="text-[10px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1 text-rose-600 font-medium">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                    <span>{item.interviewer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/users" className="mt-3 block">
            <Button variant="outline" className="w-full text-xs font-medium border-zinc-200 hover:bg-zinc-50">
              View All Schedules <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Candidate Applications Preview */}
      <div className="w-full bg-white rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-base font-bold text-zinc-900">Recent Candidate Applications</h2>
            <p className="text-xs text-zinc-400">Review and shortlist newly applied talents</p>
          </div>
          <Link href="/users">
            <Button variant="outline" size="sm" className="text-xs font-semibold border-zinc-200 hover:bg-zinc-50">
              View All Candidates
            </Button>
          </Link>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50/70 text-[11px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-100">
              <tr>
                <th className="px-3.5 py-2.5">Candidate</th>
                <th className="px-3.5 py-2.5">Job Role</th>
                <th className="px-3.5 py-2.5">Contact</th>
                <th className="px-3.5 py-2.5">Applied Date</th>
                <th className="px-3.5 py-2.5">Status</th>
                <th className="px-3.5 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {mockCandidates.slice(0, 5).map((candidate, idx) => (
                <tr key={candidate.id} className="hover:bg-zinc-50/60 transition-colors">
                  <td className="px-3.5 py-2 font-semibold text-zinc-800 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] flex items-center justify-center border border-rose-100 shrink-0">
                      {candidate.name.charAt(0)}
                    </div>
                    <span className="text-xs">{candidate.name}</span>
                  </td>
                  <td className="px-3.5 py-2 text-xs text-zinc-700 font-medium">{candidate.job_title}</td>
                  <td className="px-3.5 py-2 text-[11px] text-zinc-400">
                    <div>{candidate.email}</div>
                  </td>
                  <td className="px-3.5 py-2 text-xs text-zinc-400">
                    {new Date(candidate.applied_at).toLocaleDateString()}
                  </td>
                  <td className="px-3.5 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      idx === 0
                        ? "bg-rose-50 text-rose-700 border-rose-200/70"
                        : idx === 1
                        ? "bg-purple-50 text-purple-700 border-purple-200/70"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200/70"
                    }`}>
                      {idx === 0 ? "Under Review" : idx === 1 ? "Shortlisted" : "Screening"}
                    </span>
                  </td>
                  <td className="px-3.5 py-2 text-right">
                    <Link
                      href="/users"
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                    >
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
