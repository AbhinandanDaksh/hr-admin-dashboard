"use client";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { hrService } from "@/lib/apiClient";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteJobModal({ isOpen, onClose, faqId, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!faqId) return;

    setLoading(true);
    try {
      await hrService.deleteJob(faqId);
      toast.success("Job posting deleted successfully!");
      onDeleted?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDelete}
      title="Delete Job Opening"
      description="Are you sure you want to delete this job posting? This action cannot be undone."
      confirmText="Delete Job"
      loading={loading}
    />
  );
}
