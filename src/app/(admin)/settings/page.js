"use client";
import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Bell, 
  ShieldCheck, 
  Key, 
  Globe, 
  Lock, 
  Copy, 
  Check, 
  Save, 
  RefreshCw,
  Sliders,
  Webhook
} from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [copiedKey, setCopiedKey] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [companyInfo, setCompanyInfo] = useState({
    name: "Enterprise Core Inc.",
    domain: "https://company.com",
    email: "careers@company.com",
    timezone: "Asia/Kolkata (GMT +5:30)",
    currency: "USD ($)",
    workHours: "09:00 AM - 06:00 PM",
  });

  const [notificationToggles, setNotificationToggles] = useState({
    newApplicant: true,
    interviewReminder: true,
    dailyDigest: false,
    leaveApproval: true,
    payrollAlerts: true,
  });

  const [apiKey, setApiKey] = useState("pk_live_51Msz9901hr_enterprise_demo_key_8829");
  const [apiEndpoint, setApiEndpoint] = useState(
    process.env.NEXT_PUBLIC_API_BASE_URL || ""
  );
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.slack.com/services/T00/B00/XXXX");

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    toast.success("API Key copied to clipboard!");
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `pk_live_${Math.random().toString(36).substring(2, 15)}_hr_${Date.now()}`;
    setApiKey(newKey);
    toast.success("Generated new API Access Token!");
  };

  const handleToggle = (key) => {
    setNotificationToggles((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.success("Preference updated");
      return updated;
    });
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("System configurations updated successfully!");
    }, 600);
  };

  const tabs = [
    { id: "general", label: "General & Organization", icon: Building2 },
    { id: "notifications", label: "Notifications & Alerts", icon: Bell },
    { id: "roles", label: "Roles & Permissions", icon: ShieldCheck },
    { id: "api", label: "API & Webhooks", icon: Key },
    { id: "security", label: "Security & Sessions", icon: Lock },
  ];

  const rolesList = [
    {
      role: "Super Admin",
      usersCount: 2,
      access: "Full unrestricted access to all modules, billing, and system settings",
      badge: "primary",
    },
    {
      role: "HR Recruiter",
      usersCount: 5,
      access: "Manage job postings, applicant pipelines, and interview schedules",
      badge: "info",
    },
    {
      role: "Hiring Manager",
      usersCount: 12,
      access: "Review shortlisted candidates, evaluate interviews, and submit scorecards",
      badge: "purple",
    },
    {
      role: "Employee (Self-Service)",
      usersCount: 48,
      access: "View company directory, log attendance, and download payslips",
      badge: "default",
    },
  ];

  return (
    <div className="space-y-6 w-full pb-10">
      <PageHeader
        title="System Settings & Governance"
        subtitle="Manage organization parameters, notification channels, roles, and API integrations"
        badge={<Badge variant="primary" dot>Production Mode</Badge>}
      >
        <Button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          {saving ? "Saving Changes..." : "Save All Changes"}
        </Button>
      </PageHeader>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-200/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                active
                  ? "bg-rose-50 text-rose-700 border border-rose-200/70 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-rose-600" : "text-zinc-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General & Organization */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-5">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                Organization Profile
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Public details and primary corporate identifiers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Company Legal Name</label>
                <Input
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Career Portal Domain</label>
                <Input
                  value={companyInfo.domain}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, domain: e.target.value })}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Recruitment Contact Email</label>
                <Input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Default Corporate Timezone</label>
                <Input
                  value={companyInfo.timezone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, timezone: e.target.value })}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Reporting Currency</label>
                <Input
                  value={companyInfo.currency}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, currency: e.target.value })}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700">Standard Work Schedule</label>
                <Input
                  value={companyInfo.workHours}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, workHours: e.target.value })}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-5">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">
              Notification & Alert Triggers
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Configure real-time in-app alerts and automated transactional emails
            </p>
          </div>

          <div className="divide-y divide-zinc-100">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">New Candidate Application Alerts</p>
                <p className="text-[11px] text-zinc-400">Send an instant notification when a talent applies to an open job</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("newApplicant")}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notificationToggles.newApplicant ? "bg-rose-600 justify-end" : "bg-zinc-200 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Interview Schedule Reminders</p>
                <p className="text-[11px] text-zinc-400">Send calendar alerts 30 minutes prior to scheduled interviews</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("interviewReminder")}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notificationToggles.interviewReminder ? "bg-rose-600 justify-end" : "bg-zinc-200 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Daily Recruitment Digest</p>
                <p className="text-[11px] text-zinc-400">Email daily summary of pipeline metrics to HR leadership at 08:00 AM</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("dailyDigest")}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notificationToggles.dailyDigest ? "bg-rose-600 justify-end" : "bg-zinc-200 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Leave Approval Requests</p>
                <p className="text-[11px] text-zinc-400">Notify department heads when an employee submits a time-off request</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("leaveApproval")}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notificationToggles.leaveApproval ? "bg-rose-600 justify-end" : "bg-zinc-200 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Roles & Permissions */}
      {activeTab === "roles" && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">
                  Role-Based Access Control (RBAC)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Define user permissions and module access levels across your team
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success("Create Role Modal (Demo)")}
                className="text-xs font-semibold text-rose-600 border-zinc-200 hover:bg-rose-50"
              >
                + Add Custom Role
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rolesList.map((r, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-rose-50/30 hover:border-rose-200/70 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{r.role}</h4>
                      <p className="text-[11px] text-zinc-500 mt-1">{r.access}</p>
                    </div>
                    <Badge variant={r.badge}>{r.usersCount} Users</Badge>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[11px]">
                    <span className="text-zinc-400 font-medium">Status: Enabled</span>
                    <button
                      onClick={() => toast.success(`Editing permissions for ${r.role}`)}
                      className="font-semibold text-rose-600 hover:underline"
                    >
                      Configure Scope
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: API & Webhooks */}
      {activeTab === "api" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-5">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                REST API Base Configuration
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Connect your custom backend server or database API
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700">API Base Endpoint</label>
              <div className="flex gap-2">
                <Input
                  value={apiEndpoint}
                  placeholder="https://api.yourcompany.com"
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
                />
                <Button
                  type="button"
                  onClick={() => toast.success("API Endpoint Tested: Ready")}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shrink-0"
                >
                  Test Connection
                </Button>
              </div>
              <p className="text-[11px] text-zinc-400">
                If left empty, the application automatically runs in <strong>Demo / Mock Data Mode</strong>.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-5">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                Bearer Secret API Token
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Use this token to authenticate external API requests
              </p>
            </div>

            <div className="flex items-center gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
              <code className="text-xs font-mono text-zinc-800 flex-1 truncate select-all">
                {apiKey}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyKey}
                className="text-xs font-semibold shrink-0 border-zinc-200 hover:bg-white"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                <span className="ml-1">{copiedKey ? "Copied" : "Copy"}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateKey}
                className="text-xs font-semibold shrink-0 border-zinc-200 hover:bg-white text-rose-600"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Regenerate
              </Button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                Slack & Webhook Integrations
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Receive instant channel notifications on new job applications
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700">Webhook URL</label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="rounded-xl border-zinc-200 text-xs sm:text-sm focus:ring-rose-500/20 focus:border-rose-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Security */}
      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-[0_1px_4px_rgba(0,0,0,0.02)] space-y-5">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">
              Security & Authentication Governance
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Admin session timeouts and authentication policies
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-zinc-400">Enforce OTP authenticator verification on super admin login</p>
              </div>
              <Badge variant="success" dot>Enabled</Badge>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Session Auto-Timeout</p>
                <p className="text-[11px] text-zinc-400">Automatically logout inactive users after 30 minutes of idle time</p>
              </div>
              <Badge variant="default">30 Minutes</Badge>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50/70 border border-zinc-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Password Policy</p>
                <p className="text-[11px] text-zinc-400">Minimum 10 characters with numbers and special symbols</p>
              </div>
              <Badge variant="primary">Strict Policy</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
