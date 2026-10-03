# 🌸 HR Core Admin Dashboard (Open Source)

> A modern, elegant, and fully responsive **HR & Talent Acquisition Dashboard** built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. Designed with a soothing, eye-friendly Minimalist Rose / Blush aesthetic.

![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

---

## ✨ Features

- 📊 **Recruitment Analytics & Insights**: Interactive charts for hiring velocity, applicant trends, and department breakdowns using Chart.js.
- 👥 **Candidate Pipeline Management**: Searchable applicant directory with status tags, interview stages, and resume viewer.
- 💼 **Job Openings Management**: Full CRUD support for creating, editing, filtering, and deleting job postings.
- 🧩 **Modular Open-Source Architecture**: Reusable UI primitives (`DataTable`, `PageHeader`, `Modal`, `ConfirmDialog`, `StatCard`, `Badge`, `SearchInput`, `Pagination`).
- ⚡ **Zero-Backend Demo Mode**: Built-in mock data service (`hrService`) that runs out of the box without any mandatory backend setup.
- 🎨 **Minimalist Rose / Blush Theme**: Calm, high-contrast, eye-friendly design system with responsive 100% fluid layouts.
- 🔐 **Authentication Ready**: Login view with demo credentials fallback and dynamic JWT token storage.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── (admin)/
│   │   ├── dashboard/       # Main HR metrics & interactive charts
│   │   ├── notification/    # Job Requisitions & Openings management
│   │   ├── users/           # Candidate management table
│   │   └── layout.js        # Fluid 100% width admin shell layout
│   ├── (auth)/
│   │   └── login/           # Authentication portal
│   ├── globals.css          # CSS Variables & theme tokens
│   └── layout.js            # Root layout wrapper
├── components/
│   ├── common/              # 🌟 Reusable Open-Source Components Suite
│   │   ├── Badge.jsx        # Status tags & indicators
│   │   ├── ConfirmDialog.jsx# Delete & confirmation alert modals
│   │   ├── DataTable.jsx    # Universal data table with pagination
│   │   ├── Modal.jsx        # Accessible dialog wrapper
│   │   ├── PageHeader.jsx   # Standardized page title & toolbar
│   │   ├── Pagination.jsx   # Page navigation controls
│   │   ├── SearchInput.jsx  # Search bar with debouncing
│   │   ├── StatCard.jsx     # KPI metric display cards
│   │   └── index.js         # Central barrel exports
│   ├── ui/                  # Base form inputs & UI primitives
│   ├── Navbar.js            # Top navigation bar
│   └── Sidebar.js           # Desktop & Mobile responsive sidebar
└── lib/
    ├── apiClient.js         # Centralized API service with mock fallback
    ├── mockData.js          # Realistic mock candidates & job listings
    └── utils.js             # Formatting & class merging utilities
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/hr-admin-dashboard.git
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
> *Note: If `NEXT_PUBLIC_API_BASE_URL` is empty, the app will run in **Demo Mode** with mock data automatically.*

### 4. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000` to preview the application.

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
