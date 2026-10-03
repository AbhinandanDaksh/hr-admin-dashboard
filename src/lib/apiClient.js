import axios from "axios";
import { mockCandidates, mockJobs } from "./mockData";

// Base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token if available
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/**
 * Universal HR API Service
 * If NEXT_PUBLIC_API_BASE_URL is not set, seamlessly falls back to Mock Data
 */
export const hrService = {
  // Authentication
  login: async (credentials) => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      const response = await api.post("/api/auth/login", credentials);
      return response.data;
    }
    // Mock login fallback
    return {
      status: "success",
      token: "demo-jwt-token-open-source",
      user: { name: "Super Admin", email: credentials.email },
    };
  },

  // Candidates
  getCandidates: async (params = {}) => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      const response = await api.get("/api/candidates", { params });
      return response.data;
    }

    // Mock candidates filtering & pagination
    let data = [...mockCandidates];
    if (params.search) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.job_title.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }
    const page = Number(params.page) || 1;
    const limit = Number(params.per_page || params.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + limit);

    return {
      data: paginated,
      total: data.length,
      page,
      per_page: limit,
    };
  },

  // Jobs
  getJobs: async (params = {}) => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      const response = await api.get("/api/jobs", { params });
      return response.data;
    }

    // Mock jobs filtering & pagination
    let data = [...mockJobs];
    if (params.search) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department?.toLowerCase().includes(q)
      );
    }
    const page = Number(params.page) || 1;
    const limit = Number(params.limit || params.per_page) || 10;
    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + limit);

    return {
      data: paginated,
      total: data.length,
      page,
      limit,
    };
  },

  createJob: async (jobData) => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      const response = await api.post("/api/jobs", jobData);
      return response.data;
    }
    return { status: "success", message: "Job created in demo mode" };
  },

  updateJob: async (jobData) => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      const response = await api.post("/api/jobs/update", jobData);
      return response.data;
    }
    return { status: "success", message: "Job updated in demo mode" };
  },

  deleteJob: async (id) => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL) {
      const response = await api.delete(`/api/jobs/${id}`);
      return response.data;
    }
    return { status: "success", message: "Job deleted in demo mode" };
  },
};

export default api;
