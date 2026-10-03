# 🌸 HR Core Admin Dashboard

> A modern, elegant, and fully responsive **HR & Workforce Management System** built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. Designed with a soothing, eye-friendly Minimalist Rose / Slate aesthetic.

![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

---

## ✨ Features & Modules

### 1. 📊 Talent & Recruitment Dashboard
- **Interactive KPI Cards**: Active job requisitions, candidate pipeline counts, interview schedules, and offer acceptance metrics.
- **Chart.js Visualizations**: Application volume trends, department breakdowns, and recruitment stage doughnut distribution.
- **Velocity Metrics**: Time-to-hire tracker, 90-day retention rate, and upcoming interview agendas.

### 2. 👥 Applicant Tracking System (ATS) & Job Openings
- **Candidate Pipeline**: Searchable candidate directory with status badges, stage filters, and resume details.
- **Job Requisitions**: Full CRUD operations for creating, editing, publishing, and archiving job openings.

### 3. 🧑‍💼 Employee Directory & Workforce
- **Deep Employee Profiles**: Detailed slide-over/modal profiles with emergency contacts, skill matrices, joining dates, and departments.
- **Attendance & Time Tracking**: Clock-in logs, leave approvals, and shift hours.
- **Payroll & Compensation**: Salary disbursements, tax deductions, and exportable payslip summaries.

### 4. 🏢 System Settings & Administration
- **Multi-Tab Configuration**: General organization profile, notification toggles, Role-Based Access Control (RBAC), API keys & webhooks, and session security.
- **Automated Reports**: PDF and Excel/CSV export capabilities for workforce audits.

### 5. 🎨 Design & Navigation System
- **Collapsible Mini-Rail Sidebar**: Toggle between full width (`w-64`) with tree-branch connector sub-tabs (`└─`) and compact icon-only rail (`w-20`) with hover flyouts.
- **High-Res Vector Favicon**: Crisp SVG favicon (`/icon.svg`) and dynamic `BrandLogo` component.
- **Zero-Backend Ready**: Built-in mock data layer (`hrService`) that runs standalone without mandatory backend setup.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **State & Context**: React Context API (`SidebarContext`)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── (admin)/
│   │   ├── dashboard/       # Main HR metrics & interactive charts
│   │   ├── notification/    # Job Openings management
│   │   ├── users/           # Candidate ATS management
│   │   ├── employees/       # Employee directory & profile modals
│   │   ├── interviews/      # Interview evaluation pipeline
│   │   ├── attendance/      # Attendance logs & leave requests
│   │   ├── payroll/         # Compensation & salary disbursements
│   │   ├── reports/         # Exportable audit reports
│   │   ├── settings/        # Multi-tab administrative settings
│   │   └── layout.js        # Dynamic fluid admin shell layout
│   ├── (auth)/
│   │   └── login/           # Modern 2-column authentication portal
│   ├── icon.svg             # Vector SVG favicon
│   ├── globals.css          # CSS Variables & Tailwind theme
│   └── layout.js            # Root layout wrapper
├── components/
│   ├── common/              # Universal reusable components suite
│   │   ├── Badge.jsx        # Status tags & indicators
│   │   ├── BrandLogo.jsx    # Vector SVG brand logo
│   │   ├── ConfirmDialog.jsx# Delete & confirmation alert modals
│   │   ├── DataTable.jsx    # Universal data table with pagination
│   │   ├── Modal.jsx        # Accessible dialog wrapper
│   │   ├── PageHeader.jsx   # Standardized page title & toolbar
│   │   ├── Pagination.jsx   # Page navigation controls
│   │   ├── SearchInput.jsx  # Search bar with debouncing
│   │   ├── StatCard.jsx     # KPI metric display cards
│   │   └── index.js         # Central barrel exports
│   ├── ui/                  # Base form inputs & UI primitives
│   ├── Navbar.js            # Top navbar with desktop/mobile toggles
│   └── Sidebar.js           # Collapsible tree-branch navigation
├── context/
│   └── SidebarContext.js    # Persistent sidebar state management
└── lib/
    ├── apiClient.js         # Central API client with mock fallback
    ├── mockData.js          # Mock datasets for standalone mode
    └── utils.js             # Formatting & class merging utilities
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/AbhinandanDaksh/hr-admin-dashboard.git
cd hr-admin-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables (Optional)
```bash
cp .env.example .env.local
```
> *Note: If `NEXT_PUBLIC_API_BASE_URL` is not specified, the app runs in **Standalone Mock Mode** with pre-populated datasets.*

### 4. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000` to preview the application.

---

## 🔐 Default Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@company.com` | `admin123` |

---

## 🧩 Reusable Component Usage Example

```jsx
import { PageHeader, DataTable, SearchInput, Badge, Button } from "@/components/common";

export default function ExamplePage() {
  const columns = [
    { header: "Name", accessor: "name" },
    { 
      header: "Status", 
      render: (row) => <Badge variant="success" dot>{row.status}</Badge> 
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Employees" subtitle="Manage active workforce">
        <SearchInput placeholder="Search employee..." />
      </PageHeader>
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

