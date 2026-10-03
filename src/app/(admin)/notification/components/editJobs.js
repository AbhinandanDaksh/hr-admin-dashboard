"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/common/Modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { hrService } from "@/lib/apiClient";

export default function EditJobModal({ isOpen, onClose, job, onUpdated }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    department: "",
    location: "",
    post_date: "",
    experience: "",
    description: "",
    what_you_will_do: "",
    requirements: "",
    perks_benefits: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        id: job.id || job._id || "",
        title: job.title || "",
        department: job.department || "Engineering",
        location: job.location || "",
        post_date: job.post_date || job.created_at || "",
        experience: job.experience || "",
        description: job.description || "",
        what_you_will_do: job.what_you_will_do || "",
        requirements: job.requirements || "",
        perks_benefits: job.perks_benefits || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error("Job title is required.");
    if (!formData.location.trim()) return toast.error("Location is required.");

    setLoading(true);
    try {
      await hrService.updateJob(formData);
      toast.success("Job posting updated successfully!");
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job posting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Job Opening"
      description="Update position requirements, responsibilities, or compensation details."
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Title & Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Job Title <span className="text-rose-500">*</span>
            </label>
            <Input
              name="title"
              placeholder="e.g. Senior Full Stack Developer"
              value={formData.title}
              onChange={handleChange}
              required
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Department
            </label>
            <Input
              name="department"
              placeholder="e.g. Engineering, HR, Product"
              value={formData.department}
              onChange={handleChange}
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>
        </div>

        {/* Row 2: Location, Experience & Post Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Location <span className="text-rose-500">*</span>
            </label>
            <Input
              name="location"
              placeholder="e.g. Remote / Mumbai"
              value={formData.location}
              onChange={handleChange}
              required
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Experience Level
            </label>
            <Input
              name="experience"
              placeholder="e.g. 3-5 Years"
              value={formData.experience}
              onChange={handleChange}
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Post Date
            </label>
            <Input
              type="date"
              name="post_date"
              value={formData.post_date}
              onChange={handleChange}
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700">
            Job Overview & Description
          </label>
          <Textarea
            name="description"
            placeholder="Provide a concise summary of the role..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400 resize-none"
          />
        </div>

        {/* 2-Column Textareas: Responsibilities & Requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Key Responsibilities
            </label>
            <Textarea
              name="what_you_will_do"
              placeholder="Core duties..."
              value={formData.what_you_will_do}
              onChange={handleChange}
              rows={3}
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700">
              Candidate Requirements
            </label>
            <Textarea
              name="requirements"
              placeholder="Skills, qualifications..."
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400 resize-none"
            />
          </div>
        </div>

        {/* Perks & Benefits */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700">
            Perks & Benefits
          </label>
          <Input
            name="perks_benefits"
            placeholder="Health Insurance, Annual Bonus..."
            value={formData.perks_benefits}
            onChange={handleChange}
            className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
          />
        </div>

        {/* Modal Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="text-xs font-semibold border-zinc-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
