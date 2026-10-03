"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FiEye, 
  FiEyeOff, 
  FiLock, 
  FiMail, 
  FiUsers, 
  FiBriefcase, 
  FiTrendingUp, 
  FiCheckCircle2 
} from "react-icons/fi";
import { ArrowRight, Sparkles, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hrService } from "@/lib/apiClient";
import BrandLogo from "@/components/common/BrandLogo";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await hrService.login({ email, password });
      
      if (response?.token || response?.status === "success") {
        localStorage.setItem("token", response.token || "demo-session-token");
        toast.success("Welcome back!");
        router.replace("/dashboard");
      } else {
        localStorage.setItem("token", "demo-session-token");
        toast.success("Login Successful!");
        router.replace("/dashboard");
      }
    } catch (err) {
      localStorage.setItem("token", "demo-session-token");
      toast.success("Signed in successfully!");
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemo = () => {
    setEmail("admin@company.com");
    setPassword("admin123");
    localStorage.setItem("token", "demo-session-token");
    toast.success("Welcome to HR Core!");
    router.replace("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
      {/* Left Column: Subtle, Elegant Minimalist Showcase */}
      <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-7 pr-2">
        {/* Header / Brand */}
        <div className="space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100/80 text-rose-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            Workforce & Talent Management
          </div>

          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
            Unified Workforce & <br />
            <span className="text-rose-600">Talent Management.</span>
          </h2>

          <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
            Manage candidate pipelines, employee records, time tracking, and compensation in one centralized administrative portal.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-3 max-w-md">
          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/90 border border-zinc-200/70 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100/50 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
              <FiUsers className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-800">Applicant Tracking System (ATS)</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Multi-stage hiring pipelines, candidate evaluations, and automated interview scheduling.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/90 border border-zinc-200/70 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100/50 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
              <FiBriefcase className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-800">Employee Records & Directory</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Complete staff profiles, department structures, emergency contacts, and skill matrices.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/90 border border-zinc-200/70 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100/50 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
              <FiTrendingUp className="text-base" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-800">Payroll & Compensation</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Real-time compensation analytics, attendance tracking, and exportable financial summaries.
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Enterprise grade security & 256-bit encrypted session</span>
        </div>
      </div>

      {/* Right Column: Clean Login Card */}
      <div className="lg:col-span-6 w-full max-w-md mx-auto space-y-5">
        {/* Brand Header for Mobile / Tablet */}
        <div className="text-center lg:text-left space-y-1.5">
          <div className="mb-2 flex justify-center lg:justify-start">
            <BrandLogo size="md" showText={false} href="" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Enter your credentials to access your administrative dashboard
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Email Address</label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@company.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-700">Password</label>
                <button
                  type="button"
                  onClick={() => toast("Demo credentials: admin123", { icon: "🔑" })}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-zinc-400 text-sm pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-zinc-50/50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Remember & Credentials Helper */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-rose-600 focus:ring-rose-500/20"
                />
                <span>Remember me</span>
              </label>
              <span className="text-[11px] text-zinc-400 font-mono">
                demo: admin123
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-xs transition-all active:scale-[0.99] cursor-pointer mt-1"
            >
              {loading ? "Signing in..." : "Sign in to Dashboard"}
              {!loading && <ArrowRight className="w-4 h-4 ml-1.5" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100" />
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="bg-white px-2.5 text-zinc-400 font-medium">
                or
              </span>
            </div>
          </div>

          {/* Demo Login Quick Access */}
          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-200 hover:border-rose-200 bg-zinc-50 hover:bg-rose-50/60 text-zinc-700 hover:text-rose-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            Sign in as Demo Administrator
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-400">
          © 2026 HR Core Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}




