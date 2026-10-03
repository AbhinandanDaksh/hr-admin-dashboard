"use client";
import CandidatesTable from "./components/user";

export default function CandidatesPage() {
  return (
    <div className="min-h-[80vh] p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <CandidatesTable />
    </div>
  );
}
