"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ArrowLeft, 
  Users, 
  Briefcase, 
  FileQuestion,
  HelpCircle
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#faf8f9] flex flex-col items-center justify-center p-6 text-center antialiased">
      {/* Decorative Glow */}
      <div className="relative w-full max-w-lg mx-auto">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
          {/* Badge Icon */}
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100/80 shadow-xs">
            <FileQuestion className="w-8 h-8" />
          </div>

          {/* 404 Headline */}
          <div className="space-y-2">
            <span className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
              404
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
              The page you are looking for might have been removed, renamed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto text-xs font-semibold border-zinc-200 hover:bg-zinc-50 text-zinc-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Go Back
            </Button>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs">
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Quick Helpful Navigation Links */}
          <div className="pt-6 border-t border-zinc-100 text-left">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3 text-center sm:text-left">
              Quick Portal Links
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/users"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 hover:bg-rose-50 text-zinc-700 hover:text-rose-700 border border-zinc-100 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-rose-500" />
                <span>Candidates</span>
              </Link>

              <Link
                href="/notification"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 hover:bg-rose-50 text-zinc-700 hover:text-rose-700 border border-zinc-100 transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5 text-rose-500" />
                <span>Job Openings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-xs text-zinc-400">
          HR Core Admin System • Need assistance? Contact your administrator.
        </p>
      </div>
    </div>
  );
}

