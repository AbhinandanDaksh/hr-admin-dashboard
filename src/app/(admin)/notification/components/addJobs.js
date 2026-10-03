"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/common/Modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { hrService } from "@/lib/apiClient";
import { Plus } from "lucide-react";

export default function AddJobModal({ isOpen, onClose, onAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    location: "",
    post_date: new Date().toISOString().split("T")[0],
    experience: "",
    description: "",
    what_you_will_do: "",
    requirements: "",
    perks_benefits: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error("Job title is required.");
    if (!formData.location.trim()) return toast.error("Location is required.");
    if (!formData.description.trim()) return toast.error("Job description is required.");

    setLoading(true);
    try {
      await hrService.createJob(formData);
      toast.success("Job posting created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        department: "Engineering",
        location: "",
        post_date: new Date().toISOString().split("T")[0],
        experience: "",
        description: "",
        what_you_will_do: "",
        requirements: "",
        perks_benefits: "",
      });

      onAdded?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create job posting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Job Opening"
      description="Fill in the job details, requirements, and responsibilities."
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
            Job Overview & Description <span className="text-rose-500">*</span>
          </label>
          <Textarea
            name="description"
            placeholder="Provide a concise summary of the role and team..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
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
              placeholder="Core duties and day-to-day deliverables..."
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
              placeholder="Must-have technical skills, qualifications..."
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
            placeholder="e.g. Health Insurance, Annual Bonus, Flexible Hours"
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
            {loading ? "Publishing..." : "Publish Job Opening"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
