# Contributing to HR Admin Dashboard 🤝

Thank you for your interest in contributing to the **HR Admin Dashboard** project! We welcome contributions from developers of all skill levels.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Chart.js & React-Chartjs-2
- **Icons**: Lucide React & React Icons
- **HTTP Client**: Axios

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router (pages & layouts)
│   ├── (admin)/          # Protected admin panel routes
│   │   ├── dashboard/    # Recruitment & talent overview
│   │   ├── notification/ # Job openings management
│   │   ├── users/        # Candidate ATS pipeline
│   │   ├── employees/    # Staff directory & modal profiles
│   │   ├── interviews/   # Interview evaluation tracker
│   │   ├── attendance/   # Attendance logs & leave approvals
│   │   ├── payroll/      # Payroll disbursements & summaries
│   │   ├── reports/      # PDF/CSV audit reports
│   │   └── settings/     # Multi-tab administrative settings
│   ├── (auth)/           # Authentication pages (login)
│   ├── icon.svg          # High-res SVG favicon
│   └── globals.css       # Global styles & Tailwind theme
├── components/
│   ├── common/           # Universal reusable components
│   │   ├── Badge.jsx     # Status tag pills
│   │   ├── BrandLogo.jsx # Vector SVG brand logo
│   │   ├── DataTable.jsx # Universal table with pagination & states
│   │   ├── Modal.jsx     # Reusable modal dialog
│   │   ├── ConfirmDialog.jsx # Confirmation alert modal
│   │   ├── PageHeader.jsx# Standardized page title & actions
│   │   ├── Pagination.jsx# Standard pagination controls
│   │   ├── SearchInput.jsx # Debounced search input
│   │   └── StatCard.jsx  # KPI metrics card
│   ├── ui/               # Low-level primitives (buttons, inputs)
│   ├── Navbar.js         # Top navigation bar
│   └── Sidebar.js        # Collapsible tree-branch navigation
├── context/
│   └── SidebarContext.js # Persistent sidebar state management
└── lib/
    ├── apiClient.js      # Central API client & mock fallback service
    ├── mockData.js       # Mock datasets for standalone mode
    └── utils.js          # Shared utility functions
```

---

## 🚀 Getting Started

1. **Fork & Clone the repository**:
   ```bash
   git clone https://github.com/AbhinandanDaksh/hr-admin-dashboard.git
   cd hr-admin-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   *(If `NEXT_PUBLIC_API_BASE_URL` is left empty, the project automatically runs in **Demo / Mock Mode**).*

4. **Run development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 How to Contribute

### 1. Contributing Components
Always place reusable components inside `src/components/common/` and export them via `src/components/common/index.js`.

### 2. Backend Integration
To integrate a real backend:
- Update `src/lib/apiClient.js` with your REST / GraphQL endpoints.
- Configure `NEXT_PUBLIC_API_BASE_URL` in `.env.local`.

### 3. Submitting a Pull Request
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m "feat: add new feature"`
3. Push to your branch: `git push origin feature/your-feature-name`
4. Open a **Pull Request** on GitHub.

---

## 📜 Code Guidelines
- Use clean, semantic React components.
- Ensure all interactive elements have responsive layouts.
- Follow Tailwind CSS utility class conventions.
